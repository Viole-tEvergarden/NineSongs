<template>
  <div class="topHe">
    <img class="headerImg" src="../assets/header.jpg" alt="">
    <div class="infobox" @click="router.push('/personCenter')">
      {{ store.userInfo.username || '未登录'}}
      <IEpArrowRight/>
    </div>
  </div>
  <ul class="menuBox" @click="menuClickHandler($event)">
    <li v-for="item in menuList" :id="item.path" :class="active === item.path ? 'active' : ''" :key="item.path">
      <component :is="item.icon"></component>
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { House, Stopwatch, Setting, List } from '@element-plus/icons-vue';
import { useGlobalStore } from '@/store/index';
const store = useGlobalStore()
const router = useRouter();
const menuList = ref([
  { title: '首页', icon: markRaw(House), path: '/' },
  { title: '探索', icon: markRaw(Stopwatch), path: '/explore' },
  { title: '设置', icon: markRaw(Setting), path: '/setUp' },
  { title: '收藏', icon: markRaw(List), path: '/collection' },
])
let active = ref('/');


const menuClickHandler = (event: Event) => {
  active.value = (event.target as HTMLElement).id;
  // router.push(active.value)
}
</script>

<style lang="scss" scoped>
$padding: 15px;

.topHe {
  display: flex;
  padding: 25px $padding;
  align-items: center;
  cursor: pointer;
  user-select: none;
  .headerImg {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }
  .infobox{
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
  }
}

.menuBox {
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
  user-select: none;
  li {
    line-height: 40px;
    border-radius: 4px;
    margin-bottom: 4px;
    padding: 0 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    svg{
      margin-right:15px;
    }
    &:hover {
      background-color: var(--hover-menu);
    }
  }

  .active {
    background-color: rgb(60, 126, 255) !important;
    color: #fff;
  }
}
</style>