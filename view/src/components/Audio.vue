<!-- 音频播放组件 只用一次 在主文件中引入 多次引用会产生多个 audio 导致两个audio标签同步播放-->
<template>
  <div>
    <audio :src="getAudio()" ref="audio" @timeupdate="timeupdateListener"
        @durationchange="durationchangeListener"></audio>
  </div>
</template>

<script setup lang="ts">
import { useAudio } from "@/store/audioPlay";
const store = useAudio();
const getAudio = () => new URL(`../assets/qifeng.mp3`, import.meta.url).href;
const audio = ref();


const timeupdateListener = () => {
  //元素的currentTime属性表示的时间已经改变。
  store.currentTime = audio.value.currentTime.toFixed(2) - 0;
}
const durationchangeListener = () => {
  //元信息已载入或已改变，表明媒体的长度发生了改变
  store.payload = Math.trunc(audio.value.duration);
}

// 监听 setCurrentTime 的变化来设置 audio 的播放进度
watch(
  () => store.setCurrentTime,
  (val) => {
    audio.value.currentTime = val;
    store.currentTime = val;
  }
)
// 监听播放状态
watch(
  () => store.pauseOrPlay,
  (val) => {
    if (val === 'play') {
      audio.value.play();
    } else {
      audio.value.pause();
    }
  }
)
// 监听音量
watch(
  () => store.volume,
  (val) => {
    audio.value.volume = val / 100;
  }
)
</script>

<style lang="scss" scoped>

</style>