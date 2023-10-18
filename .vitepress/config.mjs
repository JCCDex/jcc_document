import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/asset/favicon.ico' }]],
  title: "Jcc_Document",
  description: "A site about SWTC chain's jcc_document for developer",
  cleanUrls: true,
  srcDir: './src',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '参考', link: '/reference/wallet' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '介绍',
          collapsed: false,
          items: [
            { text: '入门', link: '/guide/introduction' },
            { text: '创建钱包', link: '/guide/createWallet' },
          ]
        }
      ],
      '/reference/': [
        {
          text: 'API',
          collapsed: false,
          items: [
            { text: 'Wallet类', link: '/reference/wallet' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JCCDex/jcc_document' }
    ]
  }
})
