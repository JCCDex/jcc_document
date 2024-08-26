# Hash相关接口

## 查询最新的6笔交易 -- fetchLatestSixHash{#查询最新的6笔交易}

### 方法签名

```typescript
public async function fetchLatestSixHash(options: IFetchLatestSixHashOptions): Promise<IFetchLatestSixHashResponse>
```

### 方法参数

```typescript
{
  uuid: string;     // <必须传值> 随机的通用唯一识别码
}
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: {       // 查询结果内容
  	hashInfos: [
      {
        hash: string;       // 区块哈希
        block: number;      // 区块高度
        time: number;       // 区块关闭时间
        type: string;       // 交易类型
        account: string;    // 发起交易的账号 
        success: string;    // 交易是否成功，“tesSUCCESS”
        dest: string;       // <type=Payment时> 转账对方地址
        amount: {           // <type=Payment时> 转账币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };    
        takerGets: {  // <type=OfferCreate、OfferCancel时> 挂单付出币种和数量
      		currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
     	  }; 
        takerPays: {  // <type=OfferCreate、OfferCancel时> 挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        }; 
        realGets: {   // <type=OfferCreate时> 除去立即成交之后实际挂单付出币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };  
        realPays: {   // <type=OfferCreate时> 除去立即成交之后实际挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
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
        past: number;  // 当前时间距离交易过去了多长时间（毫秒）
        flag: number;  // 买/卖，整型（1:买；2:卖；0:未知）
      },
      // ...
    ]
  }
}
```

## 查询所有交易hash列表 -- fetchAllHash{#查询所有交易hash列表}

### 方法签名

```typescript
public async function fetchAllHash(options: IFetchAllHashOptions): Promise<IFetchAllHashResponse>
```

### 方法参数

```typescript
{
  uuid: string;           // <必须传值> 随机的通用唯一识别码
  page: number;           // 页数，从0开始
  size: PageSize;         // 每页条数,缺省20，可选10，20，50，100
  beginTime: string;      // 表示查询开始日期（可以不传值，格式：2023-01-01）
  endTime: string;        // 表示查询结束日期（可以不传值，格式同beginTime）
  type: TransactionType;  // 交易类型，如"OfferCreate", "OfferCancel", "payment"
  buyOrSell: TradeType;   // 买卖关系，1 买 2 卖 0 所有
  coinPair: string;       // 交易对例如: "JETH-JUSDT",  "JETH-",  "-JUSDT", "JETH"
  matchFlag: number;      // 主动成交撮合查询标志， 不建议使用此字段
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    count: number,    // 查询结果总数
    hashInfos: [
      {
        hash: string;       // 区块哈希
        block: number;      // 区块高度
        time: number;       // 区块关闭时间
        type: string;       // 交易类型
        account: string;    // 发起交易的账号 
        success: string;    // 交易是否成功，“tesSUCCESS”
        dest: string;       // <type=Payment时> 转账对方地址
        amount: {           // <type=Payment时> 转账币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };    
        takerGets: {  // <type=OfferCreate、OfferCancel时> 挂单付出币种和数量
      		currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
     	  }; 
        takerPays: {  // <type=OfferCreate、OfferCancel时> 挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        }; 
        realGets: {   // <type=OfferCreate时> 除去立即成交之后实际挂单付出币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };  
        realPays: {   // <type=OfferCreate时> 除去立即成交之后实际挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
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
        past: number;  // 当前时间距离交易过去了多长时间（毫秒）
        flag: number;  // 买/卖，整型（1:买；2:卖；0:未知）
      },
      // ...
    ]
  }
}
```

## 通过哈希查询对应的区块信息或交易信息 -- fetchHashDetailInfo{#通过哈希查询对应的区块信息或交易信息}

### 方法签名

```typescript
public async function fetchHashDetailInfo(options: IFetchHashDetailOptions): Promise<IFetchBlockHashDetailResponse | IFetchTransHashDetailResponse>
```

### 方法参数

```typescript
{
  uuid: string;   // <必须传值> 随机的通用唯一识别码
  hash: string;   // <必须传值> 交易哈希或者区块哈希
}
```

### 返回数据格式

```typescript
// 区块哈希
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    hashType: number; // 被查询的哈希的类型 区块hash: 1, 交易hash: 2
    blockInfo: {      // 查询的区块信息
      blockHash: string;   // 区块哈希
      block: number;       // 区块高度
      time: number;        // 区块关闭时间
      past: number;        // 该区块距现在过去的时间，单位毫秒
      transNum: number;    // 该区块包含的交易数量
      parentHash: string;  // 上一个区块哈希
      totalCoins: string;  // 当前SWTC的总量，除以1000000后所得即是真实的SWTC总量（需要bignumber处理）
    };
    blockDetails: [
      {
        hash: string;       // 交易哈希
        index: number;      // 交易在区块中的下标
        type: string;       // 交易类型"Payment", "OfferCreate", "OfferCancel"
        account: string;    // 发起交易的账号 
        seq: number;        // 交易序列号
        fee: number;        // 交易手续费
        success: string;    // 交易是否成功，“tesSUCCESS”
        offerSeq: number;   // <type=OfferCancel时> 撤单所需交易序列号
        memos: unknown[];   // <type=Payment时> 备注
        dest: string;       // <type=Payment时> 转账对方地址
        amount: {           // <type=Payment时> 转账币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };    
        platform: string;   // <type=OfferCreate、OfferCancel时> 交易平台账号
        takerGets: {        // <type=OfferCreate、OfferCancel时> 挂单付出币种和数量
      		currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
     	  }; 
        takerPays: {        // <type=OfferCreate、OfferCancel时> 挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        }; 
        realGets: {         // <type=OfferCreate时> 除去立即成交之后实际挂单付出币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };  
        realPays: {         // <type=OfferCreate时> 除去立即成交之后实际挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };  
       brokerage: {         // 交易手续费信息
          platform: string;     // 交易所在平台账号
          feeAccount: string;   // 手续费账号
          den: number;          // 手续费基数
          num: number;          // 手续费点数
          currency: string;     // 手续费币种
          issuer: string;       // 手续费币种发行方
          value: string;        // 手续费数量
        }; 
        affectedNodes: IMatchTradeInfo[]; // 具体内容请参照fetchAllHash方法返回结果
        flag: number;       // <type=OfferCreate时存在> 买/卖，整型（1:买；2:卖；0:未知）
      },
      // ...
    ];
  }
}

// 交易哈希
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    hashType: number; // 被查询的哈希的类型 区块hash: 1, 交易hash: 2
    hashDetails: {
      hash: string;       // 交易哈希
      index: number;      // 交易在区块中的下标
      type: string;       // 交易类型"Payment", "OfferCreate", "OfferCancel"
      account: string;    // 发起交易的账号 
      seq: number;        // 交易序列号
      fee: number;        // 交易手续费
      success: string;    // 交易是否成功，“tesSUCCESS”
      offerSeq: number;   // <type=OfferCancel时> 撤单所需交易序列号
      memos: unknown[];   // <type=Payment时> 备注
      dest: string;       // <type=Payment时> 转账对方地址
      amount: {           // <type=Payment时> 转账币种和数量
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      };    
      platform: string;   // <type=OfferCreate、OfferCancel时> 交易平台账号
      takerGets: {        // <type=OfferCreate、OfferCancel时> 挂单付出币种和数量
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      }; 
      takerPays: {        // <type=OfferCreate、OfferCancel时> 挂单得到币种和数量
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      }; 
      realGets: {         // <type=OfferCreate时> 除去立即成交之后实际挂单付出币种和数量
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      };  
      realPays: {         // <type=OfferCreate时> 除去立即成交之后实际挂单得到币种和数量
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      };  
      brokerage: {         // 交易手续费信息
        platform: string;     // 交易所在平台账号
        feeAccount: string;   // 手续费账号
        den: number;          // 手续费基数
        num: number;          // 手续费点数
        currency: string;     // 手续费币种
        issuer: string;       // 手续费币种发行方
        value: string;        // 手续费数量
      }; 
      affectedNodes: IMatchTradeInfo[]; // 具体内容请参照fetchAllHash方法返回结果
      flag: number;       // <type=OfferCreate时存在> 买/卖，整型（1:买；2:卖；0:未知）
      blockHash: string;  // 交易所在区块哈希,
      block: number;      // 交易所在区块号
      time: number;       // 交易时间，单位毫秒
      past: number;       // 交易距现在过去的毫秒数
      matchflag: number;  // <type=OfferCreate时存在> 撮合标志，（若没有撮合，则该字段不存在；数字: 表示多方撮合，比如3表示三方撮合）
      matchGets: {        // <type=OfferCreate时存在> 实际成交付出币种和数量（若没有实际成交则该字段不存在）
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      };  
      matchPays: {        // <type=OfferCreate时存在> 实际成交得到币种和数量（若没有实际成交则该字段不存在）
        currency: string;   // 币种名称
        issuer: string;     // 币种发行方
        value: string;      // 币种数量
      }
    },
  }
}
```

## 根据区块哈希查询其包含的交易列表 -- fetchBlockTransactionsByHash{#根据区块哈希查询其包含的交易列表}

### 方法签名

```typescript
public async function fetchBlockTransactionsByHash(options: IFetchBlockHashTransactionsOptions): Promise<IFetchBlockHashTransactionsResponse>
```

### 方法参数

```typescript
{
  uuid: string;       // <必须传值> 随机的通用唯一识别码
  blockHash: string;  // <必须传值> 区块哈希
  page: number;       // 页数，从0开始
  size: PageSize;     // 每页条数,缺省20，可选10，20，50，100
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    transactions: [
      {
        hash: string;       // 交易哈希
        index: number;      // 交易在区块中的下标
        type: string;       // 交易类型"Payment", "OfferCreate", "OfferCancel"
        account: string;    // 发起交易的账号 
        seq: number;        // 交易序列号
        fee: number;        // 交易手续费
        success: string;    // 交易是否成功，“tesSUCCESS”
        offerSeq: number;   // <type=OfferCancel时> 撤单所需交易序列号
        memos: unknown[];   // <type=Payment时> 备注
        dest: string;       // <type=Payment时> 转账对方地址
        amount: {           // <type=Payment时> 转账币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };    
        platform: string;   // <type=OfferCreate、OfferCancel时> 交易平台账号
        takerGets: {        // <type=OfferCreate、OfferCancel时> 挂单付出币种和数量
      		currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
     	  }; 
        takerPays: {        // <type=OfferCreate、OfferCancel时> 挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        }; 
        realGets: {         // <type=OfferCreate时> 除去立即成交之后实际挂单付出币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };  
        realPays: {         // <type=OfferCreate时> 除去立即成交之后实际挂单得到币种和数量
          currency: string;   // 币种名称
          issuer: string;     // 币种发行方
          value: string;      // 币种数量
        };  
        brokerage: {         // 交易手续费信息
          platform: string;     // 交易所在平台账号
          feeAccount: string;   // 手续费账号
          den: number;          // 手续费基数
          num: number;          // 手续费点数
          currency: string;     // 手续费币种
          issuer: string;       // 手续费币种发行方
          value: string;        // 手续费数量
        }; 
        affectedNodes: IMatchTradeInfo[]; // 具体内容请参照fetchAllHash方法返回结果
        flag: number;       // <type=OfferCreate时存在> 买/卖，整型（1:买；2:卖；0:未知）
      },
      // ...
    ]
  }
}
```

