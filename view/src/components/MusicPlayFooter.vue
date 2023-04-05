<!--
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-28 20:02:31
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-04-01 12:40:48
 * @FilePath: \view\src\components\MusicPlayFooter.vue
 * @Description: 
-->
<!--
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-28 20:02:31
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-30 13:46:27
 * @FilePath: \view\src\components\MusicPlayFooter.vue
 * @Description: 
-->
<template>
  <footer>
    <div class="Info">
      <div class="imgBox" @click="GlobalStore.isShowFullscreenPlay = true">
        <img src="../assets/header.jpg" alt="">
        <div class="exclusiveMode">
          <IEpCrop />
        </div>
      </div>
      <div class="songInformation">
        <div class="songName">北戴河之歌</div>
        <div class="singerName">Gala</div>
      </div>
    </div>
    <MusicPlay ref="musicCom" />
    <div class="buttonGroup">
      <div class="Icongroup">
        <div class="iconBox">
          <img src="../assets/Icon/happenrand.svg" alt="">
        </div>
        <div class="iconBox">
          <img src="../assets/Icon/loopAll.svg" alt="">
        </div>
        <div class="voice">
          <ElSlider v-model="store.$state.volume" @change="setVolume" />
        </div>
        <div class="iconBox">
          <IEpList />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useAudio } from "@/store/audioPlay";
import MusicPlay from '@/components/MusicPlay.vue'
import { useGlobalStore } from '@/store/index'
const GlobalStore = useGlobalStore()
const store = useAudio()
const musicCom = ref();
const setVolume = () => {
  musicCom.value.setVolume(store.volume)
}
onMounted(() => {
  // 根据本地记录设置音量
  setVolume()
})

</script>

<style lang="scss" scoped>
footer {
  height: $footerHeight;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  border-top-width: 1px;
  background-color: rgba(23, 23, 26, .8);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(15px);
  justify-content: space-between;

  .Info {
    display: flex;
    padding: 0 3px;
    align-items: center;

    .imgBox {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      img {
        object-fit: cover;
        width: 64px;
        height: 64px;
        vertical-align: middle;
      }

      .exclusiveMode {
        position: absolute;
        opacity: 0;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(60, 60, 60, 0.44);
        transition: opacity .5s;

        svg {
          font-size: 50px;
        }
      }

      &:hover .exclusiveMode {
        opacity: 1;
      }

      margin-right: 16px;
    }

    .songInformation {

      .songName,
      .singerName {
        width: 150px;
        overflow: hidden;
      }

      .songName {
        font-size: 18px;
        line-height: 1.25em;
        font-weight: 700
      }
    }
  }

  .buttonGroup {
    display: flex;
    align-items: center;

    .Icongroup {
      display: flex;

      .iconBox {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        cursor: pointer;

        img {
          width: 18px;
          height: 18px;
        }
      }

      .voice {
        margin: 0 8px;
        width: 70px;
        display: flex;
        align-items: center;
      }
    }
  }
}</style>