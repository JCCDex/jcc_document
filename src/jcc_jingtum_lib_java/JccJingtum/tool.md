---
# editLink: true
checkCode: '点我查看代码'
outline: deep
---
# 工具方法

## 16进制备注内容直接转换成为字符串(无需Unicode解码)-getMemoData

```Java
public java.lang.String getMemoData(java.lang.String hexStrMemData)
```

**参数:**
- hexStrMemData - 16进制备注内容

**返回:**
- 备注内容

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

String memo = jccJingtum.getMemoData("7B2262617365223A7B226E616D65223A224A454F53222C22616D6F756E74223A22302E31353236353639227D2C22636F756E746572223A7B226E616D65223A224A55534454222C22616D6F756E74223A22302E32323935363536227D2C226379636C65223A2231363333353136303230222C22737461727454696D65223A2231363235333038313330222C22656E6454696D65223A2231363235373430313330222C22737461747573223A2230227D");
System.out.println(memo);
```
:::

## 时间戳转换，区块链账本上的时间戳是相对于2000-01-01 08:00:00的偏移时间，换算成当前时间需要转换-convertTime

```Java
public long convertTime(java.lang.Long blockTime)
```

**参数:**
- blockTime - 区块链账本上的时间戳

**返回:**
- 标准时间戳(秒)
