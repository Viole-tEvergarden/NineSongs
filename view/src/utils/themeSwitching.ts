// 主题切换
import { useGlobalStore } from '@/store/index'

export const themeSwitching = (theme?: theme) => {
  const store = useGlobalStore();
  const sysDefalutTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';//系统颜色模式
  if (theme) { //传入需要更改为的主题
    document.documentElement.setAttribute('theme', theme);
  } else if (store.theme){ // 未传值 并且本地存有主题
    document.documentElement.setAttribute('theme', store.theme);
  } else {//根据系统设置
    document.documentElement.setAttribute('theme', sysDefalutTheme);
  }
}
