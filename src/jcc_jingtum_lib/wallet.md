---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 如何使用

Wallet类

## 构造函数

```ts
constructor(chain: ISupportChain | ChainOption)
```

## 创建钱包

```ts
public function createWallet()
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_createWallet">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const newWallet = jtWallet.createWallet()

console.log(newWallet)
</pre>

<runCode tid="code_createWallet" />
:::

## 得到钱包地址

```ts
public function getAddress(secret: string): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getAddress">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const address = jtWallet.getAddress('snBymGgaecGM6ede5VBDeisiNNZy2')

console.log('钱包地址：'+address)
</pre>

<runCode tid="code_getAddress" />
:::

## 生成hash

```ts
public function generateHash256(msg: string | Uint8Array): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_generateHash256">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const hash = jtWallet.generateHash256('jingchang_jingtum_lib')

console.log('哈希：'+hash)
</pre>

<runCode tid="code_generateHash256" />
:::

## 校验地址

```ts
public isValidAddress(address: string): boolean
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_isValidAddress">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const isValid1 = jtWallet.isValidAddress('jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM')
const isValid2 = jtWallet.isValidAddress('jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqL')

console.log(isValid1)
console.log(isValid2)
</pre>

<runCode tid="code_isValidAddress" />
:::

## 校验密钥

```ts
public function isValidSecret(secret: string): boolean
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_isValidSecret">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const isValid1 = jtWallet.isValidSecret('snBymGgaecGM6ede5VBDeisiNNZy2')
const isValid2 = jtWallet.isValidSecret('snBymGgaecGM6ede5VBDeisiNNZy1')

console.log(isValid1)
console.log(isValid2)
</pre>

<runCode tid="code_isValidSecret" />
:::

## 获取Fee

```ts
public function getFee(): number
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getFee">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const fee = jtWallet.getFee()

console.log(fee)
</pre>

<runCode tid="code_getFee" />
:::

## 获取基础币

```ts
public function getCurrency(): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getCurrency">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const currency = jtWallet.getCurrency()

console.log(currency)
</pre>

<runCode tid="code_getCurrency" />
:::

## 获取发行方(issuer)

```ts
public function getIssuer(): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getIssuer">
const { Wallet } = require('@jccdex/jingtum-lib')

const jtWallet = new Wallet('jingtum')
const issuer = jtWallet.getIssuer()

console.log(issuer)
</pre>

<runCode tid="code_getIssuer" />
:::

## 签名(sign)

```ts
public function sign(tx: any, secret: string): SignResult
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_sign">
const { Wallet } = require('@jccdex/jingtum-lib')

const tx = {
    Account: 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM',
    Amount: 20,
    Destination: 'j9AMa38MeETCJYAPJqC8AbLj9o4VZub5rg',
    Fee: 0.01,
    Flags: 0,
    Memos: '',
    TransactionType: "Payment"
  };
const jtWallet = new Wallet('jingtum')
const signResult = jtWallet.sign(tx, 'snBymGgaecGM6ede5VBDeisiNNZy2')

console.log('Hash: '+signResult.hash)
console.log('blob: '+signResult.blob)
</pre>

<runCode tid="code_sign" />
:::

## 多签名(multiSign)

```ts
public function multiSign(tx: any, secret: string): any
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_multiSign">
const { Wallet } = require('@jccdex/jingtum-lib')

const tx = {
    Account: 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM',
    Amount: 20,
    Destination: 'j9AMa38MeETCJYAPJqC8AbLj9o4VZub5rg',
    Fee: 0.01,
    Flags: 0,
    Memos: '',
    TransactionType: "Payment"
  };
const jtWallet = new Wallet('jingtum')
const signResult = jtWallet.multiSign(tx, 'snBymGgaecGM6ede5VBDeisiNNZy2')

console.log(signResult)
</pre>

<runCode tid="code_multiSign" />
:::
