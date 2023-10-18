# 创建钱包
首先引入jingtum-lib库的Wallet对象，然后使用以下两种方法创建钱包
- 方法1：Wallet.generate();
- 方法2：Wallet.fromSecret(secret);
::: details 点我查看代码
```js
var Wallet = jlib.Wallet;

//方式一
var w1 = Wallet.generate();
console.log(w1);

//方式二
var w2 = Wallet.fromSecret('ss2A7yahPhoduQjmG7z9BHu3uReDk');
console.log(w2);
```
:::