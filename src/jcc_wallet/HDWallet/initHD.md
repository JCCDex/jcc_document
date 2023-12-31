---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 如何使用

HDWallet类

## 构造函数

```ts
/**
 * generate hd wallet
 *
 * @param {any} opt options of generate, like:
 *                  {
 *                    mnemonic: "world list", // optional
 *                    // see also:bip39 https://github.com/bitcoinjs/bip39/tree/master/ts_src/wordlists
 *                    // language attribute appears with mnemonic attribute
 *                    language: english default/chinese_simplified/...
 *                    secret: "secret string", // optional, default this coding rules of SWTC chain
 *                    keypair: {privateKey: "xxxx", publicKey: "xxxx"}
 *                  }
 *                  way of create hd wallet
 *                  1. {mnemonic: "xxx", language:"english"}
 *                  2. {secret: "xxxx"}
 *                  3. {keypair: {....}, path:{....}}
 * @returns {object} return hd wallet object
 */
constructor(opt: any)
```

## 生成助记词

```ts
/**
 * generate mnemonic
 *
 * @static
 * @param {number} len strength of random bytes, default 128
 * @param {string} language localized word list, default is english. see also https://github.com/bitcoinjs/BIP39
 * @returns {string} return mnemonic string, spilt by blank
 */
public static function generateMnemonic(len: number = 128, language: string = "english"): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_generateMnemonic">
const { HDWallet} = require('jcc_wallet').hdWallet

const mnemonic = HDWallet.generateMnemonic()

console.log(mnemonic)
</pre>

<runCode tid="code_generateMnemonic" />
:::

## 从助记词得到密钥

<img src="../../asset/secret.png" alt="secret" style="zoom:33%;">

```ts
/**
 * get secret from mnemonic, obey encode rule base58 for jingtum
 *
 * @static
 * @param {string} mnemonic mnemonic words
 * @param {string} language localized word list, default is english. see also https://github.com/bitcoinjs/BIP39
 * @returns {string} return secret string
 */
public static function getSecretFromMnemonic(mnemonic: string, language: string = "english"): string

```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getSecretFromMnemonic">
const { HDWallet} = require('jcc_wallet').hdWallet

const testMnemonic = "soccer want seat goddess phone awake peasant high correct robot believe door"
const testSecret = HDWallet.getSecretFromMnemonic(testMnemonic)

console.log(testSecret)
</pre>

<runCode tid="code_getSecretFromMnemonic" />
:::

## 从密钥得到助记词

```ts
/**
 * get mnemonic from secret, obey encode rule base58 for jingtum
 *
 * @static
 * @param {string} secret secret string
 * @param {string} language localized word list, default is english. see also https://github.com/bitcoinjs/BIP39
 * @returns {string} return mnemonic word list
 */
public static function getMnemonicFromSecret(secret: string, language: string = "english"): string 
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getMnemonicFromSecret">
const { HDWallet} = require('jcc_wallet').hdWallet

const testSecret = "snZeokZMVSEynpKCt7Zvk5pkFZAHt"
const testMnemonic = HDWallet.getMnemonicFromSecret(testSecret)

console.log(testMnemonic)
</pre>

<runCode tid="code_getMnemonicFromSecret" />
:::

## 密钥派生出密钥对

```ts
/**
 * get keypair from secret
 *
 * @static
 * @param {string} secret secret string
 * @returns {object} return keypair object
 */
public static function getKeypairFromSecret(secret: string): any
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getKeypairFromSecret">
const { HDWallet} = require('jcc_wallet').hdWallet

const testSecret = "snZeokZMVSEynpKCt7Zvk5pkFZAHt"
const keyPair = HDWallet.getKeypairFromSecret(testSecret)

console.log('私钥：'+keyPair.privateKey)
console.log('公钥：'+keyPair.publicKey)
</pre>

<runCode tid="code_getKeypairFromSecret" />
:::

## 派生HD密钥对

```ts
/**
 * get hd wallet key pair
 *
 * @static
 * @param {string} rootSecret root secret
 * @param {number} chain chain index number
 * @param {number} account bip44 account index for purpose
 * @param {number} index bip44 last level index
 * @returns {IKeyPair} return keypair object
 */
public static function getHDKeypair(rootSecret: string, chain: number, account: number = 0, index: number): IKeyPair
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getHDKeypair">
const { HDWallet} = require('jcc_wallet').hdWallet

const rootSecret = "snZeokZMVSEynpKCt7Zvk5pkFZAHt"
const chain = 0x8000003c  //ETH
const account = 0
const index = 0
const keyPair = HDWallet.getHDKeypair(rootSecret, chain, account, index)

console.log('私钥：'+keyPair.privateKey)
console.log('公钥：'+keyPair.publicKey)
</pre>

<runCode tid="code_getHDKeypair" />
:::

## 创建HD钱包对象实例

```ts
/**
 * generate hd wallet
 *
 * @static
 * @param {any} opt options of generate, like:
 *                  {
 *                    len: 128/160/192/224/256, default is 128, determines number of mnemonic word
 *                    language: english default/chinese_simplified/chinese_traditional/czech/korean/french/japanese/... see also:bip39 https://github.com/bitcoinjs/bip39/tree/master/ts_src/wordlists
 *                  }
 * @returns {object} return hd wallet object
 */
public static function generate(opt: any): HDWallet
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_generate">
const { HDWallet} = require('jcc_wallet').hdWallet

const hdWallet = HDWallet.generate() //default

console.log(hdWallet)
</pre>

<runCode tid="code_generate" />
:::

## 通过根密钥创建HD钱包对象实例

```ts
/**
 * create hd wallet from secret
 *
 * @static
 * @param {string} secret secret string
 * @returns {object} return hd wallet object
 */
public static function fromSecret(secret: string): HDWallet
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_fromSecret">
const { HDWallet} = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)

console.log(hdWallet)
</pre>

<runCode tid="code_fromSecret" />
:::

## 通过助记词创建HD钱包对象实例

```ts
/**
 * create hd wallet from mnemonic
 *
 * @static
 * @param {IMnemonic} mnemonic object like
 *                    {mnemonic: "abc abc ...", language: "english"}
 * @returns {object} return hd wallet object
 */
public static function fromMnemonic(mnemonic: IMnemonic): HDWallet
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_fromMnemonic">
const { HDWallet} = require('jcc_wallet').hdWallet

const mnemonic = {
  mnemonic: 'soccer want seat goddess phone awake peasant high correct robot believe door',
  language: 'english'
}
const hdWallet = HDWallet.fromMnemonic(mnemonic)

console.log(hdWallet)
</pre>

<runCode tid="code_fromMnemonic" />
:::

## 通过密钥对创建HD钱包对象实例

一般只在签名时才会使用这种实例化方式

```ts
 /**
 * create hd wallet from keypair,wallet create by keypair, which only for sign message and tx
 *
 * @static
 * @param {IKeyPair} keypair object like
 *                    {publicKey: "public key...", privateKey: "private key..."}
 * @returns {object} return hd wallet object
 */
public static function fromKeypair(keypair: IKeyPair): HDWallet
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_fromKeypair">
const { HDWallet} = require('jcc_wallet').hdWallet

const keypair = {
  privateKey: '004AB9C9788B717CC3BBFD04879CB91F15278B1D6553192D4B58FAE6C69160196F',
  publickKey: '03CB56B9DE889AE9FFC105CD3FF44B473F81EFE304F03088F5FE717A87E5FEF162'
}
const hdWallet = HDWallet.fromKeypair(keypair)

console.log(hdWallet)
</pre>

<runCode tid="code_fromKeypair" />
:::