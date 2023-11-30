---
# editLink: true
checkCode: '点我查看代码'
outline: deep
---

# 如何使用

类 JccJingtum

井通公链、联盟链RPC开发接口

## 实例化

```Java
new JccJingtum.Builder(false,true,true).build();
```

## 获取钱包字母表-getAlphabet

```Java
public java.lang.String getAlphabet()
```

**返回:**
- 钱包字母表

## 获取每笔交易燃料费-getFee

```Java
public java.lang.Integer getFee()
```

**返回:**
- 每笔交易燃料费

## 获取链基础通证-getBaseToken

```Java
public java.lang.String getBaseToken()
```

**返回:**
- 链基础通证

## 获取交易平台账号-getPlatform

```Java
public java.lang.String getPlatform()
```

**返回:**
- 交易平台账号

## 获取异常重试次数-getTryTimes

```Java
public int getTryTimes()
```

**返回:**
- 异常重试次数

## 获取rpc节点列表-getRpcNodes

```Java
public java.util.ArrayList<java.lang.String> getRpcNodes()
```

**返回:**
- rpc节点列表

## 创建钱包(账号)-createWallet

```Java
public java.lang.String createWallet()
```

**返回:**
- 钱包字符串,json格式 ({"secret":****,"address":****})

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

String _wallet = jccJingtum.createWallet();
System.out.println(_wallet);
```
:::

## 通过钱包密钥获取钱包地址-getAddress

```Java
public java.lang.String getAddress(java.lang.String secret)
```

**参数:**
- secret - 钱包密钥

**返回:**
- 钱包地址

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

String _address = jccJingtum.getAddress('snBymGgaecGM6ede5VBDeisiNNZy2');
System.out.println(_address);
```
:::

## 获取sequence-getSequence

```Java
public UInt32 getSequence(java.lang.String address)
```

**参数:**
- address - 钱包地址

**返回:**
- sequence

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

UInt32 sequence = jccJingtum.getSequence("jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM");
System.out.println(sequence);
```
:::

## 向指定节点获取sequence-getSequence

```Java
public UInt32 getSequence(java.lang.String address, java.lang.String rpcHost)
```

**参数:**
- address - 钱包地址
- rpcHost - rpc节点服务器

**返回:**
- sequence

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

UInt32 sequence = jccJingtum.getSequence("jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM","https://whskywelldrpc3.jccdex.cn:8443");
System.out.println(sequence);
```
:::

## 根据hash向指定节点获取交易详情-requestTx

```Java
public java.lang.String requestTx(java.lang.String hash, java.lang.String rpcHost)
```

**参数:**
- hash - 交易hash
- rpcHost - rpc节点服务器

**返回:**
- 交易详情(json格式)

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

String res = jccJingtum.requestTx("FB6C0A537C0D71092DF0066533F2BD1F5BE88279C450A4FAFDAB139AFC504AF4","https://whskywelldrpc2.jccdex.cn:8443");
System.out.println(res);
```
:::

## 根据hash获取交易详情-requestTx

```Java
public java.lang.String requestTx(java.lang.String hash)
```

**参数:**
- hash - 交易hash

**返回:**
- 交易详情 json格式

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

String res = jccJingtum.requestTx("FB6C0A537C0D71092DF0066533F2BD1F5BE88279C450A4FAFDAB139AFC504AF4");
System.out.println(res);
```
:::

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

## 构造撤单交易数据-buildCancleOrder

```Java
public TransactionInfo buildCancleOrder(java.lang.String secret, UInt32 pSequence, UInt32 sequence)
```

**参数:**
- secret - 钱包密钥
- pSequence - 挂单序列号
- sequence - 交易序列号

**返回:**
- 交易详情(json格式)

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

Int32 seq1 = jccJingtum.getSequence("jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM");
TransactionInfo transactionInfo = jccJingtum.buildCreateOrder("snBymGgaecGM6ede5VBDeisiNNZy2","SWT","1","jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or","JJCC","100","jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",seq1,"test");
jccJingtum.submitBlob(transactionInfo.getTxBlob());
System.out.println(transactionInfo.toString());

TransactionInfo transactionInfo2 = jccJingtum.buildCancleOrder("snBymGgaecGM6ede5VBDeisiNNZy2",seq1,new UInt32(seq1.value()+1));
jccJingtum.submitBlob(transactionInfo2.getTxBlob());
System.out.println(transactionInfo2.toString());
```
:::

## 构造挂单交易数据(本地签名)-buildCreateOrder

```Java
public TransactionInfo buildCreateOrder(java.lang.String secret, java.lang.String pPayToke, java.lang.String pPayAmount, java.lang.String pPayIssuer, java.lang.String pGetToken, java.lang.String pGetAmount, java.lang.String pGetIssuer, UInt32 sequence, java.lang.String memos)
```

**参数:**
- secret - 挂单方钱包密钥
- pPayToke - 挂单方支付的Token名称
- pPayAmount - 挂单方支付的Token数量
- pPayIssuer - 挂单方支付的Token的银关地址
- pGetToken - 挂单方期望得到的Token名称
- pGetAmount - 挂单方期望得到的Token数量
- pGetIssuer - 挂单方期望得到的Token的银关地址
- sequence - 交易序列号
- memos - 交易备注(无就传"")

**返回:**
- 交易详情(json格式)

## 向指定节点发送交易(签名后的数据)-submitBlob

```Java
public java.lang.String submitBlob(java.lang.String txBlob, java.lang.String rpcHost)
```

**参数:**
- txBlob - 交易信息
- rpcHost - rpc节点服务器

**返回:**
- 交易信息

## 向节点发送交易(签名后的数据)-submitBlob

```Java
public java.lang.String submitBlob(java.lang.String txBlob)
```

**参数:**
- txBlob - 交易信息

**返回:**
- 交易信息

## 构造转账交易数据-buildPayment

```Java
public TransactionInfo buildPayment(java.lang.String secret, java.lang.String receiver, java.lang.String pToken, java.lang.String pAmount, java.lang.String pIssuer, UInt32 sequence, java.lang.String memos)
```

**参数:**
- secret - 发送者钱包密钥
- receiver - 接收者钱包地址
- pToken - 转账Token
- pAmount - 转账数量
- pIssuer - 银关地址
- sequence - 交易序列号
- memos - 交易备注(无就传"")

**返回:**
- 交易详情(json格式)

## 向指定节点发送交易请求(非本地签名)-submitWithSecret

```Java
public java.lang.String submitWithSecret(java.lang.String secret, java.lang.String txJson, java.lang.String rpcHost)
```

**参数:**
- secret - 钱包密钥
- txJson - 交易信息
- rpcHost - rpc节点服务器

**返回:**
- 交易信息

## 向节点发送交易请求(非本地签名)-submitWithSecret

```Java
public java.lang.String submitWithSecret(java.lang.String secret, java.lang.String txJson)
```

**参数:**
- secret - 钱包密钥
- txJson - 交易信息

**返回:**
- 交易信息

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

Int32 seq1 = jccJingtum.getSequence("jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM");
TransactionInfo transactionInfo = jccJingtum.buildCreateOrder("snBymGgaecGM6ede5VBDeisiNNZy2","SWT","1","jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or","JJCC","100","jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",seq1,"test");
jccJingtum.submitWithSecret("snBymGgaecGM6ede5VBDeisiNNZy2",transactionInfo.getTxJson());
```
:::

## 获取指定节点状态-getServerState

```Java
public ServerInfo getServerState(java.lang.String rpcHost)
```

**参数:**
- rpcHost - rpc节点服务器

**返回:**
- 节点列表和状态

## 获取节点状态-getServerState

```Java
public java.util.ArrayList<ServerInfo> getServerState()
```

**返回:**
- 节点列表和状态

:::details {{$frontmatter.checkCode}}
```Java
ArrayList<String> rpcNodes = new ArrayList<String>();
rpcNodes.add("https://whskywelldrpc1.jccdex.cn:8443");
JccJingtum jccjingtum = new JccJingtum.Builder(false,true,true).setRpcNodes(rpcNodes).build();

ArrayList<com.jccdex.rpc.res.ServerInfo> serverList = jccJingtum.getServerState();
System.out.println(serverList);
for(int i=0; i<serverList.size();i++) {
    ServerInfo serverInfo = serverList.get(i);
    System.out.println(serverInfo.host);
    System.out.println(serverInfo.height);
    System.out.println(serverInfo.lastLedgerHash);
    System.out.println(serverInfo.lastLedgerTime);
    System.out.println("----------------------------");
}
```
:::