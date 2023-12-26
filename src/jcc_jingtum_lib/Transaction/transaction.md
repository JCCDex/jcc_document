---
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 交易相关

## 获取钱包地址的Sequence

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



## 获取对应Hash的交易信息

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

## 查看账户历史交易

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

## 发送交易(blob)

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

## 发送交易

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

## tx是否经过验证

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

## tx的结果是否成功

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

## 获取节点

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

## 设置节点

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
