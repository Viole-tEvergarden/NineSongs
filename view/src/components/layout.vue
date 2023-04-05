<!--
 * @Author: zhangxiaobo9794 2067838947@qq.com
 * @Date: 2023-03-24 14:05:21
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-04-02 12:25:13
 * @FilePath: \view\src\components\layout.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="main">
    <!-- 侧边菜单 -->
    <div class="slider">
      <Slider></Slider>
    </div>
    <!-- 主题容器 -->
    <div class="containerBox">
      <Header></Header>
      <main class="container">
        <RouterView></RouterView>
      </main>
    </div>
    <Footer/>
    <ElCollapseTransition>
      <PlayMain v-show="store.isShowFullscreenPlay"/>
    </ElCollapseTransition>
  </div>
</template>

<script setup lang="ts">
import Slider from "./Slider.vue";
import Header from "./Header.vue";
import Footer from './MusicPlayFooter.vue'
import PlayMain from '@/pages/PlayMain.vue'
import { useGlobalStore } from '@/store/index'
const store = useGlobalStore()
</script>

<style lang="scss" scoped>
.main{
  display:flex;
  width: 100vw;
  height: 100vh;
  .slider{
    width: var(--SliderWidth);
    flex-shrink: 0;
    background-color: var(--slider-backround);
    color: var(--font-color);
    padding-bottom: $footerHeight;
    height: 100vh;
    box-sizing: border-box;
  }
  .containerBox{
    // flex: 1;
    width: calc(100vw - var(--SliderWidth));
    background-color: var(--background-color);
    height: 100vh;
  }
  .container{
    padding: 1.25rem;
    height: calc(100vh - #{$menuHeight});
    // overflow: hidden;
    overflow-x: scroll;
    box-sizing: border-box;
  }
}
</style>