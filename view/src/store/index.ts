/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-22 11:01:27
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-04-18 13:24:22
 * @FilePath: \view\src\store\index.ts
 * @Description: 
 */
import { defineStore } from 'pinia';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { userLogout } from '@/api/user';
interface State {
  token: string,
  userInfo: any,
  isShowFullscreenPlay: boolean
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore('GlobalState',{
  // state: 返回对象的函数
  state: (): State => ({
    token: '',
    userInfo: {},
    isShowFullscreenPlay: false
  }),
  actions: {
    // 退出登录
    async logout() {
      try {
        const {msg} = await userLogout();
        ElMessage.success(msg);
        this.token = '';
        this.userInfo = {};
      } catch (error) {
        ElMessage.error('请联系管理员');
        console.log(error);
      }
    }
  },
  // 持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'GlobalState',
        storage: localStorage,
        // storage: sessionStorage,
      }
    ]
  }
});
const pinia = createPinia();
pinia.use(piniaPersist);

export default pinia;