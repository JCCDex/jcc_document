---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 初始化钱包

jcc_wallet目前支持jingtum, moac, ethereum, stm, call以及bizain钱包的创建和校验

## 钱包对象

- `jtWallet`
- `bvcadtWallet`
- `rippleWallet`
- `stmWallet`
- `callWallet`
- `moacWallet`
- `ethWallet`

```js
const { jtWallet, bvcadtWallet, rippleWallet, stmWallet, callWallet, moacWallet ,ethWallet} = require('jcc_wallet')
```

## createWallet

创建对应链上的钱包

```ts
/**
 * create chain wallet
 *
 * @returns {IWalletModel}
 */
function createWallet(opt: ICreateOptionsModel = {}): IWalletModel | null
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_createWallet">
const { jtWallet, bvcadtWallet, rippleWallet, stmWallet, callWallet, moacWallet ,ethWallet} = require('jcc_wallet')

const jingtum = jtWallet.createWallet()
const bvc = bvcadtWallet.createWallet()
const ripple = rippleWallet.createWallet()
const stm = stmWallet.createWallet()
const call = callWallet.createWallet()
const eth = ethWallet.createWallet()
const moac = moacWallet.createWallet()

console.log(jingtum)
console.log(bvc)
console.log(ripple)
console.log(stm)
console.log(call)
console.log(moac)
console.log(eth)
</pre>

<runCode tid="code_createWallet" />

:::

## isValidAddress

校验钱包地址地址在该链上是否有效

```ts
/**
 * check chain address is valid or not
 *
 * @param {string} address
 * @returns {boolean} return true if valid
 */
function isValidAddress(address: string): boolean
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_validAddress">
const { jtWallet, ethWallet } = require('jcc_wallet')

const { address:jtAddress }  = jtWallet.createWallet()
const { address:ethAddress }  = ethWallet.createWallet()

const validJt = jtWallet.isValidAddress(jtAddress)
//校验Eth链地址在jingtum链上是否合法
const validEth = jtWallet.isValidAddress(ethAddress)

console.log(jtAddress)
console.log(ethAddress)
console.log(validJt)
console.log(validEth)
</pre>

<runCode tid="code_validAddress" />

:::

## isValidSecret

校验密钥在该链上是否有效

```ts
/**
 * check chain secret is valid or not
 *
 * @param {string} secret
 * @returns {boolean} return true if valid
 */
function isValidSecret(secret: string): boolean
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_validSecret">
const { jtWallet, ethWallet } = require('jcc_wallet')

const { secret:jtSecret }  = jtWallet.createWallet()
const { secret:ethSecret }  = ethWallet.createWallet()

const validJt = jtWallet.isValidSecret(jtSecret)
//校验Eth链密钥在jingtum链上是否合法
const validEth = jtWallet.isValidSecret(ethSecret)

console.log(jtSecret)
console.log(ethSecret)
console.log(validJt)
console.log(validEth)
</pre>

<runCode tid="code_validSecret" />

:::

## getAddress

通过密钥获得钱包地址

```ts
/**
 * get address with secret
 *
 * @param {string} secret
 * @returns {(string | null)} return address if valid, otherwise return null
 */
function getAddress(secret: string): string | null
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getAddress">
const { jtWallet } = require('jcc_wallet')

const { secret, address }  = jtWallet.createWallet()

const validAddress = jtWallet.getAddress(secret)

console.log(`address: ${address}`)
console.log(`secret: ${secret}`)
console.log(`getAddress: ${validAddress}`)
</pre>

<runCode tid="code_getAddress" />

:::

## decryptKeystore

**仅支持Ethereum KeyStore File**

```ts
/**
 * decrypt ethereum keystore file with ethereum password
 *
 * @param {string} password
 * @param {*} encryptData
 * @returns {string} return secret if success, otherwise throws `keystore is invalid` if the keystore is invalid or
 * throws `ethereum password is wrong` if the password is wrong
 */
const decryptKeystore = (password: string, encryptData: any): string
```