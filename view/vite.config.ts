import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      imports: ['vue','vue-router','pinia'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts'
    }),
  ],
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions:{
      scss:{ //sass 变量
        additionalData: `@import "@/styles/constant.scss";`
      }
    }
  }
})
