<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="handleLogin">
      <input class="login-input" type="text" placeholder="请输入用户名" v-model="username" />
      <input class="login-input" type="password" placeholder="请输入密码" v-model="password" />
      <button class="login-button" type="submit">登录</button>
      <button class="login-button" @click="register">注册</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { userLogin, addUser } from "@/api/user/index";
import { useGlobalStore } from "@/store/index";
const useGlobal= useGlobalStore();
let username = ref('');
let password = ref('');

const handleLogin = async () => {
  // 处理登录逻辑
  try {
    const {msg, token} = await userLogin({
      username: username.value,
      password: password.value
    })
    ElMessage.success(msg);
    useGlobal.token = token;
  } catch (error) {
    console.log(error);
  }
}
const register = async () => {
  try {
    const { msg } = await addUser({
      username: username.value,
      password: password.value
    })
    ElMessage.success(msg);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped lang="sass">
.login-container
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  background-color: #f5f5f5

.login-form
  display: flex
  flex-direction: column
  align-items: center
  padding: 40px
  border-radius: 8px
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px 0px
  background-color: #fff

.login-input
  margin-bottom: 20px
  padding: 10px 16px
  border: none
  border-radius: 4px
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px 0px
  font-size: 16px
  transition: box-shadow 0.3s ease-in-out

.login-input:focus
  outline: none
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 20px 0px

.login-button
  padding: 10px 16px
  border: none
  border-radius: 4px
  background-color: #007aff
  color: #fff
  font-size: 16px
  cursor: pointer
  transition: opacity 0.3s ease-in-out

.login-button:hover
  opacity: 0.8
</style>
