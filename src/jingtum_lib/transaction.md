---
# title: remote
# editLink: true
checkCode: '代码示例'
outline: deep
---
# Transaction类

Transaction类主管POST请求，包括组装交易和交易参数。请求时需要提供密钥，且交易可以进行本地签名和服务器签名。目前支持服务器签名，本地签名支持主要的交易，还有部分参数不支持。所有的请求是异步的，会提供一个回调函数。每个回调函数有两个参数，一个是错误，另一个是结果。提供以下方法：

* getAccount()
* getTransactionType()
* setSecret(secret)
* addMemo(memo)
* setPath(key)
* setSendMax(amount)
* setTransferRate(rate)
* setFlags(flags)
* submit(callback)

## 获得交易账号

方法：getAccount();

参数：无

返回：账号

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port'});
var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ', sequence: 688};
var tx = remote.buildOfferCancelTx(options);
var account = tx.getAccount();
console.log(account);  
```

:::

## 获得交易类型

方法：getTransactionType();

参数：无

返回：交易类型

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port'});
var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ', sequence: 688};
var tx = remote.buildOfferCancelTx(options);
var type = tx.getTransactionType();
console.log(type);  
```

:::

## 传入私钥

交易提交之前需要传入私钥。

方法：setSecret(secret);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|secret |String |井通钱包私钥|

返回：Transaction对象

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port'});
var options = {account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ', sequence: 688};
var tx = remote.buildOfferCancelTx(options);
tx.setSecret('sn37nYrQ6KPJvTFmaBYokS3FjXUWd');
```

:::

## 添加备注

方法：addMemo(memo);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|memo |String |备注信息，不超过2k。|

返回：Transaction对象

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port'});
var tx = remote.buildPaymentTx({
    account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
    to: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
    amount: {
    "value": 0.5,
    "currency": "SWT",
    "issuer": ""
    }
});
tx.addMemo('给jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c支付0.5swt.');
```

:::

## 设置sequence

方法：setSequence(sequence);主要用于签名相关。

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|sequence |Integer |账号当前序列号|

返回：Transaction对象

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port'});
var tx = remote.buildPaymentTx({
    account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
    to: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
    amount: {
    "value": 0.5,
    "currency": "SWT",
    "issuer": ""
    }
});
tx.setSequence(10);
```

:::

## 交易多签过程

方法：multiSigning({})，主要用于多重签名相关；

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|account |String |给交易签名的账号地址|
|secret |String |给交易签名的账号私钥|

返回：Transaction对象

多重签名过程中会有验签结果，可通过查看Transaction对象中tx_json.verifyTx字段是否返回错误，若返回错误则失败，需要上一用户重新签名，否则成功。如下判断：

```js
if(tx.tx_json.verifyTx && tx.tx_json.verifyTx.toString().indexOf('verify failed')){//验签结果
    console.log('verify failed');
}else {
    console.log('verify success');
}
```

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
tx.multiSigning({ 
  account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
  secret: 'ssL...bSy'
});
if(tx.tx_json.verifyTx && tx.tx_json.verifyTx.toString().indexOf('verify failed')){//验签结果
    console.log('verify failed');
}else {
    console.log('verify success');
}
```

:::

## 交易多签结束

方法：multiSigned()，主要用于多重签名相关；

参数：无

返回：Transaction对象

本接口会有验签结果，可通过查看Transaction对象中tx_json.verifyTx字段是否返回错误，若返回错误则失败，需要上一用户重新签名；否则成功。如下判断：

```js
if(tx.tx_json.verifyTx && tx.tx_json.verifyTx.toString().indexOf('verify failed')){//验签结果
    console.log('verify failed');
}else {
    console.log('verify success');
}
```

:::details {{$frontmatter.checkCode}}

```js
var tx_json = { 
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
        TxnSignature: '3045022100DDC408965E9F62626BC6A0603A0D707B64E0157B84299414BCF8C560EDE776970220093CB723375F3725DC41FB5B207B2CEEE158D5D70A90F18BD10D330F637DB9A3' 
      } 
    } 
  ] 
}
var tx = remote.buildTx(tx_json);
tx.multiSigning({ 
    account: 'jJwkfLEVTkM6u3J7kWoATFd5aauBw5S8Kz',
        secret: 'ssL...bSy'
});
tx.multiSigned();//多重签名结束
if(tx.tx_json.verifyTx && tx.tx_json.verifyTx.toString().indexOf('verify failed')){//验签结果
    console.log('verify failed');
}else {
    console.log('verify success');
}
```

:::

## 提交请求

方法：submit(callback);

参数：回调函数，包含两个参数：错误信息和结果信息

:::details {{$frontmatter.checkCode}}

```js
var jlib = require('jingtum-lib');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://xxx:port', local_sign:true});
remote.connect(function (err, result) {
    if (err) {
        return console.log('err:', err);
    }
    var req = remote.requestAccountInfo({account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'});
     req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
```

:::