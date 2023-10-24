import { defineConfig } from 'vitepress'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  title: "Jcc_Document",
  description: "A site about SWTC chain's jcc_document for developer",
<<<<<<< HEAD
=======
  // cleanUrls: false,
>>>>>>> f58523d1842fac1e5c284c03f392071be79174b8
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
    ]
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
      }),
    ],
  }
})

function nav() {
  return [
    { text: '首页', link: '/' },
    { text: 'Jingtum_lib', link: '/jingtum_lib/',activeMatch: '/jingtum_lib/' },
    { text: 'Jcc_wallet', link: '/jcc_wallet/', activeMatch: '/jcc_wallet/' },
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

}

function jccLib() {
  
}