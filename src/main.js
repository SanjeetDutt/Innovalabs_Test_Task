import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import vuexStore from "./vuex/_main"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

const app = createApp(App)

app.use(router)
app.use(vuexStore)

app.mount('#app')
