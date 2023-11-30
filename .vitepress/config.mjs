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
  lastUpdated: true,
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
      }

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
        { text: '开始', link: 'initHD'},
        { text: '如何使用', link: 'HDWallet'},
      ]
    },
    {
      text: 'Jingchang Wallet',
      collapsed: false,
      items: [
        { text: '开始', link: 'initJingchang'},
        { text: '如何使用', link: 'jingchangWallet'},
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
      items: [
        { text: '如何使用', link: 'wallet'},
      ]
    },
    {
      text: 'Transaction',
      collapsed: false,
      items: [
        { text: '如何使用', link: 'transaction'},
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
      text: 'Wallet',
      link: '/wallet'
    },{
      text: 'WalletSM',
      link: '/walletsm'
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
      link: '/builder'
    },{
      text: 'JccJingtum',
      link: '/jingtum'
    }
  ]
}