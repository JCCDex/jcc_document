
## 一切开始于签名

对于区块链来说，一切开始于签名。所有账本细节的真伪高度依赖于密码学的签名技术。不过本文不是要讨论区块链底层共识算法，我们要聊的是前端用户和区块链交互时需要的签名——签名之后的内容即将离开用户的手，通往网络的汪洋大海。

截止到2025年7月，翻遍所有的EIP提案，和签名有关的提案竟然有19个！（详细列表附后）这其中真正通过的只有7个，其他的要么像EIP-86过于狂野（哪怕是小V提案的也被无情枪毙，被迫后来拆分成好几个独立提案），要么就是无人问津，孤独地躺在提案库里。

让我们顺着时间线，像侦探一样挨个重新认识这些和签名有关的提案吧！

## EIP-191：签名世界的"交通规则"

### 混乱的史前时代

一开始，签名世界简直是"野蛮生长"，看这个令人头大的代码示例：

```solidity
// 没有标准化前的问题
bytes32 hash1 = keccak256("Hello World");           // 普通数据
bytes32 hash2 = keccak256(abi.encode(txData));      // 交易数据
bytes32 hash3 = keccak256(abi.encode(structData));  // 结构化数据
```

面对上面3个不同类型的签名场景，很有可能签名hash相同！这会导致非常严重的安全问题：
- 降低了hash碰撞的难度（就像生日悖论一样）
- 为重放攻击提供了绝佳工具
- 因为没啥规矩，大家自由放飞，混乱程度堪比没有红绿灯的十字路口

所以，这个得约束一下！

### EIP-191：秩序的建立者

```solidity
// EIP-191 标准格式：终于有规矩了！
bytes memory encoded = abi.encodePacked(
    "\x19",           // 固定前缀（像身份证开头的数字）
    version,          // 版本字节（告诉你这是哪种签名）
    versionSpecificData // 版本特定数据（具体内容）
);
```

EIP-191就像给签名世界制定了"交通规则"：
- `0x19`前缀固定（就像所有车都要有车牌）
- 版本字节决定后续数据格式（不同类型的车有不同规则）
- 目前有3种version：0x00、0x01和个人签名

### 版本0x00：多签合约的好帮手

```solidity
// 格式: 0x19 0x00 <intended validator> <data to sign>
bytes memory encoded = abi.encodePacked(
    "\x19\x00",
    validator,  // 20字节验证器地址
    data        // 要签名的数据
);
```

这个有啥用呢？设想一下：有一个合约管理了一大笔资金，现在多个持有人需要通过投票来决定资金转移。对，这就是个多签合约！因为合约本身没有私钥（它不是人，没法签名），所以要通过验证多签成员的签名来判断指令真伪。

```javascript
// 用户A的操作（像写支票一样）
const encoded = abi.encodePacked(
    "\x19\x00",
    0xddddd,  // 多签合约地址
    {fromAddress, toAddress, USDTAddress, amount, nonce} // 转账指令
);
const hash = ethers.utils.keccak256(encoded);
const signature = signer.signMessage(ethers.utils.arrayify(hash));
```

```solidity
// 多签合约的操作（像银行验证支票一样）
// EIP-191 版本 0x00 编码
bytes32 hash = keccak256(abi.encodePacked(
    "\x19\x00",
    address(this),  // 验证器地址（当前合约）
    abi.encode(from, to, erc20, value, nonce)
));
        
address signer = recoverSigner(hash, signature);
require(signer == owner, "Invalid signature");
// 验签通过，钱可以转了！
```

### 版本0x01：EIP-712的专属通道

这个版本主要是为EIP-712结构化数据服务的，我们后面详细介绍时会展开讲。

### 个人签名：证明"我就是我"

```solidity
// 格式: 0x19 "Ethereum Signed Message:\n" <length> <data>
string memory prefix = "\x19Ethereum Signed Message:\n";
bytes memory encoded = abi.encodePacked(
    prefix,
    toString(data.length),
    data
);
```

个人签名中的"Ethereum Signed Message:"是强制规定的（像身份证上的"中华人民共和国"一样不能改）。实际操作中，不同链和应用可能有变种，这种签名通常见于：
- DApp的登录确认（"证明你就是钱包的主人"）
- 法律文件签名存档
- 纯粹的身份验证（不涉及链上操作）

## 和签名有关的EIP全家福

通过对以太坊EIP仓库的"地毯式搜索"，我们发现了19个与签名相关的EIP。以下是这个大家族的详细成员名单：

| **EIP编号** | **标题** | **状态** | **主要功能** |
|-------------|----------|----------|-------------|
| EIP-86 | Abstraction of transaction origin and signature | Stagnant | 交易起源和签名抽象化（太激进被拆分） |
| EIP-191 | Signed Data Standard | Final | 数据签名标准格式（本文主角） |
| EIP-665 | Add precompiled contract for Ed25519 signature verification | Stagnant | Ed25519签名验证预编译合约 |
| EIP-712 | Typed structured data hashing and signing | Final | 结构化数据哈希和签名（下期主角） |
| EIP-1271 | Standard Signature Validation Method for Contracts | Final | 智能合约签名验证标准方法 |
| EIP-2098 | Compact Signature Representation | Final | 紧凑签名表示法（省空间神器） |
| EIP-5267 | Retrieval of EIP-712 domain | Final | EIP-712域检索机制改进 |
| EIP-5719 | Signature replacement interface | Stagnant | 签名替换接口（修正签名用） |
| EIP-6066 | Signature Validation Method for NFTs | Final | NFT签名验证方法 |
| EIP-6327 | Elastic Signature | Draft | 弹性签名方案（动态调整） |
| EIP-6384 | Human-readable offline signatures | Stagnant | 人类可读的离线签名 |
| EIP-6492 | Signature Validation for Predeploy Contracts | Final | 预部署合约签名验证 |
| EIP-7597 | Signature Validation Extension for Permit | Draft | Permit功能签名验证扩展 |
| EIP-7598 | Use contract signature for signed transfer | Draft | 合约签名转账 |
| EIP-7730 | Structured Data Clear Signing Format | Draft | 结构化数据清晰签名格式 |
| EIP-7739 | Readable Typed Signatures for Smart Accounts | Draft | 智能账户可读签名 |
| EIP-7766 | Signature Aggregation for ERC-4337 | Draft | ERC-4337签名聚合 |
| EIP-7913 | Signature Verifiers | Review | 标准化签名验证器 |
| EIP-7920 | Composite EIP-712 Signatures | Draft | 组合EIP-712签名 |

**有趣发现**：
- Final状态的只有7个（通过率约37%）
- 大部分都还在Draft/Review阶段（说明签名领域还在快速发展）
- 很多都是基于EIP-712的扩展（说明712真的很成功）

## 写在最后

EIP-191虽然看起来简单，但它就像交通规则一样，为整个以太坊签名生态奠定了基础。没有它，就没有后来的EIP-712，也没有现在我们享受的各种便捷签名功能。

感谢您阅读本文！如果这篇"签名考古"之旅对您有所帮助，欢迎点赞、收藏和分享。毕竟，好的技术文章就像好酒，需要和朋友一起分享才有意思！

### 关于作者们

作者基本来自井畅公司的技术工程师和社区热心小伙伴，热衷于探索前沿技术并分享实践经验。通过系统化的学习和多年项目实践，井畅希望能帮助更多开发者快速掌握核心技能，少走弯路。

### 加入技术社区

🔹 **技术交流QQ群** : 568285439
🔹 **GitHub**：[jccdex](https://github.com/jccdex) - 关注获取示例代码和开源项目
🔹 **公众号**：[井畅] - 每周更新，分享行业动态与技术心得

### 下期预告


**有任何问题或建议，欢迎在评论区留言，我会尽快回复。**

### 关于我们这群"代码考古学家"

我们基本来自井畅公司的技术工程师和社区热心小伙伴，平时就喜欢挖掘这些技术背后的故事。通过系统化学习和多年项目实践，我们希望能帮助更多开发者快速掌握核心技能，少走弯路（毕竟踩坑不好玩）。

### 加入我们的"考古队"

🔹 **技术交流QQ群**：568285439（欢迎来聊技术，也欢迎来吐槽）  
🔹 **GitHub**：[jccdex](https://github.com/jccdex) - 代码示例和开源项目都在这里  
🔹 **公众号**：[井畅] - 每周更新，技术干货+行业八卦  

### 下期预告：EIP-712的"结构化革命"

下一篇我们要聊EIP-712：结构化数据哈希和签名。这个标准解决了什么问题？为什么钱包能够显示"你正在向张三转账100个USDT"而不是一堆看不懂的hash？EIP-712如何让签名变得"人类友好"？这么友好的表示，能不能阻止黑客的欺诈？

敬请期待这场"结构化革命"的故事！

**有任何问题或建议，欢迎在评论区留言。我们承诺：技术问题必回复，吐槽也欢迎！**

