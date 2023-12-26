---
# editLink: true
checkCode: '点我运行代码'
outline: deep
---
# 多签

## 设置多签账号

```ts
/**
 * enable/disable multi-sign account, signerQuorum is zero means disable
 *
 * @param {string} address multi-sign jingtum wallet
 * @param {string} secret secret of your jingtum wallet
 * @param {number} signerQuorum threshold of voting
 * @param {ISignerEntry[]} signerEntries list of signer account and weight
 * @returns {Promise<string>} resolve hash if success
 * @memberof Transaction
 */
public function setSignerList(
  address: string,
  secret: string,
  signerQuorum: number,
  signerEntries?: ISignerEntry[]
): Promise<string>
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_setSignerList">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)


const address = 'jHLrB8gcWgtqXcEDSrCxoKJR6faMzTWqLM'
const secret = 'snBymGgaecGM6ede5VBDeisiNNZy2'
const signerQuorum = 3
const signerEntries = [
  {
    Account: '成员账号1',
    SignerWeight: 1
  },
  {
    Account: '成员账号2',
    SignerWeight: 2
  },
  {
    Account: '成员账号3',
    SignerWeight: 3
  },
  ...
]

const hash = await jtTransaction.setSignerList(address, secret, signerQuorum, signerEntries)

console.log(hash)
</pre>

<runCode tid="code_setSignerList" />
:::

## 设置多签账号是否禁用密钥

```ts
public function setAccount(address: string, secret: string, disable: boolean): Promise<string>
```

**注:非多签账号不可禁用密钥，会导致账号被锁无法交易且无法恢复。**

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_setAccount">
const { Transaction } = require('@jccdex/jingtum-lib')

let nodes = ['https://whskywelldrpc1.jccdex.cn:8443','https://whskywelldrpc2.jccdex.cn:8443']
const jtTransaction = new Transaction('jingtum', nodes)


const address = '多签账号'
const secret = '多钱账号密钥'
const disable = false

// true禁用密钥，false恢复密钥
const hash = await jtTransaction.setAccount(address, secret, disable)

console.log(hash)
</pre>

<runCode tid="code_setAccount" />
:::
