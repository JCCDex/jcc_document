---
# title: remote
# editLink: true
checkCode: '点我运行代码'
outline: deep
---

# HDWallet实例

## 判断HD钱包是否是root

```ts
/**
 * hd wallet is root or not
 *
 * @returns {boolean} return hd wallet root or not
 */
public isRoot = (): boolean
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_isRoot">
const { HDWallet, BIP44Chain } = require('jcc_wallet').hdWallet

const mnemonic = {
  mnemonic: 'soccer want seat goddess phone awake peasant high correct robot believe door',
  language: 'english'
}
const hdWallet = HDWallet.fromMnemonic(mnemonic)

console.log(hdWallet.isRoot())
</pre>

<runCode tid="code_isRoot" />
:::

## 派生钱包

```ts
/**
 * generate hd wallet by derive path, obey BIP44 protocol
 *
 * @param {any} opt options of derive, like:
 *                  {
 *                    chain: BIP44Chain.ETH, //chain code defined in bip44
 *                    account: 0, // account for what purpose
 *                    change: 0, // optional attrube,default always 0, for change account after transfer
 *                    index: 0, // accout index
 *                  }
 * @returns {object} return hd wallet object
 */
public function deriveWallet(opt: any): HDWallet
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_deriveWallet">
const { HDWallet, BIP44Chain } = require('jcc_wallet').hdWallet

const mnemonic = {
  mnemonic: 'soccer want seat goddess phone awake peasant high correct robot believe door',
  language: 'english'
}
const hdWallet = HDWallet.fromMnemonic(mnemonic)
const newHDWallet = hdWallet.deriveWallet({
  chain: BIP44Chain.ETH,
  account: 0,
  index: 0
})

console.log(newHDWallet)
console.log(newHDWallet.isRoot())
</pre>

<runCode tid="code_deriveWallet" />
:::

## 对内容进行hash

```ts
/**
 * hash message
 *
 * @param {string} message
 * @returns {string} return hash of message
 */
public function hash(message: string): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_hash">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const hash = hdWallet.hash('jcc_wallet_hdwallet')

console.log(hash)
</pre>

<runCode tid="code_hash" />
:::

## 对内容进行签名

```ts
/**
 * sign message
 * @notice how to operate message(raw or hashed) is different in native sdk of different chain
 *         to avoid confusion, we assume that native sdk will automatically hashed message
 *         if not the case of native sdk, we hash this message in lower level(plugin), for example ethereum sdk
 * @param {string} message
 * @returns {string} return signature string
 */
public function sign(message: string): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_sign">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const signature = hdWallet.sign('jcc_wallet_hdwallet')

console.log(signature)
</pre>

<runCode tid="code_sign" />
:::

## 校验签名是否有效

```ts
/**
 * verify signature valid or not
 *
 * @param {string} message origin message
 * @param {string} signature signature
 * @param {string} address account which sign
 * @param {IKeyPair} keypair keypair object, usually to provide public key, private key not required
 *
 * @returns {boolean} true valid, false invalid
 */
public function verify(messgae: string, signature: string, address?: string, keypair?: IKeyPair): boolean
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_verify">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const signature = hdWallet.sign('jcc_wallet_hdwallet')

const testResult1 = hdWallet.verify('jcc_wallet_hdwallet', signature)
const testResult2 = hdWallet.verify('jcc_wallet_hd_wallet', signature)

console.log(testResult1)
console.log(testResult2)
</pre>

<runCode tid="code_verify" />
:::

## 通过签名信息推理出地址/账户

**注：该方法不支持swtc链**

```ts
/**
 * recover address/account from signature
 *
 * @param {string} message origin message
 * @param {string} signature signature
 *
 * @returns {string} return address
 */
public function recover(messgae: string, signature: string): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_recover">
const { HDWallet, BIP44Chain } = require('jcc_wallet').hdWallet

const mnemonic = {
  mnemonic: 'soccer want seat goddess phone awake peasant high correct robot believe door',
  language: 'english'
}
const hdWallet = HDWallet.fromMnemonic(mnemonic)
const newHDWallet = hdWallet.deriveWallet({
  chain: BIP44Chain.ETH,
  account: 0,
  index: 0
})

const message = 'jcc_wallet_hdwallet'
const signature = newHDWallet.sign(message)
const testResult = newHDWallet.recover(message, signature)

console.log('Address: '+newHDWallet.address())
console.log('recoverAddress: '+testResult)
</pre>

<runCode tid="code_recover" />
:::

## 获取链API

```ts
/**
 * get specified chain wallet api
 *
 * @returns {IHDPlugin} return hd plugin object
 */
public function getWalletApi(): IHDPlugin
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_getWalletApi">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const walletApi = hdWallet.getWalletApi()

console.log(walletApi) //结果请打开控制台查看
</pre>

<runCode tid="code_getWalletApi" />
:::

## 返回钱包密钥

```ts
/**
 * get wallet secret
 *
 * @returns {string} return wallet secret
 */
public function secret(): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_secret">
const { HDWallet } = require('jcc_wallet').hdWallet

const mnemonic = {
  mnemonic: 'soccer want seat goddess phone awake peasant high correct robot believe door',
  language: 'english'
}
const hdWallet = HDWallet.fromMnemonic(mnemonic)
const secret = hdWallet.secret()
console.log(secret)
</pre>

<runCode tid="code_secret" />
:::

## 返回钱包助记词

```ts
/**
 * get wallet mnemonic
 *
 * @returns {IMnemonic} return IMnemonic object
 */
public function mnemonic(): IMnemonic
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_mnemonic">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const mnemonic = hdWallet.mnemonic()

console.log(mnemonic.mnemonic)
</pre>

<runCode tid="code_mnemonic" />
:::

## 返回钱包所在链

```ts
/**
 * get chain of hd wallet
 *
 * @returns {string} return chain of hd wallet
 */
public function chain(): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_chain">
const { HDWallet, BIP44Chain } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'

const hdWallet = HDWallet.fromSecret(testSecret)
const newHDWallet = hdWallet.deriveWallet({
  chain: BIP44Chain.ETH,
  account: 0,
  index: 0
})

const chain1 = hdWallet.chain()
const chain2 = newHDWallet.chain()

console.log(chain1)
console.log(chain2)
</pre>

<runCode tid="code_chain" />
:::

## 返回钱包地址

```ts
/**
 * get address of hd wallet
 *
 * @returns {string} return address of hd wallet
 */
public function address(): string
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_address">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const address = hdWallet.address()

console.log(address)
</pre>

<runCode tid="code_address" />
:::

## 返回钱包密钥对

```ts
/**
 * get keypair of hd wallet
 *
 * @returns {IKeyPair} return keypair of message
 */
public function keypair(): IKeyPair
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_keypair">
const { HDWallet } = require('jcc_wallet').hdWallet

const testSecret = 'snZeokZMVSEynpKCt7Zvk5pkFZAHt'
const hdWallet = HDWallet.fromSecret(testSecret)
const keyPair = hdWallet.keypair()

console.log('私钥：'+keyPair.privateKey)
console.log('公钥：'+keyPair.publicKey)
</pre>

<runCode tid="code_keypair" />
:::

## 返回钱包路径

```ts
/**
 * get path of hd wallet
 *
 * @returns {IBIP44Path} return path of wallet
 */
public function path(): IBIP44Path
```

:::details {{$frontmatter.checkCode}}
<pre class="code no_drop" id="code_path">
const { HDWallet, BIP44Chain } = require('jcc_wallet').hdWallet

const mnemonic = {
  mnemonic: 'soccer want seat goddess phone awake peasant high correct robot believe door',
  language: 'english'
}
const hdWallet = HDWallet.fromMnemonic(mnemonic)
const newHDWallet = hdWallet.deriveWallet({
  chain: BIP44Chain.ETH,
  account: 0,
  index: 1
})

const path1 = hdWallet.path()
const path2 = newHDWallet.path()

console.log(path1)
console.log(path2)
</pre>

<runCode tid="code_path" />
:::

## 设置密钥对

```ts
/**
 * set keypair
 * @param {IKeyPair} keypair
 */
public function setKeypair(keypair: IKeyPair): void
```

## 校验地址是否有效

```ts
/**
 * check address valid or not
 * @param {string} address
 * @returns {boolean} true valid, false invalid
 */
public function isValidAddress(address: string): boolean
```

## 校验密钥是中否有效

```ts
/**
 * check secret valid or not
 *
 * @param {string} secret
 * @returns {boolean} true valid, false invalid
 */
public function isValidSecret(address: string): boolean
```
