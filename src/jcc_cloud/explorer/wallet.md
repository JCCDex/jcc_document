# Wallet相关接口

## 查询指定钱包的余额 -- fetchBalances {#查询指定钱包的余额}

### 方法签名

``` typescript
public async function fetchBalances(options: IFetchBalancesOptions): Promise<IFetchBalancesResponse> 
```

### 方法参数

```typescript
{
  uuid: string;    // <必须传值> 随机的通用唯一识别码
  address: string; // <必须传值> 钱包地址
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
  	balances: [    // 余额列表
      {
        currency: string;  // 币种名称
        issuer: string;    // 币种发行方
        value: string;     // 币种余额（含冻结）
        frozen: string;    // 币种冻结数量
      }
      // ...
    ]
  };
}
```



## 查询指定钱包的当前委托单 -- fetchOffers{#查询指定钱包的当前委托单}

### 方法签名

```typescript
public async function fetchOffers(options: IFetchOffersOptions): Promise<IFetchOffersResponse>
```

### 方法参数

```typescript
{
  uuid: string;     // <必须传值> 随机的通用唯一识别码
  address: string;  // <必须传值> 钱包地址
  page: number;     // 页数（缺省0）
  size: number;   // 每页多少条（缺省20，10/20/50/100四种选择）
  coinPair: string; // 交易对（不传值表示查询全部类型交易对的委托单。形如：JETH-JBNB或JBNB-JETH，另外交易对可以只指定base或counter，如JETH-或-JBNB
  buyOrSell: TradeType; // 委托性质买或卖（缺省0。1:买；2:卖；0:买或卖；如果传值必须与coinPair参数一起使用）
}

```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: {       // 查询结果内容
    count: number; // 查询结果总数
  	offers: [      // 挂单列表
      {
        time: number;        // 挂单创建时间
        past: number;        // 从挂单到距离现在过去的毫秒数
        hash: string;        // 委托挂单的交易hash
        block: number;       // 区块高度
        flag: number;        // 委托单性质，买/卖，（1:买；2:卖；0:未知）
        takerGets: {         // 挂单付出的币种和数量
          currency: string;  // 币种名称
          issuer: string;    // 币种发行方
          value: string;     // 币种数量
        }; 
        takerPays: {         // 挂单得到的币种和数量
          currency: string;  // 币种名称
          issuer: string;    // 币种发行方
          value: string;     // 币种数量
        }; 
        seq: number;         // 交易序号
        getsV: number;       // 同takerGets的value
        paysV: number;       // 同takerPays的value
        gets_pays: number;   // 挂单比例，付出/得到
        pays_gets: number;   // 挂单比例，得到/付出
      }
      // ...
    ]
  };
}
```



## 查询指定钱包的历史交易 -- fetchHistoryOrders{#查询指定钱包的历史交易}

### 方法签名

```typescript
public async function fetchHistoryOrders(options: IFetchHistoryOrdersOptions): Promise<IFetchHistoryOrdersResponse>
```

### 方法参数

```typescript
{
  uuid: string;         // <必须传值> 随机的通用唯一识别码
  address: string;      // <必须传值> 钱包地址
  page: number;         // 页数（缺省0）
  size: number;         // 每页多少条（缺省20，10/20/50/100四种选择）
  beginTime: string;    // 表示查询开始日期（可以不传值，格式：2023-01-01）
  endTime: string;      // 表示查询结束日期（可以不传值，格式同beginTime）
  type: OrderType;      //  交易类型，多个类型以逗号分隔，可以不传值，不传值表示查询所有类型，一共可能的类型有：OfferCreate、OfferAffect、OfferCancel、Send、Receive 五种）
  buyOrSell: TradeType; // 交易性质买或卖（可以不传值，1:买 2:卖。该参数只有在type=OfferCreate或OfferAffect或OfferCancel时有效果）
  coinPair: string;     // 交易对或币种，在t=OfferCreate或OfferAffect或OfferCancel时，传值必须形如：SWTC-CCDAO、SWTC-、-CCDAO。在t=Send或Receive时，传值必须长度<8，且只包含币种名称不含“-”，如CCDAO
}
```



### 返回数据格式

```typescript
{
  code: string,               // 查询结果是否成功标志
  msg: string,                // 查询结果是否成功的描述
  data: {                     // 查询结果内容
    count: number;            // 查询结果总量
    historOrders: [           // 历史交易记录
      {
        type: string;         // 交易类型（OfferCreate：创建委托；OfferAffect：被动成交；OfferCancel：撤消委托；Send：支付；Receive：收到；其它：未知）
        time: number;         // 交易发生时间，单位毫秒
        past: number;         // 该交易距离查询时过去的毫秒数
        hash: string;         // 该交易的哈希，64位字符串
        block: number;        // 该交易所在区块高度
        fee: string;          // 交易gas费用，当交易类型为OfferAffect或Receive时，fee=""
        success: string;      // 交易是否成功（tesSUCCESS表示成功）
        seq: number;          // 交易序号
        account: string;      // <type=Sned,Receive时>，转账目标账号
        amount: {             // <type=Sned,Receive时>，交易的币种信息
          currency: string;   // 币种
          issuer: string;     // 发行方
          value: string;      // 数量
        };
        memos: unknown[];    // <type=Sned,Receive时>， 交易备注
        flag: number;        // <type=OfferCreate,OfferAffect,OfferCancel时>， 交易性质，买/卖，整型（1:买；2:卖；0:未知）
        matchFlag: number;   // <type=OfferCreate,OfferAffect时>，撮合标记（不是撮合交易，则该字段不存在，比如：3表示三方撮合）
        takerGets: {         // <type=OfferCreate时>创建挂单时付出的币种和数量，<type=OfferAffect时>，被动成交前挂单的付出币种和数量，<type=OfferCancel时>，被撤消挂单的付出币种和数量
          currency: string;  // 币种名称
          issuer: string;    // 币种发行方
          value: string;     // 币种数量
        };    
        takerPays: {         // <type=OfferCreate时>，创建挂单时得到的币种和数量，<type=OfferAffect时>，被动成交前挂单的得到币种和数量，<type=OfferCancel时>，被撤消挂单的得到币种和数量，(注意：账本中经常出现一个挂单被多次撤消的情况，所以该字段可能没有)
          currency: string;  // 币种名称
          issuer: string;    // 币种发行方
          value: string;     // 币种数量
        };
        takerGetsFact: {     // <type=OfferCreate时>，立即成交剩余的实际挂单部分的付出币种和数量(如果挂单全部成交，则没有该字段),<type=OfferAffect时>，被动成交剩余部分的付出币种和数量(如果全部被动成交，则没有该字段)
          currency: string;   // 币种
          issuer: string;     // 发行方
          value: string;      // 数量
        }; 
        takerPaysFact: {     // <type=OfferCreate时>，立即成交剩余的实际挂单部分的得到币种和数量(如果挂单全部成交，则没有该字段),<type=OfferAffect时>，被动成交剩余部分的得到币种和数量(如果全部被动成交，则没有该字段)
          currency: string;   // 币种
          issuer: string;     // 发行方
          value: string;      // 数量
        }; 
        takerGetsMatch: {    // <type=OfferCreate时>，立即成交部分的付出币种和数量(如果没有立即成交，则没有该字段),<type=OfferAffect时>，被动成交部分的付出币种和数量
          currency: string;   // 币种
          issuer: string;     // 发行方
          value: string;      // 数量
        };
        takerPaysMatch: {    // <type=OfferCreate时>，立即成交部分的得到币种和数量(如果没有立即成交，则没有该字段),<type=OfferAffect时>，被动成交部分的得到币种和数量
          currency: string;   // 币种
          issuer: string;     // 发行方
          value: string;      // 数量
        };
        offerSeq: number;     // <type=OfferCancel时>，被撤销的挂单交易的交易序号
        platform: string;     // <type=OfferCreate,OfferCancel时>，交易平台账号
        brokerage: {         //  <type=OfferCreate,OfferCancel时>，有交易发生时才会存在
          platform: string;   // 交易平台账号
          feeAccount: string; // 手续费账号
          den: number;        // 手续费基数
          num: number;        // 手续费点数
          currency: string;   // 币种
          issuer: string;     // 发行方
          value: string;      // 数量
        };
      },
      // ...
    ]
  }       
}
```



## 查询银关地址发行过tokens -- fetchIssuedTokens{#查询银关地址发行过tokens}

### 方法签名

```typescript
public async function fetchIssuedTokens(options: IFetchIssuedTokensOptions): Promise<IFetchIssuedTokensResponse>
```

### 方法参数

```typescript
{
  uuid: string;    // <必须传值> 随机的通用唯一识别码
  address: string; // <必须传值> 钱包地址
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
  	tokens: [      // 发行记录列表
      {
        currency: string;  // 币种名称
        issuer: string;    // 币种发行方
      }
      // ...
    ]
  };
}
```



## 查询指定钱包的历史收费交易查询 -- fetchHistoryFees{#查询指定钱包的历史收费交易查询}

### 方法签名

```typescript
public async function fetchHistoryFees(options: IFetchHistoryFeesOptions): Promise<IFetchHistoryFeesResponse>
```

### 方法参数

```typescript
{
  uuid: string;       // <必须传值> 随机的通用唯一识别码
  address: string;    // <必须传值> 钱包地址
  page: number;       // 页数（缺省0）
  size: number;       // 每页多少条（缺省20，10/20/50/100四种选择）
  beginTime: string;  // 开始日期（可以不传值，格式：2023-01-01),最好加上控制提高查询效率
  endTime: string;    // 结束日期（可以不传值，格式同beginTime）,最好加上控制提高查询效率
  tokenAndIssuer: string; //通证名称+发行方，例如JETH_jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
  	fees: [        // 发行记录列表
      {
        currency: string;    // 币种名称
        issuer: string;      // 币种发行方
        value: string;       // 币种数量
        type: string;        // 交易类型，唯一默认值“Fee”
        block: number;       // 区块高度
        time: number;        // 交易时间，单位毫秒
        den: number;         // 手续费基数
        num: number;         // 手续费点数
        platform: string;    // 指定该钱包为收费钱包的管理员账号
        hash: string;        // 交易hash
      }
      // ...
    ]
  };
}
```

