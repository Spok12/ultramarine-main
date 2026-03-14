import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from 'D:/Загрузка с/ultramarine-main/ultramarine-main/frontend/App.vue'
import router from './src/router/index.js'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



const app = createApp(App)
app.use(Toast);
app.use(createPinia())
app.use(router)

app.mount('#app')