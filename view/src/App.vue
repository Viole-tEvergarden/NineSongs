<template>
  <RouterView></RouterView>
</template>
<script setup lang="ts">
// title 根据离开或进入做更改
const visibility = useDocumentVisibility();
const title = useTitle();
watch(visibility, (current, previous) => {
  if (current === 'visible' && previous === 'hidden') {
    title.value = '欢迎回来';
    setTimeout(() => {
      title.value = import.meta.env.VITE_APP_TITLE;
    }, 2000);
  } else {
    title.value = '离开了么'
  }
})
</script>
