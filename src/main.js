import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
const app =createApp(App);
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(ElementPlus)
app.use(UndrawUi)
app.mount('#app')