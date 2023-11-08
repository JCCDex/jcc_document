---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 如何使用

JingchangWallet类

## 构造函数

```ts
/**
 * Creates an instance of JingchangWallet.
 * @param {IJingchangWalletModel} wallet
 * @param {boolean} [multiple=false] if the value is true, support save multiple wallet keystore for each type, otherwise only support one.
 * @param {boolean} [samePassword=true] if the value is true, use the default swt keystore's password which be generated
 * in the beginning as password for other type.
 * @memberof JingchangWallet
 */
constructor(wallet: IJingchangWalletModel, multiple: boolean = false, samePassword: boolean = true)
```

## 生成Keystore

```ts
/**
 * create a jingchang wallet
 *
 * @static
 * @param {string} password password for keystore
 * @param {string} [secret] swtc chain's secret
 * @param {string} [alias] wallet name
 * @returns {Promise<IJingchangWalletModel>} resolve jingchang wallet if success.
 * @memberof JingchangWallet
 */
public static function generate(password: string, secret?: string, alias?: string): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_createKeystore">
const { JingchangWallet } = require('jcc_wallet')

const keystore = await JingchangWallet.generate('jingchangPassword')

console.log(keystore)
</pre>

<runCode tid="code_createKeystore" />
:::

## 校验Keystore

```ts
/**
 * check jingchang wallet is valid or not
 *
 * @static
 * @param {*} wallet
 * @returns {boolean} return true if valid.
 * @memberof JingchangWallet
 */
public static function isValid(wallet: any): boolean 
```

:::details {{$frontmatter.checkCode}}

**_注: 为方便测试，可直接全局使用[testKeyStore](/jcc_wallet/initJingchang.html#keystore模版),后续使用不再说明_**

<pre class="code no_drop" id="code_validKeystore">
const { JingchangWallet } = require('jcc_wallet')

const keystoreErr = {
  name:'jianchang',
  test: 'null'
}

const valid1 = JingchangWallet.isValid(testKeyStore)
const valid2 = JingchangWallet.isValid(keystoreErr)

console.log(valid1)
console.log(valid2)
</pre>

<runCode tid="code_validKeystore" />
:::

## 浏览器缓存

为避免用户每次使用都要重复导入`Keystore`文件，JingchangWallet提供了以下方法，通过浏览器的`localStorage`API来实现保存、获得、清空`Keystore`文件

### save

```ts
/**
 * save jingchang wallet to local storage.
 *
 * @static
 * @param {IJingchangWalletModel} wallet
 * @memberof JingchangWallet
 */
public static function save(wallet: IJingchangWalletModel): void
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_saveKeystore">
const { JingchangWallet } = require('jcc_wallet')

JingchangWallet.save(testKeyStore)
//请去 DevTools -> Appication -> Local Storage 中查看
</pre>

<runCode tid="code_saveKeystore" />
:::

### get

```ts
/**
 * get jingchang wallet from local storage
 *
 * @static
 * @returns {(IJingchangWalletModel | null)} return jingchang wallet or null
 * @memberof JingchangWallet
 */
public static function get(): IJingchangWalletModel | null
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getKeystore">
const { JingchangWallet } = require('jcc_wallet')

const keystore = JingchangWallet.get()

console.log(keystore)
</pre>

<runCode tid="code_getKeystore" />
:::

### clear

```ts
/**
 * clear jingchang wallet from local storage
 *
 * @static
 * @memberof JingchangWallet
 */
public static function clear(): void
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_clearKeystore">
const { JingchangWallet } = require('jcc_wallet')

JingchangWallet.save(testKeyStore)
let jcKeystore = JingchangWallet.get()
console.log(jcKeystore)

setTimeout(() => {
  JingchangWallet.clear()
  console.log('keystore clear!!!')
  jcKeystore = JingchangWallet.get()
  console.log(jcKeystore)
},1500)
</pre>

<runCode tid="code_clearKeystore" />
:::

## 钱包管理

### getWalletWithType

获取被管理钱包中符合`type`值的默认钱包

```ts
/**
 * get default wallet keystore with type
 *
 * @param {string} [type="swt"]
 * @returns {Promise<IKeystoreModel>} resolve default wallet keystore if success.
 * @memberof JingchangWallet
 */
public function getWalletWithType(type: string = "swt"): Promise<IKeystoreModel>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getWalletWithType">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const wallet = await jcWallet.getWalletWithType('swt')

console.log('wallet: '+ JSON.stringify(wallet))
</pre>

<runCode tid="code_getWalletWithType" />
:::

### getWalletWithAddress

获取被管理钱包中对应address的钱包

```ts
/**
 * get wallet keystore with address
 *
 * @param {string} address
 * @returns {Promise<IKeystoreModel>} resolve wallet keystore if success.
 * @memberof JingchangWallet
 */
public function getWalletWithAddress(address: string): Promise<IKeystoreModel>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getWalletWithAddress">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const address = 'jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH'
const wallet = await jcWallet.getWalletWithAddress(address)

console.log('wallet: '+ JSON.stringify(wallet))
</pre>

<runCode tid="code_getWalletWithAddress" />
:::

### getSecretWithType

获取被管理钱包中符合`type`值的默认钱包的密钥

```ts
/**
 * get the default wallet keystore's secret with type.
 *
 * @param {string} password
 * @param {string} [type="swt"]
 * @returns {Promise<string>}
 * @memberof JingchangWallet
 */
public function getSecretWithType(password: string, type: string = "swt"): Promise<string> 
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getSecretWithType">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const password = '1qaz2WSX'
const secret = await jcWallet.getSecretWithType(password, 'swt')

console.log('secret: '+ secret)
</pre>

<runCode tid="code_getSecretWithType" />
:::

### getSecretWithAddress

获取被管理钱包中对应address的钱包密钥

```ts
/**
 * get the wallet keystore's secret with address.
 *
 * @param {string} password
 * @param {string} address
 * @returns {Promise<string>}
 * @memberof JingchangWallet resolve secret if success.
 */
public function getSecretWithAddress(password: string, address: string): Promise<string>
```

:::details {{$frontmatter.checkCode}}

<pre class="code no_drop" id="code_getSecretWithAddress">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const password = '1qaz2WSX'
const address = 'jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH'
const secret = await jcWallet.getSecretWithAddress(password, address)

console.log('secret: '+ secret)
</pre>

<runCode tid="code_getSecretWithAddress" />
:::

### changeWholePassword

修改钱包交易密码，该方法只有当实例化`JingchangWallet`时，传入samePassword字段的值为true才能调用，否则会报错

```ts
/**
 * change the whole jingchang wallet password, if you set property of _samePassword is false, will throw an error
 *
 * @param {string} oldPassword
 * @param {string} newPassword
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
public function changeWholePassword(oldPassword: string, newPassword: string): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_changeWholePassword">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const password = '1qaz2WSX'
const newPassword = 'jingchang'
const newKeyStore = await jcWallet.changeWholePassword(password, newPassword)

console.log(newKeyStore)
</pre>

<runCode tid="code_changeWholePassword" />
:::

### changePasswordWithAddress

修改对应地址钱包的交易密码，该方法只有当实例化`JingchangWallet`时，传入samePassword字段的值为false才能调用，否则会报错

```ts
/**
 * change the keystore password with address, if you set the property of _samePassword is true, will throw an error
 *
 * @param {string} address
 * @param {string} oldPassword
 * @param {string} newPassword
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
public function changePasswordWithAddress(address: string, oldPassword: string, newPassword: string): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_changePasswordWithAddress">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore,false,false)

const password = '1qaz2WSX'
const newPassword = 'jingchang'
const newKeyStore = await jcWallet.changePasswordWithAddress('jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH',password, newPassword)

console.log(newKeyStore)
</pre>

<runCode tid="code_changePasswordWithAddress" />
:::

### replaceKeystore

当忘记当前钱包的交易密码时，可以重置密码

```ts
/**
 * replace keystore, if forget password
 *
 * @param {string} secret
 * @param {string} password
 * @param {(secret: string) => string} retriveSecret
 * @returns {Promise<IJingchangWalletModel>}
 * @memberof JingchangWallet
 */
public async replaceKeystore(secret: string, password: string, retriveSecret: (secret: string) => string): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_replaceKeystore">
const { JingchangWallet, jtWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const secret = 'snfXQMEVbbZng84CcfdKDASFRi4Hf'
const newPassword = 'jingchang'
const getAddress = jtWallet.getAddress

const newJcWallet = await jcWallet.replaceKeystore(secret, newPassword, getAddress)

console.log(newJcWallet)
</pre>

<runCode tid="code_replaceKeystore" />
:::

### removeWalletWithType

移除当前管理所有钱包中指定`type`的默认钱包

```ts
/**
 * remove default wallet keystore of the given type
 *
 * @param {string} [type="swt"]
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
public function removeWalletWithType(type: string = "swt"): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_removeWalletWithType">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const newJcWallet = await jcWallet.removeWalletWithType('swt')

console.log(newJcWallet)
</pre>

<runCode tid="code_removeWalletWithType" />
:::

### removeWalletWithAddress

移除当前管理所有钱包中对应`address`的钱包

**注：如果有多个相同address的钱包只删除第一个**

```ts
/**
 * remove wallet keystore of the given address
 *
 * @param {string} address
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
public function removeWalletWithAddress(address: string): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_removeWalletWithAddress">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const newJcWallet = await jcWallet.removeWalletWithAddress('jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH')

console.log(newJcWallet)
</pre>

<runCode tid="code_removeWalletWithAddress" />
:::

### setDefaultWallet

将对应`address`的钱包设置为默认钱包

```ts
/**
 * set defalut wallet keystore for each type
 *
 * @param {string} address
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
public function setDefaultWallet(address: string): Promise<IJingchangWalletModel>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_setDefaultWallet">
const { JingchangWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)

const newJcWallet = await jcWallet.setDefaultWallet('jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH')

console.log(newJcWallet)
</pre>

<runCode tid="code_setDefaultWallet" />
:::

### importSecret

通过密钥导入的方式，添加新的需要被管理的钱包

```ts
/**
 * import secret
 *
 * @param {string} secret
 * @param {string} password
 * @param {string} type
 * @param {(secret: string) => string} retriveSecret
 * @param {string} [alias] wallet name
 * @returns {Promise<IJingchangWalletModel>} resolve new jingchang wallet if success
 * @memberof JingchangWallet
 */
public function importSecret(
  secret: string,
  password: string,
  type: string,
  retriveSecret: (secret: string) => string,
  alias?: string
): Promise<IJingchangWalletModel> 
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_importSecret">
const { JingchangWallet, ethWallet } = require('jcc_wallet')

const jcWallet = new JingchangWallet(testKeyStore)
let secret = '0xfa298be412dc905013157e8c94b51836e6fff74f9c58abdb2d0899f91082b10a'
let password = '1qaz2WSX'
let type = 'eth'
let getAddress = ethWallet.getAddress
const newJcWallet = await jcWallet.importSecret(secret, password, type, getAddress)

console.log(newJcWallet)
</pre>

<runCode tid="code_importSecret" />
:::

## 工具函数

### getWallets

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

### getAddress

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

### deriveKeyPair

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

### encryptWithPublicKey

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

### decryptWithPrivateKey

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

### setJingchangWallet

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

### hasDefault

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

### findWallet

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

### getEncryptData

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

### saveWallet

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