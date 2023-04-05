/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-29 11:00:47
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-04-04 19:38:33
 * @FilePath: \view\src\store\audioPlay.ts
 * @Description: 
 */
/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-22 11:01:27
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-31 11:50:10
 * @FilePath: \view\src\store\audioPlay.ts
 * @Description: 
 */
import { defineStore } from 'pinia';
interface State {
  volume: number; //音量
  currentTime: number; //当前播放进度
  payload: number;//总时长
  setCurrentTime: number;//其他组件需要更改播放进度时改这项值为 currentTime; 播放组件中会监听这个值来设置 audio 标签的播放进度同时同步 currentTime 的值
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAudio = defineStore('audio', {
  // state: 返回对象的函数
  state: (): State => ({
    volume: 50,
    currentTime: 0,
    setCurrentTime: 0,
    payload: 0
  }),
  actions: {
    
  },
  // 持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'audio',
        storage: localStorage,
        paths: ['volume']
      }
    ]
  }
});