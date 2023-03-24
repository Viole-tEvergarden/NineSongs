<script setup lang="ts">
import { useGlobalStore } from '@/store/index'
const store = useGlobalStore()

const visibility = useDocumentVisibility();

</script>

<template>
  <!-- <h1>{{ visibility }}</h1> -->

  <ElButton @click="store.setTheme(store.theme === 'light' ? 'dark' : 'light')">home</ElButton>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
