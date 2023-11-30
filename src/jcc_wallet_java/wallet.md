---
# editLink: true
checkCode: '点我查看代码'
outline: deep
---

# 如何使用

类 Wallet

井通联盟链钱包工具类(非国密)

## 构造器

```Java
public Wallet() // 创建钱包对象(新钱包)

public Wallet(java.lang.String secret) // 创建钱包对象，已知密钥

public Wallet(java.lang.String secret, java.lang.String alphabet) // 创建钱包对象，已知密钥和联盟链字母表
```

**参数:**
- secret - 钱包密钥
- alphabet - 字母表，每一条联盟链都可以用不同的或者相同alphabet
  
## 随机生成钱包地址-generate

```Java
public static Wallet generate()
public static Wallet generate(java.lang.String alphabet)
```

**参数:**
- alphabet - 字母表，每一条联盟链都可以用不同的或者相同alphabet

**返回:**
- 钱包对象

:::details {{$frontmatter.checkCode}}

```Java
System.out.println("---------generate jingtum wallet----------");
Wallet wallet = Wallet.generate();
System.out.println("secret=" + wallet.getSecret());
System.out.println("address=" + wallet.getAddress());
System.out.println("publicKey=" + wallet.getPublicKey());
System.out.println(JsonUtils.toJsonString(wallet));

System.out.println("---------generate bizain wallet----------");
Wallet walletBiz = Wallet.generate("bpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2jcdeCg65rkm8oFqi1tuvAxyz");
System.out.println("secret=" + walletBiz.getSecret());
System.out.println("address=" + walletBiz.getAddress());
System.out.println("publicKey=" + walletBiz.getPublicKey());
System.out.println(JsonUtils.toJsonString(walletBiz));
```

:::

## 根据密钥生成钱包-fromSecret

```Java
public static Wallet fromSecret(java.lang.String secret)
public static Wallet fromSecret(java.lang.String secret, java.lang.String alphabet)
```

**参数:**

- secret - 钱包密钥
- alphabet - 字母表，每一条联盟链都可以用不同的或者相同alphabet

**返回:**

- 钱包对象

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = Wallet.fromSecret('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String addresss = wallet.getAddress();
System.out.println(addresss)
```

:::

## 判断钱包地址是否有效-isValidAddress

```Java
public static boolean isValidAddress(java.lang.String address)public static boolean isValidAddress(java.lang.String address, java.lang.String alphabet)
```

**参数:**
- address - 钱包地址
- alphabet - 字母表，每一条联盟链都可以用不同的或者相同alphabet
- 
**返回:**
- 有效返回true，无效返回false

:::details {{$frontmatter.checkCode}}

```Java
System.out.println("---------isValidAddress----------");
System.out.println("是否有效=" + Wallet.isValidAddress('jahbmVT3T9yf5D4Ykw8x6nRUtUfAAMzBRV'));
```

:::

## 判断钱包密钥是否有效-isValidSecret

```Java
public static boolean isValidSecret(java.lang.String secret)
public static boolean isValidSecret(java.lang.String secret, java.lang.String alphabet)
```

**参数:**
- secret - 钱包密钥
- alphabet - 字母表，每一条联盟链都可以用不同的或者相同alphabet

**返回:**
- 有效返回true，无效返回false

:::details {{$frontmatter.checkCode}}

```Java
System.out.println("---------isValidSecret----------");
System.out.println("是否有效=" + Wallet.isValidSecret('sszWqvtbDzzMQEVWqGDSA5DbMYDBN'));
```

:::

## 获取钱包公钥-getPublicKey

```Java
public java.lang.String getPublicKey()
```

**返回:**
- 钱包公钥

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = Wallet.fromSecret('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
System.out.println("publicKey=" + wallet.getPublicKey());
```

:::

## 使用钱包密钥对信息进行签名-sign

```Java
public java.lang.String sign(java.lang.String message)
```

**参数:**
- message - 需要签名的原文

**返回:**
- 签名后的内容

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = new Wallet('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String signStr = wallet.sign('hello jingtum');
System.out.println(signStr);
```

:::

## 校验信息的自作签名是否正确-verify

```Java
public boolean verify(java.lang.String message, java.lang.String signature)
```

**参数:**
- message - 签名的原文
- signature - 签名后的内容

**返回:**
- true:校验通过，false:校验不通过

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = new Wallet('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String signStr = wallet.sign('hello jingtum');
Boolean f1 = Wallet.verify(message,signStr);
System.out.println(f1);
```

:::

## 通过公钥获取钱包地址-getAddress

```Java
public static  String getAddress(String pubKey)
```

**参数:**
- pubKey - 公钥

**返回:**
- 钱包地址

:::details {{$frontmatter.checkCode}}

```Java
System.out.println("---------fromSecret----------");
Wallet wallet = Wallet.fromSecret('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String address1 = wallet.getAddress();
String pubKey = wallet.getPublicKey();
String address2 = Wallet.getAddress(pubKey);
System.out.println("address1:"+address1);
System.out.println("pubKey:"+pubKey);
System.out.println("address2:"+address2);
```

:::

## 获取钱包地址-getAddress

```Java
public java.lang.String getAddress()
```

**返回:**
- 钱包地址

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = new Wallet('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String address = wallet.getAddress();
System.out.println(address);
```

:::

## 获取钱包密钥-getSecret

```Java
public java.lang.String getSecret()
```

**返回:**
- 钱包密钥

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = new Wallet('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String secret = wallet.getSecret();
System.out.println(secret);
```

:::

## 获取钱包keypairs属性-getKeypairs

```Java
public IKeyPair getKeypairs()
```

**返回:**
- keypairs属性

:::details {{$frontmatter.checkCode}}

```Java
Wallet wallet = new Wallet('sszWqvtbDzzMQEVWqGDSA5DbMYDBN');
String keypairs = wallet.getKeypairs();
System.out.println(keypairs);
```

:::

## 设置钱包keypairs属性-setKeypairs

```Java
public void setKeypairs(IKeyPair keypairs)
```

**参数:**
- keypairs 
- 钱包keypairs值

## 设置钱包密钥-setSecret

```Java
public void setSecret(java.lang.String secret)
```

**参数:**
- secret - 钱包密钥

## 设置钱包字母表-setAlphabet

```Java
public void setAlphabet(java.lang.String alphabet)
```

**参数:**
- alphabet - 字母表，每一条联盟链都可以用不同的或者相同alphabet

## 获取钱包字母表-getAlphabet

```Java
public java.lang.String getAlphabet()
```

**返回:**
- 钱包字母表
