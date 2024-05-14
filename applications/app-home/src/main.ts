import type { App as AppInstance } from 'vue'
import { createApp } from 'vue'
import type { Router, RouterHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import pkg from '../package.json'
import App from './App.vue'
import routes from './router'

declare global {
  interface Window {
    eventCenterForAppNameVite: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
  }
}

let app: AppInstance | null = null
let router: Router | null = null
let history: RouterHistory | null = null

// 将渲染操作放入 mount 函数
function mount() {
  history = createWebHashHistory()
  router = createRouter({
    history,
    routes,
  })

  app = createApp(App)
  app.use(router)
  app.mount('#vite-app')
}

// 将卸载操作放入 unmount 函数
function unmount() {
  app?.unmount()
  history?.destroy()
  // 卸载所有数据监听函数
  window.eventCenterForAppNameVite?.clearDataListener()
  app = null
  router = null
  history = null
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  window[`micro-app-${pkg.name}`] = { mount, unmount }
}
else {
  // 非微前端环境直接渲染
  mount()
}
