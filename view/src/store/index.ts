/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-22 11:01:27
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-29 11:06:32
 * @FilePath: \view\src\store\index.ts
 * @Description: 
 */
import { defineStore } from 'pinia';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
interface State {
  token: string,
  userInfo: any,
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore('GlobalState',{
  // state: 返回对象的函数
  state: (): State => ({
    token: '',
    userInfo: {},
  }),
  actions: {
    // 不使用箭头函数
    setToken(token: string) {
      this.token = token;
    },
    setUserIngo(userInfo: any) {
      this.userInfo = userInfo;
    },
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