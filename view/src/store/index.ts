import { defineStore } from 'pinia';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { themeSwitching } from "@/utils/themeSwitching";
interface State {
  token: string,
  userInfo: any,
  theme?: theme
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore('GlobalState',{
  // state: 返回对象的函数
  state: (): State => ({
    token: '',
    userInfo: {},
    theme: null
  }),
  getters: {
    isdark(state){ //是否为暗色模式
      return state.theme !== 'light'
    }
  },
  actions: {
    // 不使用箭头函数
    setToken(token: string) {
      this.token = token;
    },
    setUserIngo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setTheme(theme: theme) {
      this.theme = theme;
      themeSwitching()
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