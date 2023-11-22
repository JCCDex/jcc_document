# SWTC链开发包的历史演变

SWTC链作为联盟链，无锡井通公司开发了商业开发包 jingtum_lib(TODO: 文档内部链接)，为商业应用提供了高级调用方式和底层RPC操作的说明。

来自加拿大的程序员 [xcliu-ca](https://github.com/xcliu-ca)为SWTC开源社区贡献了[swtclib](https://github.com/swtcca/swtclib), 主要改进在于使用了更现代的TS语法范式，提升了代码的鲁棒性和互操作的扩展性，增加了国密加密算法支持以及同构联盟链的支持。

井畅在自身的商业服务中，逐步提炼开发了jcc_wallet和jcc_jingtum_lib开发包，均是基于swtclib开发包二次开发，jingtum_lib更多被作为和节点交互RPC报文的分析依据使用。

# 入门

jcc_jingtum_lib

## 说明
`@jccdex/jingtum-lib`使用`https`接口完成与节点的交互，不依赖于`websocket`。所有接口月方法的调用都基于`Promise`。

## 安装

::: code-group

```sh [npm]
$ npm install --save @jccdex/jingtum-lib
```

```sh [pnpm]
$ pnpm add @jccdex/jingtum-lib
```

```sh [yarn]
$ yarn add @jccdex/jingtum-lib

```

:::

## 测试用例

| 测试用例 |  |
| :----| :---- |
| 密钥 | snBymGgaecGM6ede5VBDeisiNNZy2|
| 地址 | jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM|
| 测试链节点1 | https://whskywelldrpc1.jccdex.cn:8443|
| 测试链节点2 | https://whskywelldrpc2.jccdex.cn:8443|
| 测试链节点3 | https://whskywelldrpc3.jccdex.cn:8443|
|测试链浏览器地址| https://whskywelldscan.jccdex.cn:8443/#/home|