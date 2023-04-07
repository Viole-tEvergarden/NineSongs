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
    <transition name="slide">
      <PlayMain v-show="store.isShowFullscreenPlay"/>
    </transition>
    
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from{
  transform: translateY(100%);
}
.slide-enter-to {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(100%);
}

</style>