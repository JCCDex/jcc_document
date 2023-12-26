# 构造tx

## serializeCreateOrder

```ts
function serializeCreateOrder(
  address: string,
  amount: string,
  base: string | IToken,
  counter: string | IToken,
  sum: string,
  type: ExchangeType,
  platform: string,
  nativeCurrency: string,
  fee: number,
  issuer: string
): ICreateExchange
```

## serializeCancelOrder

```ts
function serializeCancelOrder(address: string, sequence: number, fee: number): ICancelExchange
```

## 

```ts
function serializePayment(
  address: string,
  amount: string,
  to: string,
  token: string,
  memo: string | IMemo[],
  fee: number,
  nativeCurrency: string,
  issuer: string
): IPayExchange
```

## serializePayment

```ts
function serializePayment(
  address: string,
  amount: string,
  to: string,
  token: string,
  memo: string | IMemo[],
  fee: number,
  nativeCurrency: string,
  issuer: string
): IPayExchange
```

## serializeBrokerage

```ts
function serializeBrokerage(
  platformAccount: string,
  feeAccount: string,
  rateNum: number,
  rateDen: number,
  token: string,
  issuer: string,
  fee: number
): IBrokerageExchange
```

## serializeSignerList

```ts
function serializeSignerList(
  account: string,
  signerQuorum: number,
  fee: number,
  signerEntries?: ISignerEntry[]
): ISignerListSet
```

## serializeSetAccount

```ts
function serializeSetAccount(account: string, disable: boolean, fee: number): IAccountSet
```

## serializeSetBlackList

```ts
function serializeSetBlackList(
  manager: string,
  account: string,
  memo: string | IMemo[],
  fee: number
): IBlackList
```

## serializeRemoveBlackList

```ts
function serializeRemoveBlackList(
  manager: string,
  account: string,
  memo: string | IMemo[],
  fee: number
): IBlackList
```

## serializeManageIssuer

```ts
function serializeManageIssuer(
  manager: string,
  account: string,
  memo: string | IMemo[],
  fee: number
): IManageIssuer
```

## serializeIssueSet

```ts
function serializeIssueSet(
  manager: string,
  amount: string,
  token: string,
  memo: string | IMemo[],
  issuer: string,
  fee: number
): IIssueSet
```

## serializeTokenIssue

```ts
function serializeTokenIssue(
  account: string,
  publisher: string,
  amount: number,
  token: string,
  flag: TokenFlag,
  fee: number
)
```

## serialize721Publish

```ts
function serialize721Publish(
  address: string,
  to: string,
  token: string,
  tokenId: string,
  fee: number,
  infos?: TokenInfo[]
)
```

## serialize721Payment

```ts
function serialize721Payment(
  address: string,
  to: string,
  tokenId: string,
  fee: number,
  memo: string | IMemo[]
)
```

## serialize721Delete

```ts
function serialize721Delete(address: string, tokenId: string, fee: number)
```

## serializeTrustSet

```ts
function serializeTrustSet(address: string, limit: IAmount | string, memo: string | IMemo[], fee: number)
```
