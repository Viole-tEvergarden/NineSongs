<!--
 * @Author: zhangxiaobo9794
 * @Date: 2023-03-27 16:30:20
 * @LastEditors: zhangxiaobo9794
 * @LastEditTime: 2023-03-28 19:57:43
 * @FilePath: \view\src\pages\Recommend.vue
 * @Description: 
-->
<template>
  <div class="recommend">
    <div class="recommendLeft">
      歌单
      <IEpArrowRight />
    </div>
    <div class="recommendRight">
      <div class="arrowBox" @click="singingListScrollingLeftAndRight('left', 'songSheetList')">
        <IEpArrowLeft />
      </div>
      <div class="arrowBox" @click="singingListScrollingLeftAndRight('right', 'songSheetList')">
        <IEpArrowRight />
      </div>
    </div>
  </div>
  <div class="listBox" id="songSheetList">
    <div class="songSheetItem" v-for="{ singularTitle, id, author, describe, coverImage } in SongSheetList" :key="id">
      <div class="imgBox">
        <img src="../assets/header.jpg" alt="">
        <div class="mask">
          <IEpVideoPlay />
        </div>
      </div>
      {{ singularTitle }}
      <div class="author">{{ author }}</div>
    </div>
  </div>
  <ElDivider />
  <div class="recommend">
    <div class="recommendLeft">
      歌手
      <IEpArrowRight />
    </div>
    <div class="recommendRight">
      <div class="arrowBox" @click="singingListScrollingLeftAndRight('left', 'artistList')">
        <IEpArrowLeft />
      </div>
      <div class="arrowBox" @click="singingListScrollingLeftAndRight('right', 'artistList')">
        <IEpArrowRight />
      </div>
    </div>
  </div>
  <div class="listBox" id="artistList">
    <div class="songSheetItem" v-for="{ singularTitle, id, author, coverImage } in SongSheetList" :key="id">
      <div class="imgBox">
        <img src="../assets/header.jpg" alt="">
        <div class="mask">
          <IEpView />
        </div>
      </div>
      {{ author }}
    </div>
  </div>
  <ElDivider />

  <!-- 单曲推荐 最新上传 -->

  <div class="singleAndLatestUpload">
    <!-- 单曲推荐 -->
    <div class="recommend">
      <div class="recommendLeft" style="cursor: default;">
        单曲推荐
      </div>
      <SongTable :songList="songList" :Column="Column" />
    </div>
    <ElDivider class="FirstDivider" />
    <!-- 最新上传 -->
    <div class="recommend">
      <div class="recommendLeft">
        最新上传
        <IEpArrowRight />
      </div>
      <SongTable :songList="songList" :Column="Column" />
    </div>
  </div>
  <ElDivider />
</template>

<script setup lang="ts">
import SongTable from '@/components/SongTable.vue'
const SongSheetList = ref<SongSheet[]>([
  { singularTitle: "夜晚放松", id: "1001", author: "1", describe: "适合在夜晚放松身心的歌单", coverImage: "../assets/header.jpg" },
  { singularTitle: "周杰伦精选", id: "1002", author: "2", describe: "周杰伦的经典歌曲精选", coverImage: "../assets/header.jpg" },
  { singularTitle: "90年代经典", id: "1003", author: "3", describe: "90年代经典歌曲合集", coverImage: "../assets/header.jpg" },
  { singularTitle: "轻快旋律", id: "1004", author: "4", describe: "轻快的旋律，让你在工作时更加有动力", coverImage: "../assets/header.jpg" },
  { singularTitle: "电子舞曲", id: "1005", author: "5", describe: "适合在派对上听的电子舞曲", coverImage: "../assets/header.jpg" },
  { singularTitle: "流行金曲", id: "1006", author: "6", describe: "最新的流行金曲合集", coverImage: "../assets/header.jpg" },
  { singularTitle: "轻松爵士", id: "1007", author: "7", describe: "轻松愉悦的爵士乐合集", coverImage: "../assets/header.jpg" },
  { singularTitle: "青春回忆", id: "1008", author: "8", describe: "带你回忆青春时期的歌曲", coverImage: "../assets/header.jpg" },
  { singularTitle: "动感摇滚", id: "1009", author: "9", describe: "适合在运动时听的动感摇滚歌曲", coverImage: "../assets/header.jpg" },
  { singularTitle: "励志音乐", id: "1010", author: "10", describe: "充满正能量的励志歌曲合集", coverImage: "../assets/header.jpg" }
])
const songList = ref<Song[]>([
  { songTitle: "形状的你", singer: "艾德·希兰", album: "÷", duration: "3:54", id: "1234567890"},
  { songTitle: "疲惫不堪", singer: "二十一名飞行员", album: "模糊面孔", duration: "3:22", id: "9876543210" },
  { songTitle: "城市的妙趣", singer: "马克·罗森（Mark Ronson）ft.布鲁诺·马尔斯（Bruno Mars）", album: "城市特别行政区", duration: "4:31", id: "2468101214" },
  { songTitle: "你好", singer: "阿黛尔", album: "25", duration: "4:55", id: "3691215182" },
  { songTitle: "慢慢来", singer: "路易斯·韦恩（Luis Fonsi）ft.爸爸扬基（Daddy Yankee）", album: "生活", duration: "3:48", id: "5758596061" },
  { songTitle: "全部都是我", singer: "约翰·传奇（John Legend）", album: "未来之爱", duration: "4:29", id: "9394959697" },
  { songTitle: "哈瓦那", singer: "卡米拉·卡贝洛（Camila Cabello）ft.杨吐痰（Young Thug）", album: "卡米拉", duration: "3:36", id: "4849505152" },
  { songTitle: "不能停止感觉！", singer: "贾斯汀·汀布莱克（Justin Timberlake）", album: "巨魔", duration: "3:56", id: "7273747576" },
  { songTitle: "咆哮", singer: "凯蒂·佩里（Katy Perry）", album: "棱镜", duration: "3:42", id: "8182838485" },
  { songTitle: "糖", singer: "魔力红（Maroon 5）", album: "V", duration: "3:55", id: "1011121314" }
])
const Column: Array<Column> = [
  {
    prop: 'imgUrl',
    title: '',
    flex: '0 0 44px',
  },
  {
    prop: 'songTitle',
    title: '音乐标题',
    flex: '8 1 0%'
  },
  {
    prop: 'singer',
    title: '歌手',
    flex: '4 1 0%',
    isA: true
  },
  {
    prop: 'album',
    title: '专辑',
    flex: '4 1 0%',
    isA: true
  },
  {
    prop: 'duration',
    title: '时长',
    flex: '0 0 50px'
  },
  {
    prop: 'operation',
    title: '',
    flex: '0 0 32px'
  },
]

/**
 * @description: 左右滚动
 * @param {'left' | 'right'} direction: 方向
 * @param {string} id : 选择dom元素的ID
 * @return {void}
 */
const singingListScrollingLeftAndRight = (direction: 'left' | 'right', id: string) => {
  const box = document.getElementById(id);//需要滚动的元素
  const boxWidth = box?.offsetWidth;
  if (!box) throw new Error("找不到dom元素");
  if (direction === 'left') {
    boxWidth && (box.scrollLeft -= (boxWidth - 70));
  } else if (direction === 'right') {
    boxWidth && (box.scrollLeft += (boxWidth - 70));
  }
}
</script>

<style lang="scss" scoped>
.singleAndLatestUpload {
  .recommendLeft {
    margin-bottom: 8px;
  }

  .recommend {
    box-sizing: border-box;
    display: inline-block;
    width: 50%;
    padding: 0 12px;
  }

  .FirstDivider {
    display: none;
  }
}

@media (max-width: $meidiaWidth) {
  .recommend {
    display: block;
    width: 100% !important;
  }

  .FirstDivider {
    display: block !important;
  }
}

.recommend {
  display: flex;
  justify-content: space-between;

  .recommendLeft {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-family: 'SmileySans';
    cursor: pointer;
  }

  .recommendRight {
    display: flex;
  }
}

.listBox {
  display: flex;
  overflow: hidden;
  overflow-x: auto;
  margin-top: 1rem;
  cursor: pointer;
  scroll-behavior: smooth;

  .songSheetItem {
    width: var(--SongSheetImgWidth);
    margin-left: 1rem;
    flex: none;

    .imgBox {
      position: relative;

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 5px;
        background-color: rgba(60, 60, 60, .44);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 44px;
        opacity: 0;
        transition: opacity .5s;
      }

      &:hover .mask {
        opacity: 1;
      }
    }
  }

  & .songSheetItem:nth-child(1) {
    margin-left: 0;
  }

  img {
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
    vertical-align: middle;
    margin-bottom: 5px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  .author {
    opacity: .5;
  }
}

.listBox#artistList {
  img {
    border-radius: 50%;
  }

  .mask {
    border-radius: 50%;
    font-size: 30px;
  }

  text-align: center;
}</style>