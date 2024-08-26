# 入门

jcc_cloud

## 说明

jcc_cloud浏览器服务是基于[SWTC浏览器](https://swtcscan.jccdex.cn/)原生接口的封装

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
class JCCDexExplorer {
  constructor(baseUrl: string, customFetch?: unknown) {}
}
```

## 使用

::: code-group

``` javascript [ES Mdoule]
import { JCCDexExplorer } from "@jccdex/cloud"
const explorer = new JCCDexExplorer('https://swtcscan.jccdex.cn')
explorer.fetchBalances({
  uuid: new Date().getTime()
  address: "jQDd...rwmy"
})
```

```javascript [Commonjs]
const { JCCDexExplorer } = require("@jccdex/cloud")
const explorer = new JCCDexExplorer('https://swtcscan.jccdex.cn')
explorer.fetchBalances({
  uuid: new Date().getTime()
  address: "jQDd...rwmy"
})
```

:::
