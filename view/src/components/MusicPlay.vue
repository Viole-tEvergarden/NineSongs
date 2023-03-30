<template>
  <div class="player">
    <audio :src="getAudio()" ref="audio" @timeupdate="timeupdateListener"
      @durationchange="durationchangeListener"></audio>
    <div class="controlBtn">
      <button>
        <img src="../assets/Icon/prev.svg" alt="">
      </button>
      <button class="pauseAndplay" @click="PauseAndPlay">
        <img :src="getIcon(pauseOrPlay)" alt="">
      </button>
      <button>
        <img src="../assets/Icon/next.svg" alt="">
      </button>
    </div>
    <!-- 进度条 -->
    <div class="player-content">
      <div class="progress-bar">
        <span class="left">{{ secondsToMinutes(store.currentTime) }}</span>
        <input type="range" ref="progress" :class="{ active: isTouch }" min="0" v-model="store.currentTime"
          :max="store.payload" step="0.05" />
        <span class="right">{{ secondsToMinutes(store.payload) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudio } from "@/store/audioPlay";
import { getIcon } from '../utils/index'
import { secondsToMinutes } from "@/utils/index";
// 音乐文件
const getAudio = () => new URL(`../assets/qifeng.mp3`, import.meta.url).href;
const audio = ref();
const store = useAudio();


let pauseOrPlay = ref('pause');
// 播放与暂停
const PauseAndPlay = () => {
  if (pauseOrPlay.value === 'play') {
    pauseOrPlay.value = 'pause';
    audio.value.pause()
  } else {
    pauseOrPlay.value = 'play';
    audio.value.play();
  }
}



/**进度条相关*/
const timeupdateListener = (e: Event) => {
  //元素的currentTime属性表示的时间已经改变。
  store.currentTime = Math.trunc(audio.value.currentTime);
}
const durationchangeListener = () => {
  //元信息已载入或已改变，表明媒体的长度发生了改变
  store.payload = Math.trunc(audio.value.duration);
}
let isTouch = ref(false);






// 设置音量
const setVolume = (volume: number) => {
  audio.value.volume = volume / 100;
}
defineExpose({ setVolume })
</script>

<style lang="scss" scoped>
.player {
  flex: 0 0 37.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .player-content {
    width: 100%;
    .progress-bar{
      display: flex;
      justify-content: space-between;
      span{
        flex: 0 0 35px;
        padding: 0 3px;
      }
      input{
        flex: 1 1 0%;
      }
    }
  }

  .controlBtn {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 23px;
        height: 23px;
      }

      &:hover {
        background-color: var(--hoverBgc);
        border-radius: 6px;
      }
    }

    .pauseAndplay {
      width: 60px;
      height: 60px;
      margin: 0 12px;

      img {
        width: 48px;
        height: 48px;
      }
    }
  }
}

@media (max-width: $meidiaWidth) {
  .player {
    flex: 1 1 0%;
  }
}</style>