import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import install from '@/config/antd'
import timerDirective from './config/timer'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册antd
install(app)

//页面停留
timerDirective(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
