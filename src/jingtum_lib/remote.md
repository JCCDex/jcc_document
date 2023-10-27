---
# title: remote
# editLink: true
checkCode: '代码示例'
outline: deep
---
# REMOTE类

Remote是跟井通底层交互最主要的类，它可以组装交易发送到底层、订阅事件及从底层拉取数据。提供以下方法：

* Remote(options)
* connect(callback)
* disconnect()
* requestServerInfo()
* requestLedgerClosed()
* requestLedger(options)
* requestTx(options)
* requestAccountInfo(options)
* requestAccountTums(options)
* requestAccountRelations(options)
* requestAccountOffers(options)
* requestAccountTx(options)
* requestOrderBook(options)
* requestBrokerage(options)
* buildPaymentTx(options)
* buildRelationTx(options)
* buildAccountSetTx(options)
* buildOfferCreateTx(options)
* buildOfferCancelTx(options)
* deployContractTx(options)
* callContractTx(options)
* buildBrokerageTx(options)
* initContract(options)
* invokeContract(options)
* on('transactions',callback)
* on('ledger_closed',callback)

## 创建Remote对象

方法：new Remote(options);

参数:
| 参数 | 类型 | 说明 |
| :----| :---- | :---- |
| server | String | 井通底层服务地址 |
| local_sign | Boolean | 交易是否以本地签名的方式发送给底层 |

::: details {{$frontmatter.checkCode}}

```js
let jlib = require('jingtum-lib');
let Remote = jlib.Remote;
let remote = new Remote({server: 'ws://xxx:port', local_sign:true});
```

:::

## 创建连接

每个Remote对象都应该首先手动连接底层，然后才可以请求底层的数据。请求结果在回调函数callback中。

方法：connect(callback)

参数：回调函数callback(err, result)

返回结果说明:
| 参数 | 类型 | 说明 |
| :----| :---- | :---- |
|fee_base |Integer |基础费用(手续费计算公式因子)|
|fee_ref |Integer |引用费用(手续费计算公式因子)|
|hostid |String |主机名|
|ledger_hash |String |账本hash|
|ledger_index |Integer |区块高度|
|ledger_time |Integer |账本关闭时间|
|pubkey_node |String |节点公钥|
|reserve_base |Integer |账号保留值|
|reserve_inc |Integer |用户每次挂单或信任冻结数量|
|server_status |String |服务器状态|
|validated_ledgers |String |账本区间|

::: details {{$frontmatter.checkCode}}

```js
let jlib = require('jingtum-lib');
let Remote = jlib.Remote;
let remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        console.log('err:',err);
    }else{
        console.log(result);
    }
});
```

返回结果

```js
{ 
  fee_base: 10,
  fee_ref: 10, 
  hostid: 'WALE', 
  ledger_hash: '72F60860465AA0345216B5A7BE93F4B3BF206DEBDC8C3D6418DB2F6019597507',
  ledger_index: 3593973,
  ledger_time: 615023760, 
  load_base: 256, 
  load_factor: 256,
  pubkey_node: 'n9KFgztij6QLsCk4AqDFteyJRJjMFRWV85h75wpaohRm6wVNRmDS', 
  random: 'F54BE300D48DD7DEAC11C2E35E42C725A04DFFF383DB5D9DA404A9B64BCD765F',
  reserve_base: 10000000,
  reserve_inc: 1000000,
  server_status: 'full',
  validated_ledgers: '2-3593973' 
}
```

:::

## 关闭连接

每个Remote对象可以手动关闭连接。

方法：disconnect()

参数：无
::: details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        console.log('err:',err);
    }else{
        remote.disconnect(); //关闭连接
    }
});
```

:::

## 请求底层服务器信息

首先通过本方法返回一个Request对象，然后通过submit方法获得井通底层的服务器信息，包含服务程序版本号version、该服务器缓存的账本区间ledgers、节点公钥node、服务器当前状态state。其中服务器当前状态包含可提供服务状态full和验证节点状态proposing。

方法：requestServerInfo()

参数：无

返回：Request对象

返回结果说明：
|参数 |类型 |说明 |
| :----| :---- | :---- |
|complete_ledgers |String |账本区间|
|ledger |String |最新账本hash|
|public_key |String |节点公钥|
|state |String |服务器状态|
|peers |Number |节点连接数(不包含自己)|
|version |String |服务器部署项目版本|

::: details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        console.log('err:', err);
    } else {
        var req = remote.requestServerInfo();
        req.submit(function (err, result) {
            if (err) {
                console.log('err:', err);
            }
            else {
                console.log('serverInfo:', result);
            }
        });
    }
});
```

返回结果

```js
{ 
  complete_ledgers: '2-3594053',
  ledger: 'B673D6EB89DDF5D537821B9F5A74486A05EEC302535940CCF3A4ED7623A0A074',
  public_key: 'n9KFgztij6QLsCk4AqDFteyJRJjMFRWV85h75wpaohRm6wVNRmDS',
  state: 'full   03:52:35',
  peers: 5,
  version: 'skywelld-0.29.60'
}
```

:::

## 获取最新账本信息

首先通过本方法返回一个Request对象，然后通过submit方法获得最新账本信息，包括区块高度(ledger_index)与区块hash(ledger_hash)。

方法：requestLedgerClosed()

参数：无

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :---- | :---- |
|ledger_hash |String |账本hash|
|ledger_index |Number |账本高度/区块高度|

::: details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        console.log('err:', err);
    } else {
        var req = remote.requestLedgerClosed();
        req.submit(function (err, result) {
            if (err) {
                console.log('err:', err);
            }
            else {
                console.log(result);
            }
        });
    }
});
```

返回结果

```js
{ 
  ledger_hash: 'C782A51A3405484B99DD1E0F5962D6D8629845240E973F47D72F6283BB502BF3',
  ledger_index: 3594119
}
```

:::

## 获取某一账本具体信息

首先通过本方法返回一个Request对象，然后通过submit方法获得某一账本的具体信息。

方法：remote.requestLedger({ledger_index:’8488670’,transactions:true});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|ledger_index |Number |井通区块高度|
|ledger_hash |String |井通区块hash(与上面ledger_index二选一，若两个都写，以本字段为准)|
|transactions |Boolean |是否返回账本上的交易记录hash，默认false|

**注：整体参数是Object类型，当参数都不填时，默认返回最新账本信息。**

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|accepted |Boolean |区块是否已经产生|
|account_hash |String |状态hash树根|
|close_time |Integer |关闭时间|
|close_time_human |String |关闭时间|
|close_time_resolution |Integer |关闭周期|
|closed |Boolean |账本是否已经关闭|
|hash |String |账本hash|
|ledger_hash |String |账本hash|
|ledger_index |String |账本高度/区块高度|
|parent_hash |String |上一区块hash值|
|seqNum |String |账本高度/区块高度|
|totalCoins |String |swt总量|
|total_coins |String |swt总量|
|transaction_hash |String |交易hash树根|
|transactions |Array |该账本里的交易列表|

::: details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    //var req = remote.requestLedger({});//将默认返回最新账本信息
    var req = remote.requestLedger({
        ledger_index: 3637979, 
        transactions: true 
    });
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log(result);
        }
    });
});
```

返回结果

```js
{ 
  accepted: true,
  account_hash: '81A32C91AB405F1761A98088A92F307D40A1F77DEF43DD25DFD2E619B3DF390E',
  close_time: 615463820,
  close_time_human: '2019-Jul-03 10:10:20',
  close_time_resolution: 10,
  closed: true,
  hash: 'FBE16D38BE8B8FAAC139D8162183D6DA4D0BC88DCD267644ADC4A95679458CCB',
  ledger_hash: 'FBE16D38BE8B8FAAC139D8162183D6DA4D0BC88DCD267644ADC4A95679458CCB',
  ledger_index: '3637979',
  parent_hash: 'B0EE6597B5F0AD98A13C83AE7F1EAF1AECE7CAD10E0586E7EED9B7230A00E46DD',
  seqNum: '3637979',
  totalCoins: '600000000000000000',
  total_coins: '600000000000000000',
  transaction_hash: '05B107D3F0041A23C0D758A39290ED01B3E4BD686B7B978BF78C9461A9117A26',
  transactions:[ 'C79B437A27DEF0761F98421190D4FFDB2F4F9947C7089E6E9AF04D9BF3FCD70A' ]
}
```

:::

## 查询某一交易具体信息

首先通过本方法返回一个Request对象，然后通过submit方法获得某一交易的具体信息。

方法：remote.requestTx({hash:’xxx’});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|hash |String |交易hash|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|Account |String |钱包地址|
|Platform |String |平台标识账号（挂单中设置了platform时，此参数才有）|
|Amount |String/Object |交易金额|
|Destination |String |交易对家地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Memos |Array |备注|
|Sequence |Integer |自身账号的交易号|
|SigningPubKey |String |签名公钥|
|Timestamp |Integer |交易提交时间戳|
|TransactionType |String |交易类型|
|TxnSignature |String |交易签名|
|date |Integer |交易进账本时间|
|hash |String |交易hash|
|inLedger |Integer |交易所在的账本号|
|ledger_index |Integer |账本高度|
|**meta** | **Object** |交易影响的节点|
|validated |Boolean |交易是否通过验证|

|属性(meta) |类型 |说明|
| :----| :----| :----|
|AffectedNodes |Array |受影响的节点|
|TransactionIndex |Integer |--|
|TransactionResult |String |交易结果|
|delivered_amount |String |--|

::: details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var req = remote.requestTx({hash: '744A689B030E2F6F1CBFF94B0E52C0F1CDEED5B85D86ACAA0BC76F42C16A2AFC'});
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
            var fee = result.Fee/1000000;
            console.log('关键信息：【 交易费:', fee, '】');
        }
    });
});
```

返回结果

```js
{ 
  Account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
  Amount: '1000000',
  Destination: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
  Fee: '10000',
  Flags: 0,
  Memos: [ { Memo: [Object] } ],
  Sequence: 32,
  SigningPubKey: '02FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD167',
  Timestamp: 615464508,
  TransactionType: 'Payment',
  TxnSignature: '3044022009294437FD19BC2574C2A193CF72577CA2E0CE09B56A0C506EA1C35E3ECCAAE902204929895243312401161767B22504CFE07D5974BEED79FE8DCC1C121C5865BD03',
  date: 615464520,
  hash: '744A689B030E2F6F1CBFF94B0E52C0F1CDEED5B85D86ACAA0BC76F42C16A2AFC',
  inLedger: 3638049,
  ledger_index: 3638049,
  meta: {
    AffectedNodes: [ [Object], [Object], [Object] ],
    TransactionIndex: 0,
    TransactionResult: 'tesSUCCESS',
    delivered_amount: 'unavailable'
  },
  validated: true 
}
```

:::

## 请求账号信息

首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号的交易信息。

方法：remote.requestAccountInfo({account:’xxx’});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |井通钱包地址|

返回：Request对象
|参数 |类型 |说明|
| :----| :----| :----|
|**account_data** |**Object** |账号信息|
|ledger_index |Integer |账本高度|
|validated |Boolean |交易是否通过验证|

|属性(account_data) |类型 |说明|
| :----| :----| :----|
|Account |String |钱包地址|
|Balance |String |swt数量|
|Domain |String |域名|
|Flags |Integer |属性标志|
|LedgerEntryType |String |账本数据结构类型，AccountRoot表示账号类型|
|MessageKey |String |公共密钥，用于发送加密的邮件到这个帐户|
|OwnerCount |Integer |用户拥有的挂单数和信任线数量的总和|
|PreviousTxnID |String |操作该帐号的上一笔交易hash|
|PreviousTxnLgrSeq |Integer |该帐号上一笔交易所在的账本号|
|RegularKey |String |RegularKey|
|Sequence |Integer |账号当前序列号|
|index |String |该数据所在索引hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'};
    var req = remote.requestAccountInfo(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account_data:
  { Account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
    Balance: '999926380006',
    Flags: 0,
    LedgerEntryType: 'AccountRoot',
    OwnerCount: 1,
    PreviousTxnID: '744A689B030E2F6F1CBFF94B0E52C0F1CDEED5B85D86ACAA0BC76F42C16A2AFC',
    PreviousTxnLgrSeq: 3638049,
    Sequence: 33,
    index: 'E80FF91725E82A623ADC46B458D37FB270651A76A07CD6C8115F1202856342E6' },
  ledger_hash: 'AFF5D2D4A88297F65442F97A1488F476B849617511FF93D49B6E59F84BE7822F',
  ledger_index: 3644878,
  validated: true 
}
```

:::

## 获得账号可接收和发送的货币

首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号可发送和接收的货币种类。

方法：remote.requestAccountTums({account:’xxx’});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |井通钱包地址|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|ledger_hash |String |账本hash|
|ledger_index |Integer |账本高度|
|receive_currencies |Array |可接收的货币列表|
|send_currencies |Array |可发送的货币列表|
|validated |Boolean |交易是否通过验证|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'};
    var req = remote.requestAccountTums(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  ledger_hash: '5C8E1048AEC83C50E550EFE3CF474D011B8BA4FF03D6BD09334753B0FE33A7B2',
  ledger_index: 3645061,
  receive_currencies:
   [ 'CNY' ],
  send_currencies:
   [ 'CNY' ],
  validated: true 
}
```

:::

## 获得账号关系

井通账户之间会建立各种不同的关系。这些关系由井通后台的关系（relations）机制来处理，目前支持以下关系：信任(trust)、授权(authorize)、冻结(freeze)。
首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号指定关系的信息。

方法：remote.requestAccountRelations({account:’xxx’,type:’xxx’});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |井通钱包地址|
|type |String |关系类型，固定的三个值：trust、authorize、freeze|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |钱包地址|
|ledger_hash |String |账本hash|
|ledger_index |Integer |账本高度|
|**lines** |**Array[Object]** |该账户的信任线|
|validated |Boolean |交易是否通过验证|

|属性(lines) |类型 |说明|
| :----| :----| :----|
|account |String |信任的银关|
|balance |String |余额|
|currency |String |货币种类|
|limit |String |信任额度|
|limit_peer |String |对方设置的信任额度，默认0|
|no_skywell |Boolean |信任线标记，暂时没用|
|quality_in |Integer |兑换比例，默认0，暂时未用|
|quality_out |Integer |兑换比例，默认0，暂时未用|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',type:'trust'};
    var req = remote.requestAccountRelations(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
  ledger_hash: '0A73F0CC75803D62DB29957A31F30778A1606A2946A4A7B71360D81B9697C9C1',
  ledger_index: 3645086,
  lines:
   [ { account: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       balance: '100000',
       currency: 'CNY',
       limit: '1000000000',
       limit_peer: '0',
       no_skywell: true,
       quality_in: 0,
       quality_out: 0 } ],
  validated: true 
}
```

:::

## 获得账号挂单

首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号的挂单信息。

方法：remote.requestAccountOffers({account:’xxx’});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account| String| 井通钱包地址|

返回：Request对象

返回结果说明：

|参数 |类型 |说明|
| :----| :----| :----|
|account |String |钱包地址|
|ledger_hash |String |账本hash|
|ledger_index |Integer |账本高度|
|**offers** |**Array** |该账户的挂单列表|
|validated |Boolean |交易是否通过验证|

|属性(offers) |类型 |说明|
| :----| :----| :----|
|Platform |String |平台标识账号，设置了才有此字段|
|FeeCurrency |String |货币种类|
|OfferFeeRateDen |String |分母|
|OfferFeeRateNum |String |分子|
|flags |Integer |买卖类型（131072表示卖，否则是买）|
|seq |String |余额|
|**taker_gets** |**String** |货币种类|
|**taket_pays** |**String** |信任额度|

|属性(taker_gets) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |货币种类|
|issuer |String |货币|

|属性(taket_pays) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |货币种类|
|issuer |String |货币|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'};
    var req = remote.requestAccountOffers(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
  ledger_hash: 'A88647AE9459F2E9538190D857D82437003C21769DE22D6A2F041A33F83E2753',
  ledger_index: 8643476,
  offers:
   [ { FeeCurrency: 'VCC',
       OfferFeeRateDen: '1000',
       OfferFeeRateNum: '3',
       Platform: 'jB77p5n7ekApSzbefoHpuqopPX3k49u71i',
       flags: 131072,
       seq: 206,
       taker_gets: { 
          currency: 'USD',
          issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
          value: '0.5' },
          taker_pays: '10000000' },    
     { FeeCurrency: 'VCC',
       OfferFeeRateDen: '1000',
       OfferFeeRateNum: '3',
       Platform: 'jB77p5n7ekApSzbefoHpuqopPX3k49u71i',
       flags: 131072,
       seq: 1859,
       taker_gets: { 
          currency: 'USD',
          issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
          value: '0.5' },
          taker_pays: '1000000' } ],
  validated: true 
}
```

:::

## 获得账号交易列表

首先通过本方法返回一个Request对象，然后通过submit方法获得某一账号的交易列表信息。

方法：remote.requestAccountTx({account:’xxx’});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |井通钱包地址|
|limit |Integer |限定返回多少条记录，默认200|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |钱包地址|
|ledger_index_max |Integer |当前节点缓存的账本区间最大值|
|ledger_index_min |Integer |当前节点缓存的账本区间最小值|
|limit |Integer |限定返回的记录条数|
|marker |Object |查到的当前记录标记|
|**transactions** |**Array** |交易记录列表|

|属性(transactions) |类型 |说明|
| :----| :----| :----|
|date |Integer |时间戳|
|hash |String |交易hash|
|type |String |交易类型|
|fee |String |手续费|
|result |String |交易结果|
|memos |Array |备注|
|counterparty |String |交易对家|
|**amount** |**Object** |交易金额对象|
|effects |Array |交易效果，详见后面effects说明。|
|balances |Object |每笔交易后变动的币种余额|
|balancesPrev |Object |每笔交易后变动前的币种余额|

|属性(amount) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |货币种类|
|issuer |String |货币|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ', limit:2};
    var req = remote.requestAccountTx(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
  ledger_index_max: 3645132,
  ledger_index_min: 3,
  limit: 2,
  marker: { ledger: 3637979, seq: 0 },
  transactions:
   [ { date: 1562219430,
       hash: '6C357AE19525BBF7EE3324356AFBBE7399E828A5AF1219B8098654DD8A1EE262',
       type: 'received',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [],
       counterparty: 'jL8L5f56zjFfmBBq19nvDTuVRfAQ7n19aJ',
       amount: [Object],
       effects: [],
       balances: [Object], 
       balancesPrev: [Object] },   
       { date: 1562149320,
       hash: '744A689B030E2F6F1CBFF94B0E52C0F1CDEED5B85D86ACAA0BC76F42C16A2AFC',
       type: 'sent',
       fee: '0.01',
       result: 'tesSUCCESS',
       memos: [Array],
       counterparty: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
       amount: [Object],
       effects: [],
       balances: [Object],
       balancesPrev: [Object] } ]
}
```

:::

## 获得市场挂单列表

首先通过本方法返回一个Request对象，然后通过submit方法获得市场挂单列表信息。

方法：remote.requestOrderBook({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|gets |Object |对家想要获得的货币信息|
|pays |Object |对家想要支付的货币信息|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|ledger_current_index |String |当前账本号|
|**offers** |**Array[Object]** |市场挂单列表|
|validated |Boolean |交易是否通过验证|

|属性(offers) |类型 |说明|
| :----| :----| :----|
|Account |Integer |账号地址|
|BookDirectory |String |--|
|BookNode |String |--|
|Flags |Integer |挂单买卖标记|
|FeeCurrency |String |收费币种|
|OfferFeeRateDen |String |分母|
|OfferFeeRateNum |String |分子|
|Platform |String |平台标识账号|
|LedgerEntryType |String |账本数据结构类型，Offer表示挂单类|
|OwnerNode |Array |--|
|PreviousTxnID |String |上一笔交易hash|
|PreviousTxnLgrSeq |Integer |上一笔交易所在账本号|
|Sequence |Integer |单子序列号|
|**TakerGets** |**Object** |对方得到的。（买卖双方，当货币是swt时，数据类型为对象；否则为string）|
|**TakerPays** |**String** |对方支付的|
|index |String |该数据所在索引hash|
|owner_funds |String |用户swt资产|
|quality |String |价格或价格的倒数|

|属性(TakerGets) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |货币种类|
|issuer |String |货币|

|属性(TakerPays) |类型 |说明|
| :----| :----| :----|
|value |String |金额|
|currency |String |货币种类|
|issuer |String |货币|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = { 
  gets: { currency: 'SWT', issuer: '' },
        pays: { currency: 'CNY', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS' }};
    var req = remote.requestOrderBook(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  ledger_current_index: 8649275,
  offers:
   [ { Account: 'j9eM8GiBb4QFRZZsrsde6XTPDenXEFnrkm',
       BookDirectory: '61EF253552DDD8E9D5A1071C81591086E0132391F92311BB5B03BD5CE35839AA',
       BookNode: '0000000000000000',
       Flags: 0,
       LedgerEntryType: 'Offer',
       OwnerNode: '0000000000000000',
       PreviousTxnID: '547266B62E7B0931F829C58B89541BCFE94ECB1EA78E712D8DAD071D40A1EDB9',
       PreviousTxnLgrSeq: 8574138,
       Sequence: 11,
       TakerGets: [Object],
       TakerPays: '1028266745029520',
       index: 'CDD0F0DE4D63DB7F208B6EF5A84D2FE5A8CDD53DB68B876A17E9EE357EFC877B',
       owner_funds: '988270574.4452997',
       quality: '1052631.578982826' },
     { Account: 'jKog7BTbU7wzDDDH3FPPmveszWQnZSeP5W',
       BookDirectory: '61EF253552DDD8E9D5A1071C81591086E0132391F92311BB5B03C78C2C91CEFB',
       BookNode: '0000000000000000',
       Flags: 0,
       LedgerEntryType: 'Offer',
       OwnerNode: '0000000000000000',
       PreviousTxnID: 'BBB6A770A818427EC3B3778F94EF1577704EFCAD0C7602740E304207E9FC4943',
       PreviousTxnLgrSeq: 1352529,
       Sequence: 10,
       TakerGets: [Object],
       TakerPays: '100000000',
       index: '9EDE0EDF25FA1AAC26B11DB38F90095AC8A84351B4B83773162A5B76BFF98674',
       owner_funds: '1001841.261900998',
       quality: '1063829.787234043' },
     ... 200 more items ],
  validated: false 
}
```

:::

## 获得挂单佣金设置信息

首先通过本方法返回一个Request对象，然后通过submit方法获得挂单佣金设置信息。

方法：remote.requestBrokerage({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |设置挂单佣金的账号|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |设置佣金的账号或银关|
|**brokerages** |**Array** |设置的所有佣金详情|
|ledger_hash |String |当前hash|
|ledger_index |Integer |当前账本号|
|validated |Boolean |交易是否通过验证|

|属性(brokerages) |类型 |说明|
| :----| :----| :----|
|FeeCurrency |String |收费币种|
|FeeCurrencyIssuer |String |货币发行方|
|OfferFeeRateDen |String |分母|
|OfferFeeRateNum |String |分子|
|Platform |String |平台标识账号|
|fee_account |String |收费账号|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = { 
  account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh'};
    var req = remote.requestBrokerage(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  brokerages: 
   [ { FeeCurrency: 'AAA',
       FeeCurrencyIssuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
       OfferFeeRateDen: '1000',
       OfferFeeRateNum: '5',
       Platform: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
       fee_account: 'jzTx4CRUZJT1ZsBhGHi7Wqikada63xRVv' } ],
  ledger_hash: 'EEEECA6766A17D4113CDF2FC6DA05C2B735EDFB437EF2546DEDBA127AF63B2BE',
  ledger_index: 1633,
  validated: true
}
```

:::

## 获得签名列表

首先通过本方法返回一个Request对象，然后通过submit方法获得市场挂单列表信息。

方法：remote.requestSignerList({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |设置签名列表的源账号|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |设置签名列表的源账号|
|**account_objects** |**Array[Object]** |签名列表相关信息|
|ledger_current_index |String |当前账本号|
|validated |Boolean |当前账本中，交易是否通过验证|

|属性(account_objects) |类型 |说明|
| :----| :----| :----|
|Flags |Integer |交易标记|
|LedgerEntryType |String |账本数据结构类型，SignerList表示签名列表类型|
|OwnerNode |String |列表索引标记|
|PreviousTxnID |String |上一笔交易hash|
|PreviousTxnLgrSeq |Integer |上一笔交易所在账本号|
|**SignerEntries** |**Array[Object]** |签名列表|
|SignerQuorum |Integer |签名列表阈值|
|index |String |签名列表id|

|属性(SignerEntry) |类型 |说明|
| :----| :----| :----|
|Account |String |签名者账号地址|
|SignerWeight |Integer |该签名者在签名列表中的权重|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = { 
  account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh'};
    var req = remote.requestSignerList(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  account_objects: 
   [ {  Flags: 0,
       LedgerEntryType: 'SignerList',
       OwnerNode: '0000000000000000',
       PreviousTxnID: '01D05D192B8AD17A6D1D4627A2778D61A48622392B9B47BB5E840D92BF06E8CA',
       PreviousTxnLgrSeq: 26120,
       SignerEntries: [ { SignerEntry: 
         { Account: 'jpX8SEpM387c9tpdAUfBr2gYTfC2k7RatA',
                SignerWeight: 2 } },
         { SignerEntry: 
            { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
              SignerWeight: 2 } },
         { SignerEntry: 
            { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
              SignerWeight: 2 } } ],
       SignerQuorum: 3,
       index: 'E1C0156713A82509084245A7242E627EB656167D5A4F0C56A68A53FBC17C653E' } ],
  ledger_current_index: 26510,
  validated: false
}
```

:::

## 获得黑名单列表或账号状态

首先通过本方法返回一个Request对象，然后通过submit方法获得市场挂单列表信息。

方法：remote.requestBlacklist({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |可选，查询具体某个账号是否处于黑名单状态|
|marker |String |可选，向下查找的标记|

返回：Request对象

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |设置签名列表的源账号|
|blacklist |Boolean |是否是黑名单状态|
|ledger_hash |String |账本hash|
|ledger_index |String |账本高度|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = { 
  account: 'jfkgNWMZWYsYD6PzB4braCtQQNSNrstUmi'};
    var req = remote.requestBlacklist(options);
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  account: 'jfkgNWMZWYsYD6PzB4braCtQQNSNrstUmi',
  blacklist: true,
  ledger_hash: '199549455126B6674B203BE2310F29E97C9FD02A5C3F347F969BD0060D87AD8C',
  ledger_index: '14275428'
}
```

:::

## 支付

首先通过buildPaymentTx方法返回一个Transaction对象，然后通过setSecret传入密钥，addMemo添加备注为可选项，最后通过submit方法提交支付信息。

### 创建支付对象

方法：remote.buildPaymentTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |发起账号|
|to |String |目标账号|
|**amount** |**Object** |支付金额|

|属性(amount) |类型 |说明|
| :----| :----| :----|
|value |String |支付数量|
|currency |String |货币种类，三到六个字母或20字节的自定义货币|
|issuer |String |货币发行方|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 设置备注

方法：tx.addMemo(memo);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|memo |String |备注信息|

### 提交支付

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |账号地址|
|Amount |String |交易金额|
|Destination |String |对家|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Memos |Array |备注|
|Sequence |Integer |单子序列号|
|SigningPubKey |Object |签名公钥|
|TransactionType |String |交易类型|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var tx = remote.buildPaymentTx({
        account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        to: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
        amount: {
        "value": 5,
        "currency": "SWT",
        "issuer": ""
        }
    });
    tx.setSecret('sn37nYrQ6KPJvTFmaBYokS3FjXUWd');
    tx.addMemo('支付5swt.');//可选
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '120000220000000024000000236140000000004C4B40684000000000002710732102FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD1677446304402206238696F155F863AF941F44373690E9AF4233F9548F05F10B05084B4243640E3022010684A730C9C8E3267AD5A12AF38A0E0B1A52EE2A4023FC6E03350C23CF22483811472F05993EBA9858291D364EBF6EEC3D851BD3792831485B6C98BAD6DBF7805D3C5CCC1B4F989E0CE6749F9EA7D0BE694AFE4BB98357377742EE1F1',
  tx_json:
   { Account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
     Amount: '5000000',
     Destination: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
     Fee: '10000',
     Flags: 0,
     Memos: [ [Object] ],
     Sequence: 35,
     SigningPubKey: '02FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD167',
     TransactionType: 'Payment',
     TxnSignature: '304402206238696F155F863AF941F44373690E9AF4233F9548F05F10B05084B4243640E3022010684A730C9C8E3267AD5A12AF38A0E0B1A52EE2A4023FC6E03350C23CF22483',
     hash: '8C2A3212511E0CB84B4958DB8869AD6861C4439BA6487BA17B77AE4F1F738C85' }
}
```

:::

## 设置关系

首先通过buildRelationTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法提交支付信息。目前支持的关系类型：信任(trust)、授权(authorize)、冻结(freeze)。

### 创建关系对象

方法：remote.buildRelationTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|type |String |关系种类|
|account |String |设置关系的源账号|
|target |String |目标账号，授权和冻结才有|
|**limit** |**Object** |关系金额|

|属性(limit) |类型 |说明|
| :----| :----| :----|
|value |String |数量|
|currency |String |货币种类，三到六个字母或20字节的自定义货币|
|issuer |String |货币发行方|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 关系设置

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|tx_json |Object |交易内容|
|RelationType |Integer |关系类型：0信任(信任关系中，该字段不显示)；1授权；3冻结/解冻；|
|Sequence |Integer |单子序列号|
|SigningPubKey |Object |签名公钥|
|Target |String |关系对家，有对家才显示|
|Timestamp |Integer |时间戳，签名方式没有该字段|
|TransactionType |String |交易类型：TrustSet信任;RelationDel解冻；RelationSet授权/冻结|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|LimitAmount |Object |关系的额度|

|属性(LimitAmount) |类型 |说明|
| :----| :----| :----|
currency |String |货币|
|issuer |String |货币发行方|
|value |String |额度|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {
        account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        limit:{ 
            currency: 'CNY',
            value: '3000000000', 
            issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'
        },
        type:'trust'
    };
    var tx = remote.buildRelationTx(options);
    tx.setSecret('sn37nYrQ6KPJvTFmaBYokS3FjXUWd');
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '1200142200000000240000002B63D6CAA87BEE538000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED32684000000000002710732102FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD16774473045022100B1F3D3BC700739D234531096474F604ABE7A8E2499D3978B328984A8F966551A0220493513CB305F2D39E4E685991302CFC44740AC7D6036240D225911C6081828CC811472F05993EBA9858291D364EBF6EEC3D851BD3792',
  tx_json:
   { Account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
     Fee: '10000',
     Flags: 0,
     LimitAmount:
      { currency: 'CNY',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '3000000000' },
     Sequence: 43,
     SigningPubKey: '02FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD167',
     TransactionType: 'TrustSet',
     TxnSignature: '3045022100B1F3D3BC700739D234531096474F604ABE7A8E2499D3978B328984A8F966551A0220493513CB305F2D39E4E685991302CFC44740AC7D6036240D225911C6081828CC,
     hash: 'E9A0DD0110C9400C3E3C1619327D1037FC4377141EF8D79120F00B3FCAB0D914' }
}
```

:::

## 设置账号属性

首先通过buildAccountSetTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法设置账号属性。目前支持的三类：`property`、 `delegate` 、`signer`。property用于设置账号一般属性；delegate用于某账号设置委托帐户；signer用于设置签名。

### 创建属性对象

方法：remote.buildAccountSetTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|type |String |属性种类|
|account |String |设置属性的源账号|
|set_flag |String |属性编号|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 属性设置

方法：tx.submit(callback);

参数：无

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
    }
    var options = {
        account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        type:'property'
    };
    var tx = remote.buildAccountSetTx(options);
    tx.setSecret('sn37nYrQ6KPJvTFmaBYokS3FjXUWd');
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

:::

## 挂单

首先通过buildOfferCreateTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法提交挂单。

### 创建挂单对象

方法：remote.buildOfferCreateTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|type |String |挂单类型，固定的两个值：Buy、Sell|
|account |String |挂单方账号|
|platform |String |平台标识账号，可选|
|**taker_gets** |**Object** |对方得到的，即挂单方支付的|
|**taker_pays** |**Object** |对方支付的，即挂单方获得的|

|属性(taker_gets) |类型 |说明|
| :----| :----| :----|
value String |数量|
|currency |String |货币种类|
|issuer |String |货币发行方|

|属性(taker_pays) |类型 |说明|
| :----| :----| :----|
|value |String |数量|
|currency |String |货币种类|
|issuer |String |货币发行方|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 提交挂单

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|tx_json |Object |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |账号地址|
|Fee |String |交易费|
|Platform |String |平台标记账号，设置了才有此字段|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|TakerGets |Object |对家得到的|
|TakerPays |String |对家支付的；|
|Timestamp |Integer |时间戳，签名方式没有该字段|
|TransactionType |String |交易类型：TrustSet信任;RelationDel解冻；RelationSet授权/冻结|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

|属性(TakerGets) |类型 |说明|
| :----| :----| :----|
|currency |String |货币|
|issuer |String |货币发行方|
|value |String |额度|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {
        type: 'Sell',
        account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        taker_gets: {
            value: '1',
            currency: 'CNY',
            issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'
        },
        taker_pays: {
            value: '200',
            currency: 'SWT',
            issuer: ''
        }
    };
    var tx = remote.buildOfferCreateTx(options);
    tx.setSecret('sn37nYrQ6KPJvTFmaBYokS3FjXUWd');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '120007220008000024000000212F24B0561864400000000BEBC20065D4838D7EA4C68000000000000000000000000000434E5900000000007478E561645059399B334448F7544F2EF308ED32684000000000002710732102FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD1677446304402207849F557F36C99D1977A5BE84451E9D92098F0DDD23FBB02B43C3ABCCFF5718B02207AF79377A402FACF5BAD79906D53A2CD071AEFBBF02F34AC16BA85F0DECF7F89811472F05993EBA9858291D364EBF6EEC3D851BD3792',
  tx_json:
   { Account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
     Fee: '10000',
     Flags: 524288,
     Sequence: 33,
     SigningPubKey: '02FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD167',
     TakerGets:
      { currency: 'CNY',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '1' },
     TakerPays: '200000000',
     TransactionType: 'OfferCreate',
     TxnSignature: '304402207849F557F36C99D1977A5BE84451E9D92098F0DDD23FBB02B43C3ABCCFF5718B02207AF79377A402FACF5BAD79906D53A2CD071AEFBBF02F34AC16BA85F0DECF7F89',
     hash: 'C120ACB1869F20DF9955F4CF9B10AC033C373B7D653A601FEFF164997D1D4DD9' }
}
```

:::

## 取消挂单

首先通过buildOfferCancelTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法取消挂单。

### 创建取消挂单对象

方法：remote.buildOfferCancelTx({});


参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |挂单方账号|
|sequence |Integer |取消的单子号|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 取消挂单

方法：tx.submit(callback);

参数：无

返回结果说明：

|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|OfferSequence |Integer |取消的单子号|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|Timestamp |Integer |时间戳，签名方式没有该字段|
|TransactionType |String |交易类型：OfferCancel取消订单|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ', sequence: 33};
    var tx = remote.buildOfferCancelTx(options);
    tx.setSecret('sn37nYrQ6KPJvTFmaBYokS3FjXUWd');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '1200082200000000240000002C201900000021684000000000002710732102FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD16774463044022079DEE5E39A5A682E10270E411B95036ACA0F4928119B3A9E5BA58A32BFC392BC022024AA19530FE6D8D61F46875D920DCCB3253AD97D3998E3BF1200F608DBC9A9F3811472F05993EBA9858291D364EBF6EEC3D851BD3792',
  tx_json:
   { Account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
     Fee: '10000',
     Flags: 0,
     OfferSequence: 33,
     Sequence: 44,
     SigningPubKey: '02FE64E0C20F0058F22F3742EDC15F49F318C04F88B130742C68BAF3B1C89FD167',
     TransactionType: 'OfferCancel',
     TxnSignature: '3044022079DEE5E39A5A682E10270E411B95036ACA0F4928119B3A9E5BA58A32BFC392BC022024AA19530FE6D8D61F46875D920DCCB3253AD97D3998E3BF1200F608DBC9A9F3',
     hash: '700894697DB481487599C907872BF721722791718AE704F11FFC3A5E77FDA9FE' }
}
```

:::

## 部署合约（Lua版）

首先通过deployContractTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法部署合约。

### 创建部署合约对象

方法：remote.deployContractTx({});
参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |合约交易源账号|
|amount |String/Number |支付金额(最多支持六位小数)|
|payload |String |智能合约代码(16进制字符串)|

可选参数：

|参数 |类型 |说明|
| :----| :----| :----|
|params |String |合约参数|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |源账号私钥|

### 部署合约

方法：tx.submit(callback);

参数：无

返回结果说明：

|参数 |类型 |说明|
| :----| :----| :----|
|ContractState |String |生成的合约地址|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|参数 |类型 |说明|
| :----| :----| :----|
|Account |String |账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Method |Integer |合约交易方法：0表示部署；1表示调用|
|Payload |Integer |16进制合约代码|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型：ConfigContract部署合约|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var utils = jlib.utils;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {account: 'jHb9***tyTh', amount: 10,payload: utils.stringToHex('result={};  function Init(t)  result=scGetAccountBalance(t)  return result  end;  function foo(t)  result=scGetAccountBalance(t)  return result  end'),params: ['jHb9***tyTh']};
    var tx = remote.deployContractTx(options);
    tx.setSecret('s**');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  ContractState: 'jQUzfdE2ZnQLz3AbxuSbyyyQhuoXAxUn3A',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '12001E220000000024000004FA20240000000061400000000098968068400000000000271073210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100E53D151ED6EEC46124CB75C0ED0DCACC7D4458B56109252431DAA80D11D1099802207FE4C2987AFBBD7F1FEC6DBFBD9A32C35D2F82CEC44E5AA6EE3DE0E58F1D8B627F94726573756C743D7B7D3B202066756E6374696F6E20496E69742874292020726573756C743D73634765744163636F756E7442616C616E6365287429202072657475726E20726573756C742020656E643B202066756E6374696F6E20666F6F2874292020726573756C743D73634765744163636F756E7442616C616E6365287429202072657475726E20726573756C742020656E648114B5F762798A53D543A014CAF8B297CFF8F2F937E8FAEB7012226A486239434A41577942346A7239315652576E3936446B756B473462776474795468E1F1',
  tx_json:
   { Account: 'jHb9***tyTh',
     Amount: '10000000',
     Args: [ [Object] ],
     Fee: '10000',
     Flags: 0,
     Method: 0,
     Payload: '726573756C743D7B7D3B202066756E6374696F6E20496E69742874292020726573756C743D73634765744163636F756E7442616C616E6365287429202072657475726E20726573756C742020656E643B202066756E6374696F6E20666F6F2874292020726573756C743D73634765744163636F756E7442616C616E6365287429202072657475726E20726573756C742020656E64',
     Sequence: 1274,
     SigningPubKey: '0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020',
     TransactionType: 'ConfigContract',
     TxnSignature: '3045022100E53D151ED6EEC46124CB75C0ED0DCACC7D4458B56109252431DAA80D11D1099802207FE4C2987AFBBD7F1FEC6DBFBD9A32C35D2F82CEC44E5AA6EE3DE0E58F1D8B62',
     hash: 'D7E40A7164C11BFA81C05117010631EA5BCBD8A1A0B3B2FF343D9FB3F3575936'  }
}
```

:::



## 执行合约

首先通过callContractTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法执行合约。

### 创建执行合约对象

方法：remote.callContractTx({});

|参数 |类型 |说明|
| :----| :----| :----|
|account |String |合约交易源账号|
|destination |String |合约地址|
|func |String |合约函数名|

可选参数：

|参数 |类型 |说明|
| :----| :----| :----|
|params |String |合约参数|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |源账号私钥|

### 执行合约

方法：tx.submit(callback);
参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|ContractState |String |调用的合约结果|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |账号地址|
|Args |Array |合约传入的参数|
|ContractMethod |String |合约函数名|
|Destination |String |调用的合约地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Method |Integer |合约交易方法：0表示部署；1表示调用|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型：ConfigContract合约类|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var options = {account: 'jHb9***tyTh', destination: 'j4YVQxCxaRRQ6gCVUvi9MoiTfWyPRnHwej',func: 'foo',params: ['jHb9***tyTh']};
    var tx = remote.callContractTx(options);
    tx.setSecret('s**');
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  ContractState: '599868797812411271',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '12001E220000000024000004FC20240000000168400000000000271073210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100835BEDFD6794F3B95A31971EDBF1865F9190D1A66FFC9515883B15107B368894022052F44E0E16B6A3BC3C8CF2A3881E35687060EB73B6B0503611CEF58781A512EA701103666F6F8114B5F762798A53D543A014CAF8B297CFF8F2F937E88314EC4F411C3B37C3E451D462C27489B0549650572CFAEB7012226A486239434A41577942346A7239315652576E3936446B756B473462776474795468E1F1',
  tx_json:
   { Account: 'jHb9***tyTh',
     Args: [ [Object] ],
     ContractMethod: '666F6F',
     Destination: 'j4YVQxCxaRRQ6gCVUvi9MoiTfWyPRnHwej',
     Fee: '10000',
     Flags: 0,
     Method: 1,
     Sequence: 1276,
     SigningPubKey: '0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020',
     TransactionType: 'ConfigContract',
     TxnSignature: '3045022100835BEDFD6794F3B95A31971EDBF1865F9190D1A66FFC9515883B15107B368894022052F44E0E16B6A3BC3C8CF2A3881E35687060EB73B6B0503611CEF58781A512EA',
     hash: '8DE51A01F6FA55F5FDBB196A39A1F4220772E19835C81CE2E8A44B487BCD961C' }
}
```

:::

## 设置挂单佣金

首先通过buildBrokerageTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法设置平台手续费。

### 创建挂单佣金对象

方法：remote.buildBrokerageTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |App平台标识账号|
|feeAccount |String |收费账号，必须为激活账号|
|mol |Integer |分子（0和正整数）|
|den |Integer |分母（正整数）|
|**amount** |**Object** |币种对象|

|属性(amount) |类型 |说明|
| :----| :----| :----|
|value |String |数量，这里只是占位，没有实际意义。|
|currency |String |货币种类|
|issuer |String |货币发行方|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |App平台标识账号私钥|

### 设置挂单佣金

方法：tx.submit(callback);

参数：无

返回结果说明：

|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |管理员账号地址|
|Amount |Object |收交易手续费的币种信息|
|Fee |String |网络费|
|feeAccountID |String |收费账号|
|Flags |Integer |交易标记|
|OfferFeeRateDen |String |分母|
|OfferFeeRateNum |String |分子|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型：Brokerage设置交易手续费类|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
     var v = {
        secret: 's...UTb',
        address: 'j...yTh'
    };
    var req = remote.buildBrokerageTx({account: v.address, mol: 1, den: 1000, feeAccount:'jzTx4CRUZJT1ZsBhGHi7Wqikada63xRVv',
        amount: {
        "value": "3",
        "currency": "TES",
        "issuer": "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS"
    }});
    req.setSecret(v.secret);
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '1200CD220000000024000000012025000000013900000000000000013A00000000000003E861D38AA87BEE53800000000000000000000000005445535400000000007478E561645059399B334448F7544F2EF308ED3268400000000000271073210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100FE513087425A863D1FB0004B29C6656E1B4C237F57F193FC5707317257926787022070AA7125CB5383F5B53000903BDAF9926CBE74F732DF7E09BE3EC581FEF5E7C08114B5F762798A53D543A014CAF8B297CFF8F2F937E8',
  tx_json: 
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Amount: 
      { currency: 'TEST',
        issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
        value: '3' },
     Fee: '10000',
     FeeAccountID: 'jzTx4CRUZJT1ZsBhGHi7Wqikada63xRVv',
     Flags: 0,
     OfferFeeRateDen: '00000000000003E8',
     OfferFeeRateNum: '0000000000000001',
     Sequence: 1,
     SigningPubKey: '0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020',
     TransactionType: 'Brokerage',
     TxnSignature: '3045022100FE513087425A863D1FB0004B29C6656E1B4C237F57F193FC5707317257926787022070AA7125CB5383F5B53000903BDAF9926CBE74F732DF7E09BE3EC581FEF5E7C0',
     hash: '3260743D0233EA5B8E2963F00D35B4198BA9EC6BE7638E84C9375A3CBE2172A3' } 
}
```

:::

## 部署合约（Solidity版）

首先通过initContract方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法完成合约的部署。

### 创建合约部署对象

方法：remote.initContract({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |合约发布者|
|amount |Integer |手续费|
|payload |String |合约编译后的16进制字节码|
|abi |Array |合约abi|
|params |Array |可选，合约初始化参数|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |合约发布者账号私钥|

### 部署合约

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|ContractState |String |返回合约账号|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |合约发起者账号地址|
|Amount |Object |收交易手续费的币种信息|
|Fee |String |网络费|
|Flags |Integer |交易标记|
|Method |Integer |合约方法：0表示部署，1表示调用|
|Payload |String |合约编译后的16进制字节码|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型：AlethContract合约类|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
     var v = {
        secret: 's...UTb',
        address: 'j...yTh'
};
    const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "initialSupply",
                    "type": "uint256"
                },
                {
                    "name": "tokenName",
                    "type": "string"
                },
                {
                    "name": "tokenSymbol",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        }
    ];
var tx = remote.initContract({
  account: v.address, 
    amount: 10,
    payload: '60606040526012600260006101000a81548160ff021916908360ff160217905550341561002b57600080fd5b60405161092738038061092783398101604052808051906020019091908051820191906020018051820191905050600260009054906101000a900460ff1660ff16600a0a8302600381905550600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600090805190602001906100d39291906100f3565b5080600190805190602001906100ea9291906100f3565b50505050610198565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013457805160ff1916838001178555610162565b82800160010185558215610162579182015b82811115610161578251825591602001919060010190610146565b5b50905061016f9190610173565b5090565b61019591905b80821115610191576000816000905550600101610179565b5090565b90565b610780806101a76000396000f300606060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461009357806318160ddd14610121578063313ce5671461014a57806370a082311461017957806395d89b41146101c6578063a9059cbb14610254578063dd62ed3e14610296575b341561008e57600080fd5b600080fd5b341561009e57600080fd5b6100a6610302565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100e65780820151818401526020810190506100cb565b50505050905090810190601f1680156101135780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561012c57600080fd5b6101346103a0565b6040518082815260200191505060405180910390f35b341561015557600080fd5b61015d6103a6565b604051808260ff1660ff16815260200191505060405180910390f35b341561018457600080fd5b6101b0600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103b9565b6040518082815260200191505060405180910390f35b34156101d157600080fd5b6101d96103d1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102195780820151818401526020810190506101fe565b50505050905090810190601f1680156102465780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561025f57600080fd5b610294600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061046f565b005b34156102a157600080fd5b6102ec600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061047e565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103985780601f1061036d57610100808354040283529160200191610398565b820191906000526020600020905b81548152906001019060200180831161037b57829003601f168201915b505050505081565b60035481565b600260009054906101000a900460ff1681565b60046020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104675780601f1061043c57610100808354040283529160200191610467565b820191906000526020600020905b81548152906001019060200180831161044a57829003601f168201915b505050505081565b61047a3383836104a3565b5050565b6005602052816000526040600020602052806000526040600020600091509150505481565b6000808373ffffffffffffffffffffffffffffffffffffffff16141515156104ca57600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561051857600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011115156105a657600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401905081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555080600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540114151561074e57fe5b505050505600a165627a7a72305820b2665df0d8d8522803a19ac6bc98ff010121e11c16d0342eaced01d94100ce180029',
   abi: abi,
   params:[2000, 'TestCurrency', 'TEST1']
});
    tx.setSecret(v.secret);
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{
ContractState: 'jPZ1....9Kkh',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '12001F2200000000240000019D2F2410A4D520240000000061400000000098968068400000000000271073210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD0207446304402206C941CF3355094C5E85C2410FBB131288802094B790C399639A543A9DD64DDB1022059EEA991A946A28EA9695AEB2F5F724831C371BB0F9C72D50DD6855BCDF5C07D7FD44D363036303630343035323630313236303032363030303631303130303061383135343831363066663032313931363930383336306666313630323137393035353530333431353631303032623537363030303830666435623630343035313631303932373338303338303631303932373833333938313031363034303532383038303531393036303230303139303931393038303531383230313931393036303230303138303531383230313931393035303530363030323630303039303534393036313031303030613930303436306666313636306666313636303061306138333032363030333831393035353530363030333534363030343630303033333733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230383139303535353038313630303039303830353139303630323030313930363130306433393239313930363130306633353635623530383036303031393038303531393036303230303139303631303065613932393139303631303066333536356235303530353035303631303139383536356238323830353436303031383136303031313631353631303130303032303331363630303239303034393036303030353236303230363030303230393036303166303136303230393030343831303139323832363031663130363130313334353738303531363066663139313638333830303131373835353536313031363235363562383238303031363030313031383535353832313536313031363235373931383230313562383238313131313536313031363135373832353138323535393136303230303139313930363030313031393036313031343635363562356235303930353036313031366639313930363130313733353635623530393035363562363130313935393139303562383038323131313536313031393135373630303038313630303039303535353036303031303136313031373935363562353039303536356239303536356236313037383038303631303161373630303033393630303066333030363036303630343035323630303433363130363130303833353736303030333537633031303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303039303034363366666666666666663136383036333036666464653033313436313030393335373830363331383136306464643134363130313231353738303633333133636535363731343631303134613537383036333730613038323331313436313031373935373830363339356438396234313134363130316336353738303633613930353963626231343631303235343537383036336464363265643365313436313032393635373562333431353631303038653537363030303830666435623630303038306664356233343135363130303965353736303030383066643562363130306136363130333032353635623630343035313830383036303230303138323831303338323532383338313831353138313532363032303031393135303830353139303630323030313930383038333833363030303562383338313130313536313030653635373830383230313531383138343031353236303230383130313930353036313030636235363562353035303530353039303530393038313031393036303166313638303135363130313133353738303832303338303531363030313833363032303033363130313030306130333139313638313532363032303031393135303562353039323530353035303630343035313830393130333930663335623334313536313031326335373630303038306664356236313031333436313033613035363562363034303531383038323831353236303230303139313530353036303430353138303931303339306633356233343135363130313535353736303030383066643562363130313564363130336136353635623630343035313830383236306666313636306666313638313532363032303031393135303530363034303531383039313033393066333562333431353631303138343537363030303830666435623631303162303630303438303830333537336666666666666666666666666666666666666666666666666666666666666666666666666666666631363930363032303031393039313930353035303631303362393536356236303430353138303832383135323630323030313931353035303630343035313830393130333930663335623334313536313031643135373630303038306664356236313031643936313033643135363562363034303531383038303630323030313832383130333832353238333831383135313831353236303230303139313530383035313930363032303031393038303833383336303030356238333831313031353631303231393537383038323031353138313834303135323630323038313031393035303631303166653536356235303530353035303930353039303831303139303630316631363830313536313032343635373830383230333830353136303031383336303230303336313031303030613033313931363831353236303230303139313530356235303932353035303530363034303531383039313033393066333562333431353631303235663537363030303830666435623631303239343630303438303830333537336666666666666666666666666666666666666666666666666666666666666666666666666666666631363930363032303031393039313930383033353930363032303031393039313930353035303631303436663536356230303562333431353631303261313537363030303830666435623631303265633630303438303830333537336666666666666666666666666666666666666666666666666666666666666666666666666666666631363930363032303031393039313930383033353733666666666666666666666666666666666666666666666666666666666666666666666666666666663136393036303230303139303931393035303530363130343765353635623630343035313830383238313532363032303031393135303530363034303531383039313033393066333562363030303830353436303031383136303031313631353631303130303032303331363630303239303034383036303166303136303230383039313034303236303230303136303430353139303831303136303430353238303932393139303831383135323630323030313832383035343630303138313630303131363135363130313030303230333136363030323930303438303135363130333938353738303630316631303631303336643537363130313030383038333534303430323833353239313630323030313931363130333938353635623832303139313930363030303532363032303630303032303930356238313534383135323930363030313031393036303230303138303833313136313033376235373832393030333630316631363832303139313562353035303530353035303831353635623630303335343831353635623630303236303030393035343930363130313030306139303034363066663136383135363562363030343630323035323830363030303532363034303630303032303630303039313530393035303534383135363562363030313830353436303031383136303031313631353631303130303032303331363630303239303034383036303166303136303230383039313034303236303230303136303430353139303831303136303430353238303932393139303831383135323630323030313832383035343630303138313630303131363135363130313030303230333136363030323930303438303135363130343637353738303630316631303631303433633537363130313030383038333534303430323833353239313630323030313931363130343637353635623832303139313930363030303532363032303630303032303930356238313534383135323930363030313031393036303230303138303833313136313034346135373832393030333630316631363832303139313562353035303530353035303831353635623631303437613333383338333631303461333536356235303530353635623630303536303230353238313630303035323630343036303030323036303230353238303630303035323630343036303030323036303030393135303931353035303534383135363562363030303830383337336666666666666666666666666666666666666666666666666666666666666666666666666666666631363134313531353135363130346361353736303030383066643562383136303034363030303836373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323035343130313531353135363130353138353736303030383066643562363030343630303038343733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230353438323630303436303030383637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136383135323630323030313930383135323630323030313630303032303534303131313135313536313035613635373630303038306664356236303034363030303834373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323035343630303436303030383637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136383135323630323030313930383135323630323030313630303032303534303139303530383136303034363030303836373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323036303030383238323534303339323530353038313930353535303831363030343630303038353733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230363030303832383235343031393235303530383139303535353038303630303436303030383537336666666666666666666666666666666666666666666666666666666666666666666666666666666631363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136383135323630323030313930383135323630323030313630303032303534363030343630303038373733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230353430313134313531353631303734653537666535623530353035303530353630306131363536323761376137323330353832306232363635646630643864383532323830336131396163366263393866663031303132316531316331366430333432656163656430316439343130306365313830303239303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303764303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030363030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030306130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030633534363537333734343337353732373236353665363337393030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303035353434353533353433313030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030308114B5F762798A53D543A014CAF8B297CFF8F2F937E8',
  tx_json: 
   { Account: 'jHb9....tyTh',
     Amount: '10000000',
     Fee: '10000',
     Flags: 0,
     Method: 0,
     Payload: '36303630363034303532363031323630303236303030363130313030306138313534383136306666303231393136393038333630666631363032313739303535353033343135363130303262353736303030383066643562363034303531363130393237333830333830363130393237383333393831303136303430353238303830353139303630323030313930393139303830353138323031393139303630323030313830353138323031393139303530353036303032363030303930353439303631303130303061393030343630666631363630666631363630306130613833303236303033383139303535353036303033353436303034363030303333373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323038313930353535303831363030303930383035313930363032303031393036313030643339323931393036313030663335363562353038303630303139303830353139303630323030313930363130306561393239313930363130306633353635623530353035303530363130313938353635623832383035343630303138313630303131363135363130313030303230333136363030323930303439303630303035323630323036303030323039303630316630313630323039303034383130313932383236303166313036313031333435373830353136306666313931363833383030313137383535353631303136323536356238323830303136303031303138353535383231353631303136323537393138323031356238323831313131353631303136313537383235313832353539313630323030313931393036303031303139303631303134363536356235623530393035303631303136663931393036313031373335363562353039303536356236313031393539313930356238303832313131353631303139313537363030303831363030303930353535303630303130313631303137393536356235303930353635623930353635623631303738303830363130316137363030303339363030306633303036303630363034303532363030343336313036313030383335373630303033353763303130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303930303436336666666666666666313638303633303666646465303331343631303039333537383036333138313630646464313436313031323135373830363333313363653536373134363130313461353738303633373061303832333131343631303137393537383036333935643839623431313436313031633635373830363361393035396362623134363130323534353738303633646436326564336531343631303239363537356233343135363130303865353736303030383066643562363030303830666435623334313536313030396535373630303038306664356236313030613636313033303235363562363034303531383038303630323030313832383130333832353238333831383135313831353236303230303139313530383035313930363032303031393038303833383336303030356238333831313031353631303065363537383038323031353138313834303135323630323038313031393035303631303063623536356235303530353035303930353039303831303139303630316631363830313536313031313335373830383230333830353136303031383336303230303336313031303030613033313931363831353236303230303139313530356235303932353035303530363034303531383039313033393066333562333431353631303132633537363030303830666435623631303133343631303361303536356236303430353138303832383135323630323030313931353035303630343035313830393130333930663335623334313536313031353535373630303038306664356236313031356436313033613635363562363034303531383038323630666631363630666631363831353236303230303139313530353036303430353138303931303339306633356233343135363130313834353736303030383066643562363130316230363030343830383033353733666666666666666666666666666666666666666666666666666666666666666666666666666666663136393036303230303139303931393035303530363130336239353635623630343035313830383238313532363032303031393135303530363034303531383039313033393066333562333431353631303164313537363030303830666435623631303164393631303364313536356236303430353138303830363032303031383238313033383235323833383138313531383135323630323030313931353038303531393036303230303139303830383338333630303035623833383131303135363130323139353738303832303135313831383430313532363032303831303139303530363130316665353635623530353035303530393035303930383130313930363031663136383031353631303234363537383038323033383035313630303138333630323030333631303130303061303331393136383135323630323030313931353035623530393235303530353036303430353138303931303339306633356233343135363130323566353736303030383066643562363130323934363030343830383033353733666666666666666666666666666666666666666666666666666666666666666666666666666666663136393036303230303139303931393038303335393036303230303139303931393035303530363130343666353635623030356233343135363130326131353736303030383066643562363130326563363030343830383033353733666666666666666666666666666666666666666666666666666666666666666666666666666666663136393036303230303139303931393038303335373366666666666666666666666666666666666666666666666666666666666666666666666666666666313639303630323030313930393139303530353036313034376535363562363034303531383038323831353236303230303139313530353036303430353138303931303339306633356236303030383035343630303138313630303131363135363130313030303230333136363030323930303438303630316630313630323038303931303430323630323030313630343035313930383130313630343035323830393239313930383138313532363032303031383238303534363030313831363030313136313536313031303030323033313636303032393030343830313536313033393835373830363031663130363130333664353736313031303038303833353430343032383335323931363032303031393136313033393835363562383230313931393036303030353236303230363030303230393035623831353438313532393036303031303139303630323030313830383331313631303337623537383239303033363031663136383230313931356235303530353035303530383135363562363030333534383135363562363030323630303039303534393036313031303030613930303436306666313638313536356236303034363032303532383036303030353236303430363030303230363030303931353039303530353438313536356236303031383035343630303138313630303131363135363130313030303230333136363030323930303438303630316630313630323038303931303430323630323030313630343035313930383130313630343035323830393239313930383138313532363032303031383238303534363030313831363030313136313536313031303030323033313636303032393030343830313536313034363735373830363031663130363130343363353736313031303038303833353430343032383335323931363032303031393136313034363735363562383230313931393036303030353236303230363030303230393035623831353438313532393036303031303139303630323030313830383331313631303434613537383239303033363031663136383230313931356235303530353035303530383135363562363130343761333338333833363130346133353635623530353035363562363030353630323035323831363030303532363034303630303032303630323035323830363030303532363034303630303032303630303039313530393135303530353438313536356236303030383038333733666666666666666666666666666666666666666666666666666666666666666666666666666666663136313431353135313536313034636135373630303038306664356238313630303436303030383637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136383135323630323030313930383135323630323030313630303032303534313031353135313536313035313835373630303038306664356236303034363030303834373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323035343832363030343630303038363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230353430313131313531353631303561363537363030303830666435623630303436303030383437336666666666666666666666666666666666666666666666666666666666666666666666666666666631363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136383135323630323030313930383135323630323030313630303032303534363030343630303038363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230353430313930353038313630303436303030383637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363733666666666666666666666666666666666666666666666666666666666666666666666666666666663136383135323630323030313930383135323630323030313630303032303630303038323832353430333932353035303831393035353530383136303034363030303835373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323036303030383238323534303139323530353038313930353535303830363030343630303038353733666666666666666666666666666666666666666666666666666666666666666666666666666666663136373366666666666666666666666666666666666666666666666666666666666666666666666666666666313638313532363032303031393038313532363032303031363030303230353436303034363030303837373366666666666666666666666666666666666666666666666666666666666666666666666666666666313637336666666666666666666666666666666666666666666666666666666666666666666666666666666631363831353236303230303139303831353236303230303136303030323035343031313431353135363130373465353766653562353035303530353035363030613136353632376137613732333035383230623236363564663064386438353232383033613139616336626339386666303130313231653131633136643033343265616365643031643934313030636531383030323930303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030376430303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303036303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030613030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303063353436353733373434333735373237323635366536333739303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303535343435353335343331303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030',
     Sequence: 413,
     SigningPubKey: '0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020',
     TransactionType: 'AlethContract',
     TxnSignature: '304402206C941CF3355094C5E85C2410FBB131288802094B790C399639A543A9DD64DDB1022059EEA991A946A28EA9695AEB2F5F724831C371BB0F9C72D50DD6855BCDF5C07D',
     hash: '7BAAF8543E5E5761500CB21F5BCBCB9CA7A786704E82153481A7944E8F6E97F9' 
   }
}
```

:::

## 调用合约（Solidity版）

首先通过invokeContract方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法完成合约的调用。

### 创建合约调用对象

方法：remote.invokeContract({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |合约调用者|
|destination |String |合约账号|
|abi |Array |合约abi|
|func |String |合约函数名及参|
|amount |Number |可选，合约中msg.value的值。只有payable修饰的合约函数，才可以设置该值，默认为0。|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |合约调用者账号私钥|

### 调用合约

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|ContractState |String |调用的合约方法返回值，没有返回值显示空字符串|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |合约发起者账号地址|
|Args |Array |合约调用参数信息|
|Destination |String |合约账号|
|Fee |String |网络费|
|Flags |Integer |交易标记|
|Method |Integer |合约方法：0表示部署，1表示调用|
|Sequence |Integer |单子序列号|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型：AlethContract合约类|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
     var v = {
        secret: 's...UTb',
        address: 'j...yTh'
};
const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "initialSupply",
                    "type": "uint256"
                },
                {
                    "name": "tokenName",
                    "type": "string"
                },
                {
                    "name": "tokenSymbol",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        }
    ];
var tx = remote.invokeContract({
  account: v.address, 
    destination: 'jPZ1....9Kkh',
    abi: abi,
    func:"transfer('jPZ1....9Kkh', 15)"});
    tx.setSecret(v.secret);
    tx.submit(function (err, result) {
        if (err) {
            console.log('err:', err);
        }
        else if (result) {
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{
  ContractState: '',
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '12001F2200000000240000019E2F2410A96220240000000168400000000000271073210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD02074473045022100C44640B21BF99C1764042A87FCAE6877BF1188F9F8DD887969EEF735333E584002204A2158F843021522FF7F93940BA4C1A933E21F03B6B9E5A3F3A54C217428CDDC8114B5F762798A53D543A014CAF8B297CFF8F2F937E88314F78A69DCD5308DB30C41724F04EF86CA3AC74AB3FAEB70128861393035396362623030303030303030303030303030303030303030303030306637386136396463643533303864623330633431373234663034656638366361336163373461623330303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303066041000E1F1',
  tx_json: 
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Args: [ { Arg: 
     { ContractParamsType: 0,
       Parameter: '61393035396362623030303030303030303030303030303030303030303030306637386136396463643533303864623330633431373234663034656638366361336163373461623330303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303066' } } ],
     Destination: 'jPZ1....9Kkh',
     Fee: '10000',
     Flags: 0,
     Method: 1,
     Sequence: 414,
     SigningPubKey: '0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020',
     TransactionType: 'AlethContract',
     TxnSignature: '3045022100C44640B21BF99C1764042A87FCAE6877BF1188F9F8DD887969EEF735333E584002204A2158F843021522FF7F93940BA4C1A933E21F03B6B9E5A3F3A54C217428CDDC',
     hash: '561190424A8325FE6A93A2E3D1E16852B67CCC46354DA766F63C60A73403377A'
   }
}
```

:::

## 废除账号主密钥masterkey

本功能为禁止某账号做交易而设定，且只有该账号设置了签名列表才可以废除masterkey成功。首先通过buildAccountSetTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法提交到底层。

### 创建签名列表对象

方法：remote.buildAccountSetTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |被废除或激活masterkey的账号地址|
|type |String |类型，账号属性类固定为property|
|set_flag |Integer |4表示废除masterkey|
|clear_flag |Integer |4表示激活masterkey，用于多签中激活masterkey|

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 废除masterkey

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|SetFlag |Integer |账号属性标记|
|SigningPubKey |String |签名公钥
|TransactionType |String |交易类型，账号属性类为AccountSet|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
}
    var a1 = {address: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb', secret: 'ssR...GT'};
    var options = {
        account: a1.address,
        type:'property',
        set_flag: 4};
    var tx = remote.buildAccountSetTx(options);
    tx.setSecret(root.secret);
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '120003220000000024000000042F24FF8316202100000004684000000000002710732103B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF74473045022100E08B43B5A1FF871015074C46E8A608AB0AB3F823415F58B4E2546572D07D94900220785786BED6701F2F6ED5F36536337DE90DA12B0C262157F6E21FFCEE9258D04F8114577F22BBCFC872325BB006322692FDC60AE33890',
  tx_json:
   { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
     Fee: '10000',
     Flags: 0,
     Sequence: 4,
     SetFlag: 4,
     SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
     TransactionType: 'AccountSet',
     TxnSignature: '3045022100E08B43B5A1FF871015074C46E8A608AB0AB3F823415F58B4E2546572D07D94900220785786BED6701F2F6ED5F36536337DE90DA12B0C262157F6E21FFCEE9258D04F',
     hash: 'A30EB9C735A9A7D779A9ABAA8E349186B83AA30513C5C8DBDBE4B47ADE145194' }
}
```

:::

## 激活账号主密钥masterkey

激活通过多签列表中的账号去完成激活，如用账号a2和a3激活，详见下面例子。

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

｜属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|ClearFlag |Integer |账号属性标记|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|**Signers** |**Array[Object]** |签名列表条目；销毁列表时，没有该字段|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型，账号属性类为AccountSet|
|hash |String |交易hash|

|属性(Signers) |类型 |说明|
| :----| :----| :----|
|**Signer** |**Object** |单个签名条目|

|属性(Signer) |类型 |说明|
| :----| :----| :----|
|Account |String |给该交易签名的账号地址|
|SigningPubKey |String |给该交易签名的账号公钥|
|TxnSignature |String |Account账号给该交易的交易签名|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
}
var a1 = {address: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb', secret: 'ssR...GT'};
var a2 = {address: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz', secret: 'ssL...Sy'};
var a3 = {address: 'jpX8SEpM387c9tpdAUfBr2gYTfC2k7RatA', secret:'ss6...ki'};
    var options = {
        account: a1.address,
        type:'property',
        clear_flag: 4 //激活
    };
    var tx = remote.buildAccountSetTx(options);
    tx.setSequence(6);
    tx.setFee(100000);
    tx.multiSigning({
        account: a2.address,
        secret: a2.secret
    });

    tx.multiSigning({
        account: a3.address,
        secret: a3.secret
    });
tx.multiSigned();
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '120003220000000024000000062022000000046840000000000186A073008114577F22BBCFC872325BB006322692FDC60AE33890FCED732102E10087455D301201958DD926D2D195999E88DB1424A3C2592DE058C8732D56F974473045022100B955553F2EC08FDEB86C9D45A3D0D5D0A94A5586513BF57D0E830CA65D6F4BAC0220139DC103DE74CA0D1CFB19F98CBCD24AF01E291BD47FF1D615ED406D495CBEDD811410CA883371FE56DD81D4556C05BCC082C77CF1D3E1ED732103F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A17447304502210092480D9BA95B3ED8A2F979A48627D20951D6DD4451C922D7B35DA5A18BAC8E6B02201063A4F3CDEB376C8B089B6628F939CFDE9AEA4AD64A194863C3F5FA181684F38114BC51DE21D4591EBF30812B1071C5E1AABBA07DE4E1F1',
  tx_json:
   { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
    ClearFlag: 4,
     Fee: '100000',
     Flags: 0,
     Sequence: 6,
     Signers: [ { Signer: 
     { Account: 'jpX8SEpM387c9tpdAUfBr2gYTfC2k7RatA',
       SigningPubKey: '02E10087455D301201958DD926D2D195999E88DB1424A3C2592DE058C8732D56F9',
       TxnSignature: '3045022100B955553F2EC08FDEB86C9D45A3D0D5D0A94A5586513BF57D0E830CA65D6F4BAC0220139DC103DE74CA0D1CFB19F98CBCD24AF01E291BD47FF1D615ED406D495CBEDD' } },
  { Signer: 
     { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
       SigningPubKey: '03F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A1',
       TxnSignature: '304502210092480D9BA95B3ED8A2F979A48627D20951D6DD4451C922D7B35DA5A18BAC8E6B02201063A4F3CDEB376C8B089B6628F939CFDE9AEA4AD64A194863C3F5FA181684F3' } } ],
     SigningPubKey: '',
     TransactionType: 'AccountSet',
     hash: '25B0401932307D65AB84066AE7F255794D1BCFFA1D5219A121D102C968ED15FA' }
}
```

:::

## 设置签名列表

首先通过buildSignerListTx方法返回一个Transaction对象，然后通过setSecret传入密钥，最后通过submit方法提交列表信息。

### 创建签名列表对象

方法：remote.buildSignerListTx({});
参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |交易源账号|
|threshold |Integer |阈值|
|**lists** |**Array[Object]**|签名列表|

|属性(lists) |类型 |说明|
| :----| :----| :----|
|account |String |账号|
|weight |String |权重|

**注：不可将交易源账号设为签名列表名单内。**

返回：Transaction对象

### 传入密钥

方法：tx.setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

### 设置签名列表

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|tx_json |Object |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|**SignerEntries** |**Array** |签名列表条目；销毁列表时，没有该字段|
|SignerQuorum |Integer |多重签名交易通过的阈值，应大于等于零，零表示销毁签名列表|
|SigningPubKey |String |签名公钥|
|TransactionType |String |交易类型，设置签名列表类为SignerListSet|
|TxnSignature |String |交易签名|
|hash |String |交易hash|

|属性(SignerEntries) |类型 |说明|
| :----| :----| :----|
|**SignerEntry** |**Object** |单个签名条目|

|属性(SignerEntry) |类型 |说明|
| :----| :----| :----|
|Account |String |签名账号的地址|
|SignerWeight |String |该签名在多重签名交易中的权重|

**注：再次设置，会覆盖掉之前的签名列表，以最新设置的为准。**

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
}
    var root = {'secret':'sno...Tb', 'address':'jHb...Th'};
    var options = {
        account: root.address,
        threshold: 3,
        lists: [{
            account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
            weight: 2
        },
            {
                account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
                weight: 2
            },
            {
                account: 'jpX8SEpM387c9tpdAUfBr2gYTfC2k7RatA',
                weight: 2
            }
        ]};
    var tx = remote.buildSignerListTx(options);
    tx.setSecret(root.secret);
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '1200CF2200000000240000001220260000000368400000000000271073210330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD0207446304402205BAC48B1D53AB7FDF4C907DBFA2A248E779A382A74D91C8EBA50383C02C80ECF0220113DB1AE15B81B089457D189C45DA80EDE859C919C585368BA4ED2479E4A7ECC8114B5F762798A53D543A014CAF8B297CFF8F2F937E8FBEC1300028114577F22BBCFC872325BB006322692FDC60AE33890E1EC1300028114BC51DE21D4591EBF30812B1071C5E1AABBA07DE4E1EC130002811410CA883371FE56DD81D4556C05BCC082C77CF1D3E1F1',
  tx_json:
   { Account: 'jHb...Th',
     Fee: '10000',
     Flags: 0,
     Sequence: 18,
     SignerEntries: [ { SignerEntry: 
     { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
       SignerWeight: 2 } },
      { SignerEntry: 
         { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
           SignerWeight: 2 } },
      { SignerEntry: 
         { Account: 'jpX8SEpM387c9tpdAUfBr2gYTfC2k7RatA',
           SignerWeight: 2 } } ],
     SignerQuorum: 3,
     SigningPubKey: '0330E7FC9D56BB25D6893BA3F317AE5BCF33B3291BD63DB32654A313222F7FD020',
     TransactionType: 'SignerListSet',
     TxnSignature: '304402205BAC48B1D53AB7FDF4C907DBFA2A248E779A382A74D91C8EBA50383C02C80ECF0220113DB1AE15B81B089457D189C45DA80EDE859C919C585368BA4ED2479E4A7ECC',
     hash: 'A080F767A94F57BF79CEC760A25539177C870E5A133D2BAF30419B8BC29550DB' }
}
```

:::

## 首个用户签名

首先组织好要签名的交易，然后通过buildSignFirstTx方法包装要签名的交易，返回一个Transaction对象。若只有一个用户签名，此时可通过submit方法提交；若有多个用户签名，则需调用下面的后续用户签名接口。

### 创建首个签名对象

方法：remote.buildSignFirstTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|options |Object |参数对象|
|tx |Object |创建的Transaction对象|
|account |String |签名私钥对应的地址|
|secret |String |签名该交易的地址私钥|

返回：Transaction对象

### 传入sequence

方法：tx.setSequence(sequence);

注：sequence可通过remote.requestAccountInfo({account: account})方法获取。

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|sequence |Integer |账号单子序列号|

### 提交签名

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|-- |-- |相关交易对应的其他字段，如Payment类型有Amount、Destination字段，这里不一一列举|
|Signers |Array |签名列表条目；销毁列表时，没有该字段|
|SigningPubKey |String |交易签名公钥，必须为空字符串|
|TransactionType |String |交易类型|
|hash |String |交易hash，该hash并没有存链上|

|属性(Signers) |类型 |说明|
| :----| :----| :----|
|Signer |Object |单个签名条目|

|属性(Signer) |类型 |说明|
| :----| :----| :----|
|Account |String |给该交易签名的账号地址|
|SigningPubKey |String |给该交易签名的账号公钥|
|TxnSignature |String |Account账号给该交易的交易签名|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
}
var root = {'secret':'sno...Tb', 'address':'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh'};
    var a1 = {address: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb', secret:'ssR...nGT'};
    var tx= remote.buildPaymentTx({account: root.address, to: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb', amount: {
        "value": "2",
        "currency": "SWT",
        "issuer": ""}});
    var options = {
        account: a1.address,
        secret: a1.secret,
        tx: tx};
remote.buildSignFirstTx(options);
tx.setSequence(25); //必写，保证sequence统一不变；
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  tx_blob: '120000220000000024000000196140000000001E848068400000000000271073008114B5F762798A53D543A014CAF8B297CFF8F2F937E88314577F22BBCFC872325BB006322692FDC60AE33890FCED732103B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF744630440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE8114577F22BBCFC872325BB006322692FDC60AE33890E1F1',
  tx_json:
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Amount: '2000000',
     Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
     Fee: '10000',
     Flags: 0,
     Sequence: 7,
     Signers:  [ { Signer: 
     { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
       SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
       TxnSignature: '304402201E36F24885BD7F5794262C40E676EEF204531897CA2ACBCA8F58D292B5EF4A930220493BE7F5243040C8EB9C75AC795FCA1BFD7EB6E97C97C8AD2719F9F97EDF8397' } } ],
     SigningPubKey: '',
     TransactionType: 'Payment',
     hash: 'FDB0D78C5A6E6D3319788B5F807CD0A84009E625459DBBD3F6FAF23E3243CD36' }
}
```

:::

## 后续用户签名

首先通过buildSignOtherTx方法返回一个Transaction对象，然后通过submit方法提交；若后续还有用户要签名，可继续使用buildSignOtherTx方法并submit提交获取返回结果中的tx_json。

### 创建后续签名对象

方法：remote.buildSignOtherTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|**options** |**Object** |参数对象|

|属性(options) |类型 |说明|
| :----| :----| :----|
|tx_json |Object |上一个用户签完返回结果中的tx_json|
|account |String |签名私钥对应的地址|
|secret |String |签名该交易的地址私钥|

返回：Transaction对象

### 提交签名

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|-- |-- |相关交易对应的其他字段，如Payment类型有Amount、Destination字段，这里不一一列举|
|**Signers** |**Array** |签名列表条目；销毁列表时，没有该字段|
|SigningPubKey |String |交易签名公钥，必须为空字符串|
|TransactionType |String |交易类型|
|hash |String |交易hash，该hash并没有存链上|

|属性(Signers) |类型 |说明|
| :----| :----| :----|
|Signer |Object |单个签名条目|

|属性(options) |类型 |说明|
| :----| :----| :----|
|Account |String |给该交易签名的账号地址|
|SigningPubKey |String |给该交易签名的账号公钥|
|TxnSignature |String |Account账号给该交易的交易签名|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
}
    var a2 = {address: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz', secret:'ss...bSy'};
var tx_json = { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
    Amount: '2000000',
    Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
    Fee: '10000',
    Flags: 0,
    Sequence: 25,
    Signers: [ { Signer:
        { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
          SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
          TxnSignature: '30440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE' } } ],
    SigningPubKey: '',
    TransactionType: 'Payment',
    hash: 'FDB0D78C5A6E6D3319788B5F807CD0A84009E625459DBBD3F6FAF23E3243CD36' };
var options = {account: a2.address, secret: a2.secret, tx_json: tx_json};
remote.buildSignOtherTx(options);
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  tx_blob: '120000220000000024000000196140000000001E848068400000000000271073008114B5F762798A53D543A014CAF8B297CFF8F2F937E88314577F22BBCFC872325BB006322692FDC60AE33890FCED732103B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF744630440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE8114577F22BBCFC872325BB006322692FDC60AE33890E1ED732103F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A174473045022100B4EE5FE2C3C209793F4893877062F942DFAF43D76225D881EB95ADA868A51B040220346494F45843CC8C28A6C53813C98440A57C5DD9BC7E84C58A3F712B9AEDEEB68114BC51DE21D4591EBF30812B1071C5E1AABBA07DE4E1F1',
  tx_json:
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Amount: '2000000',
     Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
     Fee: '10000',
     Flags: 0,
     Sequence: 25,
     Signers:  [ { Signer: 
        { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
            SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
            TxnSignature: '30440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE' } },
       { Signer: 
          { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
            SigningPubKey: '03F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A1',
            TxnSignature: '3045022100B4EE5FE2C3C209793F4893877062F942DFAF43D76225D881EB95ADA868A51B040220346494F45843CC8C28A6C53813C98440A57C5DD9BC7E84C58A3F712B9AEDEEB6' } } ],
     SigningPubKey: '',
     TransactionType: 'Payment',
     hash: '62AF7991C9C5314C7F3D23A5F0FF28E8C13EAE6A13F3E1A6CA06E477223F9B70' }
}
```

:::

## 提交多重签名交易

首先通过buildMultisignedTx方法返回一个Transaction对象，然后通过submit方法完成多重签名最后的提交。

### 创建多重签名对象

方法：remote.buildMultisignedTx({});

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|options |Object |参数对象|

|属性(options) |类型 |说明|
| :----| :----| :----|
|tx_json |Object |最后一个用户签完返回结果中的tx_json|

返回：Transaction对象

### 提交多重签名

方法：tx.submit(callback);

参数：无

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String |请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|-- |-- |相关交易对应的其他字段，如Payment类型有Amount、Destination字段，这里不一一列举|
|**Signers** |**Array** |签名列表条目；销毁列表时，没有该字段|
|SigningPubKey |String |交易签名公钥，必须为空字符串|
|TransactionType |String |交易类型|
|hash |String |交易hash，该hash可在链上查到|

|属性(Signers) |类型 |说明|
| :----| :----| :----|
|**Signer** |**Object** |单个签名条目|

|属性(Signer) |类型 |说明|
| :----| :----| :----|
|Account |String |给该交易签名的账号地址|
|SigningPubKey |String |给该交易签名的账号公钥|
|TxnSignature |String |Account账号给该交易的交易签名|

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port:5020'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:',err);
}
var tx_json = { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
    Amount: '2000000',
    Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
    Fee: '10000',
    Flags: 0,
    Sequence: 25,
    Signers: [ { Signer:
        { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
            SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
            TxnSignature: '30440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE' } },
        { Signer:
            { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
                SigningPubKey: '03F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A1',
                TxnSignature: '3045022100B4EE5FE2C3C209793F4893877062F942DFAF43D76225D881EB95ADA868A51B040220346494F45843CC8C28A6C53813C98440A57C5DD9BC7E84C58A3F712B9AEDEEB6' } } ],
    SigningPubKey: '',
    TransactionType: 'Payment',
    hash: '62AF7991C9C5314C7F3D23A5F0FF28E8C13EAE6A13F3E1A6CA06E477223F9B70' };
remote.buildMultisignedTx(tx_json);
    tx.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '120000220000000024000000196140000000001E848068400000000000271073008114B5F762798A53D543A014CAF8B297CFF8F2F937E88314577F22BBCFC872325BB006322692FDC60AE33890FCED732103B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF744630440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE8114577F22BBCFC872325BB006322692FDC60AE33890E1ED732103F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A174473045022100B4EE5FE2C3C209793F4893877062F942DFAF43D76225D881EB95ADA868A51B040220346494F45843CC8C28A6C53813C98440A57C5DD9BC7E84C58A3F712B9AEDEEB68114BC51DE21D4591EBF30812B1071C5E1AABBA07DE4E1F1',
  tx_json:
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Amount: '2000000',
     Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
     Fee: '10000',
     Flags: 0,
     Sequence: 25,
     Signers:  [ { Signer: 
        { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
            SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
            TxnSignature: '30440220550DFCACFF57FEC839D1A371F044BA8182E811F55B31B59177DE6D451CAF8A7A022028974CC56C3FD84FBB485563E24E030A46BB3C773892ADE44FCC22DD4790E6AE' } },
       { Signer: 
          { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
            SigningPubKey: '03F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A1',
            TxnSignature: '3045022100B4EE5FE2C3C209793F4893877062F942DFAF43D76225D881EB95ADA868A51B040220346494F45843CC8C28A6C53813C98440A57C5DD9BC7E84C58A3F712B9AEDEEB6' } } ],
     SigningPubKey: '',
     TransactionType: 'Payment',
     hash: '62AF7991C9C5314C7F3D23A5F0FF28E8C13EAE6A13F3E1A6CA06E477223F9B70' }
}
```

:::




## 通过tx_json创建Transaction实例

方法：buildTx(tx_json)，主要用于多重签名相关；

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|tx_json |Object |交易结果返回的tx_json字段，或者自己组织的tx_json|

返回：Transaction对象

:::details {{$frontmatter.checkCode}}

```js
var tx_json = { Flags: 0,
  Fee: 100000,
  TransactionType: 'Payment',
  Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  Amount: '2000000',
  Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
  Sequence: 11,
  SigningPubKey: '',
  Signers: [ { Signer:
    { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
      SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
      TxnSignature: '3045022100DDC408965E9F62626BC6A0603A0D707B64E0157B84299414BCF8C560EDE776970220093CB723375F3725DC41FB5B207B2CEEE158D5D70A90F18BD10D330F637DB9A3' } } ] }
var tx = remote.buildTx(tx_json);
```

:::

## 本地多重签名实现

首先组织交易(首个用户通过remote.buildxxxTx方式创建交易；后面的用户拿到上一用户返回结果中的tx_json，通过remote.buildTx(tx_json)方式创建交易)返回一个Transaction对象，然后multiSigning方法多重签名，多个用户签完后用multiSigned方法标记结束，最后通过submit方法完成多重签名的提交。由于多签在Transaction类中完成，具体方法说明可在Transaction类中查看，本小节只展示两种具体例子。

### 只有一个用户签名，交易信息由自己创建

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果，tefBAD_QUORUM表示没达到阈值|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String|请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|-- |-- |相关交易对应的其他字段，如Payment类型有Amount、Destination字段，这里不一一列举|
|**Signers** |**Array** |签名列表条目|
|SigningPubKey |String |交易签名公钥，必须为空字符串|
|TransactionType |String |交易类型|
|hash |String |交易hash，成功可在链上查到|

|属性(Signers) |类型 |说明|
| :----| :----| :----|
|**Signer** |**Object** |单个签名条目|

|属性(Signer) |类型 |说明|
| :----| :----| :----|
|Account |String |给该交易签名的账号地址|
|SigningPubKey |String |给该交易签名的账号公钥|
|TxnSignature |String |Account账号给该交易的交易签名|

:::details {{$frontmatter.checkCode}}

```js
var root = {
  'secret': 'sn...Tb',
  'address': 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh'
};   
var a1 = {address: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb', secret: 'ss...GT'};
    var tx = remote.buildPaymentTx({
        account: root.address, to: a1.address, amount: {
            "value": "2",
            "currency": "SWT",
            "issuer": ""
        }
    });
    // tx.addMemo('支付test');
    tx.setSequence(26);//必写
    tx.setFee(100000); //可选，这里需补六个零
    tx.multiSigning({ //用户签名
        account: a1.address,
        secret: a1.secret
});  
var flag = tx.tx_json.verifyTx && tx.tx_json.verifyTx.toString().indexOf('verify failed');//判断签名是否成功
flag ? console.log('verify failed') : console.log('verify success');
// console.log('tx_json: ', tx.tx_json);//这里得到的是签名结果

if(!flag){
 tx.multiSigned();//多重签名结束
 tx.submit(function(err, result) {
  if(err) {console.log('err:',err);}
  else if(result){
    console.log('res:', result);
  }
  });
}
```

返回结果

```js
{ 
  engine_result: 'tefBAD_QUORUM',
  engine_result_code: -184,
  engine_result_message: 'Signatures provided do not meet the quorum.',
  tx_blob: '1200002200000000240000001A6140000000001E84806840000000000186A073008114B5F762798A53D543A014CAF8B297CFF8F2F937E88314577F22BBCFC872325BB006322692FDC60AE33890FCED732103B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF74473045022100FB82276780F6A049E4B45FCBD4EA815AEB21E7044286D7254611A5CFDE8BF1A3022023DD9C096DD5003F9A994F62BCAE54582B2E6AEA246D053CAE620868A4FE6E118114577F22BBCFC872325BB006322692FDC60AE33890E1F1',
  tx_json:
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Amount: '2000000',
     Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
     Fee: '100000',
     Flags: 0,
     Sequence: 26,
     Signers:  [ { Signer: 
        { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
            SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
            TxnSignature: '3045022100FB82276780F6A049E4B45FCBD4EA815AEB21E7044286D7254611A5CFDE8BF1A3022023DD9C096DD5003F9A994F62BCAE54582B2E6AEA246D053CAE620868A4FE6E11' } }],
     SigningPubKey: '',
     TransactionType: 'Payment',
     hash: '0899437ADAB04B52FA00771BDE80216F19F58BF215CD79CD00A45112E5363080' }
}
```

:::

### 多个用户签名，交易信息由其他用户返给

返回结果说明：
|参数 |类型 |说明|
| :----| :----| :----|
|engine_result |String |请求结果|
|engine_result_code |Array |请求结果编码|
|engine_result_message |String|请求结果message信息|
|tx_blob |String |16进制签名后的交易|
|**tx_json** |**Object** |交易内容|

|属性(tx_json) |类型 |说明|
| :----| :----| :----|
|Account |String |交易源账号地址|
|Fee |String |交易费|
|Flags |Integer |交易标记|
|Sequence |Integer |单子序列号|
|-- |-- |相关交易对应的其他字段，如Payment类型有Amount、Destination字段，这里不一一列举|
|**Signers** |**Array** |签名列表条目|
|SigningPubKey |String |交易签名公钥，必须为空字符串|
|TransactionType |String |交易类型|
|hash |String |交易hash，成功可在链上查到|

|属性(Signers) |类型 |说明|
| :----| :----| :----|
|**Signer** |**Object** |单个签名条目|

|属性(Signer) |类型 |说明|
| :----| :----| :----|
|Account |String |给该交易签名的账号地址|
|SigningPubKey |String |给该交易签名的账号公钥|
|TxnSignature |String |Account账号给该交易的交易签名|

:::details {{$frontmatter.checkCode}}

```js
var a1 = {address: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb', secret: 'ss...GT'};
var tx_json = { //其他用户签名返回结果中的tx_json
  Flags: 0,
  Fee: 100000,
  TransactionType: 'Payment',
  Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
  Amount: '2000000',
  Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
  Sequence: 11,
  SigningPubKey: '',
  Signers: [ { Signer:
    { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
      SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
      TxnSignature: '3045022100DDC408965E9F62626BC6A0603A0D707B64E0157B84299414BCF8C560EDE776970220093CB723375F3725DC41FB5B207B2CEEE158D5D70A90F18BD10D330F637DB9A3' } } ] };
var tx = remote.buildTx(tx_json); //包装成Transaction对象    
tx.multiSigning({ //用户签名
        account: a2.address,
        secret: a2.secret
});  
var flag = tx.tx_json.verifyTx && tx.tx_json.verifyTx.toString().indexOf('verify failed');//判断签名是否成功
flag ? console.log('verify failed') : console.log('verify success');
if(!flag){
 tx.multiSigned();//多重签名结束
 tx.submit(function(err, result) {
  if(err) {console.log('err:',err);}
  else if(result){
    console.log('res:', result);
  }
  });
}
```

返回结果

```js
{ 
  engine_result: 'tesSUCCESS',
  engine_result_code: 0,
  engine_result_message: 'The transaction was applied. Only final in a validated ledger.',
  tx_blob: '1200002200000000240000001A6140000000001E84806840000000000186A073008114B5F762798A53D543A014CAF8B297CFF8F2F937E88314577F22BBCFC872325BB006322692FDC60AE33890FCED732103B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF74473045022100FB82276780F6A049E4B45FCBD4EA815AEB21E7044286D7254611A5CFDE8BF1A3022023DD9C096DD5003F9A994F62BCAE54582B2E6AEA246D053CAE620868A4FE6E118114577F22BBCFC872325BB006322692FDC60AE33890E1ED732103F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A1744630440220393169B8DA374F03848B6AF1AAC3B9A8F195BD818DAD7BC93E762AD32DA1BD6202203128A6C362C3C423A3B45051CA1329761676BADA5860ED82F6A714B3AFD1DD588114BC51DE21D4591EBF30812B1071C5E1AABBA07DE4E1F1',
  tx_json:
   { Account: 'jHb9CJAWyB4jr91VRWn96DkukG4bwdtyTh',
     Amount: '2000000',
     Destination: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
     Fee: '100000',
     Flags: 0,
     Sequence: 26,
     Signers:  [ { Signer: 
        { Account: 'j3yeaNQUqMmrDb1T1p6Q2qHm9BHaAAmSwb',
            SigningPubKey: '03B61B9644843F1781F66D72C99840AD7BE4FAC713EF5AC73F30278B2287B7BBFF',
            TxnSignature: '3045022100FB82276780F6A049E4B45FCBD4EA815AEB21E7044286D7254611A5CFDE8BF1A3022023DD9C096DD5003F9A994F62BCAE54582B2E6AEA246D053CAE620868A4FE6E11' } },
          { Signer: 
             { Account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
                 SigningPubKey: '03F54EA6509AD28E8E9AE8762B07CD245B5AB87DC840723DBF6C4C0A621A42B4A1',
                 TxnSignature: '30440220393169B8DA374F03848B6AF1AAC3B9A8F195BD818DAD7BC93E762AD32DA1BD6202203128A6C362C3C423A3B45051CA1329761676BADA5860ED82F6A714B3AFD1DD58' } }],
     SigningPubKey: '',
     TransactionType: 'Payment',
     hash: '413EF2496165852D1863A5AAACBA04DB1CFBD3EFCF506F45B5EB38F3D8742AF7' }
}
```

:::

## 监听事件

Remote有两个监听事件：监听所有交易(transactions)和监听所有账本(ledger_closed)，监听结果放到回调函数中，回调中只有一个参数，为监听到的消息。

方法：remote.on('transactions',callback);

方法：remote.on('ledger_closed',callback);

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    remote.on('transactions', function (msg) {
      console.log('tx: ',msg);
    });
    remote.on('ledger_closed', function (msg) {
        console.log('ledger: ',msg);
    });
});
```

:::