---
# title: remote
# editLink: true
checkCode: '代码示例'
outline: deep
---
# Request类

Request类主管GET请求，包括获得服务器、账号、挂单、路径等信息。请求时不需要提供密钥，且对所有用户公开。所有的请求是异步的，会提供一个回调函数。每个回调函数有两个参数，一个是错误，另一个是结果。提供以下方法：

* selectLedger(ledger)
* submit(callback)

## 指定账本

方法：selectLedger(ledger);

参数：
|参数 |类型 |说明|
| :----| :----| :----|
|ledger	|String	|账本高度或者账号hash|

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
    req.selectLedger("8573498");
    req.submit(function(err, result) {
        if(err) {console.log('err:',err);}
        else if(result){
            console.log('res:', result);
        }
    });
});
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
