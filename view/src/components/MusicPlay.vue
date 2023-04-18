<template>
  <div class="player">
    <!-- <audio :src="getAudio()" ref="audio" @timeupdate="timeupdateListener"
      @durationchange="durationchangeListener"></audio> -->
    <div class="controlBtn">
      <button>
        <img :src="getIcon('prev', isWhite)" alt="">
      </button>
      <button class="pauseAndplay" @click="PauseAndPlay">
        <img :src="getIcon(store.pauseOrPlay, isWhite)" alt="">
      </button>
      <button>
        <img :src="getIcon('next', isWhite)" alt="">
      </button>
    </div>
    <!-- 进度条 -->
    <div class="player-content">
      <div class="progress-bar">
        <span class="left">{{ secondsToMinutes(store.currentTime) }}</span>
        <div class="rangeBox" ref="rangeBox">
          <input type="range" ref="progress" @change="progressChange" min="0" :value="store.currentTime"
            :max="store.payload" step="1" @mouseenter="progressMouseEnter" @mouseleave="isShowToolip = false" />
          <span ref="toolip" :class="`toolip ${isShowToolip ? 'show' : ''}`">{{ secondsToMinutes(MouseCurrentTime)
          }}</span>
        </div>
        <span class="right">{{ secondsToMinutes(store.payload) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudio } from "@/store/audioPlay";
import { getIcon } from '../utils/index'
import { secondsToMinutes } from "@/utils/index";

const store = useAudio();
const props = defineProps({
  isWhite: {
    type: Boolean,
    default: false
  }
})
const { isWhite } = toRefs(props);

// 播放与暂停
const PauseAndPlay = () => {
  if (store.pauseOrPlay === 'play') {
    store.pauseOrPlay = 'pause';
  } else {
    store.pauseOrPlay = 'play';
  }
}


/**进度条相关*/
const progress = ref();

// 进度条被拖动或点击
const progressChange = () => {
  store.setCurrentTime = +(progress.value.value - 0).toFixed(2);
}


// 进度条悬浮显示时间进度
let isShowToolip = ref(false);
const rangeBox = ref();
const toolip = ref();
const { x } = useMouse();
let MouseCurrentTime = ref(0);
const progressMouseEnter = () => {
  isShowToolip.value = true;
  // 设置 toolip 位置 和 内容;
  watch(x, () => {
    const left = x.value - rangeBox.value.offsetLeft;
    const width = rangeBox.value.offsetWidth;
    MouseCurrentTime.value = Math.trunc((left / width) * store.payload);
    if (left) {
      toolip.value.style.left = left + 'px';
    }
  })
}
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

    .progress-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        flex: 0 0 35px;
        padding: 0 3px;
        text-align: center;
      }

      .rangeBox {
        flex: 1 1 0%;
        display: flex;
        align-items: center;
        position: relative;

        input {
          width: 100%;
        }

        .toolip {
          position: absolute;
          top: -50px;
          background: #ffffff;
          border-radius: 5px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, .15);
          color: #000;
          line-height: 1.3;
          margin-bottom: 10px;
          max-width: 120px;
          opacity: 0;
          overflow-wrap: break-word;
          padding: 5px 7.5px;
          pointer-events: none;
          transform: translate(-50%, 10px) scale(.8);
          transform-origin: 50% 100%;
          transition: transform .2s ease .1s, opacity .2s ease .1s;
          white-space: nowrap;
          z-index: 2;
        }

        .toolip.show {
          opacity: 1;
        }

        .toolip::before {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #ffffff;
          bottom: -4px;
          content: "";
          height: 0;
          left: 50%;
          position: absolute;
          transform: translate(-50%);
          width: 0;
          z-index: 2;
        }
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
}
</style>