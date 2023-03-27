<template>
  <div class="main" @click="changeInputValue($event)">
    <div class="item" v-for="{ key, text } in associativeWordList" :key="key">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  associativeWordList: {
    type: Array<associativeWord>,
    default: [] as Array<associativeWord>
  }
})
const { associativeWordList } = toRefs(props);
const emit = defineEmits(['updateSearchValue'])
const changeInputValue = (eve: Event) =>{
  const text = (eve.target as HTMLElement).innerText;
  emit('updateSearchValue', text)
}
</script>

<style lang="scss" scoped>
.main{
  position: absolute;
  left: 0;
  right: .3rem;
  max-height: 300px;
  overflow-y: auto;
  background-color: var(--hoverBgc);
  border-radius: 0 0 5px 5px;
  // height: 300px;
  .item{
    line-height: 2em;
    padding: 0 1rem;
    cursor: pointer;
    &:hover{
      background-color: var(--associativeWordFloatingBackgroundColor);
    }
  }
}
</style>