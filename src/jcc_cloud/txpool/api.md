# 相关接口

## 获取地址公钥信息 -- getAddressPublicKey{#获取地址公钥信息}

### 方法签名

```typescript
public function getAddressPublicKey(secret: string): IAccount
```

### 方法参数

```typescript
secret: string  // <必须传值> 密钥
```

### 返回数据格式

```typescript
{
	address: string;       // 地址
  signedAddress: string; // 地址的数字签名
  publicKey: string;     // 公钥
}
```

## 从交易池服务获取seq -- getSeqsFromTxPool{#从交易池服务获取seq}

### 方法签名

```typescript
public async function getSeqsFromTxPool(options: IFetchSeqsOptions): Promise<IFetchSeqsResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <可不传值> 随机的通用唯一识别码
  publicKey: string;   // <必须传值> 公钥
  signedAddr: string;  // <必须传值> 地址的数字签名
  fromChain: number;   // <必须传值> 0-表示不从链上获取 1-表示从链上获取序列号
  count: number;       // <必须传值> 表示获取多少个序列号
}
```

### 返回数据格式

```typescript
{
  code: string; // 查询结果是否成功标志
  msg: string;  // 查询结果是否成功的描述
  data: {
    seqs: number[]; // 请求的seqs数组
  };
}
```

## 批量签名 -- batchSignWithSeqs{#批量签名}

### 方法签名

```typescript
public async function batchSignWithSeqs(options: IBatchSignData): Promise<ITxPoolData> 
```

### 方法参数

```typescript
{
  secret: string;  // <必须传值> 密钥
  txList: (ICreateExchange | ICancelExchange | IPayExchange)[]; // <必须传值> tx交易报文数组（仅支持挂单，撤单以及转账报文）
  seqs: number[]; // <必须传值> seqs数组
}
```

### 返回数据格式

```typescript
{
  dataHashSign: string; // 数据哈希的签名数据 
  dataJsonStr: string;  // 序列化后的签名数据
}
```

## 提交交易内容到交易池 -- submitToTxPool{#提交交易内容到交易池}

### 方法签名

```typescript
public async function submitToTxPool(options: ISubmitOptions): Promise<ISubmitResponse>
```

### 方法参数

```typescript
{
  uuid: string;            // <可不传值> 随机的通用唯一识别码
  publicKey: string;       // <必须传值> 公钥
  submitPara: ITxPoolData; // <必须传值> 需要提交的数据
}
```

### 返回数据格式

```typescript
{
  code: string; // 查询结果是否成功标志
  msg: string;  // 查询结果是否成功的描述
  data: {
    success: boolean; // 提交是否成功
  };
}
```

## 查询某地址在交易池中的状态 -- fetchSubmittedData{#查询某地址在交易池中的状态}

### 方法签名

```typescript
public async function fetchSubmittedData(options: IFetchSubmittedOptions): Promise<IFetchSubmittedResponse>
```

### 方法参数

```typescript
{
  uuid: string;               // <可不传值> 随机的通用唯一识别码
  publicKey: string;          // 公钥
  state: QueryState | number; // 1:客户端已上传 2:上链服务提交出错 3:上链服务提交成功 4:客户端已上传或上链服务提交出错 5:上链未确认
  count: QueryType | string;  // 表示查询一条还是全部数据，'one':一条 'total':全部
}
```

**Tips：**

 * 1: 表示只查询刚上传到交易服务，还未提交上链的数据
 * 2: 表示只查询提交上链出错即不成功的数据
 * 3: 表示只查询提交上链成功的数据
 * 4: 表示查询包含1和2的数据
 * 5: 表示查询还未确认上链确实成功的数据
 * 这里我们一般会在上传交易30秒后，指定4状态来查询一条数据，若查询不到说明上传的数据均已提交上链且未出错；
 * 如果服务端交易数据没有产生堆积的话，指定2状态查询一条数据也是可行的；
 * 若短时间内上传了多个钱包地址的大量交易数据，此时需要慎重，因为30秒内可能有地址还未轮训到或者有交易还未提交上链；

### 返回数据格式

```typescript
{
  code: string; // 查询结果是否成功标志
  msg: string;  // 查询结果是否成功的描述
  data: {
    list: ISubmittedData[]; // 查询结果
  };
}
```

## 取消某地址所有未上链和上链失败的交易 -- cancelSubmitChain{#取消某地址所有未上链和上链失败的交易}

### 方法签名

```typescript
public async function cancelSubmitChain(options: ICancelSubmitOptions): Promise<ICancelSubmitResponse>
```

### 方法参数

```typescript
{
  uuid: string;      // <必须传值> 随机的通用唯一识别码
  publicKey: string; // <必须传值> 公钥
  signedAddr: string;// <必须传值> 地址的数字签名
}
```

### 返回数据结构

```typescript
{
  code: string; // 查询结果是否成功标志
  msg: string;  // 查询结果是否成功的描述
  data: {
    canceled: boolean;  // 是否取消成功
  };
}
```

## 获取交易池中的交易数量 -- fetchTxPoolQueues{#获取交易池中的交易数量}

### 方法签名

```typescript
public async function fetchTxPoolQueues(options: IFetchTxPoolQueuesOptions): Promise<IFetchTxPoolQueuesResponse>
```

### 方法参数

```typescript
{
  uuid: string;                  // <必须传值> 随机的通用唯一识别码
  publicKey: string;             // <必须传值> 公钥
  state: QueuesState | string;   // <必须传值> 查询的状态 1.等待上链 2.上链时出错 3.已提交上链,但等待链上确认
  type: QueuesType | string;     // <必须传值> 查询的范围 self 仅查询自己的交易 total 查询所有的交易
}
```

### 返回数据结构

```typescript
{
  code: string; // 查询结果是否成功标志
  msg: string;  // 查询结果是否成功的描述
  data: {
    count: number;  // 所查询状态的交易数量
  };
}
```

