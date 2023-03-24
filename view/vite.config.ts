import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      imports: ['vue', 'vue-router','@vueuse/core','pinia'],
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        })
      ],
      vueTemplate: true, // 是否在 vue 模板中自动导入
    }),
    Components({
      resolvers: [
        ElementPlusResolver(), 
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'], //@iconify-json/ep 是 Element Plus 的图标库
        }),
      ],
      dts: 'src/types/components.d.ts'
    }),
    Icons({
      autoInstall: true,
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
