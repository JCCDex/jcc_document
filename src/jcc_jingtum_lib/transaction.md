---
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 如何使用

Transaction类

## 构造函数

```ts
constructor(chain: ISupportChain | ChainOption, nodes: string[], retry = 0)
```

## 账号

### 冻结账号 (管理员)

```ts
/**
 * add blackList
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} account to be frozen wallet address
 * @param {(string | IMemo[])} memo memo
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function addBlackList(address: string, secret: string, account: string, memo: string | IMemo[]): Promise<string>
```

### 解冻账号 (管理员)

```ts
/**
 * remove blackList
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} account to be frozen wallet address
 * @param {(string | IMemo[])} memo memo
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function removeBlackList(
  address: string,
  secret: string,
  account: string,
  memo: string | IMemo[]
): Promise<string>
```

### set brokerage (管理员)

```ts
/**
 * set brokerage
 *
 * @param {string} platformAccount platform wallet address
 * @param {string} platformSecret platform wallet secret
 * @param {string} feeAccount fee wallet address
 * @param {number} rateNum fee numerator
 * @param {number} rateDen fee denominator
 * @param {string} token token name of transfer
 * @param {string} [issuer] issuer address of token
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function setBrokerage(
  platformAccount: string,
  platformSecret: string,
  feeAccount: string,
  rateNum: number,
  rateDen: number,
  token: string,
  issuer?: string
): Promise<string>
```

### 设置ManageIssuer (管理员)

```ts
/**
 * set manage issuer
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} account new issuer wallet address
 * @param {(string | IMemo[])} memo memo
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function setManageIssuer(
  address: string,
  secret: string,
  account: string,
  memo: string | IMemo[]
): Promise<string>
```

## 交易

### 获取钱包地址的Sequence

```ts
static function fetchSequence(node: string, address: string): Promise<number>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_fetchSequence">
const { Transaction } = require('@jccdex/jingtum-lib')

let node = 'https://whskywelldrpc1.jccdex.cn:8443'
let address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const sequence = await Transaction.fetchSequence(node, address)

console.log('sequence: '+sequence)
</pre>

<runCode tid="code_fetchSequence" />
:::



### 获取对应Hash的交易信息

```ts
static function fetchTransaction(node: string, hash: string): Promise<any>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_fetchTransaction">
const { Transaction } = require('@jccdex/jingtum-lib')

let node = 'https://whskywelldrpc1.jccdex.cn:8443'
let hash = '8AF1E98FAC3DA554B810D8202E6BA4E737A0DC2AC215EEC56154FF28F7FCC11B'
const info = await Transaction.fetchTransaction(node, hash)

//完整信息请去浏览器控制台查看
console.log('info: '+info)
</pre>

<runCode tid="code_fetchTransaction" />
:::

### 查看账户历史交易

```ts
/**
 *
 * @static
 * @param {string} node
 * @param {string} account
 * @returns {Promise<any>}
 * @memberof Transaction
 */
static function requestAccountTx(node: string, account: string): Promise<any>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_requestAccountTx">
const { Transaction } = require('@jccdex/jingtum-lib')

let node = 'https://whskywelldrpc1.jccdex.cn:8443'
let account = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const accountTx = await Transaction.requestAccountTx(node, account)

console.log(accountTx)
</pre>

<runCode tid="code_requestAccountTx" />
:::

### 发送交易(blob)

```ts
static function sendRawTransaction(data: { blob: string; url: string }): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_sendRawTransaction">
const { Wallet, Transaction } = require('@jccdex/jingtum-lib')

const node = 'https://whskywelldrpc1.jccdex.cn:8443'
const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const tx = {
    Account: address,
    Amount: 1,
    Destination: 'jM8H9irLe7RnvT2BAkrcGE29Crz3hozDBS',
    Fee: 0.01,
    Flags: 0,
    Memos: '',
    TransactionType: "Payment"
  };
const sequence = await Transaction.fetchSequence(node, address)
// 序列化出的tx报文中必须包含交易账号的Sequence
tx.Sequence = sequence

const jtWallet = new Wallet('jingtum')
const signResult = jtWallet.sign(tx, 'snBymGgaecGM6ede5VBDeisiNNZy2')
const hash = await Transaction.sendRawTransaction({
  blob: signResult.blob,
  url: node
})

console.log(hash)
</pre>

<runCode tid="code_sendRawTransaction" />
:::

### 发送交易

```ts
public function submit(secret: string, tx: any): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_submit">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443']
const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const secret = 'snBymGgaecGM6ede5VBDeisiNNZy2'

const tx = {
    Account: address,
    Amount: 1,
    Destination: 'jM8H9irLe7RnvT2BAkrcGE29Crz3hozDBS',
    Fee: 0.01,
    Flags: 0,
    Memos: '',
    TransactionType: "Payment"
  };
const sequence = await Transaction.fetchSequence(nodes[0], address)
// 序列化出的tx报文中必须包含交易账号的Sequence
tx.Sequence = sequence

const jtTransaction = new Transaction('jingtum', nodes)

const hash = await jtTransaction.submit(secret, tx)

console.log(hash)
</pre>

<runCode tid="code_submit" />
:::

### tx是否经过验证

```ts
static function isValidated(tx): boolean
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_isValidated">
const { Transaction } = require('@jccdex/jingtum-lib')

const tx = {
    Account: 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM',
    Amount: 1,
    Destination: 'jM8H9irLe7RnvT2BAkrcGE29Crz3hozDBS',
    Fee: 0.01,
    Flags: 0,
    Memos: '',
    TransactionType: "Payment"
  };

const res = Transaction.isValidated(tx)
console.log(res)
</pre>

<runCode tid="code_isValidated" />
:::

### tx的结果是否成功

```ts
static function isSuccess(tx): boolean
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_isSuccess">
const { Transaction } = require('@jccdex/jingtum-lib')

const tx = {
    Account: 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM',
    Amount: 1,
    Destination: 'jM8H9irLe7RnvT2BAkrcGE29Crz3hozDBS',
    Fee: 0.01,
    Flags: 0,
    Memos: '',
    TransactionType: "Payment"
  };

const res = Transaction.isSuccess(tx)
console.log(res)
</pre>

<runCode tid="code_isSuccess" />
:::

### 获取节点

```ts
protected function getNode():string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getNode">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']

const jtTransaction = new Transaction('jingtum', nodes)
const node = jtTransaction.getNode()

console.log(node)
</pre>

<runCode tid="code_getNode" />
:::

### 设置节点

```ts
public function setNodes(nodes: string[]):void
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_setNodes">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']

const jtTransaction = new Transaction('jingtum', nodes)

let newNodes = ['https://whskywelldrpc3.jccdex.cn:8443']
jtTransaction.setNodes(newNodes)

const node = jtTransaction.getNode()

console.log(node)
</pre>

<runCode tid="code_setNodes" />
:::

## ERC20（Token）

### 创建委托

```ts
/**
 * create order
 *
 * @param {string} address address of your jingtum wallet
 * @param {string} secret secret of your jingtum wallet
 * @param {string} amount amount of order
 * @param {(string | IToken)} base token name, if the transaction pair is jjcc-swt, the value of base is "jjcc"
 * @param {(string | IToken)} counter token name, if the transaction pair is jjcc-swt, the value of counter is "swt"
 * @param {string} sum the value is the amount multiplied by price
 * @param {ExchangeType} type the value is "buy" or "sell"
 * @param {string} platform platform address
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function createOrder(
  address: string,
  secret: string,
  amount: string,
  base: string | IToken,
  counter: string | IToken,
  sum: string,
  type: ExchangeType,
  platform: string
): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_createOrder">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)

const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const secret = 'snBymGgaecGM6ede5VBDeisiNNZy2'
const amount = '1'
const base = 'swt'
const counter = {
  name: 'USDT',
  issuer: 'jaM1mqUh6fmtik5VGSB3CorJ85qRUSM34'
}
const sum = '2'
const type = 'sell'
const hash = await jtTransaction.createOrder(address, secret, amount, base, counter, sum, type, '')

console.log(hash)
</pre>

<runCode tid="code_createOrder" />
:::

### 取消委托

```ts
/**
 * cancel order
 *
 * @param {string} address address of your jingtum wallet
 * @param {string} secret secret of your jingtum wallet
 * @param {number} offerSequence sequence of order
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function cancelOrder(address: string, secret: string, offerSequence: number): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_cancelOrder">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)

const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const secret = 'snBymGgaecGM6ede5VBDeisiNNZy2'

const res = await fetch(`https://whskywelldscan.jccdex.cn:8443/wallet/offer/${new Date().getTime()}?p=0&s=10&w=${address}&bs=2`)
const { data } = await res.json()
const offerSequence = data.list[0].seq

const hash = await jtTransaction.cancelOrder(address, secret, offerSequence)

console.log(hash)
</pre>

<runCode tid="code_cancelOrder" />
:::

### Token转账

```ts
/**
 * transfer token
 *
 * @param {string} address address of your jingtum wallet
 * @param {string} secret secret of your jingtum wallet
 * @param {string} amount transfer amount
 * @param {(string | IMemo[])} memo transfer memo
 * @param {string} to destination address of jingtum wallet
 * @param {string} token token name of transfer
 * @param {string} [issuer] issuer address of token
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function transfer(
  address: string,
  secret: string,
  amount: string,
  memo: string | IMemo[],
  to: string,
  token: string,
  issuer?: string
): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_transfer">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)

const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const secret = 'snBymGgaecGM6ede5VBDeisiNNZy2'
const amount = '1'
const memo = '转一个swtc'
const to = 'jM8H9irLe7RnvT2BAkrcGE29Crz3hozDBS'
const token = 'swt'

const hash = await jtTransaction.transfer(address, secret, amount, memo, to, token)

console.log(hash)
</pre>

<runCode tid="code_transfer" />
:::

### 通证发行 (管理员)

```ts
/**
 * issueSet pre issue new token
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} amount the max amount with pre issue
 * @param {(string | IMemo[])} memo memo
 * @param {string} token token name
 * @param {string} issuer issuer address of token
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function issueSet(
  address: string,
  secret: string,
  amount: string,
  memo: string | IMemo[],
  token: string,
  issuer: string
): Promise<string>
```

## ERC721（NFT）

### 查看账户拥有的erc721 token

```ts
/**
 *
 * @static
 * @param {string} node
 * @param {string} account
 * @returns {Promise<any>}
 * @memberof Transaction
 */
static function requestAccountToken(node: string, account: string): Promise<any> 
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_requestAccountToken">
const { Transaction } = require('@jccdex/jingtum-lib')

let node = 'https://whskywelldrpc1.jccdex.cn:8443'
let account = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const accountToken = await Transaction.requestAccountToken(node, account)

console.log(accountToken)
</pre>

<runCode tid="code_requestAccountToken" />
:::

### 获取erc721 token详情

```ts
/**
 *
 * @static
 * @param {string} node
 * @param {string} tokenId erc721 id
 * @returns {Promise<any>}
 * @memberof Transaction
 */
static function requestTokenInfo(node: string, tokenId: string): Promise<any>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_requestTokenInfo">
const { Transaction } = require('@jccdex/jingtum-lib')

let node = 'https://whskywelldrpc1.jccdex.cn:8443'
let tokenId = '9F2D44338B7107092DECA4507ACD9C69F917C4756CB65A57EB19898042464F41'
const tokenInfo = await Transaction.requestTokenInfo(node, tokenId)

console.log(tokenInfo)
</pre>

<runCode tid="code_requestTokenInfo" />
:::

### NFT发行 (管理员)

```ts
/**
 * 设置NFT发行权限
 *
 * buildTokenIssueTx
 *
 * @param {string} account
 * @param {string} secret
 * @param {string} publisher
 * @param {number} amount
 * @param {string} token
 * @param {TokenFlag} flag
 * @returns
 * @memberof Transaction
 */
public function setTokenIssue(
  account: string,
  secret: string,
  publisher: string,
  amount: number,
  token: string,
  flag: TokenFlag
)
```

### 铸造NFT (NFT发行方)

```ts
/**
 * 铸造721
 *
 * @param {string} account
 * @param {string} secret
 * @param {string} receiver
 * @param {string} token
 * @param {string} tokenId
 * @param {TokenInfo[]} [tokenInfos]
 * @returns
 * @memberof Transaction
 */
public function publish721(
  account: string,
  secret: string,
  receiver: string,
  token: string,
  tokenId: string,
  tokenInfos?: TokenInfo[]
)
```

### 销毁NFT (NFT发行方)

```ts
/**
 * 销毁NFT
 *
 * @param {string} account
 * @param {string} secret
 * @param {string} tokenId
 * @returns
 * @memberof Transaction
 */
public function delete721(account: string, secret: string, tokenId: string)
```

### NFT转账

```ts
/**
 * ERC721转账
 *
 * @param {string} account
 * @param {string} secret
 * @param {string} receiver
 * @param {string} tokenId
 * @param {(string | IMemo[])} [memo]
 * @returns
 * @memberof Transaction
 */
public function transfer721(
  account: string,
  secret: string,
  receiver: string,
  tokenId: string,
  memo?: string | IMemo[]
)
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_transfer721">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)

const address = '多签账号'
const secret = '多钱账号密钥'
const receiver = '接收NFT地址'
const tokenId = 'NFT通证ID'

const hash = await jtTransaction.transfer721(address, secret, receiver, tokenId)

console.log(hash)
</pre>

<runCode tid="code_transfer721" />
:::

## 多签

### 设置多签账号

```ts
/**
 * enable/disable multi-sign account, signerQuorum is zero means disable
 *
 * @param {string} address multi-sign jingtum wallet
 * @param {string} secret secret of your jingtum wallet
 * @param {number} signerQuorum threshold of voting
 * @param {ISignerEntry[]} signerEntries list of signer account and weight
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function setSignerList(
  address: string,
  secret: string,
  signerQuorum: number,
  signerEntries?: ISignerEntry[]
): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_setSignerList">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)


const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const secret = 'snBymGgaecGM6ede5VBDeisiNNZy2'
const signerQuorum = 3
const signerEntries = [
  {
    Account: '成员账号1',
    SignerWeight: 1
  },
  {
    Account: '成员账号2',
    SignerWeight: 2
  },
  {
    Account: '成员账号3',
    SignerWeight: 3
  },
  ...
]

const hash = await jtTransaction.setSignerList(address, secret, signerQuorum, signerEntries)

console.log(hash)
</pre>

<runCode tid="code_setSignerList" />
:::

### 设置多签账号是否禁用密钥

```ts
public function setAccount(address: string, secret: string, disable: boolean): Promise<string>
```

**注:非多签账号不可禁用密钥，会导致账号被锁无法交易且无法恢复。**

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_setAccount">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)


const address = '多签账号'
const secret = '多钱账号密钥'
const disable = false

// true禁用密钥，false恢复密钥
const hash = await jtTransaction.setAccount(address, secret, disable)

console.log(hash)
</pre>

<runCode tid="code_setAccount" />
:::