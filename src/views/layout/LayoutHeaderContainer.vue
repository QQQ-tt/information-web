<script setup>
import {CaretBottom, Crop, EditPen, Operation, SwitchButton, User} from "@element-plus/icons-vue";
import {useUserIdStore, useUserTokenStore} from "@/stores/index.js";
import router from "@/router/router.js";
import {ref} from "vue";

const signOutUser = async () => {
  const token = useUserTokenStore()
  token.removeToken()
  const userId = useUserIdStore()
  userId.removeUserId()
  await router.push({name: 'login'})
}
const props = defineProps(["getCollapse"])
const isCollapse = ref(false)
const change = () => {
  isCollapse.value = !isCollapse.value
  // 向父组件传递值
  if (typeof props.getCollapse === 'function') {
    props.getCollapse(isCollapse.value)
  }
}

</script>

<template>
  Header 布局架子
  <el-icon @click="change">
    <Operation/>
  </el-icon>
  <el-dropdown placement="bottom-end" style="margin-left: auto">
        <span class="el-dropdown__box">
          <el-avatar :size="'default'"></el-avatar>
          <el-icon class="el-icon--right">
            <CaretBottom/>
          </el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
        <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
        <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
        <el-dropdown-item command="logout" :icon="SwitchButton" @click="signOutUser">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">

</style>