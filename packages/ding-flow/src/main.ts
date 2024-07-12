import { createApp } from 'vue'
import App from './App.vue'

import df from '@/components/index'
import '@/styles/index.scss'
import i18n from '@/i18n'

const app = createApp(App)

app.use(df)
app.use(i18n)

app.mount('#app')
