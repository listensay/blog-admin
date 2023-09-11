import { createApp } from 'vue'
import { DatePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@/styles/common.less'

import App from './App.vue'
import router from './router'
import './permission' // permission control
import pinia from './stores'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(DatePicker)

app.mount('#app')
