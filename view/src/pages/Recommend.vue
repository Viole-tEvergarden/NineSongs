<template>
  <div class="recommend">
    <div class="recommendLeft">
      歌单
      <IEpArrowRight />
    </div>
    <div class="recommendRight">
      <div class="arrowBox" @click="singingListScrollingLeftAndRight('left')">
        <IEpArrowLeft />
      </div>
      <div class="arrowBox" @click="singingListScrollingLeftAndRight('right')">
        <IEpArrowRight />
      </div>
    </div>
  </div>
  <div class="listBox" ref="listBox">
    <div class="songSheetItem" v-for="{singularTitle,id,author,describe,coverImage} in SongSheetList" :key="id">
      <img src="../assets/header.jpg" alt="">
      {{ singularTitle }}
      <div class="author">{{ author }}</div>
    </div>
  </div>
  <ElDivider />
</template>

<script setup lang="ts">
const SongSheetList = ref<SongSheet[]>([
  { singularTitle: "夜晚放松", id: "1001", author: "小编", describe: "适合在夜晚放松身心的歌单", coverImage: "../assets/header.jpg" },
  { singularTitle: "周杰伦精选", id: "1002", author: "小编", describe: "周杰伦的经典歌曲精选", coverImage: "../assets/header.jpg" },
  { singularTitle: "90年代经典", id: "1003", author: "小编", describe: "90年代经典歌曲合集", coverImage: "../assets/header.jpg" },
  { singularTitle: "轻快旋律", id: "1004", author: "小编", describe: "轻快的旋律，让你在工作时更加有动力", coverImage: "../assets/header.jpg" },
  { singularTitle: "电子舞曲", id: "1005", author: "小编", describe: "适合在派对上听的电子舞曲", coverImage: "../assets/header.jpg" },
  { singularTitle: "流行金曲", id: "1006", author: "小编", describe: "最新的流行金曲合集", coverImage: "../assets/header.jpg" },
  { singularTitle: "轻松爵士", id: "1007", author: "小编", describe: "轻松愉悦的爵士乐合集", coverImage: "../assets/header.jpg" },
  { singularTitle: "青春回忆", id: "1008", author: "小编", describe: "带你回忆青春时期的歌曲", coverImage: "../assets/header.jpg" },
  { singularTitle: "动感摇滚", id: "1009", author: "小编", describe: "适合在运动时听的动感摇滚歌曲", coverImage: "../assets/header.jpg" },
  { singularTitle: "励志音乐", id: "1010", author: "小编", describe: "充满正能量的励志歌曲合集", coverImage: "../assets/header.jpg" }
])

const listBox = ref();
// 歌单左右滚动
const singingListScrollingLeftAndRight = (direction: 'left'|'right') => {
  listBox.value.scrollLeft = 200
  console.log();
  
}
</script>

<style lang="scss" scoped>
.recommend {
  display: flex;
  justify-content: space-between;

  .recommendLeft {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-family: 'SmileySans';
  }

  .recommendRight {
    display: flex;
  }
}
.listBox{
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  margin-top: 1rem;
  cursor: pointer;
  .songSheetItem{
    width: var(--SongSheetImgWidth);
    margin-left: 1rem;
    flex: none;
  }
  & .songSheetItem:nth-child(1){
    margin-left: 0;
  }
  img{
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
  }
  &::-webkit-scrollbar{
    display: none;
  }
  .author{
    opacity: .5;
  }
}
</style>