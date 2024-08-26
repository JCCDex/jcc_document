# 统计相关接口

## 通证信息查询 -- fetchTokensInfo{#通证信息查询}

### 方法签名

```typescript
public async function fetchTokensInFo(options: IFetchTokensOptions): Promise<IFetchTokensResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
  page: number;        // 页数，从0开始
  size: PageSize;      // 每页条数,缺省20，可选10，20，50，100
  issuer: string;      // 币种发行方
  token: string;       // 币种名称，因为是模糊查询可以只包含币种关键字，如‘J’、’JE‘、‘JET’、’JETH‘
}
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: {       // 查询结果内容
    count: number;  //查询结果总数
  	tokens: [
      {
        block: number;        // ?
        index: number;        // ?
        isNative: number;     // ？1: 原生代币, 0: 不是原生代币
        issueCount: string;   // 已经发行数量
        issueDate: number;    // 发行日期
        reserveCount: number; // 储备数量
        destory: number;      // ？
        token: string;        // 币种名称
        issuer: string;       // 发行方
        holdnum: number;      // 持有者数量
      },
      // ...
    ]
	}
}
```

## 查询通证流通信息 -- fetchTokensCirculationInfo{#查询通证流通信息}

### 方法签名

```typescript
 public async function fetchTokensCirculationInfo(options: IFetchTokensCirculationOptions): Promise<IFetchTokensCirculationResponse> 
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
  issuer: string;      // <必须传值> 币种发行方
  token: string;       // <必须传值> 币种名称
  page: number;        // 页数，从0开始
  size: PageSize;      // 每页条数,缺省20，可选10，20，50，100
}
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: {       // 查询结果内容
    tokenInfo: {
      token: string;          // 代币名称
      issuer: string;         // 发行方
      issueDate: number;      // 发行日期
      totalsupply: string;    // 总发行量
      circulation: string;    // 流通总量
      holders: number;        // 持有者数量
      holdersList: {          // 持有者名单，最多显示前100人
        address: string;      // 代币持有者地址
        amount: string;       // 持有数量
        time: number;         // 统计时间
      }[];
      flag: number;           // 代币状态
    }
  }
}
```

## 查询所有通证分类列表 -- fetchTokensList{#查询所有通证分类列表}

### 方法签名

```typescript
public async function fetchTokensList(options: IFetchTokensListOptions): Promise<IFetchTokensListResponse | IFetchAllTokensListResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
  keyword: string;     // 代币关键字，因为是模糊查询可以只包含代币关键字，如‘J’、’JE‘、‘JET’、’JETH‘，当不传该参数时会返回所有币种列表并按首字母分类
}
```

### 返回数据格式

```typescript
// 传入keyword
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: { 
    type: number;   // 0: 表示所有币种列表, 1: 表示符合传入条件的币种列表
    tokens: [
      {
        token: string;  // 符合条件的代币名称
  			issuer: string; // 代币发行方
      },
      // ...
    ];
  }
}

// 不传入keyword
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: { 
    type: number;   // // 0: 表示所有币种列表, 1: 表示符合传入条件的币种列表
    tokens: [
      {
        firstLetter: string;   // 代币名称大写首字母
        list: [
        	{
            token: string;  // 符合条件的代币名称
            issuer: string; // 代币发行方
      		},
      		// ...
        ];
      },
      // ...
    ];
  }
}
```

## 链上交易量统计 -- fetchTokensTradeStatistic{#链上交易量统计}

### 方法签名

```typescript
public async function fetchTokensTradeStatistic(options: IFetchTokenTradeStatisticOptions): Promise<IFetchTokenTradeStatisticResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
}
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: { 
    list: [
      {
        bBlock: number;   // 统计开始区块高度
        eBlock: number;   // 统计结束区块高度
        bTime: number;    // 统计开始时间
        eTime: number;    // 统计结束时间
        transNum: number; // 统计期间交易量
        type: number;     // ？？
      },
      // ...
    ];
  }
}
```

## 链上新增用户数统计 -- fetchNewUserStatistic{#链上新增用户数统计}

### 方法签名

```typescript
public async function fetchNewUserStatistic(options: IFetchUserStatisticOptions): Promise<IFetchUserStatisticResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
}
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: { 
    list: [
      {
        bTime: number;    // 统计开始时间
        eTime: number;    // 统计结束时间
        total: number;    // 当前链上用户总数
        userNum: number;  // 统计期间新增用户数
        type: number;     // ？？
      },
      // ...
    ];
  }
}
```

## 用户钱包资产统计 -- fetchTokenBalanceStatistic{#用户钱包资产统计}

### 方法签名

```typescript
public async function fetchTokenBalanceStatistic(options: IFetchTokenBalanceStatisticOptions): Promise<IFetchTokenBalanceStatisticResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
  token: string;       // <必须传值> 格式：币种名称_发行方，当查询SWTC时只需传入SWTC或SWT（必须大写）无需填写发行方
  address: string;     // <必须传值> 钱包地址
  page: number;        // 页数，从0开始
  size: PageSize;      // 每页条数,缺省20，可选10，20，50，100
  beginTime: string;   // 查询开始时间
  endTime: string;     // 查询结束时间
}
注：若传入beginTime，endTime但此时间段内查询结果为空的话，会默认返回查询的钱包地址相应代币的最新一条余额记录
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: { 
    balances: [
      {
        time: number;    // 统计时间
        value: string;   // 余额
      },
      // ...
    ];
  }
}
```

## 获取某交易对的最新交易记录 -- fetchLatestTransactions{#获取某交易对的最新交易记录}

> **该接口只返回交易对最近的50条交易记录**

### 方法签名

```typescript
public async function fetchLatestTransactions(options: IFetchLatestTransactionsOptions): Promise<IFetchLatestTransactionsResponse>
```

### 方法参数

```typescript
{
  uuid: string;        // <必须传值> 随机的通用唯一识别码
  base: string;        // <必须传值> 币种名称
  counter: string;     // <必须传值> 币种名称
}
```

### 返回数据格式

```typescript
{
  code: string, // 查询结果是否成功标志
  msg: string,  // 查询结果是否成功的描述
  data: { 
    records: [
      {
        Account: string;       // 交易账号
        Sequence: number;      // 交易序列号
        TakerGets: IToken;     // 交易对方得到币种和数量
        TakerPays: IToken;     // 交易方自己得到的币种和数量
        close_time: number;    // 交易时间
        gets_pays: string;     // 交易比例 base/counter
        hash: string;          // 交易hash
        ledger_index: number;  
        matchFlag: number;     // 撮合标志，（若没有撮合，则该字段不存在；数字: 表示多方撮合，比如3表示
        matchNum: number;      
        pays_gets: string;     // 交易比例 counter/base
       },
      // ...
    ];
  }
}
```