---
# editLink: true
checkCode: '点我查看代码'
outline: deep
---
# 账号管理

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

