# 如何编写一个可升级的工业级智能合约

![ERC-1822](/asset/05_blog_bg.png)

现代软件开发通常遵循“开发-发布-反馈-升级”的持续迭代循环，通过小步快跑的方式不断优化产品。然而，对于智能合约而言，这种模式面临较大挑战：一旦合约部署到区块链上，其代码就无法修改；若直接部署新合约替代旧合约，原始数据将无法访问，导致业务中断。为了解决这一问题，我们今天将介绍一个成熟的工业标准——**ERC-1822**，即 **UUPS（Universal Upgradeable Proxy Standard）**。该标准旨在简化智能合约的可升级性，同时确保不同版本的逻辑合约之间“存储槽”不会发生冲突。

与传统软件将所有逻辑集成在一个程序中的方式不同，UUPS 将智能合约拆分为两部分：**代理合约**和**业务逻辑合约**。代理合约作为用户交互的固定入口，其地址保持不变；业务逻辑合约则负责实现具体的功能，并通过代理合约注册执行。需要升级时，只需更新业务逻辑合约并将其重新注册到代理合约即可。这种设计实现了合约的可升级性，同时保留了数据的连续性。

![proxy-logic-storage](/asset/proxy-logic-storage.png)


## 业务数据存储

新旧版本的业务逻辑合约都需要访问和处理数据。由于每个合约的运行空间是隔离的，数据必须存储在代理合约中，而非业务逻辑合约本身。用户通过代理合约调用功能，代理合约利用 `delegatecall()` 将调用转发给业务逻辑合约，业务数据则始终保存在代理合约的存储空间中。这种方式有效分离了业务逻辑和业务数据：当需要升级时，只需更新代理合约指向的新业务逻辑合约地址，数据依然可被访问。

然而，这种设计也带来了一些挑战。如果新版本的业务逻辑合约引入了新的数据结构或变量，这些数据仍需存储在代理合约中。为了避免存储冲突，必须谨慎设计变量的存储布局。新变量应始终定义在旧变量之后，以确保不会覆盖旧变量的存储位置。以下是示例代码：

```solidity
// 第一个版本的业务合约
contract AVA_Manager is UUPSUpgradeable {
    mapping(address => bool) private _whitelist; // 白名单
    address public logicContract;                // 业务逻辑地址
}

// 升级后的新版本业务合约
contract AVA_ManagerV2 is UUPSUpgradeable {
    mapping(address => bool) private _whitelist; // 保持原有变量顺序
    address public logicContract;
    // 新增变量，定义在最后
    uint256 public newFeatureFlag;               // 新功能标志
    mapping(uint256 => address) public productOwners; // 产品拥有者
}

// 错误示例：新变量插在旧变量之前
contract AVA_ManagerV2 is UUPSUpgradeable {
    // ❌ 错误：新变量放在前面会导致存储错乱
    uint256 public newFeatureFlag;               // 新变量
    mapping(address => bool) private _whitelist; // 旧数据位置偏移
    address public logicContract;
}
```

**关键点**：新变量必须追加在末尾，且不得删除或重排旧变量，否则会导致存储槽错位，破坏旧数据的完整性。


## Constructor 问题

在 Solidity 中，每个合约只能定义一个 `constructor`，该函数在合约部署时由 EVM 自动执行。然而，这种机制与 UUPS 的设计原则冲突。以 ERC-20 代币合约为例，`constructor` 通常用于初始化代币名称和总量，但这些数据会存储在业务逻辑合约的存储空间中，而非代理合约，违背了“业务逻辑与数据分离”的原则。

EIP-1822 中提到支持多个“constructor”（如 `constructor1`、`constructor2`），但这实际上是一种误解。这些并不是真正的构造函数，而是普通的初始化函数，不会自动执行。标准的设计意图是：业务逻辑合约应通过多个命名不同的初始化函数（例如 `initializeV1`、`initializeV2`）支持不同版本的初始化需求，但这些函数必须由代理合约调用执行。

**结论**：按照 EIP-1822，业务逻辑合约不得使用 `constructor` 进行初始化，也不得直接操作自身存储空间。所有初始化逻辑应通过代理合约完成，数据存储在代理合约中。


## 安全问题

为确保可升级合约的安全性，UUPS 标准规定了以下要求：

1. **区分逻辑合约身份**  
   业务逻辑合约必须实现 `proxiableUUID()` 函数，返回一个唯一的标识符（通常是特定字符串的哈希值），以区分不同的合约版本，避免误升级。例如：

   ```solidity
   function proxiableUUID() external view virtual notDelegated returns (bytes32) {
       return bytes32(uint256(keccak256("ava.v1")));
   }
   ```

2. **访问控制**  
   升级操作（如 `_authorizeUpgrade`）必须受限，只有合约的拥有者（`owner`）或管理员才能执行，以防止未经授权的修改。

3. **防止自调用循环**  
   代理合约不得将调用指向自身，否则 `delegatecall` 会陷入无限循环，耗尽 gas。

4. **初始化安全**  
   可升级合约不得使用 `constructor`，而应使用 `initialize` 函数，并搭配 `initializer` 修饰符，防止多次初始化导致的重入攻击。


## 一个最简单的示例

以下是一个基于 UUPS 的可升级合约示例：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

contract AVE_Manager is Ownable, UUPSUpgradeable {
    // 数据存储：白名单
    mapping(address => bool) private _whitelist;

    // 业务逻辑合约地址
    address public logicContract;

    // 事件
    event LogicContractUpgraded(address indexed oldLogic, address indexed newLogic);
    event WhitelistUpdated(address indexed account, bool enabled);

    // 修饰符：限制白名单用户访问
    modifier onlyWhitelisted() {
        require(_whitelist[msg.sender], "Not in whitelist");
        _;
    }

    // UUPS 升级权限控制
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    // 设置业务逻辑合约地址（仅管理员）
    function setLogicContract(address newLogic) external onlyOwner {
        emit LogicContractUpgraded(logicContract, newLogic);
        logicContract = newLogic;
    }

    // 白名单管理（仅管理员）
    function setWhitelist(address account, bool enabled) external onlyOwner {
        _whitelist[account] = enabled;
        emit WhitelistUpdated(account, enabled);
    }

    // 查询白名单状态
    function isWhitelisted(address account) public view returns (bool) {
        return _whitelist[account];
    }
}
```

**代理合约部署示例**：使用 OpenZeppelin 的 `ERC1967Proxy`：

```solidity
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

// 部署业务逻辑合约
AVE_Manager impl = new AVE_Manager();
// 构造初始化数据（如果有 initialize 函数）
bytes memory data = abi.encodeWithSelector(AVE_Manager.initialize.selector /*, 参数*/);
// 部署代理合约
ERC1967Proxy proxy = new ERC1967Proxy(address(impl), data);
```

## 总结

通过 UUPS（ERC-1822）标准，我们可以将智能合约设计为可升级的工业级系统。其核心在于：
- **代理与逻辑分离**：代理合约固定地址，业务逻辑合约可升级。
- **数据存储管理**：数据存储在代理合约中，新变量追加定义，避免存储冲突。
- **初始化设计**：禁用 `constructor`，通过代理调用 `initialize`。
- **安全性保障**：访问控制、唯一标识符和防止自调用。

**参考文献**：
* **EIP-1822: Universal Upgradeable Proxy Standard (UUPS)**
  [https://eips.ethereum.org/EIPS/eip-1822](https://eips.ethereum.org/EIPS/eip-1822)
* **EIP-1967: Standard Proxy Storage Slots**
  [https://eips.ethereum.org/EIPS/eip-1967](https://eips.ethereum.org/EIPS/eip-1967)
* **OpenZeppelin 文档**
  [https://docs.openzeppelin.com/contracts/4.x/](https://docs.openzeppelin.com/contracts/4.x/)

