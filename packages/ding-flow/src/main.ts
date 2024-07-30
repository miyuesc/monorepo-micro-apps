import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'

import df from '@/components/index'
import '@/styles/index.scss'
import i18n from '@/i18n'

const app = createApp(App)

app.use(df)
app.use(i18n)
app.use(ArcoVue)

app.mount('#app')
