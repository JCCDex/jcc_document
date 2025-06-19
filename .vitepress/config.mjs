import { defineConfig } from 'vitepress'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/documents/favicon.ico' }]],
  title: "井畅开发文档",
  description: "SWTC 链相关开发文档",
  srcDir: './src',
  base: '/documents/',
  // lastUpdated: true,
  appearance: true,
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/jingtum_lib/': {
        base: '/jingtum_lib/',
        items: jtLib()
      },
      '/jcc_wallet/': {
        base: '/jcc_wallet/',
        items: jccWallet()
      },
      '/jcc_jingtum_lib/': {
        base: '/jcc_jingtum_lib/',
        items: jccLib()
      },
      '/jcc_wallet_java/': {
        base: '/jcc_wallet_java/',
        items: jccWalletJava()
      },
      '/jcc_jingtum_lib_java/': {
        base: '/jcc_jingtum_lib_java/',
        items: jccLibJava()
      },
      '/jcc_cloud/explorer': {
        base: '/jcc_cloud/explorer',
        items: jccCloudExplorer()
      },
      '/jcc_cloud/txpool': {
        base: '/jcc_cloud/txpool',
        items: jccCloudTxPool()
      },
      '/jcc_blog/': {
        base: '/jcc_blog',
        items: jccBlog()
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/JCCDex/jcc_document' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present'
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true, //搜索结果默认展示细节
        disableQueryPersistence: true, //取消搜索词持久化
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        },
        'local-search-detailed-list': true,
      }
    },
    lastUpdatedText: '最后更新时间',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outlineTitle: '本页内容'
  },
  vite: {
    plugins: [
      nodePolyfills({
        include: ['buffer','events','crypto','util','stream'],
        globals: {
          Buffer: true,
          global: true,
          process: true,
        }
      })
    ],
  }
})

function nav() {
  return [
    { text: '首页', link: '/' },
    { text: 'jingtum_lib', link: '/jingtum_lib/',activeMatch: '/jingtum_lib/' },
    { text: 'jcc_wallet', items: [
        { text: 'jcc_wallet (js)', link: '/jcc_wallet/introduction' },
        { text: 'jcc_wallet (java)', link: '/jcc_wallet_java/introduction' },
      ] 
    },
    { text: 'jcc_jingtum_lib', items: [
        { text: 'jcc_jingtum_lib (js)', link: '/jcc_jingtum_lib/introduction' },
        { text: 'jcc_jingtum_lib (java)', link: '/jcc_jingtum_lib_java/introduction' },
      ] 
    },
    { text: 'jcc_cloud', items: [
        { text: '浏览器服务', link: '/jcc_cloud/explorer/introduction' },
        { text: '交易池服务', link: '/jcc_cloud/txpool/introduction' },
      ] 
    },
    { text: 'Blog', link: '/jcc_blog/01_blog',activeMatch: '/jcc_blog/' },
  ]
}

function jtLib() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '入门', link: 'introduction'},
        { text: '创建钱包', link: 'createWallet'},
      ]
    },
    {
      text: '操作类',
      collapsed: false,
      items: [
        { text: 'REMOTE类', link: 'remote'},
        { text: 'REQUEST类', link: 'request'},
        { text: 'TRANSACTION类', link: 'transaction'},
        { text: '工具类', link: 'tool'},
      ]
    },
    {
      text: 'ERC721原生接口',
      link: 'erc721'
    },
    {
      text: '底层常见错误附录',
      link: 'errorCollection'
    },
    {
      text: 'Solidity ERC20源码',
      link: 'solidityErc20'
    }
  ]
}

function jccWallet() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '入门', link: 'introduction'},
        { text: '初始化钱包', link: 'initWallet'},
      ]
    },
    {
      text: 'HD Wallet',
      collapsed: false,
      items: [
        { text: '开始', link: 'HDWallet/startHD'},
        { 
          text: '初始化', 
          base: '/jcc_wallet/HDWallet/initHD',
          // link: '#',
          collapsed: true,
          items: [
            { text: '构造函数',link: '#构造函数'},
            { text: '生成助记词',link: '#生成助记词'},
            { text: '从助记词得到密钥',link: '#从助记词得到密钥'},
            { text: '从密钥得到助记词',link: '#从密钥得到助记词'},
            { text: '密钥派生出密钥对',link: '#密钥派生出密钥对'},
            { text: '派生HD密钥对',link: '#派生hd密钥对'},
            { text: '创建HD钱包对象实例',link: '#创建hd钱包对象实例'},
            { text: '通过根密钥创建HD钱包对象实例',link: '#通过根密钥创建hd钱包对象实例'},
            { text: '通过助记词创建HD钱包对象实例',link: '#通过助记词创建hd钱包对象实例'},
            { text: '通过密钥对创建HD钱包对象实例',link: '#通过密钥对创建hd钱包对象实例'},
          ]
        },
        { 
          text: 'HDWallet实例', 
          base: '/jcc_wallet/HDWallet/instanceHD',
          collapsed: true,
          items: [
            { text: '判断HD钱包是否是root',link: '#判断hd钱包是否是root'},
            { text: '派生钱包',link: '#派生钱包'},
            { text: '对内容进行hash',link: '#对内容进行hash'},
            { text: '对内容进行签名',link: '#对内容进行签名'},
            { text: '校验签名是否有效',link: '#校验签名是否有效'},
            { text: '通过签名信息恢复地址/账户',link: '#通过签名信息推理出地址-账户'},
            { text: '获取链api',link: '#获取链api'},
            { text: '返回钱包密钥',link: '#返回钱包密钥'},
            { text: '返回钱包助记词',link: '#返回钱包助记词'},
            { text: '返回钱包所在链',link: '#返回钱包所在链'},
            { text: '返回钱包地址',link: '#返回钱包地址'},
            { text: '返回钱包密钥对',link: '#返回钱包密钥对'},
            { text: '返回钱包路径',link: '#返回钱包路径'},
            { text: '设置密钥对',link: '#设置密钥对'},
            { text: '校验地址是否有效',link: '#校验地址是否有效'},
            { text: '校验密钥是中否有效',link: '#校验密钥是中否有效'},
          ]
        },
      ]
    },
    {
      text: 'Jingchang Wallet',
      collapsed: false,
      items: [
        { text: '开始', link: 'JingchangWallet/start'},
        { 
          text: '初始化', 
          base: '/jcc_wallet/JingchangWallet/init',
          collapsed: true,
          // link: 'JingchangWallet/init'
          items: [
            { text: '构造函数',link: '#构造函数'},
            { text: '生成keystore',link: '#生成keystore'},
            { text: '校验Keystore',link: '#校验keystore'},
          ]
        },
        { text: '浏览器缓存', link: 'JingchangWallet/broswer'},
        { 
          text: '钱包管理', 
          base: '/jcc_wallet/JingchangWallet/management',
          collapsed: true,
          // link: 'JingchangWallet/management'
          items: [
            { text: 'getwalletwithtype',link: '#getwalletwithtype'},
            { text: 'getwalletwithaddress',link: '#getwalletwithaddress'},
            { text: 'getsecretwithtype',link: '#getsecretwithtype'},
            { text: 'getsecretwithaddress',link: '#getsecretwithaddress'},
            { text: 'changewholepassword',link: '#changewholepassword'},
            { text: 'changePasswordWithAddress',link: '#changePasswordWithAddress'},
            { text: 'replacekeystore',link: '#replacekeystore'},
            { text: 'removewalletwithtype',link: '#removewalletwithtype'},
            { text: 'removewalletwithaddress',link: '#removewalletwithaddress'},
            { text: 'setDefaultWallet',link: '#setDefaultWallet'},
            { text: 'importSecret',link: '#importSecret'},
          ]
        },
        { 
          text: '工具函数', 
          base: '/jcc_wallet/JingchangWallet/tool',
          collapsed: true,
          // link: 'JingchangWallet/tool'
          items: [
            { text: 'getwallets',link: '#getwallets'},
            { text: 'getaddress',link: '#getaddress'},
            { text: 'derivekeypair',link: '#derivekeypair'},
            { text: 'encryptwithpublickey',link: '#encryptwithpublickey'},
            { text: 'decryptwithprivatekey',link: '#decryptwithprivatekey'},
            { text: 'setjingchangwallet',link: '#setjingchangwallet'},
            { text: 'hasdefault',link: '#hasdefault'},
            { text: 'findwallet',link: '#findwallet'},
            { text: 'getencryptdata',link: '#getencryptdata'},
            { text: 'savewallet',link: '#savewallet'},
          ]
        },
      ]
    },
    {
      text: 'TS类型',
      link: '/type'
    }
  ]
}

function jccLib() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '入门', link: 'introduction'},
        // { text: '初始化钱包', link: 'initWallet'},
      ]
    },
    {
      text: 'Wallet',
      collapsed: false,
      base: '/jcc_jingtum_lib/wallet',
      // collapsed: true,
      items: [
        { text: '构造函数', link: '#构造函数'},
        { text: '创建钱包', link: '#创建钱包'},
        { text: '得到钱包地址', link: '#得到钱包地址'},
        { text: '生成hash', link: '#生成hash'},
        { text: '校验地址', link: '#校验地址'},
        { text: '校验密钥', link: '#校验密钥'},
        { text: '获取fee', link: '#获取fee'},
        { text: '获取基础币', link: '#获取基础币'},
        { text: '获取发行方(issuer)', link: '#获取发行方-issuer'},
        { text: '签名-sign', link: '#签名-sign'},
        { text: '多签名-multisign', link: '#多签名-multisign'},
      ]
    },
    {
      text: 'Transaction',
      collapsed: false,
      base: '/jcc_jingtum_lib/Transaction/',
      items: [
        { 
          text: '构造函数', 
          link: 'constructor',
          // link: 'Transaction/constructor'
        },
        { 
          text: '账号管理', 
          base: '/jcc_jingtum_lib/Transaction/account',
          collapsed: true,
          // link: 'Transaction'
          items: [
            { text: '冻结账号 (管理员)', link: '#冻结账号-管理员'},
            { text: '解冻账号 (管理员)', link: '#解冻账号-管理员'},
            { text: '设置平台手续费 (管理员)', link: '#设置平台手续费-管理员'},
            { text: '设置ManageIssuer (管理员)', link: '#设置manageissuer-管理员'}
          ]
        },
        { 
          text: '交易相关', 
          base: '/jcc_jingtum_lib/Transaction/transaction',
          collapsed: true,
          // link: 'Transaction/transaction'
          items: [
            { text: '获取钱包地址的Sequence', link: '#获取钱包地址的sequence'},
            { text: '获取对应Hash的交易信息', link: '#获取对应hash的交易信息'},
            { text: '查看账户历史交易', link: '#查看账户历史交易'},
            { text: '发送交易(blob)', link: '#发送交易-blob'},
            { text: '发送交易', link: '#发送交易'},
            { text: 'tx是否经过验证', link: '#tx是否经过验证'},
            { text: 'tx的结果是否成功', link: '#tx的结果是否成功'},
            { text: '获取节点', link: '#获取节点'},
            { text: '设置节点', link: '#设置节点'},
          ]
        },
        { 
          text: 'ERC20（Token）', 
          base: '/jcc_jingtum_lib/Transaction/erc20',
          collapsed: true,
          // link: 'Transaction/erc20'
          items: [
            { text: '创建委托', link: '#创建委托'},
            { text: '取消委托', link: '#取消委托'},
            { text: 'token转账', link: '#token转账'},
            { text: '通证发行 (管理员)', link: '#通证发行-管理员'}
          ]
        },
        { 
          text: 'ERC721（NFT）', 
          base: '/jcc_jingtum_lib/Transaction/erc721',
          collapsed: true,
          // link: 'Transaction/erc721'
          items: [
            { text: '查看账户拥有的erc721 token', link: '#查看账户拥有的erc721-token'},
            { text: '获取erc721 token详情', link: '#获取erc721-token详情'},
            { text: 'NFT发行 (管理员)', link: '#nft发行-管理员'},
            { text: '铸造NFT (NFT发行方)', link: '#铸造nft-nft发行方'},
            { text: '销毁NFT (NFT发行方)', link: '#销毁nft-nft发行方'},
            { text: 'NFT发行 (管理员)', link: '#nft发行-管理员'}
          ]
        },
        { 
          text: '多签名', 
          base: '/jcc_jingtum_lib/Transaction/multisign',
          collapsed: true,
          // link: 'Transaction/multisign'
          items: [
            { text: '设置多签账号', link: '#设置多签账号'},
            { text: '设置多签账号是否禁用密钥', link: '#设置多签账号是否禁用密钥'}
          ]
        },
        { text: '构造tx', link: 'tx'}
      ]
    },
    {
      text: 'TS类型',
      link: '/type'
    }
  ]
}

function jccWalletJava() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '入门', link: 'introduction'},
        // { text: '初始化钱包', link: 'initWallet'},
      ]
    },{
      text: 'Wallet（非国密）',
      base: 'jcc_wallet_java/wallet',
      collapsed: true,
      items: [
        { text: '构造器', link: '#构造器'},
        { text: '随机生成钱包地址-generate', link: '#随机生成钱包地址-generate'},
        { text: '根据密钥生成钱包-fromSecret', link: '#根据密钥生成钱包-fromsecret'},
        { text: '判断钱包地址是否有效-isValidAddress', link: '#判断钱包地址是否有效-isvalidaddress'},
        { text: '判断钱包密钥是否有效-isValidSecret', link: '#判断钱包密钥是否有效-isvalidsecret'},
        { text: '获取钱包公钥-getPublicKey', link: '#获取钱包公钥-getpublickey'},
        { text: '使用钱包密钥对信息进行签名-sign', link: '#使用钱包密钥对信息进行签名-sign'},
        { text: '校验信息的自作签名是否正确-verify', link: '#校验信息的自作签名是否正确-verify'},
        { text: '通过公钥获取钱包地址-getAddress', link: '#通过公钥获取钱包地址-getaddress'},
        { text: '获取钱包地址-getAddress', link: '#获取钱包地址-getaddress'},
        { text: '获取钱包密钥-getSecret', link: '#获取钱包密钥-getsecret'},
        { text: '获取钱包keypairs属性-getKeypairs', link: '#获取钱包keypairs属性-getkeypairs'},
        { text: '设置钱包keypairs属性-setKeypairs', link: '#设置钱包keypairs属性-setkeypairs'},
        { text: '设置钱包密钥-setSecret', link: '#设置钱包密钥-setsecret'},
        { text: '设置钱包字母表-setAlphabet', link: '#设置钱包字母表-setalphabet'},
        { text: '获取钱包字母表-getAlphabet', link: '#获取钱包字母表-getalphabet'},
      ]
      // link: '/wallet'
    },{
      text: 'WalletSM（国密）',
      // link: '/walletsm'
      base: 'jcc_wallet_java/walletsm',
      collapsed: true,
      items: [
        { text: '构造器', link: '#构造器'},
        { text: '随机生成钱包地址-generate', link: '#随机生成钱包地址-generate'},
        { text: '根据密钥生成钱包-fromSecret', link: '#根据密钥生成钱包-fromsecret'},
        { text: '判断钱包地址是否有效-isValidAddress', link: '#判断钱包地址是否有效-isvalidaddress'},
        { text: '判断钱包密钥是否有效-isValidSecret', link: '#判断钱包密钥是否有效-isvalidsecret'},
        { text: '获取钱包公钥-getPublicKey', link: '#获取钱包公钥-getpublickey'},
        { text: '使用钱包密钥对信息进行签名-sign', link: '#使用钱包密钥对信息进行签名-sign'},
        { text: '校验信息的自作签名是否正确-verify', link: '#校验信息的自作签名是否正确-verify'},
        { text: '通过公钥获取钱包地址-getAddress', link: '#通过公钥获取钱包地址-getaddress'},
        { text: '获取钱包地址-getAddress', link: '#获取钱包地址-getaddress'},
        { text: '获取钱包密钥-getSecret', link: '#获取钱包密钥-getsecret'},
        { text: '获取钱包keypairs属性-getKeypairs', link: '#获取钱包keypairs属性-getkeypairs'},
        { text: '设置钱包keypairs属性-setKeypairs', link: '#设置钱包keypairs属性-setkeypairs'},
        { text: '设置钱包密钥-setSecret', link: '#设置钱包密钥-setsecret'},
        { text: '设置钱包字母表-setAlphabet', link: '#设置钱包字母表-setalphabet'},
        { text: '获取钱包字母表-getAlphabet', link: '#获取钱包字母表-getalphabet'},
      ]
    }
  ]
}

function jccLibJava() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '入门', link: 'introduction'},
      ]
    },{
      text: 'Builder',
      collapsed: false,
      items: [
        { 
          text: 'JccJingtum.Builder', 
          base: 'jcc_jingtum_lib_java/builder',
          collapsed: true,
          // link: '/builder'
          items: [
            { text: '构造器', link: '#构造器'},
            { text: '设置钱包字母表', link: '#设置钱包字母表-setalphabet'},
            { text: '设置每笔交易燃料费', link: '#设置每笔交易燃料费-setfee'},
            { text: '设置链基础通证', link: '#设置链基础通证-setbasetoken'},
            { text: '设置交易平台账号', link: '#设置交易平台账号-setplatform'},
            { text: '实例化JccJingtum', link: '#实例化jccjingtum-build'}
          ]
        },
      ]
      
    },{
      text: 'JccJingtum',
      collapsed: false,
      items: [
        { text: '实例化', link: 'JccJingtum/jingtum'},
        { 
          text: '基础信息', 
          base: 'jcc_jingtum_lib_java/JccJingtum/basic',
          collapsed: true,
          // link: 'JccJingtum/basic'
          items: [
            { text: '获取钱包字母表', link: '#获取钱包字母表-getalphabet'},
            { text: '获取每笔交易燃料费', link: '#获取每笔交易燃料费-getfee'},
            { text: '获取链基础通证', link: '#获取链基础通证-getbasetoken'},
            { text: '获取交易平台账号', link: '#获取交易平台账号-getplatform'},
            { text: '获取异常重试次数', link: '#获取异常重试次数-gettrytimes'}
          ]
        },
        { 
          text: '账号管理', 
          base: 'jcc_jingtum_lib_java/JccJingtum/account',
          collapsed: true,
          // link: 'JccJingtum/account'
          items: [
            { text: '创建钱包(账号)', link: '#创建钱包-账号-createwallet'},
            { text: '通过钱包密钥获取钱包地址', link: '#通过钱包密钥获取钱包地址-getaddress'},
            { text: '获取sequence', link: '#获取sequence-getsequence'},
            { text: '向指定节点获取sequence', link: '#向指定节点获取sequence-getsequence'}
          ]
        },
        { 
          text: '交易相关', 
          base: 'jcc_jingtum_lib_java/JccJingtum/transaction',
          collapsed: true,
          // link: 'JccJingtum/transaction'
          items: [
            { text: '构造撤单交易数据', link: '#构造撤单交易数据-buildcancleorder'},
            { text: '构造挂单交易数据(本地签名)', link: '#构造挂单交易数据-本地签名-buildcreateorder'},
            { text: '构造转账交易数据', link: '#构造转账交易数据-buildpayment'},
            { text: '发送交易请求(签名后的数据，本地签名)', link: '#发送交易请求-签名后的数据-本地签名-submitblob'},
            { text: '向指定节点发送交易请求(签名后的数据，本地签名)', link: '#向指定节点发送交易请求-签名后的数据-本地签名-submitblob'},
            { text: '发送交易请求(非本地签名)', link: '#发送交易请求-非本地签名-submitwithsecret'},
            { text: '向指定节点发送交易请求(非本地签名)', link: '#向指定节点发送交易请求-非本地签名-submitwithsecret'},
            { text: '根据hash获取交易详情', link: '#根据hash获取交易详情-requesttx'},
            { text: '根据hash向指定节点获取交易详情', link: '#根据hash向指定节点获取交易详情-requesttx'},
          ]
        },
        { 
          text: '节点相关', 
          base: 'jcc_jingtum_lib_java/JccJingtum/rpcHost',
          collapsed: true,
          // link: 'JccJingtum/rpcHost'
          items: [
            { text: '获取指定节点状态', link: '#获取指定节点状态-getserverstate'},
            { text: '获取节点状态', link: '#获取节点状态-getserverstate'},
            { text: '获取rpc节点列表', link: '#获取rpc节点列表-getrpcnodes'}
          ]
        },
        { 
          text: '工具方法', 
          base: 'jcc_jingtum_lib_java/JccJingtum/tool',
          collapsed: true,
          // link: 'JccJingtum/tool'
          items: [
            { text: '16进制备注内容直接转换成为字符串', link: '#_16进制备注内容直接转换成为字符串-无需unicode解码-getmemodata'},
            { text: '时间戳转换', link: '#时间戳转换-区块链账本上的时间戳是相对于2000-01-01-08-00-00的偏移时间-换算成当前时间需要转换-converttime'}
          ]
        },
      ]
      
    }
  ]
}

function jccCloudExplorer() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '使用', link: '/introduction'},
      ]
    },
    {
      text: 'Block相关接口',
      collapsed: false,
      base: '/jcc_cloud/explorer/block',
      items: [
        { text: '查询指定区块内包含的交易列表', link: '#查询指定区块内包含的交易列表'},
        { text: '查询最新的6个区块基本信息', link: '#查询最新的6个区块基本信息'},
        { text: '查询所有区块基本信息', link: '#查询所有区块基本信息'},
      ]
    },
    {
      text: 'Hash相关接口',
      collapsed: false,
      base: '/jcc_cloud/explorer/hash',
      items: [
        { text: '查询最新的6笔交易', link: '#查询最新的6笔交易'},
        { text: '查询所有交易hash列表', link: '#查询所有交易hash列表'},
        { text: '通过哈希查询对应的区块信息或交易信息', link: '#通过哈希查询对应的区块信息或交易信息'},
        { text: '根据区块哈希查询其包含的交易列表', link: '#根据区块哈希查询其包含的交易列表'},
      ]
    },
    {
      text: 'Wallet相关接口',
      collapsed: false,
      base: '/jcc_cloud/explorer/wallet',
      items: [
        { text: '查询指定钱包的余额', link: '#查询指定钱包的余额'},
        { text: '查询指定钱包的当前委托单', link: '#查询指定钱包的当前委托单'},
        { text: '查询指定钱包的历史交易', link: '#查询指定钱包的历史交易'},
        { text: '查询银关地址发行过tokens', link: '#查询银关地址发行过tokens'},
        { text: '查询指定钱包的历史收费交易查询', link: '#查询指定钱包的历史收费交易查询'},
      ]
    },
    {
      text: '统计相关接口',
      collapsed: false,
      base: '/jcc_cloud/explorer/sum',
      items: [
        { text: '通证信息查询', link: '#通证信息查询'},
        { text: '查询通证流通信息', link: '#查询通证流通信息'},
        { text: '查询所有通证分类列表', link: '#查询所有通证分类列表'},
        { text: '链上交易量统计', link: '#链上交易量统计'},
        { text: '链上新增用户数统计', link: '#链上新增用户数统计'},
        { text: '用户钱包资产统计', link: '#用户钱包资产统计'},
        { text: '获取某交易对的最新交易记录', link: '#获取某交易对的最新交易记录'},
      ]
    },
    {
      text: 'ERC721相关接口',
      collapsed: false,
      base: '/jcc_cloud/explorer/erc721',
      items: [
        { text: '统计NFT信息', link: '#统计NFT信息'},
        { text: '验证NFT通证是否存在', link: '#验证NFT通证是否存在'},
        { text: '验证NFT通证ID是否存在', link: '#验证NFT通证ID是否存在'},
        { text: '查询NFT通证转移记录', link: '#查询NFT通证转移记录'},
        { text: '查询NFT发行状况', link: '#查询NFT发行状况'},
        { text: '查询NFT最新状态（发行、流通、销毁）', link: '#查询NFT最新状态'},
      ]
    },                                                                                                   
    {
      text: 'Offer相关接口',
      collapsed: false,
      base: '/jcc_cloud/explorer/offer',
      items: [
        { text: '指定钱包指定订单的订单状态查询', link: '#指定钱包指定订单的订单状态查询'},
      ]
    },                                                                                                   
    {
      text: 'TX类型',
      link: '/tx'
    }
  ]
}

function jccCloudTxPool() {
  return [
    {
      text: '介绍',
      collapsed: false,
      items: [
        { text: '使用', link: '/introduction'},
      ]
    },
    {
      text: '相关接口',
      collapsed: false,
      base: '/jcc_cloud/txpool/api',
      items: [
        { text: '获取地址公钥信息', link: '#获取地址公钥信息'},
        { text: '从交易池服务获取seq', link: '#从交易池服务获取seq'},
        { text: '批量签名', link: '#批量签名'},
        { text: '提交交易内容到交易池', link: '#提交交易内容到交易池'},
        { text: '查询某地址在交易池中的状态', link: '#查询某地址在交易池中的状态'},
        { text: '取消某地址所有未上链和上链失败的交易', link: '#取消某地址所有未上链和上链失败的交易'},
        { text: '获取交易池中的交易数量', link: '#获取交易池中的交易数量'},
      ]
    },                                                                                                 
    {
      text: 'TX类型',
      link: '/tx'
    }
  ]
}

function jccBlog() {
  return [
    { text: '从传统软件到区块链的接口自省', link: '/01_blog'},
    { text: '了解EVM内存管理', link: '/02_blog'},
    { text: '从EVM安全事故中汲取教训', link: '/03_blog'},
    { text: 'Uniswap v4 hook 应用场景分析', link: '/04_blog'},
    { text: '如何编写一个可升级的工业级智能合约', link: '/05_blog'},
    { text: 'Foundry - 区块链工匠与他的铸造工坊', link: '/06_blog'},
    { text: 'Foundry 高级测试与开发技巧：铁匠的秘传绝艺', link: '/07_blog'},
  ]
}