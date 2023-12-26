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

**_注: 为方便测试，可直接全局使用[testKeyStore](/jcc_wallet/JingchangWallet/start.html#keystore模版),后续使用不再说明_**

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
