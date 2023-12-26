---
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 账号管理

## 冻结账号 (管理员)

```ts
/**
 * add blackList
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} account to be frozen wallet address
 * @param {(string | IMemo[])} memo memo
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function addBlackList(address: string, secret: string, account: string, memo: string | IMemo[]): Promise<string>
```

## 解冻账号 (管理员)

```ts
/**
 * remove blackList
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} account to be frozen wallet address
 * @param {(string | IMemo[])} memo memo
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function removeBlackList(
  address: string,
  secret: string,
  account: string,
  memo: string | IMemo[]
): Promise<string>
```

## set brokerage (管理员)

```ts
/**
 * set brokerage
 *
 * @param {string} platformAccount platform wallet address
 * @param {string} platformSecret platform wallet secret
 * @param {string} feeAccount fee wallet address
 * @param {number} rateNum fee numerator
 * @param {number} rateDen fee denominator
 * @param {string} token token name of transfer
 * @param {string} [issuer] issuer address of token
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function setBrokerage(
  platformAccount: string,
  platformSecret: string,
  feeAccount: string,
  rateNum: number,
  rateDen: number,
  token: string,
  issuer?: string
): Promise<string>
```

## 设置ManageIssuer (管理员)

```ts
/**
 * set manage issuer
 *
 * @param {string} address manager wallet address
 * @param {string} secret manager wallet secret
 * @param {string} account new issuer wallet address
 * @param {(string | IMemo[])} memo memo
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function setManageIssuer(
  address: string,
  secret: string,
  account: string,
  memo: string | IMemo[]
): Promise<string>
```
