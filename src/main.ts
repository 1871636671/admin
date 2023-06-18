import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import install from '@/config/antd'
import timerDirective from './config/timer'
import ColorPicker from 'colorpicker-v3' // 颜色选择器
import 'colorpicker-v3/style.css' // 引入样式文件

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册antd
install(app)

//页面停留
timerDirective(app)

app.use(createPinia())
app.use(router)
app.use(ColorPicker)

app.mount('#app')
