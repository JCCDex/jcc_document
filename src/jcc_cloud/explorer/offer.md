# Offer相关接口

## 指定钱包指定订单的订单状态查询 -- fetchOffersDetail {#指定钱包指定订单的订单状态查询}

### 方法签名

``` typescript
public async function fetchOffersDetail(options: IFetchOfferDetailOptions): Promise<IFetchOfferDetailResponse>
```

### 方法参数

```typescript
{
  uuid: string;    // <必须传值> 随机的通用唯一识别码
  address: string; // <必须传值> 要查询的Offer的所属钱包地址
  seq: number; // <必须传值> 要查询的Offer的序列号
  searchType?: OfferSearchType; // <可选参数> 查询类型，缺省为0  0:只查询Offer的状态; 1:只查询Offer的交易历史; 2:两者皆查询;
}
```

### 返回数据格式

```typescript
{
  code: string,    // 查询结果是否成功标志
  msg: string,     // 查询结果是否成功的描述
  data: {          // 查询结果内容
    offerStatus?: IOfferStatusInfo;
    offerHistory?: IOfferHistoryInfo[];
  };
}
```
