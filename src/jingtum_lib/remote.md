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

