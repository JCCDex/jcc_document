import { defineConfig } from 'vitepress'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/documents/favicon.ico' }]],
  title: "Jcc_Document",
  description: "A site about SWTC chain's jcc_document for developer",
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
        base: 'jcc_jingtum_lib',
        items: jccLib()
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
    lastUpdatedText: '最后更新',
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
    { text: 'Jingtum_lib', link: '/jingtum_lib/',activeMatch: '/jingtum_lib/' },
    { text: 'Jcc_wallet', link: '/jcc_wallet/introduction', activeMatch: '/jcc_wallet/' },
    { text: 'Jcc_jingtum_lib', link: '/jcc_jingtum_lib/', activeMatch: '/jcc_jingtum_lib/' },
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
      text: 'Jingchang Wallet',
      collapsed: false,
      items: [
        { text: '开始', link: 'initJingchang'},
        { text: '如何使用', link: 'jingchangWallet'},
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
      text: 'TS类型',
      link: '/type'
    }
  ]
}

function jccLib() {
  
}