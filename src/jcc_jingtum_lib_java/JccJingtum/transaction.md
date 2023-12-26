---
# editLink: true
checkCode: '点我查看代码'
outline: deep
---
# 交易相关

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

## 发送交易请求(签名后的数据，本地签名)-submitBlob

```Java
public java.lang.String submitBlob(java.lang.String txBlob)
```

**参数:**
- txBlob - 交易信息

**返回:**
- 交易信息

## 向指定节点发送交易请求(签名后的数据，本地签名)-submitBlob

```Java
public java.lang.String submitBlob(java.lang.String txBlob, java.lang.String rpcHost)
```

**参数:**
- txBlob - 交易信息
- rpcHost - rpc节点服务器

**返回:**
- 交易信息



## 发送交易请求(非本地签名)-submitWithSecret

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
