/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-22 10:45:04
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-28 14:03:47
 * @FilePath: \view\src\main.ts
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'

import store from "@/store/index";
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'


const app = createApp(App);
app.use(store).use(router);
app.mount('#app');

