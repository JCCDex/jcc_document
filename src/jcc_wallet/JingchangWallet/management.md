---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 钱包管理

## getWalletWithType

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

## getWalletWithAddress

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

## getSecretWithType

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

## getSecretWithAddress

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

## changeWholePassword

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

## changePasswordWithAddress

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

## replaceKeystore

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

## removeWalletWithType

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

## removeWalletWithAddress

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

## setDefaultWallet

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

## importSecret

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