// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import runCode from '../../src/components/runCode.vue'
import content from './content.vue'
import './style.css'
import '../../src/asset/common.css'
export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      'home-features-before': () => h(content)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('runCode', runCode)
  }
}
