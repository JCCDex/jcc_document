---
# title: Docs with VitePress
# editLink: true
checkCode: '点我查看代码'
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
|account_data |Object |账号信息|
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
|lines |Array[Object] |该账户的信任线|
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

:::