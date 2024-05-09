<script setup>
import {User, Lock, CreditCard} from '@element-plus/icons-vue'
import {ref} from "vue";
import {registerApi, loginApi} from '@/api/user'
import {useUserTokenStore, useUserIdStore} from '@/stores/index'
import router from "@/router/router";

// 控制注册与登录表单的显示，默认显示注册
const isRegister = ref(false)
const fromRegister = ref()
const loading = ref(false)
const registerData = ref({
  name: '',
  userId: '',
  password: '',
  confirmPassword: ''
})
//自定义确认密码的校验函数
const rePasswordValid = (rule, value, callback) => {
  if (value === null || value === '') {
    return callback(new Error('请再次确认密码'))
  } else if (registerData.value.password !== value) {
    return callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}
//用于注册的表单校验模型
const registerDataRules = ref({
  userId: [
    {required: true, message: '请输入工号', trigger: 'blur'},
    {min: 10, max: 10, message: '工号的长度必须为10位', trigger: 'blur'}
  ],
  name: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 16, message: '用户名的长度必须为5~16位', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur'}
  ],
  confirmPassword: [
    {validator: rePasswordValid, trigger: 'blur'}
  ]
})
//用于注册的事件函数
const register = async () => {
  await fromRegister.value.validate()
  console.log('注册...');
  const result = await registerApi(registerData.value)
  if (result.data.code === 200) {
    registerData.value = {}
    isRegister.value = false
  }
  loading.value = false
}
// 登录
const login = async () => {
  await fromRegister.value.validate()
  console.log('登录...');
  const result = await loginApi(registerData.value)
  if (result.data.code === 200) {
    const useUser = useUserTokenStore()
    const useUserId = useUserIdStore()
    useUser.setToken(result.data.data.token)
    useUserId.setUserId(result.data.data.userId)
    registerData.value = {}
    await router.push({name: 'information'})
  }
  loading.value = false
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="fromRegister" size="large" autocomplete="off" v-if="isRegister" :rules="registerDataRules"
               :model="registerData">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <!--要与registerData.userId的名称一致-->
        <el-form-item prop="userId">
          <el-input :prefix-icon="CreditCard" v-model="registerData.userId" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input :prefix-icon="User" v-model="registerData.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" v-model="registerData.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input :prefix-icon="Lock" type="password" v-model="registerData.confirmPassword"
                    placeholder="请输入再次密码"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button @click="register();loading = true" class="button" type="primary" :loading="loading"
                     auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="fromRegister" size="large" autocomplete="off" v-else :rules="registerDataRules"
               :model="registerData">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="userId">
          <el-input :prefix-icon="User" placeholder="请输入工号" v-model="registerData.userId"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="login();loading=true" class="button" type="primary" :loading="loading" auto-insert-space>登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 90vh;
  margin-top: 5vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.jpg') no-repeat center;
    background-size: cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
