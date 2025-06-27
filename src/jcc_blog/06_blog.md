# Foundry - 区块链工匠与他的铸造工坊

![Foundry](/asset/06_blog_bg.png)

智能合约的开发工具日渐丰富和成熟。当下，一个名为Foundry的开发套件正悄然崛起，其运行效率与开发体验远超前辈，恰如一位精通古法的工匠重现江湖。不同于过去那些以甜点命名的轻软工具，Foundry基于Rust语言打造，沉稳而高效，其工具集的命名透露着浓厚的工匠气息，仿佛带我们回到了一个金属与火焰交织的时代。

**Foundry**，意为"铸造厂"，是智能合约的神圣诞生地。在这里，代码不再是冷冰冰的符号，而是等待塑形的炽热金属。每一个合约都经过精心设计，等待工匠赋予它灵魂与力量。

走进这座数字工坊，首先映入眼帘的是熊熊燃烧的**Forge**（锻造炉）。这是工匠打造合约的核心工具。日复一日，程序员们将原始的Solidity代码投入炉火，任凭测试的锤子反复敲打，去除漏洞的杂质，锤炼出坚不可摧的合约骨架。当代码在单元测试的锤击下发出清脆的"通过"声，恰如烧红的铁块在工匠手中发出满意的轻吟。-- 这是开发框架

炉火旁的工作台上，静静放置着**Cast**（铸模）。当锻造完毕，工匠需要验证作品的价值，便通过这精巧的铸模向区块链世界送出指令。Cast让繁复的链上交互变得如诗般优雅，无需繁文缛节，一行命令便可查询余额、调用函数或解码事件日志。程序员手持Cast，犹如魔法师挥舞法杖，能将区块链的神秘数据转化为可理解的人间语言。-- 这是合约交互工具

工坊一角，沉稳厚重的**Anvil**（铁砧）默默等候。它是本地区块链的化身，为工匠提供了一方试验天地。在这片小天地里，时间可以倒流，错误可以重来，gas可以无限。多少夜深人静，程序员在Anvil上反复调试复杂函数，不必担心耗尽真金白银。每一次部署，每一次交易，都是在为正式上链打下坚实基础。正如铁匠需要铁砧才能精准塑形，开发者需要Anvil才能打造出无懈可击的产品。-- 这是测试环境

当灵感突如其来，**Chisel**（凿子）则是捕捉思想的利器。这个交互式Solidity环境让程序员可以即时验证想法，无需繁琐的编译部署流程。一行代码，一个函数，立刻见证结果。它如同匠人手中的凿子，能够深入代码的每一个细节，精雕细琢，直至完美。多少次，一个算法的灵感在深夜降临，程序员急切地打开Chisel，将思路化为现实，以免稍纵即逝。-- 这是Debug工具

作为Fundry的作者，来自希腊雅典的[Georgios Konstantopoulos](https://x.com/gakonst)的设计哲学理念显然是工匠式的极简主义，实用主义，通过产品组件的命名强烈表达出了自己的意趣。

***好的工具应该像铁匠的锤子，使用者几乎感觉不到它的存在，全神贯注于作品本身***

## 1. 开发环境准备：工匠的工作台

### 一键安装与项目初始化

工匠的第一步是准备工具。Foundry 提供了简便的安装方式：

```bash
# 安装 Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# 创建新项目
forge init CCDAO_ERC721
cd CCDAO_ERC721
```

执行完毕后，一座数字铸造厂已在你的计算机中搭建完成。正如匠人需熟悉每一件工具，开发者也应了解这座工坊的布局。

### 项目结构说明

```
my_nft_project/
├── lib/             # 依赖库，如同工匠的材料架
├── src/             # 合约源代码，工匠的设计图
├── test/            # 测试文件，确保作品质量
├── script/          # 部署脚本，将作品展示于世
└── foundry.toml     # 配置文件，工匠的个人偏好
```

这种结构清晰划分了代码的不同职责，就像工匠将锤、钳、凿分门别类摆放一样。

### 基本命令介绍

Foundry 的三大核心工具，各司其职：

```bash
# Forge - 编译、测试、部署合约的主力工具
forge build    # 编译合约，如锻炉烧热金属
forge test     # 测试合约，如敲打检验强度
forge create   # 部署合约，如完成作品展示

# Cast - 与区块链交互的命令行工具
cast call      # 调用合约方法，如检验成品
cast send      # 发送交易，如使用作品
cast balance   # 查看账户余额，如清点资金

# Anvil - 本地以太坊节点
anvil          # 启动本地测试网，如搭建试验台
```

这些命令如同工匠手中的工具，各有特长，合力打造完美作品。

## 2. 第一个智能合约：锻造数字艺术品

### ERC721 合约开发

准备工作完成，开始锻造第一件作品——一个NFT合约：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CCDAO_ERC721 is ERC721, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    constructor() ERC721("Cross Chain DAO NFT", "CCDAO") Ownable(msg.sender) {}

    function mint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
```

首先，我们需要引入依赖库：

```bash
forge install OpenZeppelin/openzeppelin-contracts
```

这如同工匠从材料商那里获取优质钢材，我们从 OpenZeppelin 获取经过验证的合约组件。

### 合约编译与部署

编译我们的作品，确保没有缺陷：

```bash
forge build
```
第一次编译不会那么容易过的，清晰的报错指出项目在init时候产生的测试脚本Counter.t.sol和部署脚本Counter.s.sol中引用和定义的错误，我们可以先删除这些暂时用不上的代码，后面会逐步加回来。接下来，将作品展示于世（部署到本地测试网）：

```bash
# 启动本地测试网
anvil

# 新开终端，部署合约
forge create --rpc-url http://localhost:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  src/CCDAO_ERC721.sol:CCDAO_ERC721 --broadcast
```

这里使用的私钥是 Anvil 默认提供的第一个账户密钥（0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266），如同工匠的签名，为作品背书。

### 合约交互与验证

作品完成后，自然要验证其功能：

```bash
# 获取合约地址（替换为你的实际部署地址）
export CONTRACT=0x5FbDB2315678afecb367f032d93F642f64180aa3

# 铸造一个NFT
cast send $CONTRACT "mint(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

# 检查余额
cast call $CONTRACT "balanceOf(address)(uint256)" \
  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

这一系列操作如同工匠完成作品后的测试——挥舞剑刃，检验锋利度。

### 本地测试网络使用

Anvil 提供的本地环境可以让我们自由实验：

```bash
# 查看区块高度
cast block-number --rpc-url http://localhost:8545

# 模拟时间流逝
cast rpc anvil_increaseTime 86400 --rpc-url http://localhost:8545
```

在这个安全的试验场中，我们可以随意测试，不必担心消耗真实资源，如同工匠在制作真品前先做模型。

## 3. 单元测试基础：检验作品质量

### 测试文件组织

优秀的工匠会反复检验作品质量，开发者同样需要全面测试：

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {CCDAO_ERC721} from "../src/CCDAO_ERC721.sol";

contract CCDAO_ERC721Test is Test {
    CCDAO_ERC721 private erc721;

    address private owner = vm.addr(1);
    address private user = vm.addr(2);

    function setUp() public {
        vm.startPrank(owner);
        erc721 = new CCDAO_ERC721();
        vm.stopPrank();
    }

    //....往下具体的测试用例
}
```

这个框架如同工匠的检验台，准备对作品进行一系列测试。

### 基础测试用例编写

添加具体测试，检验合约各项功能：

```solidity
    function testName() public view {
        assertEq(erc721.name(), "Cross Chain DAO NFT");
    }

    function testMint() public {
        vm.startPrank(owner);
        erc721.mint(user);
        vm.stopPrank();

        assertEq(erc721.balanceOf(user), 1);
        assertEq(erc721.ownerOf(0), user);
    }

    function testMintByNonOwner() public {
        vm.startPrank(user);
        // 普通用户铸造失败
        vm.expectRevert();
        erc721.mint(user);
        vm.stopPrank();
    }
```

这些测试如同工匠对作品的各种考验：检查铭文、测试强度、验证防护。

### 常用断言方法

Foundry 提供了丰富的断言方法，如同工匠的各种测量工具：

```solidity
assertEq(a, b);      // 断言相等
assertNotEq(a, b);   // 断言不相等
assertTrue(x);       // 断言为真
assertFalse(x);      // 断言为假
assertGt(a, b);      // 断言大于
assertLt(a, b);      // 断言小于
assertApproxEqAbs(a, b, maxDelta); // 断言近似相等（绝对误差）
```

选择合适的断言，精确验证合约行为，确保万无一失。

### 测试运行与调试

执行测试，检验合约质量：

```bash
# 运行所有测试
forge test

# 运行特定测试并显示详细日志
forge test -vvv --match-test testMint

# 查看测试覆盖率
forge coverage
```

测试通过，如同作品经受住了各种考验，工匠可以自豪地宣布：这件作品，经得起时间的检验。

## 结语：工匠之路

Foundry 为智能合约开发带来了工匠般的体验——简洁、高效、可靠。从环境搭建到合约部署再到测试验证，每一步都体现了其精心设计。正如匠人需要不断精进技艺，开发者也应持续探索 Foundry 的更多功能，将区块链应用锻造得更加完美。

在这个数字锻造工坊中，你已经完成了第一件作品。接下来的旅程，将由你决定打造何种奇迹。

请记住，每一位真正的工匠，都始于模仿，终于创新。愿你在区块链的世界中，找到属于自己的锻造之道。

## 写在最后

感谢您阅读本文！如果这篇文章对您有所帮助，欢迎点赞、收藏和分享，这是对我创作的最大鼓励。

### 关于作者们

作者基本来自井畅公司的技术工程师和社区热心小伙伴，热衷于探索前沿技术并分享实践经验。通过系统化的学习和多年项目实践，井畅希望能帮助更多开发者快速掌握核心技能，少走弯路。

### 加入技术社区

🔹 **技术交流QQ群** : 568285439

🔹 **GitHub**：[jccdex](https://github.com/jccdex) - 关注获取示例代码和开源项目

🔹 **公众号**：[井畅] - 每周更新，分享行业动态与技术心得

### 下期预告

下一篇文章我将详细讲解《Foundry 高级测试与开发技巧》，敬请期待！

**有任何问题或建议，欢迎在评论区留言，我会尽快回复。**
