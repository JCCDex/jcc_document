# 入门

jcc_cloud

## 说明

jcc_cloud交易池服务是一个用于对交易所订单批量操作的聚合服务。此包是基于其服务的一层封装。

## 安装

::: code-group

```sh [npm]
npm install --save @jccdex/cloud
```

```sh [pnpm]
pnpm add @jccdex/cloud
```

```sh [yarn]
yarn add @jccdex/cloud
```

:::

## 类签名

```typescript
class JCCDexTxPool {
  constructor(baseUrl: string, keypair: AbstractKeyPair, customFetch?: unknown){}
}
```

## 使用

``` typescript
import { JCCDexTxPool } from "@jccdex/cloud"
import { Wallet } from "@jccdex/jingtum-lib";
const { sm3 } = require("sm3.js");
const jingtumWallet = new Wallet("jingtum");

class KeyPair extends AbstractKeyPair {
  public deriveAddress(publicKey: string): string {
    return jingtumWallet.wallet.KeyPair.deriveAddress(publicKey);
  }

  public deriveKeyPair(secret: string): { privateKey: string; publicKey: string } {
    return jingtumWallet.wallet.KeyPair.deriveKeyPair(secret);
  }

  public isValidSecret(secret: string): boolean {
    return jingtumWallet.isValidSecret(secret);
  }

  public signTx(data: unknown, privateKey: string): unknown {
    return jingtumWallet.sign(data, privateKey);
  }

  public sign(data: string, privateKey: string) {
    return jingtumWallet.wallet.KeyPair.sign(data, privateKey);
  }

  public isValidAddress(address: string): boolean {
    return jingtumWallet.isValidAddress(address);
  }

  public hash(message: string): string {
    return sm3().update(message).digest("hex");
  }
}

const txpool = new JCCDexTxPool("https://whcztranscache.jccdex.cn:8443", new KeyPair());
```
