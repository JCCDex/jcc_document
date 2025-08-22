# CCDAO 钱包连接器

## 说明

CCDAO Connector 是一个用于连接多链钱包插件，支持 SWTC、XRP、TRON、EOS 和 EVM 兼容链。通过不同的接口与事件，开发者可以轻松地与各种区块链网络进行交互。

CCDAO Connector 支持同时与不同链保持连接，开发者可以基于此在同一个应用中同时与多个不同链同时进行交互。

CCDAO Connector 支持EIP6963协议，用户可以通过该协议使网站在不同的钱包插件之间进行切换。

目前 CCDAO 钱包连接器通过浏览器全局对象 `window.ccdao`和`window.ethereum` 提供

## 使用方法

在使用 CCDAO 钱包连接器之前，请确保用户已经安装了支持的 CCDAO 钱包插件。

## SWTC 链

### 连接钱包

若已经授权则直接连接当前钱包，否则跳转到授权页面

```js
const ethereum = window.ccdao;
if (ethereum) {
  // 获取已连接钱包地址
  const accounts = await ethereum.request({
    method: "swtc_requestAccounts",
    params: []
  });
  console.log("Connected accounts: ", accounts);
}
```

### 发送交易

```js
const tx = {
  Account: accounts[0],
  Fee: 0.00001,
  Amount: {
    currency: "JTPT",
    issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
    value: "0.0001"
  },
  Destination: "Your Destination Account",
  Flags: 0,
  Memos: [
    {
      Memo: {
        MemoData: "test"
      }
    }
  ],
  TransactionType: "Payment"
};

// 发送交易
const result = await ethereum.request({
  method: "swtc_sendTransaction",
  params: [tx]
});
console.log("Transaction result: ", result);
```

### 多重签名

```js
// tx: 需要签名的交易
// account: 已授权的多签账号
const result = await ethereum.request({
  method: "swtc_multiSign",
  params: [{ tx, account: "jNDwRetndumoqBT2UAuCLmFMx7XBQjYKvA" }]
});
console.log("Multisign result: ", result);
```

### 消息签名

```js
const result = await ethereum.request({
  method: "swtc_signMessage",
  params: ["Address", "Message"]
});
console.log("Sign message result: ", result);
```

### 获取公钥

```js
const result = await ethereum.request({
  method: "swtc_getPublicKey",
  params: ["Address"]
});
console.log("Public key: ", result);
```

### 监听账户变化

```js
ethereum.on("swtcAccountsChanged", (accounts) => {
  console.log("Changed accounts: ", accounts);
});
```

## EVM 链

### 连接钱包

若已经授权则直接连接当前钱包，否则跳转到授权页面

```js
const ethereum = window.ccdao;

if (ethereum) {
  // 获取已连接钱包地址
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
    params: []
  });
  console.log("Connected accounts: ", accounts);
}
```

### 获取当前连接的链ID

```js
const chainId = await ethereum.request({
  method: "eth_chainId",
  params: []
});
console.log("Chain ID: ", chainId);
```

### 切换网络

```js
const result = await ethereum.request({
  method: "wallet_switchEthereumChain",
  params: [{ chainId: "0x1" }] // 0x1 = 以太坊主网
});
console.log("Switch chain result: ", result);
```

### 获取账户ETH余额

```js
const balance = await ethereum.request({
  method: "eth_getBalance",
  params: [accounts[0], "latest"]
});
console.log("Account balance: ", balance);
```

### 发送交易

```js
const tx = {
  from: accounts[0],
  to: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  value: "0x2386f26fc10000", // 0.01 ETH (十六进制)
  gas: "0x5208", // 21000 gas
  gasPrice: "0x3b9aca00", // 1 Gwei
  nonce: nonce
};

// 签名交易
const signedTx = await ethereum.request({
  method: "eth_signTransaction",
  params: [tx]
});

// 发送已签名的交易
const txHash = await ethereum.request({
  method: "eth_sendRawTransaction",
  params: [signedTx]
});
console.log("Transaction hash: ", txHash);
```

### 签名消息

```js
const message = "Hello, CCDAO Wallet!";
const signature = await ethereum.request({
  method: "personal_sign",
  params: [message, accounts[0]]
});
console.log("Signature: ", signature);
```

### 验证签名

```js
const recoveredAddress = await ethereum.request({
  method: "personal_ecRecover",
  params: [message, signature]
});
console.log("Recovered address: ", recoveredAddress);
```

### 获取代币余额（ERC-20）

```js
const tokenContract = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI合约地址
const balanceOf = await ethereum.request({
  method: "eth_call",
  params: [{
    to: tokenContract,
    data: "0x70a08231" + "000000000000000000000000" + accounts[0].slice(2) // balanceOf(address)
  }, "latest"]
});
console.log("Token balance: ", balanceOf);
```

### 代币转账（ERC-20）

```js
const transferData = "0xa9059cbb" + // transfer(address,uint256)
  "000000000000000000000000" + "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6".slice(2) + // 接收地址
  "000000000000000000000000000000000000000000000000000000000000000001"; // 转账数量（1 token）

const tokenTx = {
  from: accounts[0],
  to: tokenContract,
  value: "0x0",
  data: transferData,
  gas: "0x186a0", // 100000 gas
  gasPrice: "0x3b9aca00" // 1 Gwei
};

const tokenTransferResult = await ethereum.request({
  method: "eth_sendTransaction",
  params: [tokenTx]
});
console.log("Token transfer result: ", tokenTransferResult);
```

### 监听事件

```js
// 监听账户变化
ethereum.on("accountsChanged", (accounts) => {
  console.log("EVM accounts changed: ", accounts);
});

// 监听链变化
ethereum.on("chainChanged", (chainId) => {
  console.log("EVM chain changed: ", chainId);
});

// 监听连接状态
ethereum.on("connect", (connectInfo) => {
  console.log("EVM connected: ", connectInfo);
});

// 监听断开连接
ethereum.on("disconnect", (error) => {
  console.log("EVM disconnected: ", error);
});
```

### 其他常用方法

```js
// 获取网络版本
const networkVersion = await ethereum.request({
  method: "net_version",
  params: []
});
console.log("Network version: ", networkVersion);

// 获取最新区块号
const blockNumber = await ethereum.request({
  method: "eth_blockNumber",
  params: []
});
console.log("Block number: ", blockNumber);

// 获取Gas价格
const gasPrice = await ethereum.request({
  method: "eth_gasPrice",
  params: []
});
console.log("Gas price: ", gasPrice);
```

## XRP 链

### 连接钱包

若已经授权则直接连接当前钱包，否则跳转到授权页面

```js
const { xrpToDrops } = require("xrpl");
const { stringToBytes, bytesToHex, remove0x } = require("@metamask/utils");
const ethereum = window.ccdao;

if (ethereum) {
  // 获取已连接钱包地址
  const accounts = await ethereum.request({
    method: "ripple_requestAccounts",
    params: []
  });
  console.log("Connected accounts: ", accounts);
}
```

### 发送交易

```js
// Amount: 需用xrpToDrops转换，只能到小数点后6位
// Memo: 需转成hex,没有0x前缀
const tx = {
  Account: accounts[0],
  Amount: xrpToDrops(1),
  Destination: "Your Destination Account",
  Memos: [
    {
      Memo: {
        MemoData: remove0x(bytesToHex(stringToBytes("memo")))
      }
    }
  ],
  TransactionType: "Payment"
};

// 发送交易
const result = await ethereum.request({
  method: "ripple_sendTransaction",
  params: [tx]
});
console.log("Transaction result: ", result);
```

## TRON 链

### 连接钱包

若已经授权则直接连接当前钱包，否则跳转到授权页面

```js
const ethereum = window.ccdao;
if (ethereum) {
  // 获取已连接钱包地址
  const accounts = await ethereum.request({
    method: "tron_requestAccounts",
    params: []
  });
  console.log("Connected accounts: ", accounts);
}
```

### 转账 TRX

```js
const tx = {
  transactionType: "SendTrx",
  from: "Your Address",
  to: "Receive Address",
  value: "Transfer Amount",
  data: "Memo"
};

// 发送交易
const result = await ethereum.request({
  method: "tron_sendTransaction",
  params: [tx]
});
console.log("Transaction result: ", result);
```

### 转账 TRC10

```js
const tx = {
  transactionType: "SendToken",
  from: "Your Address",
  to: "Receive Address",
  contract: "Token Address",
  value: "Transfer Amount",
  data: "Memo",
  // 可选项，默认30
  feeLimit: 30
};

// 发送交易
const result = await ethereum.request({
  method: "tron_sendTransaction",
  params: [tx]
});
console.log("Transaction result: ", result);
```

## EOS 链

### 连接钱包

若已经授权则直接连接当前钱包，否则跳转到授权页面

```js
const ethereum = window.ccdao;

if (ethereum) {
  // 获取已连接钱包地址
  const accounts = await ethereum.request({
    method: "eos_requestAccounts",
    params: []
  });
  console.log("Connected accounts: ", accounts);
}
```

### 转账

```js
const tx = {
  transactionType: "Transfer",
  from: "Your Address",
  to: "Receive Address",
  quantity: `${Amount} ${Symbol}`,
  code: "合约地址",
  memo: "Memo"
};

// 转账1 EOS
// quantity: "1.0000 EOS"
// code: "eosio.token"

// 转账1 USDT
// quantity: "1.0000 USDT"
// code: "tethertether"

// 发送交易
const result = await ethereum.request({
  method: "eos_sendTransaction",
  params: [tx]
});
console.log("Transaction result: ", result);
```