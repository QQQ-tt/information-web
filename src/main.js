import { createApp } from 'vue'
import App from './App.vue'
// import App from '@/views/login.vue'
import router from '@/router/router.js'
import pinia from "@/stores/index";

createApp(App).use(router).use(pinia).mount('#app')
