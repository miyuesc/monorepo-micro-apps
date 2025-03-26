import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Miyue\'s Shared Library',
  appearance: 'light',
  description: 'Made with typedoc and typedoc-plugin-markdown.',
  locales: {
    root: {
      label: '简体中文',
      link: '/',
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    logo: 'https://miyuefe.cn/assets/images/logo.svg',
    search: { provider: 'local' },
    outline: 'deep',
    socialLinks: [{ icon: 'github', link: 'https://github.com/miyuesc/monorepo-micro-apps' }],
    footer: {
      copyright: `Copyright © 2024-${new Date().getFullYear()} MiyueFE`,
      message: 'Released under the MIT License.',
    },
  },
})
