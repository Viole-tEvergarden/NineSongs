/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-22 11:01:27
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-30 14:17:46
 * @FilePath: \view\src\store\audioPlay.ts
 * @Description: 
 */
import { defineStore } from 'pinia';
interface State {
  volume: number; //音量
  currentTime: number; //当前播放进度
  payload: number;//总时长
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useAudio = defineStore('audio', {
  // state: 返回对象的函数
  state: (): State => ({
    volume: 50,
    currentTime: 0,
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