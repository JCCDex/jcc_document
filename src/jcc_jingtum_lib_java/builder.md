# Builder

类 JccJingtum.Builder

## 构造器

```Java
public Builder(java.lang.Boolean isGuomi, java.lang.Boolean isLocalSign, java.lang.Boolean enableSequenceCach)
```

**参数:**

- isGuomi - 是否启用国密
- isLocalSign - 是否本地签名
- enableSequenceCach - 是否缓存sequence

## 设置钱包字母表-setAlphabet

```Java
public JccJingtum.Builder setAlphabet(java.lang.String alphabet)
```

**参数**

- alphabet - 字母表

## 设置每笔交易燃料费-setFee

```Java
public JccJingtum.Builder setFee(java.lang.Integer fee)
```

**参数**

- fee - 每笔交易燃料费(fee取值范围为10-1000000000的整数,燃料费计算公式=fee/1000000,)

## 设置链基础通证-setBaseToken

```Java
public JccJingtum.Builder setBaseToken(java.lang.String baseToken)
```

**参数**

- 交易燃料手续费通证,也是公链的本币

## 设置交易平台账号-setPlatform

```Java
public JccJingtum.Builder setPlatform(java.lang.String platform)
```

**参数**

- platform - 交易平台账号

## 设置rpc节点服务器地址-setRpcNodes

```Java
public JccJingtum.Builder setRpcNodes(java.util.ArrayList<java.lang.String> rpcNodes)
```

**参数**

- rpcNodes - rpc节点服务器地址列表

## 实例化JccJingtum-build

```Java
public JccJingtum build()
```
