# Block相关接口

## 查询指定区块内包含的交易列表 -- fetchBlockTransactions{#查询指定区块内包含的交易列表}

### 方法签名

```typescript
public async function fetchBlockTransactions(options: IFetchBlockTransactionsOptions): Promise<IFetchBlockTransactionsResponse>
```

### 方法参数

```typescript
{
  uuid: string;          // <必须传值> 随机的通用唯一识别码
  blockNumber: number;   // <必须传值> 区块高度（号）
  page: number;         // 页数，从0开始，不传值表示不分页查询全部数据
  size: PageSize;       // 页显示条数，10/20/50/100四种选择，缺省20，page参数不传值时，该参数可以不传值
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    count: number,    // 查询结果总数
    transactions: [
      {
        hash: string; // 交易哈希
        blockHash: string; // 交易所在块哈希
        block: number; // 区块高度
        time: number; // 交易时间（ms）
        index: number; // 该笔交易在当前区块内的序列号，从0开始递增
        type: string; // 交易类型，如"Payment"、 "OfferCreate"、 "OfferCancel"
        account: string; // 交易发起方账号地址
        seq: number; // 交易发起方的交易序列号
        fee: number; // 交易燃料费用
        succ: string; // 交易是否成功，"tesSUCCESS"表示成功，其它失败
        memos: unknown[]; //交易备注
        dest: string; // <type=Payment时>，交易对方账号
        amount: {    // <type=Payment时>，交易内容
          currency: string;  // 币种名称
          issuer: string;    // 币种发行方
          value: string;     // 币种数量
        }; 
        platform: string;   // <type=OfferCreate,OfferCancel时> 交易所在平台账号
        takerGets: {        // <type=OfferCreate,OfferCancel时> 交易时付出的币种和数量
          currency: string;
          issuer: string;
          value: string;
        };
        takerPays: {        // <type=OfferCreate,OfferCancel时> 交易时得到的币种和数量
          currency: string;
          issuer: string;
          value: string;
        };
        realGets: {         // <type=OfferCreate时> 除去立即成交之后实际挂单付出币种和数量
          currency: string;
          issuer: string;
          value: string;
        };
        realPays: {         // <type=OfferCreate时> 除去立即成交之后实际挂单得到币种和数量
          currency: string;
          issuer: string;
          value: string;
        };
        brokerage: {       // <type=OfferCreate,OfferCancel时> 交易手续费信息
          platform: string;     // 交易所在平台账号
          feeAccount: string;   // 手续费账号
          den: number;          // 手续费基数
          num: number;          // 手续费点数
          currency: string;     // 手续费币种
          issuer: string;       // 手续费币种发行方
          value: string;        // 手续费数量
        }; 
        affectedNodes: [  // <type=OfferCreate时存在> 挂单立即成交部分（以被动成交钱包的角度）
         {
           account: string; // 被动成交的钱包地址
           seq: number;     // 该被动成交的挂单的序号
           flags: number;   // 交易flag ？？？
           previous: {      // 	<type=OfferCreate时存在> 被动成交前的交易对币种和数量（该字段可能没有，若没有该字段，表示这个被动成交记录是撤消自己的反向挂单，这种情况在自己新的挂单会吃掉自己以前的反向挂单时会发生，就是说不允许自己吃掉自己的挂单，一旦要出现这种情况时，会先把自己以前的反向挂单撤消，然后再把新单挂上去）
            takerGets: {  // 初始挂单付出币种和数量
           	  currency: string;
              issuer: string;
              value: string;
            };
            takesPays: {  // 初始挂单得到币种和数量
              currency: string;
              issuer: string;
              value: string;
            };
           };
           final: { // 被动成交后的数量
            takerGets: {  // 剩余挂单付出币种和数量
              currency: string;
              issuer: string;
              value: string;
            };
            takesPays: {  // 剩余挂单得到币种和数量
              currency: string;
              issuer: string;
              value: string;
            };
           };
           brokerage: {       // 交易手续费信息
             platform: string;     // 交易所在平台账号
             feeAccount: string;   // 手续费账号
             den: number;          // 手续费基数
             num: number;          // 手续费点数
             currency: string;     // 手续费币种
             issuer: string;       // 手续费币种发行方
             value: string;        // 手续费数量
           }; 
         },
         // ...
       ];
      },
      // ...
    ]
  }
}
```

## 查询最新的6个区块基本信息 -- fetchLatestSixBlocks{#查询最新的6个区块基本信息}

### 方法签名

```typescript
public async function fetchLatestSixBlocks(options: IFetchLatestSixBlocksOptions): Promise<IFetchLatestSixBlocksResponse>
```

### 方法参数

```typescript
{
  uuid: string;  // <必须传值> 随机的通用唯一识别码
}
```

### 返回数据格式

```typescript
{
	code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    blocks: [
      {
        block: number;      // 区块高度
        time: number;       // 区块关闭时间，单位毫秒
        transNum: number;   // 区块内交易个数
        hash: string;       // 区块哈希
        parentHash: string; // 上一区块的哈希
        past: number;       // 该区块距现在过去的秒数
      },
      // ...
    ]
  }
}
```

## 查询所有区块的基本信息 -- fetchAllBlocks{#查询所有区块基本信息}

> **注：该接口不包含区块内的交易的具体信息，如需详细交易信息请参考[查询指定区块内包含的交易列表](#查询指定区块内包含的交易列表)接口**

### 方法签名

```typescript
public async function fetchAllBlocks(options: IFetchAllBlocksOptions): Promise<IFetchAllBlocksResponse>
```

### 方法参数

```typescript
{
  uuid: string;  // <必须传值> 随机的通用唯一识别码
  page: number; // 页数，从0开始，缺省0
  size: PageSize; // 每页显示条数，10/20/50/100四种选择，缺省20
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    count: number,   // 查询结果总数量
  	blocks: [
      {
        block: number;      // 区块高度
        time: number;       // 区块关闭时间，单位毫秒
        transNum: number;   // 区块内交易个数
        hash: string;       // 区块哈希
        parentHash: string; // 上一区块的哈希
        past: number;       // 该区块距现在过去的秒数
      },
      // ...
    ]
  }
}
```

