<script setup lang="ts">
import { ref } from 'vue'
import { useGlobalStore } from '@/store/index'
defineProps<{ msg: string }>()
const store = useGlobalStore()
const count = ref(0);
setTimeout(() => {
  ElMessageBox
}, 2000);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="store.setTheme(store.theme === 'light' ? 'dark' : 'light')">count is {{ count
    }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
