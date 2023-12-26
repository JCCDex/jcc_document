---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 浏览器缓存

为避免用户每次使用都要重复导入`Keystore`文件，JingchangWallet提供了以下方法，通过浏览器的`localStorage`API来实现保存、获得、清空`Keystore`文件

## save

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

## get

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

## clear

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
