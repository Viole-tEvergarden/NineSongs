/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-27 14:38:22
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-31 14:03:19
 * @FilePath: \view\src\utils\index.ts
 * @Description: 
 */
export const getIcon = (name: string) => {
  return new URL(`../assets/Icon/${name}.svg`, import.meta.url).href;
}

/**
 * @description: 秒转分钟
 * @return {*}
 */
export const secondsToMinutes = (seconds: number) => {
  const minute = Math.floor(seconds / 60);
  const rest_seconds = seconds % 60;
  return `${minute < 10 ? '0' : ''}${minute}:${rest_seconds < 10 ? '0' : ''}${rest_seconds}`
}