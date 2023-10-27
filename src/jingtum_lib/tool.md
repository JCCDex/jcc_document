---
# title: remote
# editLink: true
checkCode: '代码示例'
outline: deep
---
# 工具类

Utils类是工具类，提供以下方法：

* hexToString(hex)
* stringToHex(str)
* isValidAmount()
* isValidAmount0()
* parseAmount()
* isValidCurrency()
* isValidHash()
* isValidAddress()
* isValidSecret()
* processTx()

## 16进制转字符串

方法：hexToString(hex)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|hex |String |16进制字符串|

返回：字符串

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.hexToString('6e6968616f'));
```

返回结果

```js
nihao
```

:::

## 字符串转16进制

方法：stringToHex(str)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|str |String |字符串|

返回：16进制字符串

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.stringToHex(nihao));
```

返回结果

```js
6e6968616f
```

:::

## 判断amount是否有效

方法：isValidAmount({})

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|value |String |数值|
|currency |String |货币种类|
|issuer |String |货币发行方|

返回：Boolean值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.isValidAmount({value: '20', currency:'SWT', issuer:''}));
```

返回结果

```js
true
```

:::

## 判断市场挂单的货币对是否有效

方法：isValidAmount0({})

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|currency |String |货币种类|
|issuer |String |货币发行方|

返回：Boolean值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.isValidAmount0({currency:'SWT', issuer:''}));
```

返回结果

```js
true
```

:::

## 统一基础货币SWT的amount格式

方法：parseAmount()

参数：数值/对象；

返回：若为数值，则默认转换成基础货币的amount格式（即{value: ‘数值’,currency:’SWT’,issuer:’’}）返回，这里value值需乘以1000000；若为合法amount对象，返回此对象；否则，返回null。

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.parseAmount('2000000'));
```

返回结果

```js
{ value: '2', currency: 'SWT', issuer: '' }
```

:::

## 判断currency是否合法

方法：isValidCurrency(currency)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|currency |String |货币种类|

**注：currency为3-6位字母(不区分大小写，统一转换成大写)或者由A-F0-9组成的40位16进制字符串。**

返回：Boolean值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.isValidCurrency('0CFDA38CC98A630F97B9FFFFB324FC40F2882F97'));
```

返回结果

```js
true
```

:::

## 判断hash是否合法

方法：isValidHash(hash)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|hash |String |交易hash/账本hash|

返回：Boolean值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.isValidHash('A89A245D311FCCF3C329E865AFF69C59AB9CD66F0808BD0C16D5706103319125'));
```

返回结果

```js
true
```

:::

## 判断address是否合法

方法：isValidAddress(address)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|address |String |钱包地址|

**注：井通地址以j开头。**

返回：Boolean值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.isValidAddress('jsEtk7VtqY8PJ4uSmTbQ1KHkv1u9zhr8pQ'));
```

返回结果

```js
true
```

:::

## 判断secret是否合法

方法：isValidSecret(secret)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |钱包私钥|

**注：井通私钥以s开头。**

返回：Boolean值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.isValidSecret('sn5qWH2E18HbnuvfrHeMcnFdENcSu'));
```

返回结果

```js
true
```

:::

## 以太坊地址转成jingtum地址

方法：eth2Jingtum(ethadr)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|ethadr |String |以太坊地址|

返回：String值

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
console.log(utils.eth2Jingtum('0xa5ccbc99c692a59ffd8b237bf601287142de9b94'));
```

返回结果

```js
jGfCmjWeNNqE5d2cVGHBHiNs5NPrbtpRbn
```

:::

## processTx从账号角度解析交易信息

方法：processTx(tx, account)

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|tx |Object |底层返回的交易详情|
|account |String |钱包地址|

**注：井通私钥以s开头。**

返回：Object

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|date |Integer |交易时间|
|hash |String |交易hash|
|type |String |交易类型，详见后面说明|
|fee |String |燃料费|
|result |String |交易结果码，tesSUCCESS表示成功，其他详见底层常见错误附录|
|memos |Array |交易备注|
|ledger_index |Integer |交易所在区块高度|
|offertype |String |挂单买卖类型，只有挂单类才有此字段|
|**gets** |**Object** |委托的对方将要获得的数量，只有挂单类才有此字段|
|**pays** |**Object** |委托的对方将要支付的数量，只有挂单类才有此字段|
|seq |Integer |该笔交易对应的该账号的sequence编号|
|effects |Array |交易效果，包括创建挂单、取消挂单、挂单成交详情等，详见后面effects说明|
|balances |Object |变动币种余额|
|balancesPrev |Object |交易前变动币种余额|
|**dealGets** |**Object** |实际对方获得的，挂单成交才有此字段|
|**dealPays** |**Object** |实际对方支付的，挂单成交才有此字段|
|**totalRate** |**Object** |一共收取的挂单手续费，挂单成交才有此字段|
|dealPrice |String |实际成交价，挂单成交才有此字段|
|dealNum |Integer |涉及到的撮合币种，挂单成交才有此字段|
|signers |Array |多重签名类才有，若该笔交易是多重签名方式完成，则此字段显示所有签名账户，否则该字段不显示|
|threshold |Integer |签名列表类才有，阈值|
|lists |Array |签名列表类才有，签名列表|
|src |String |黑名单类才有，设置黑名单的源账号|
|black |String |黑名单类才有，黑名单账号|
|method |String |合约类才有，合约类型（部署合约deploy，调用合约call）|
|payload |String |合约类里的部署合约才有，合约编译后的16进制字节码|
|amount |Number |合约类里的调用合约才有，合约中msg.value的值。只有payable修饰的合约函数，才可以设置该值，默认为0。|
|destination |String |合约类的调用合约才有，合约账号|
|func |String |合约类的调用合约才有，合约函数名|
|func_parms |String |合约类的调用合约才有，合约参数|
|eventLog |String |合约类的调用合约才有，合约调用的eventLog日志|

|属性(gets) |类型 |说明|
| :----| :----| :----|
|value |String |数值|
|currency |String |货币|
|issuer |String |发行方|

|属性(pays) |类型 |说明|
| :----| :----| :----|
|value |String |数值|
|currency |String |货币|
|issuer |String |发行方|

|属性(dealGets) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |币种|
|issuer |String |发行方|

|属性(dealPays) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |币种|
|issuer |String |发行方|

|属性(totalRate) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |币种|
|issuer |String |发行方|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var utils= jlib.utils;
var tx =  { 
  Account: 'jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR',
  Fee: '10000',
  Flags: 524288,
  Sequence: 650,
  SigningPubKey: '03E791056E6B4C62E26C0F1F3BB89317667AB74170B49339972716FC53FFCF007C',
  TakerGets: '2000000000',
  TakerPays:{ 
    currency: 'CNY',
    issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
    value: '13.46' 
  },
  Timestamp: 611552863,
  TransactionType: 'OfferCreate',
  TxnSignature: '3045022100B342C7159E1AD7FAA13452C1FB01F77A107263AFB06E93F9B4F307EF9DF9F98E0220690C964D89146250E879B9EA5ED311C3317631F1F6450360603E6818AFFB5FAF',
  date: 611552870,
  hash: 'AB2A25557FF03911A8FC0A412293BE9D9FCB20CDD530EE05957A9859F8467C32',
  inLedger: 12839308,
  ledger_index: 12839308,
  meta:{ 
    AffectedNodes: [
      { 
        ModifiedNode:{ 
          FinalFields: { 
            Account: 'j9x4pABowsWxmK1DhhWyK34u3boC6h3LHe',
            BookDirectory: '51603377F758E3C8FA007C77312DDA06A737A1395CD5FC435D0547675A0517F6',
            BookNode: '0000000000000000',
            Flags: 0,
            OwnerNode: '0000000000000000',
            Sequence: 7031,
            TakerGets:{ 
              currency: 'CNY',
              issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
              value: '1148.95233' 
            },
            TakerPays: '170721000000' 
          },
          LedgerEntryType: 'Offer',
          LedgerIndex: '020110B8BED1F151B9D3AF9E5D412D8627CB08232B388ADE1F4B0C68E7608BEC',
          PreviousFields: { 
            TakerGets:{ 
              currency: 'CNY',
                issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
                value: '1162.41233' 
            },
            TakerPays: '172721000000' 
          },
          PreviousTxnID: '9CB6AEFA273C750242D5B8AF4299347E77F9A47C5D0B89EE5F6A4D5577E8C4A0',
          PreviousTxnLgrSeq: 12839301 
        } 
      },
      { 
        ModifiedNode:{ 
          FinalFields: { 
            Account: 'jEoSyfChhUMzpRDttAJXuie8XhqyoPBYvV',
            Balance: '533983297806',
            Flags: 0,
            OwnerCount: 1,
            Sequence: 34380818 
          },
          LedgerEntryType: 'AccountRoot',
          LedgerIndex: '109E80FB8CC6D82D4F7F7D77248C2C3C116ECCD4520B3D2A88421FFF94A57B1E',
          PreviousFields: { Balance: '533983287806', Sequence: 34380817 },
          PreviousTxnID: '756338B8F9D4DCC8D88382B1092B13F75F65F330970278AFC7449496FF9875E9',
          PreviousTxnLgrSeq: 12839308 
        } 
      },
      { 
        ModifiedNode:{ 
          FinalFields: { 
            Balance:{ 
              currency: 'CNY',
              issuer: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
              value: '-6872.222452374449' 
            },
            Flags: 2228224,
            HighLimit:{ 
              currency: 'CNY',
              issuer: 'jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR',
              value: '10000000000' 
            },
            HighNode: '0000000000000000',
            LowLimit:{ 
              currency: 'CNY',
              issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
              value: '0' 
            },
            LowNode: '00000000000012A0' 
          },
          LedgerEntryType: 'SkywellState',
          LedgerIndex: '2600F8FCB87FEA15F74B0DB785016384C79AEA0730B62F597C1E576801BB813B',
          PreviousFields: { 
            Balance:{ 
              currency: 'CNY',
              issuer: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
              value: '-6858.762452374449' 
            } 
          },
          PreviousTxnID: '9B28F7958E729F0F904410B132D1F81481B38DD9F017790A82168CD38C995331',
          PreviousTxnLgrSeq: 12838251 
        } 
      },
      { 
        ModifiedNode:{ 
          FinalFields:{ 
            Account: 'j9x4pABowsWxmK1DhhWyK34u3boC6h3LHe',
            Balance: '1496144192938',
            Flags: 0,
            OwnerCount: 8,
            Sequence: 7032 
          },
          LedgerEntryType: 'AccountRoot',
          LedgerIndex: '40A20BDD3C226C987579F6C821BF84492E1C6B6EFB62311481BA6B8CB1D7775A',
          PreviousFields: { Balance: '1494144192938' },
          PreviousTxnID: '9CB6AEFA273C750242D5B8AF4299347E77F9A47C5D0B89EE5F6A4D5577E8C4A0',
          PreviousTxnLgrSeq: 12839301 
        } 
      },
      { 
        ModifiedNode:{ 
          FinalFields: { 
            Account: 'jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR',
            Balance: '500538133',
            Flags: 0,
            OwnerCount: 10,
            Sequence: 651 
          },
          LedgerEntryType: 'AccountRoot',
          LedgerIndex: 'B39BD926378886F7EF4F81CEF862FC4D1E8E6D1265945AA9EC40FD85132DC629',
          PreviousFields: { Balance: '2500548133', Sequence: 650 },
          PreviousTxnID: '5BA24DE17EF64EDF942D99F247ED1495F5A61ED9260513FEDCA3E4BADBADFF3E',
          PreviousTxnLgrSeq: 12839303 
        } 
      },
      { 
        ModifiedNode:{ 
          FinalFields: { 
            Balance:{ 
              currency: 'CNY',
              issuer: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
              value: '1148.954817858577' 
            },
            Flags: 1114112,
            HighLimit:{ 
              currency: 'CNY',
              issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
              value: '0' 
            },
            HighNode: '000000000000172A',
            LowLimit:{ 
              currency: 'CNY',
              issuer: 'j9x4pABowsWxmK1DhhWyK34u3boC6h3LHe',
              value: '10000000000' 
            },
            LowNode: '0000000000000000' 
          },
          LedgerEntryType: 'SkywellState',
          LedgerIndex: 'E3E9FE1827E83B52F7017D3038F8C769F09343801BB073A993DE620756069137',
          PreviousFields: { 
            Balance:{ 
              currency: 'CNY',
              issuer: 'jjjjjjjjjjjjjjjjjjjjBZbvri',
              value: '1162.414817858577' 
            } 
          },
          PreviousTxnID: '9CB6AEFA273C750242D5B8AF4299347E77F9A47C5D0B89EE5F6A4D5577E8C4A0',
          PreviousTxnLgrSeq: 12839301 
        } 
      } 
    ],
    TransactionIndex: 3,
    TransactionResult: 'tesSUCCESS' 
  },
  validated: true 
};
var newTx = utils.processTx(tx, tx.Account);
console.log(newTx);
```

返回结果

```js
{ 
  date: 1558237670,
  hash: 'AB2A25557FF03911A8FC0A412293BE9D9FCB20CDD530EE05957A9859F8467C32',
  type: 'offernew',
  fee: '0.01',
  result: 'tesSUCCESS',
  memos: [],
  ledger_index: 12839308,
  offertype: 'sell',
  gets: { value: '2000', currency: 'SWT', issuer: '' },
  pays:{ 
    currency: 'CNY',
    issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or',
    value: '13.46' 
  },
  seq: 650,
  price: 0.00673,
  effects:[{ 
    effect: 'offer_bought',
    counterparty:{ 
      account: 'j9x4pABowsWxmK1DhhWyK34u3boC6h3LHe',
      seq: 7031,
      hash: '9CB6AEFA273C750242D5B8AF4299347E77F9A47C5D0B89EE5F6A4D5577E8C4A0' 
    },
    paid: { value: '2000', currency: 'SWT', issuer: '' },
    got:{ 
      value: '13.46',
      currency: 'CNY',
      issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' 
    },
    type: 'sold',
    price: '0.00673' 
  }],
  balances: { CNY: 6872.222452374449, SWT: 500.538133 },
  balancesPrev: { CNY: 6858.762452374449, SWT: 2500.548133 },
  dealGets: { value: '2000', currency: 'SWT', issuer: '' },
  dealPays:{ 
    value: '13.46',
    currency: 'CNY',
    issuer: 'jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or' 
  },
  dealPrice: '0.00673',
  dealNum: 2 
}
```

:::

## 交易类型type说明

底层返回的交易类型主要有Payment(支付类)、OfferCreate(创建挂单类)、OfferCancel(取消挂单类)、ConfigContract(lua版合约类)、AlethContract(solidity版合约类)、SignerListSet(签名列表类)和Brokerage(手续费设置类)；

processTx方法解析交易信息，主要有如下信息：

* date： 交易时间UNIXTIME
* hash：交易hash
* fee： 燃料费
* result ：交易结果
* memos： 交易的备注信息
* balances： 变动币种余额
* balancesPrev： 交易前变动币种余额
* type： 交易类型

type有如下几种：

### 1.sent，支付类，发送，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|counterparty	|String	|支付对家，即接收方|
|**amount**	|**Object**	|交易数量|
|effects	|Array	|[]，空|

|属性(amount) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

### 2.received，支付类，接收，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|counterparty	|String	|支付对家，即发送方|
|**amount**	|**Object**	|交易数量|
|effects	|Array	|[]，空|

|属性(amount) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

### 3.offernew，创建挂单，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|offertype	|String	|挂单买卖类型，sell或buy|
|**gets**	|**Object**	|对方得到的|
|**pays**	|**Object**	|对方支付的|
|seq	|Integer	|单子序号|
|price	|Integer	|价格|
|effects	|Array	|详见下面的effects解释|

|属性(gets) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

|属性(pays) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

### 4.offercancel，取消挂单，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|offerseq	|String	|该笔交易的单子号|
|**gets**	|**Object**	|对方得到的|
|**pays**	|**Object**	|对方支付的|
|effects	|Array	|详见下面的effects解释|

|属性(gets) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

|属性(pays) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

### 5.brokerage：手续费设置类，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|feeAccount	|String	|收费账号|
|mol	|Integer	|手续费分子|
|den	|Integer	|手续费分母|
|**amount**	|**Object**	|收手续费的币种|
|seq	|Integer	|单子序号|
|effects	|Array	|[]，空|

|属性(amount) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|币种|
|issuer	|String	|货币发行方，SWT为空|

### 6.alethcontract：solidity版合约类，在交易信息中包含的信息有

待完善。。。

### 7.configcontract：lua版合约类，在交易信息中包含的信息有

待完善。。。

### 8.offereffect，挂单成交情况，即被动成交的情况，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|effects	|Array	|[]，空|

### 9.signerlistset，签名列表类，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|threshold	|Integer	|阈值|
|**lists**	|**Array**	|签名列表|
|effects	|Array	|[]，空|

|属性(lists) |类型 |说明|
| :----| :----| :----|
|account	|String	|账户|
|weight	|String	|该账户对应权重|

### 10.setblacklist，设置黑名单类，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|src	|String	|设置黑名单的源账号|
|black	|String	|黑名单账号|
|effects	|Array|	[]，空|

### 11.removeblacklist，移除黑名单类，在交易信息中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|src	|String	|设置黑名单的源账号|
|black	|String	|黑名单账号|
|effects	|Array|	[]，空|

## 交易效果effects说明

effects是每个用户交易记录信息里面的交易效果，是个JSON数组，数组可以包含多项，每项内容都包含效果类型effect字段，根据effect的不同里面的内容也不同：

### 1.offer_funded，被动成交

参考正式环境hash：D9A717FC8388053764908DE867E4FFD72D8D3CD9AA92A53A5FF402B3313D06B0

账号：jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR

其中包含的信息有：

|参数 |类型 |说明|
| :----| :----| :----|
|effect	|String	|offer_funded|
|**counterparty**	|**Object**	|对家信息|
|**got**	|**Object**	|用户获得的金额|
|**paid**	|**Object**	|用户付出的金额|
|type	|String	|交易类型，sold或bought|
|platform	|String	|平台标识账号，设置了才有此字段|
|rate	|Integer	|手续费汇率，设置了才有此字段|
|fee	|String	|手续费金额，收取手续费时才有此字段|
|seq	|Integer	|挂单序号，表示被成交的单子|
|price	|String	|价格，4位小数|
|deleted	|Boolean	|单子是否被删除了，被吃了的单子会被删除掉|

|属性(counterparty) |类型 |说明|
| :----| :----| :----|
|account	|String	|对家账号|
|seq	|Integer	|对家单子序号|
|hash	|String	|对家交易hash|

|属性(got) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(paid) |类型 |说明|
| :----| :----| :----|
|value	|String	|金额|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

### 2.offer_partially_funded，交易部分成交

参考正式环境交易hash：80A4C0EC32AE6E16A6025A1420DD6AB67DEE2AFED1A618A71A8AD1E37A54FB2D

账号：jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR

其中包含的信息有：

|参数 |类型 |说明|
| :----| :----| :----|
|effect	|String	|offer_partially_funded|
|**counterparty**	|**Object**	|对家信息|
|remaining	|Boolean	|是否有剩余的单子|
|**gets**	|**Object**	|对方获得的金额|
|**pays**	|**Object**	|对方支付的金额|
|**paid**	|**Object**	|用户支付的金额|
|**got**	|**Object**	|用户获得的金额|
|type	|String	|交易类型，sold或bought|
|platform	|String	|平台标识账号，设置了才有此字段|
|rate	|Integer	|手续费汇率，设置了才有此字段|
|fee	|String	|手续费金额，收取手续费时才有此字段|
|seq	|Integer	|挂单序号，表示被部分成交的单子|
|price	|String	|挂单的价格，remaining为true才有|

|属性(counterparty) |类型 |说明|
| :----| :----| :----|
|account	|String	|对家账号|
|seq	|Integer	|对家单子序号|
|hash	|String	|对家交易hash|

|属性(gets) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(pays) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(paid) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(got) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

### 3.offer_cancelled，交易单子被取消

参考正式环境交易hash：286C40DB44DF4340B8974E635A49C46475B4D3F3CE0A67E8CB8EC93B399A94B2

账号：jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR

其中包含的信息有：

|参数 |类型 |说明|
| :----| :----| :----|
|effect	|String	|offer_cancelled|
|hash	|String	|被取消单子的hash|
|**gets**	|**Object**	|对方获得的金额|
|**pays**	|**Object**	|对方支付的金额|
|type	|String	|交易类型，sell或buy|
|platform	|String	|平台标识账号，设置了才有此字段|
|rate	|Integer	|手续费汇率，设置了才有此字段|
|seq	|Integer	|被取消单子的序号|
|price	|String	|挂单的价格|
|deleted	|Boolean	|单子是否被删除，取消单子为true|

|属性(gets) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(pays) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

### 4.offer_created，交易单子创建

参考正式环境交易hash:55DAB736BB47E940159ADA262B050A110A4EC9C5E917A08649E54DA587E76D9A

账号：jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR

其中包含的信息有：

|参数 |类型 |说明|
| :----| :----| :----|
|effect	|String	|offer_created|
|gets	|Object	|对方获得的金额|
|pays	|Object	|对方支付的金额|
|type	|String	|交易类型，sell或buy|
|platform	|String	|平台标识账号，设置了才有此字段|
|rate	|Integer	|手续费汇率，设置了才有此字段|
|seq	|Integer	|新建的单子序号|
|price	|String	|挂单的价格|

|属性(gets) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(pays) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

### 5.offer_bought，主动成交

参考正式环境交易hash：F137C081D7B486DA7ACA8F790DE4A231E6B23281E4CA4A5A40CEAF1E43F1390A

账号：jKCQAZwwN2sQG3Mb56GmWVqxkgpLwwAZuR

其中包含的信息有：
|参数 |类型 |说明|
| :----| :----| :----|
|effect	|String	|offer_bought|
|**counterparty**	|**Object**	|对家信息|
|**paid**	|**Object**	|用户支付的金额|
|**got***	|**Object**	|用户获得的金额|
|type	|String	|交易类型，sold或bough|
|price	|String	|价格|
|platform	|String	|平台标识账号，设置了才有此字段|
|rate	|Integer	|手续费汇率，设置了才有此字段|
|fee	|String	|手续费金额，收取手续费时才有此字段|

|属性(counterparty) |类型 |说明|
| :----| :----| :----|
|account	|String	|对家账号|
|seq	|Integer	|对家单子序号|
|hash	|String	|对家交易hash|

|属性(paid) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

|属性(got) |类型 |说明|
| :----| :----| :----|
|value	|String	|数值|
|currency	|String	|货币|
|issuer	|String	|货币发行方，SWT为空字符串|

### 6.setregularkey，设置代理账号；其中包含的信息有

|参数 |类型 |说明|
| :----| :----| :----|
|effect	|String	|set_regular_key|
|type	|String	|交易类型，setregularkey|
|account	|String	|这是代理的源账号|
|regularkey	|String	|代理账号|