# 从EVM安全事故中汲取教训：内存编程的陷阱与防范措施

![Smart Contract Attack](/asset/03_blog_bg.png)

好的，我们来逐步分析Parity攻击事件中涉及的两次攻击（2017年7月和11月），并贴出相关代码，分析其漏洞及攻击过程。Parity攻击事件针对的是Parity Multisig Wallet，这是一个多重签名钱包智能合约，用于允许多个用户共同管理资金。我们将分别探讨两次攻击的背景、代码、漏洞和影响。


## Parity Multisig Wallet的工作原理

在分析攻击之前，先简单了解Parity Multisig Wallet的设计。它通过以下方式优化Gas费用：

- **轻量级钱包合约**：每个用户部署一个独立的钱包实例，包含最基本的代理逻辑。
- **共享库合约**：核心逻辑存储在一个共享的`WalletLibrary`合约中，钱包实例通过`delegatecall`调用库合约的函数。

这种设计虽然节省了部署成本，但也为攻击埋下了隐患。

## 第一次攻击（2017年7月）

### 攻击概述

2017年7月，攻击者利用钱包合约中`initWallet`函数的漏洞，盗取了约15.3万ETH（当时价值约3000万美元）。攻击者通过重置钱包所有者，成功转移了资金。

### 涉及的代码

以下是简化版的`WalletLibrary`合约代码，展示了`initWallet`函数的关键部分：

```solidity
contract WalletLibrary {
    address[] public owners;  // 钱包所有者列表
    uint public required;    // 所需签名数量
    bool public initialized = false;  // 是否已初始化

    function initWallet(address[] _owners, uint _required) public {
        require(!initialized, "Already initialized");
        owners = _owners;
        required = _required;
        initialized = true;
    }

    // 其他函数，如 execute 用于执行交易
}
```

在实际的Parity实现中，钱包合约通过`delegatecall`调用库合约的逻辑。然而，`initWallet`函数的访问控制存在严重缺陷。

### 攻击步骤

1. **调用`initWallet`**：
   - 攻击者直接调用钱包实例的`initWallet`函数（通过`delegatecall`转发到库合约）。
   - 他们传入自己的地址作为`_owners`，将自己设置为唯一所有者。
   - 由于`initialized`未正确限制外部调用，攻击者成功重置了钱包状态。

2. **转移资金**：
   - 成为所有者后，攻击者调用钱包的`execute`函数，将钱包中的ETH转移到自己的地址。

### 漏洞分析

- **访问控制缺失**：
  - `initWallet`函数本应只在钱包创建时由构造函数调用，并通过`initialized`标志防止重复初始化。
  - 但Parity的实现未限制`initWallet`的外部调用，任何人都可以调用并重置所有者。

- **委托调用风险**：
  - 钱包合约使用`delegatecall`将未匹配的函数调用转发到库合约。
  - 这意味着攻击者可以直接操作库合约的逻辑，绕过钱包合约的任何保护。

### 影响与修复

这次攻击暴露了访问控制的重要性。Parity随后发布了补丁，增加了对`initWallet`的限制，确保只有在未初始化时才能调用。

## 第二次攻击（2017年11月）

### 攻击概述

2017年11月，一位用户（网名devops199）在探索Parity Multisig Wallet时，意外调用了库合约的`kill`函数，导致库合约自毁。这使得所有依赖该库合约的钱包无法操作，冻结了约50万ETH（当时价值约1.5亿美元）。

### 涉及的代码

以下是简化版的`WalletLibrary`合约代码，展示了`initWallet`和`kill`函数：

```solidity
contract WalletLibrary {
    address public owner;  // 库合约的所有者

    function initWallet(address _owner) public {
        owner = _owner;
    }

    function kill() public {
        require(msg.sender == owner, "Only owner can kill");
        selfdestruct(payable(owner));
    }

    // 其他钱包逻辑...
}
```

### 攻击步骤

1. **调用`initWallet`**：
   - devops199调用了库合约的`initWallet`函数，传入自己的地址作为`_owner`，成为库合约的所有者。
   - 库合约未限制`initWallet`的调用权限，任何人都可以执行此操作。

2. **调用`kill`**：
   - 成为所有者后，devops199调用了`kill`函数。
   - `selfdestruct`销毁了库合约，并将合约余额（如果有）发送到`owner`地址。

3. **链上合约地址**
   - [合约地址](https://etherscan.io/address/0x863df6bfa4469f3ead0be8f9f2aae51c91a907b4#code)

### 漏洞分析

- **库合约的可初始化性**：
  - 库合约被设计为可独立初始化，`initWallet`允许任何人设置`owner`。
  - 这与库合约的预期用途（只被钱包实例调用）不符。

- **自毁函数的危险性**：
  - `kill`函数允许所有者销毁合约，但未考虑库合约被多个钱包依赖的后果。

- **依赖性问题**：
  - 所有钱包合约通过`delegatecall`依赖库合约的代码。
  - 库合约自毁后，钱包合约无法调用任何函数，导致资金冻结。

### 影响

这次攻击并非有意盗窃，而是意外触发，导致资金永久冻结。由于以太坊区块链的不可篡改性，被冻结的ETH至今无法恢复。


## 总结与教训

### 两次攻击的对比

- **7月攻击**：利用逻辑漏洞盗取资金，攻击者直接获利。
- **11月攻击**：意外触发自毁，导致资金冻结，无人获利。

### 关键漏洞根源

- **访问控制不足**：两次攻击都源于关键函数未限制调用者。
- **库合约设计缺陷**：将状态（如`owner`）和自毁逻辑放入共享库合约，增加了风险。

### 防范措施

1. **严格访问控制**：
   - 确保初始化函数只能在部署时调用一次。
   - 使用修饰符（如`onlyOwner`）限制敏感操作。

2. **最小化库合约状态**：
   - 库合约应尽量避免存储可修改的状态，专注于提供纯逻辑。

3. **代码审计**：
   - 在部署前使用工具检测漏洞，并邀请第三方审计。

Parity攻击事件是智能合约开发中的经典案例，提醒开发者在追求效率的同时，必须优先考虑安全性。希望通过这次分析，你能更清晰地理解事件背后的代码与漏洞！

是不是这样考虑就够了呢？如果我们从实际代码中寻觅，其实还是有更多改进空间的。

一个是delegatecall能利用调用者的上下文，如无必要，要尽力避免，尽可能使用call来处理。对于一些必须使用代理模式运行的合约，delegatecall的使用是不可避免的，那么需要合约白名单机制来约束意外的调用。

这就完了？其实对于调用的合约，新的create2指令可以指定地址创建合约，攻击者可以利用该特性先构造一个无害的合约，然后通过自杀方式，重新部署一个有害合约，那么代码需要增加对合约的代码HASH的校验机制，无疑这将大大提高合约运行成本。
