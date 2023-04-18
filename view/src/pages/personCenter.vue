<template>
  <div class="personal-center">
    <div class="avatar-container">
      <img src="../assets/header.jpg" alt="user avatar" class="avatar" />
    </div>
    <div class="username">{{ userInfo.username || '未登录'}}</div>
    <div v-show="userInfo.username" class="logout-btn" @click="store.logout()">退出登录</div>
    <div v-show="!userInfo.username" class="login-btn logout-btn" @click="router.push('/login')">前往登录</div>
  </div>
</template>
<script setup lang="ts">
import { useGlobalStore } from "@/store/index";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useGlobalStore();
const { userInfo } = storeToRefs(store);
</script>

<style>
.personal-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  padding: 50px;
}

.avatar-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.logout-btn {
  background-color: #f44336;
  color: #fff;
  padding: 6px 13px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.login-btn{
  background-color: cornflowerblue;
}

.logout-btn:hover {
  background-color: #c62828;
}
.login-btn:hover {
  background-color: cornflowerblue;
}
</style>
