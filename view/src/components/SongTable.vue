<template>
  <div class="table">
    <div class="header">
      <div v-for="{ title, prop, flex } in Column" :key="prop" :style="{ flex: flex }">{{ title }}</div>
    </div>
    <div class="body" @click="linkJumpRouting">
      <div class="row" v-for="item in songList" :key="item.id">
        <div :class="`item ${isA ? 'hover' : ''}`" v-for="{ prop, flex, isA } in Column"
          :data="`${isA},${prop},${item.id}`" :key="item.id + prop" :title="item[prop]" :style="{ flex: flex }">
          {{ item[prop] }}
          <div class="coverThumbnail" v-if="prop === 'imgUrl'">
            <img src="../assets/header.jpg" alt="">
          </div>
          <div class="arrowBox" v-if="prop === 'operation'">
            <IEpMore />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  songList: {
    type: Array<Song>,
    default: []
  },
  Column: {
    type: Array<Column>,
    default: []
  }
})
const { songList, Column } = toRefs(props);


// 歌手或者专辑点击跳转
const linkJumpRouting = (e: Event) => {
  const target = e.target as HTMLElement;
  const dataStr = target.getAttribute('data');
  if (dataStr) {
    const data = dataStr.split(',');
    if (data[0] !== 'true') return false;
    // 需要跳转的
  }
}
</script>

<style lang="scss" scoped>
.table {
  .header {
    display: flex;
    line-height: 40px;
    color: rgba($color: #ffffff, $alpha: 0.5);
    font-family: '黑体';

    div {
      padding: 0 6px;
    }
  }

  .body {
    .row {
      display: flex;
      align-items: center;
      .item {
        line-height: 48px;
        padding: 0 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .item.hover:hover {
        text-decoration: underline;
        cursor: pointer;
      }

      .coverThumbnail {
        padding: 0 6px;

        img {
          width: 100%;
          vertical-align: middle;
          border-radius: 3px;
          object-fit: cover;
        }
      }

      .arrowBox {
        background-color: transparent;
        font-size: 14px;
        height: 32px;
        width: 32px;
        &:hover {
          background-color: var(--hoverBgc);
        }
      }
    }

    .row:hover {
      background-color: var(--hoverBgc);
      border-radius: 5px;
    }
  }
}
</style>