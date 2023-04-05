/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-27 14:38:22
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-04-04 18:52:17
 * @FilePath: \view\src\utils\index.ts
 * @Description: 
 */
export const getIcon = (name: string) => {
  return new URL(`../assets/Icon/${name}.svg`, import.meta.url).href;
}

/**
 * @description: 秒转分钟
 * @return {string}
 */
export const secondsToMinutes = (seconds: number):string => {
  if (seconds) {
    seconds = Math.trunc(seconds)
    const minute = Math.floor((Math.trunc(seconds)) / 60);
    const rest_seconds = seconds % 60;

    return `${minute < 10 ? '0' : ''}${minute}:${rest_seconds < 10 ? '0' : ''}${rest_seconds}`
  } else {
    return '00:00'
  }
}