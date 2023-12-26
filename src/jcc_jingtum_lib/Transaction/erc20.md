---
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# ERC20（Token）

## 创建委托

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

## 取消委托

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

## Token转账

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

## 通证发行 (管理员)

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
