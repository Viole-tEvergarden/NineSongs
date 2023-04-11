<template>
  <div>
    <RightClickMenu :menuList="menuList" @menu-click="handleCLick"></RightClickMenu>
  </div>
</template>

<script setup lang="ts">
import RightClickMenu from "@/components/rightClickMenu.vue";
const menuList = [{
        name: "菜单1",
      }, {
        name: "菜单2",
      }, {
        name: "菜单3",
      }];
const handleCLick = (name:string) => {
  console.log("菜单点击" + name);
}
</script>

<style lang="scss" scoped></style>