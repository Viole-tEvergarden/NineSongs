import { createApp } from 'vue'
import App from './App.vue'
import store from "@/store/index";
import router from './router'
import { themeSwitching } from "./utils/themeSwitching";
import '@/styles/index.scss'

const app = createApp(App);
app.use(store).use(router);;
app.mount('#app');

// 主题初始化
themeSwitching();
