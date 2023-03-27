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
        主题
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Slider from "./Slider.vue";
import Header from "./Header.vue";
</script>

<style lang="scss" scoped>
.main{
  display:flex;
  width: 100vw;
  height: 100vh;
  .slider{
    width: 250px;
    flex-shrink: 0;
    background-color: var(--slider-backround);
    color: var(--font-color);
    padding-bottom: 100px;
  }
  .containerBox{
    flex: 1;
    background-color: var(--background-color);
  }
}
@media (max-width: $meidiaWidth) {
  .main .slider{
    width: 200px;
  }
}
</style>