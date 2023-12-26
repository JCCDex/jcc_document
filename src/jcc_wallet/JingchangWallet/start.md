# 开始

## 介绍

`JiangchangWallet`基于`Keystore`形式来导入和导出和管理钱包，设置钱包交易密码。`JiangchangWallet`支持添加和管理不同区块链上的多个钱包。支持为每个钱包设置不同交易密码。

## 什么是Keystore？

`Keystore`是区块链钱包存储私钥的一种`JSON`格式文件，它包含了一个加密的私钥，以及一些元数据，如地址、加密算法等，`Keystore` 文件通常是在本地生成并保存的，并在之后的操作中用于解锁账户、签署交易等。

注意事项：

1. `Keystore`由用户自定义加密密码，所以尽可能使用复杂的密码加密`Keystore`文件，并保证密码只有你自己知道；

2. 一定要记住加密`Keystore`的密码，一旦忘记密码，那么你就失去了`Keystore`文件的使用权，因为`JingchangWallet`无法帮你找回密码，所以一定要妥善保管好`Keystore`文件以及密码。

3. `Keystore`的密码是唯一、不可更改的。如果想更改钱包密码，那么需要使用助记词或明文私钥重新导入钱包，并使用新密码加密，生成新的`Keystore`文件。

## keystore模版


```js
// name: testKeyStore
// testPassword = "1qaz2WSX"
// testAddress = "jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH"
// testSecret = "snfXQMEVbbZng84CcfdKDASFRi4Hf"
{
  version: "1.0",
  id: "4085118690b6b24a58e8b9a2e26a15a31f2dfbd9e6280752a04af70e3a5389cc",
  contact: {},
  wallets: [
    {
      ciphertext: "29cdfe6d2b2b7bbcbfea5b6d5c165043cc84b086b65aba4386841e4484",
      mac: "2f23bf8bcb2253d79169a74594a186323fef94b0c42d4d071db119962528d7b6",
      crypto: {
        iv: "3086c27f1997601b3c43d34954dca2ed",
        cipher: "aes-128-ctr",
        kdf: "scrypt",
        kdfparams: {
          dklen: 32,
          salt: "555cd56e274acb61623c28be6ab72f421675d6480ca4a1b6aa8da765fcd79edb",
          n: 4096,
          r: 8,
          p: 1
        }
      },
      type: "swt",
      address: "jpgWGpfHz8GxqUjz5nb6ej8eZJQtiF6KhH",
      default: true,
      alias: "默认钱包"
    }
  ]
}
```

## 文件格式

```ts
// Keystore文件格式
const keystore: IJingchangWalletModel

interface IJingchangWalletModel {
  id?: string;
  version?: string;
  contact?: any;
  wallets?: Array<IKeystoreModel>;
}

interface IKeystoreModel {
  address?: string;
  alias?: string;
  ciphertext: string;
  default?: boolean;
  mac: string;
  type?: string;
  crypto: ICryptoModel;
}

interface ICryptoModel {
  cipher: string;
  iv: string;
  kdf: string;
  kdfparams: IKdfparamsModel;
}

interface IKdfparamsModel {
  dklen: number;
  n: number;
  p: number;
  r: number;
  salt: string;
}
```