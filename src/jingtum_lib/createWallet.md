---
# title: remote
# editLink: true
checkCode: '代码示例'
outline: deep
---
# 创建钱包
首先引入jingtum-lib库的Wallet对象，然后使用以下两种方法创建钱包

- 方法1：Wallet.generate();
- 方法2：Wallet.fromSecret(secret);

参数:
| 参数 | 类型 | 说明 |
| :----| :---- | :---- |
| secret | String | 井通钱包私钥 |

返回结果说明:
| 参数 | 类型 | 说明 |
| :----| :---- | :---- |
| secret | String | 井通钱包私钥 |
| address | String | 井通钱包地址 |
::: details {{$frontmatter.checkCode}}

```js
const { Wallet } = require('jingtum-lib');

//方式一
const w1 = Wallet.generate();
console.log(w1.secret);

//方式二
const w2 = Wallet.fromSecret('ss2A7yahPhoduQjmG7z9BHu3uReDk');
console.log(w2);
```

:::
::: details 点我运行代码
<pre class="code no_drop" id="code_createWallet">
const { Wallet } = require('jingtum-lib');

//方式一
const w1 = Wallet.generate();
console.log(w1.secret);

//方式二
const w2 = Wallet.fromSecret('ss2A7yahPhoduQjmG7z9BHu3uReDk');
console.log(w2);
</pre>
<runCode tid="code_createWallet" />
:::
