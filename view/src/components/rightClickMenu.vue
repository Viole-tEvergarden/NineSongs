<template>
  <Teleport to="body">
    <div class="context-menu" v-show="visible" :style="{ left: x + 'px', top: y + 'px' }">
      <ul>
        <li v-for="item in menuList" :key="item.name" @click="handleClick(item.name)">{{ item.name }}</li>
      </ul>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
interface MenuItem {
  name: string
}
const visible = ref(false);
const x = ref(0);
const y = ref(0);
const props = defineProps({
  menuList: {
    type: Array as () => MenuItem[],
    required: true
  }
})
const emit = defineEmits(['menu-click'])
function handleClick(name: string) {
  visible.value = false
  // 触发自定义事件
  emit('menu-click', name)
}

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  x.value = e.clientX
  y.value = e.clientY
  visible.value = true
}

function handleClickOutside() {
  visible.value = false
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('contextmenu', handleContextMenu)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('contextmenu', handleContextMenu)
})

</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  z-index: 9999;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  color: black;
  overflow: hidden;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 16px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
