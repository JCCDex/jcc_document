---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 工具函数

## getWallets

获取`keystore`文件中的`wallets`，即获取所有被JingcahngWallet管理的钱包

```ts
/**
 * get wallets from jingchang wallet
 *
 * @static
 * @param {IJingchangWalletModel} jcWallet
 * @returns {Array<IKeystoreModel>} return wallets if valid, otherwise return empty array.
 * @memberof JingchangWallet
 */
public static function getWallets(keystore: IJingchangWalletModel): Array<IKeystoreModel>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getWallets">
const { JingchangWallet } = require('jcc_wallet')

const wallets = JingchangWallet.getWallets(testKeyStore)

console.log('wallets: '+ JSON.stringify(wallets))
</pre>

<runCode tid="code_getWallets" />
:::

## getAddress

获取当前所有被管理钱包中符合`type`值的默认钱包的地址

```ts
/**
 * get default wallet's keystore address for each type
 *
 * @param {string} [type="swt"]
 * @returns {Promise<string>} resolve address if success
 * @memberof JingchangWallet
 */
public function getAddress(type: string = "swt"): Promise<string>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getAddress">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const address = await jcWallet.getAddress('swt')

console.log('address: '+ address)
</pre>

<runCode tid="code_getAddress" />
:::

## deriveKeyPair

此方法将通过密钥派生出密钥对(`keypair`)，即公钥(`publicKey`)和私钥(`privateKey`)的集合

```ts
/**
 * derive key pair with secret
 *
 * @static
 * @param {string} secret
 * @param {Chain} [chain="SWT"]
 * @returns {IKeyPair} 
 * @memberof JingchangWallet
 */
public static function deriveKeyPair(secret: string, chain: Chain = "SWT"): IKeyPair

type Chain = "BTC"|"XRP"|"XLM"|"CALL"|"STM"|"SWT"|"BWT"|"BVC"|"SEAA"
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_deriveKeyPair">
const { JingchangWallet, jtWallet } = require('jcc_wallet')


const secret = 'snfXQMEVbbZng84CcfdKDASFRi4Hf'
const keypair = JingchangWallet.deriveKeyPair(secret,'SWT')

console.log('secret: '+secret)
console.log('privateKey: '+keypair.privateKey)
console.log('publicKey: '+keypair.publicKey)
</pre>

<runCode tid="code_deriveKeyPair" />
:::

## encryptWithPublicKey

通过公钥加密信息

```ts
/**
 * encrypt data with public key
 *
 * @static
 * @param {string} message
 * @param {string} publicKey
 * @returns {Promise<IEncrypt>}
 * @memberof JingchangWallet
 */
public static function encryptWithPublicKey(message: string, publicKey: string): Promise<IEncrypt>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_encryptWithPublicKey">
const { JingchangWallet } = require('jcc_wallet')

const secret = "snfXQMEVbbZng84CcfdKDASFRi4Hf"
const { privateKey, publicKey } = JingchangWallet.deriveKeyPair(secret,'SWT')
const encryptData = await JingchangWallet.encryptWithPublicKey('Jingchang do best to world', publicKey)

console.log('iv: '+encryptData.iv)
console.log('ephemPublicKey: '+encryptData.ephemPublicKey)
console.log('ciphertext: '+encryptData.ciphertext)
console.log('mac: '+encryptData.mac)
</pre>

<runCode tid="code_encryptWithPublicKey" />
:::

## decryptWithPrivateKey

通过私钥解密信息

```ts
/**
 * decrypt data with private key
 *
 * @static
 * @param {IEncrypt} message
 * @param {string} privateKey the privateKey's length should be 64
 * @returns {Promise<string>}
 * @memberof JingchangWallet
 */
public static function decryptWithPrivateKey(message: IEncrypt, privateKey: string): Promise<string>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_decryptWithPrivateKey">
const { JingchangWallet } = require('jcc_wallet')

const secret = "snfXQMEVbbZng84CcfdKDASFRi4Hf"
const { privateKey, publicKey } = JingchangWallet.deriveKeyPair(secret,'SWT')

const encryptData = await JingchangWallet.encryptWithPublicKey('Jingchang do best to world', publicKey)
const message = await JingchangWallet.decryptWithPrivateKey(encryptData, privateKey)

console.log(encryptData)
console.log('message: '+ message)
</pre>

<runCode tid="code_decryptWithPrivateKey" />
:::

## setJingchangWallet

设置当前jingchangWallet类中的私有属性_jingchangWallet

```ts
/**
 * set property of _jingchangWallet
 *
 * @param {IJingchangWalletModel} wallet
 * @memberof JingchangWallet
 */
public function setJingchangWallet(wallet: IJingchangWalletModel): void
```

## hasDefault

检查在当前所有被管理的钱包中，对应`type`是否有默认钱包

```ts
/**
 * check if has default wallet for each type
 *
 * @param {string} [type="swt"]
 * @returns {boolean} return true if has default
 * @memberof JingchangWallet
 */
public function hasDefault(type: string = "swt"): boolean
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_hasDefault">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)
const isHasDefault = jcWallet.hasDefault('swt')

console.log('isHasDefault: '+ isHasDefault)
</pre>

<runCode tid="code_hasDefault" />
:::

## findWallet

```ts
/**
 * find wallet keystore according to filter function
 *
 * @protected
 * @param {(wallet: IKeystoreModel) => boolean} filter
 * @returns {IKeystoreModel} return wallet keystore if existent, otherwise throw `keystore is invalid` if the jingchang wallet is invalid
 * or throw `wallet is empty` if the wallet isn't existent
 * @memberof JingchangWallet
 */
protected findWallet(filter: (wallet: IKeystoreModel) => boolean): IKeystoreModel
```

## getEncryptData

```ts
/**
 * encrypt data
 *
 * @protected
 * @param {string} password
 * @param {IKeypairsModel} keypairs
 * @returns {IKeystoreModel}
 * @memberof JingchangWallet
 */
protected getEncryptData(password: string, keypairs: IKeypairsModel): IKeystoreModel
```

## saveWallet

```ts
/**
 * save wallet keystore to jingchang wallet
 *
 * @private
 * @param {string} password
 * @param {IKeypairsModel} keypairs
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
private saveWallet(password: string, keypairs: IKeypairsModel): Promise<IJingchangWalletModel>
```