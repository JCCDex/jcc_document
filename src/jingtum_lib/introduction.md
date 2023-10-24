# 入门
Jingtum_lib
## 说明
jingtum-lib是基于websocket的底层节点公共库，本文旨在说明各个接口的含义与使用，由于节点环境、状态或版本等不一致，可能稍有偏差，例子仅供参考，应以实际结果为准。

**常用测试节点地址：ws://ts5.jingtum.com:5020**

## 安装
::: code-group

```sh [npm]
$ npm install --save jingtum-lib 
```

```sh [pnpm]
$ pnpm add jingtum-lib
```

```sh [yarn]
$ yarn add jingtum-lib

```

:::

## 项目文件结构
jingtum-lib库基于ws协议跟底层交互，其中ws封装到Server类中，Server类是一个内部类，不对外开放；Server类封装在Remote类中，Remote类提供对外访问接口并可创建两类对象：Get方式请求的Request对象和Post方式请求的Transaction对象，这两类对象都通过submit()方法提交数据到底层。文件结构图如下：

![Alt text](/asset/image.png)