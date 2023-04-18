/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 环境变量 TypeScript的智能提示
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_APP_PORT: string;
  VITE_APP_BASE_API: string;
}
// axios返回数据类型
import * as axios from 'axios';
declare module 'axios' {
  export interface AxiosResponse<T> {
    code: string;
    msg: string;
    data?: T;
    [keys: string]: any;
  }
}