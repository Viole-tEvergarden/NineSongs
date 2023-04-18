<template>
  <div class="main">
    <div class="main-box">
      <div :class="['container', 'container-register', { 'is-txl': isLogin }]">
        <form>
          <h2 class="title">创建账户</h2>
          <span class="text">用邮箱或者用户名</span>
          <input class="form__input" v-model="registerForm.userName" type="text" placeholder="账户名" />
          <input class="form__input" v-model="registerForm.email" type="text" placeholder="邮箱" />
          <input class="form__input" v-model="registerForm.password" type="password" placeholder="密码" />
          <div class="primary-btn" @click="register">立即注册</div>
        </form>
      </div>
      <div :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]">
        <form>
          <h2 class="title">登录 NineSongs</h2>
          <span class="text">用邮箱或者用户名</span>
          <input class="form__input" v-model="loginForm.emailOrUserName" type="text" placeholder="邮箱/账户名" />
          <input class="form__input" v-model="loginForm.password" type="password" placeholder="密码" />
          <div class="primary-btn" @click="login">立即登录</div>
        </form>
      </div>
      <div :class="['switch', { login: isLogin }]">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle_top"></div>
        <div class="switch__container">
          <h2>{{ isLogin ? '你好 朋友 !' : '欢迎回来 !' }}</h2>
          <p>
            {{
              isLogin
              ? '输入您的个人详细信息并与我们一起开始旅程'
              : '要与我们保持联系，请使用您的个人信息登录'
            }}
          </p>
          <div class="primary-btn" @click="isLogin = !isLogin">
            {{ isLogin ? '立即注册' : '立即登录' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userLogin, addUser } from "@/api/user/index";
import { useGlobalStore } from "@/store/index";
const useGlobal = useGlobalStore();
const isLogin = ref(true);
const router = useRouter();
const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regPass = /[a-zA-Z0-9]{6,16}/;
const regUser = /^[a-zA-Z0-9_-]{4,16}$/;
const loginForm = reactive({
  emailOrUserName: '',
  password: '',
});
const registerForm = reactive({
  userName: '',
  email: '',
  password: '',
})
const login = async () => {
  if (!checkLogin()) return;
  // 处理登录逻辑
  try {
    const { msg, token } = await userLogin({ ...loginForm })
    ElMessage.success(msg);
    useGlobal.token = token;
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
const register = async () => {
  if (!checkRegister()) return
  try {
    const { msg } = await addUser({ ...registerForm })
    ElMessage.success(msg);
  } catch (error) {
    console.log(error);
  }
}
// 校验登录
const checkLogin = (): boolean => {
  const { emailOrUserName, password } = loginForm;
  if ((check(emailOrUserName, regEmail) || check(emailOrUserName, regUser))) {
    if (check(password, regPass)) {
      return true;
    } else {
      ElMessage.error('请输入6位以上16位以下只有英文或数字的密码');
      return false;
    }
  } else {
    ElMessage.error('请输入正确的邮箱或者账户名');
    return false;
  }
}
// 校验注册
const checkRegister = (): boolean => {
  const { userName, password, email } = registerForm;
  if (!check(email, regEmail)) {
    ElMessage.error('请输入正确的邮箱');
    return false;
  }
  if (!check(userName, regUser)) {
    ElMessage.error('请输入正确的账户名');
    return false;
  }
  if (!check(password, regPass)) {
    ElMessage.error('请输入6位以上16位以下只有英文或数字的密码');
    return false;
  }
  return true;
}
/**
 * @description: 校验
 * @param {string} value: 要校验的值
 * @param {RegExp} reg: 正则
 * @return {boolean}
 */
const check = (value: string, reg: RegExp): boolean => {
  if (!reg.test(value)) {
    return false
  } else {
    return true
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ecf0f3;
}

.main-box {
  position: relative;

  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;

      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }

      .text {
        margin-top: 30px;
        margin-bottom: 12px;
      }

      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }

  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }

  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }

  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }

  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }

  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;
    box-sizing: border-box;

    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -60%;
      left: -60%;
      transition: 1.25s;
    }

    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }

    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;

      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }

      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }

  .login {
    left: calc(100% - 400px);

    .switch__circle {
      left: 0;
    }
  }

  .primary-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;

    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
        -4px -4px 6px 0 rgb(116 125 136 / 50%),
        inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
        inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
    }
  }
}
</style>
