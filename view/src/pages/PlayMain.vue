<template>
  <div class="music-player">
    <div class="music-player_bg"></div>
    <div class="music-player__left">
      <div class="imgbox">
        <img alt="Album cover" :class="isPlaying ? 'zoom' : ''"
          src="https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg?param=1000y1000">
      </div>
      <div class="informationArea">
        <div>
          <div class="title">起风了(原版)</div>
          <div class="singer">买辣椒也用券</div>
        </div>
        <div class="arrowBox">
          <IEpMore />
        </div>
      </div>
      <div class="music-player__controls">
        <MusicPlay :isWhite="true" ref="RefMusicPlay" />
      </div>
    </div>
    <div class="music-player__right">
      <Lyric :lyrics-data="lyricsData" :currentTime="store.currentTime" />
    </div>
    <div class="topRightBtn">
      <IEpArrowDown @click="Globalstore.isShowFullscreenPlay = false" />
      <IEpFullScreen @click="toggleFullScreen()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MusicPlay from '@/components/MusicPlay.vue'
import Lyric from '@/components/Lyric.vue';
import lyricsData from '@/assets/qifeng'
import { useAudio } from '@/store/audioPlay'
import { useGlobalStore } from '@/store/index'
import { toggleFullScreen } from '@/utils/index'
const Globalstore = useGlobalStore()
const store = useAudio();
const RefMusicPlay = ref();
let isPlaying = ref(false);
// 获取当前音乐播放状态
onMounted(() => {
  isPlaying = computed(() => {
    return RefMusicPlay.value.pauseOrPlay === 'play'
  })
})
</script>

<style lang="scss">
.music-player {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-left: 10vw;

  .topRightBtn {
    position: absolute;
    right: 3rem;
    top: 3rem;
    display: flex;
    flex-direction: column;

    svg {
      font-size: 40px;
      margin: 10px 0;
      cursor: pointer;
      padding: 10px;
      border-radius: 17px;

      &:hover {
        background-color: var(--hoverBgc);
      }
    }
  }

  &_bg {
    background-image: url("../assets/header.jpg");
    background-size: cover;
    backdrop-filter: blur(50px);
    filter: blur(100px);
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  &__controls {
    width: 100%;
  }

  &__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 50%;
    padding-right: 1rem;
    box-sizing: border-box;
    max-width: 30vmax;

    .informationArea {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 2rem 0;

      .title {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }

      .singer {
        opacity: .58;
        margin-top: .25rem;
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }

    .imgbox {
      display: flex;
      justify-content: center;
      width: 100%;

      img {
        width: 80%;
        object-fit: cover;
        margin-bottom: 2rem;
        border-radius: 8px;
        transition: transform 0.3s ease-in-out;
        transform: scale(1);

        &.zoom {
          transform: scale(1.25);
        }
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    flex: 0 1 50%;
    height: 100%;
    padding-left: 3rem;

    &__lyrics {
      height: 300px;
      overflow-y: scroll;
      padding: 10px;
      font-size: 16px;
      line-height: 1.5;
      border: 1px solid #eee;
    }

    &__progress {
      display: flex;
      align-items: center;
      margin: 20px 0;

      input[type="range"] {
        width: 100%;
        margin: 0 10px;
      }

      span {
        font-size: 14px;
      }
    }

    &__volume {
      display: flex;
      align-items: center;

      input[type="range"] {
        width: 100px;
        margin: 0 10px;
      }

      span {
        font-size: 14px;
      }
    }
  }
}

@media (max-width: $meidiaWidth) {
  .music-player {
    padding-left: 0;
  }

  .music-player__left {
    flex: 1 1 40%;
  }
}
</style>