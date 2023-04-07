/*
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-27 14:38:22
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-04-07 11:57:46
 * @FilePath: \view\src\utils\index.ts
 * @Description: 
 */
export const getIcon = (name: string, isWhite = false) => {
  const prefix = isWhite ? 'White' : ''
  return new URL(`../assets/Icon/${name}${prefix}.svg`, import.meta.url).href;
}

/**
 * @description: 秒转分钟
 * @return {string}
 */
export const secondsToMinutes = (seconds: number): string => {
  if (seconds) {
    seconds = Math.trunc(seconds)
    const minute = Math.floor((Math.trunc(seconds)) / 60);
    const rest_seconds = seconds % 60;

    return `${minute < 10 ? '0' : ''}${minute}:${rest_seconds < 10 ? '0' : ''}${rest_seconds}`
  } else {
    return '00:00'
  }
}


/**
 * 切换全屏状态
 */
export function toggleFullScreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    // 如果当前处于全屏状态，则退出全屏
    exitFullScreen()
  } else {
    // 如果当前未处于全屏状态，则进入全屏
    fullScreen()
  }
}
/**
 * 将网页全屏
 */
const fullScreen = () => {
  // 获取网页根元素
  const element = document.documentElement
  // 判断浏览器是否支持 requestFullscreen 方法
  if (element.requestFullscreen) {
    element.requestFullscreen()
    // 判断浏览器是否支持 webkitRequestFullscreen 方法
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullscreen()
    // 判断浏览器是否支持 msRequestFullscreen 方法
  } else if ((element as any).msRequestFullscreen) {
    (element as any).msRequestFullscreen()
  }
}
/**
 * 退出全屏
 */
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}