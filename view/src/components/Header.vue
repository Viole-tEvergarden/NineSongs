<template>
  <div class="header">
    <div class="left">
      <div class="arrowBox">
        <IEpArrowLeft />
      </div>
      <div class="arrowBox">
        <IEpArrowRight />
      </div>
      <div class="menuBox">
        <div v-for="item in TopMenuList" @click="activeMenu = item.path"
          :class="`menuItem ${activeMenu === item.path ? 'active' : ''}`" :key="item.path">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 搜索框 -->
      <div class="searchAndAutoComeplet">
        <div class="searchBox" ref="search">
          <IEpSearch class="searhIcon" />
          <input @keyup.enter="searchContent" v-model="searchValue" @input="searchInput" @click="isNotClickOutSide = true" type="text" placeholder="搜索"
            :class="searchIsActive ? 'active' : ''">
        </div>
        <!-- 联想词列表 -->
        <AssociativeInput :associativeWordList="associativeWordList" v-show="searchIsActive"
          @updateSearchValue="upSearval" />
      </div>

      <!-- 主题切换 -->
      <div class="arrowBox" @click="toggleDark()">
        <IEpSunny v-show="!isD" />
        <IEpMoon v-show="isD" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AssociativeInput from './AssociativeInput.vue'
// 深暗切换
const isDark = useDark()
const toggleDark = useToggle(isDark);
const isD = computed(() => isDark.value)


const TopMenuList = ref([
  { title: '推荐', path: '/recommend' },
  { title: '最新上传', path: '/latestUpload' },
])
let activeMenu = ref('/recommend');
let associativeWordList = ref<associativeWord[] | []>([
  { text: "apple", key: "fruit" },
  { text: "dog", key: "animal" },
  { text: "book", key: "education" },
  { text: "computer", key: "technology" },
  { text: "pizza", key: "food" },
  { text: "car", key: "transportation" },
  { text: "movie", key: "entertainment" },
  { text: "football", key: "sports" },
  { text: "ocean", key: "nature" },
  { text: "guitar", key: "music" }
])
let isNotClickOutSide = ref(true);//没有点击过区域外
const search = ref();
let searchValue = ref('');

// 搜索框input事件
const searchInput = useDebounceFn(
   async () => {
    if (!searchIsActive) return false;
    isNotClickOutSide.value = true;
    // 请求联想词 
    // const res = await baiduSuggestion(searchValue.value);
    // console.log(res);

  },
  500
)

// 搜索值去除首位空格
let SearchValueTrim = computed(()=> searchValue.value?.trim().length);
// 是否需要调出联想词列表
const searchIsActive = computed(() => SearchValueTrim.value > 0 && isNotClickOutSide.value);

// 点击区域外
onClickOutside(search, () => {
  isNotClickOutSide.value = false;
});

// 更新搜索框值
const upSearval = (text: string) => {
  searchValue.value = text;
  searchContent();
}

// 搜索对应内容
const searchContent = () => {
  if (SearchValueTrim.value <= 0) return false;
  console.log(`搜索${searchValue.value}`);
  
}
</script>

<style lang="scss" scoped>
$menuItemPaddingLeftAndRight: 6px;


.header {
  display: flex;
  justify-content: space-between;
  padding: 0 1.25rem;

  .left {
    display: flex;
    align-items: center;
  }

  .menuBox {
    display: flex;
    margin: 0 .5rem;

    .menuItem {
      height: $menuHeight;
      margin: 0 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;

      span {
        padding: 3px $menuItemPaddingLeftAndRight;
        border-radius: 3px;

        &:hover {
          background-color: var(--hoverBgc);
        }
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        background-color: $activeColor;
        height: 2px;
        width: calc(100% - 12px);
        bottom: 0;
        left: $menuItemPaddingLeftAndRight;
        opacity: 0;
        transition: all .8s;
      }

      &.active {
        color: $activeColor;

        &::before {
          opacity: 1;
        }

      }
    }
  }

  .right {
    height: $menuHeight;
    display: flex;
    align-items: center;

    .searchAndAutoComeplet {
      position: relative;

      .searchBox {
        position: relative;

        .searhIcon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translate(0, -50%);
        }

        input {
          height: 2.25rem;
          padding: 0 1.25rem 0 2.8rem;
          border-radius: 1.1rem;
          background-color: var(--hoverBgc);
          outline: none;
          border: 0;
          color: var(--font-color);
          margin-right: .3rem;

          &.active {
            border-radius: 1.1rem 1.1rem 0 0;
          }
        }
      }
    }


  }
}</style>