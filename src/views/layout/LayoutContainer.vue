<script setup>
import {ref} from 'vue'
import {
  CaretBottom,
  Crop,
  Document, EditPen,
  Location,
  Menu as IconMenu,
  Operation,
  Setting, SwitchButton,
  User,
} from '@element-plus/icons-vue'
import {useUserTokenStore, useUserIdStore} from '@/stores'
import router from "@/router/router";

const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const signOutUser = async () => {
  const token = useUserTokenStore()
  token.removeToken()
  const userId = useUserIdStore()
  userId.removeUserId()
  await router.push({name: 'login'})
}
</script>

<template>
  <el-container class="layout-container">
    <el-header class="el-header-new">
      Header 布局架子
      <el-icon @click="isCollapse = !isCollapse" :width="isCollapse ? '64px':'200ox'">
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
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document/>
            </el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting/>
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<style>
.layout-container {
  height: 100vh;
  .el-dropdown__box{
    display: flex;
    align-items: center;
    &:active,
    &:focus {
      outline: none;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  height: 100%;
  background: #a1cc7d;
}

.el-header-new {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  background-color: #9cbae6;
  color: #d15c5c;
  line-height: 60px;
}

.toggle-button {
  transition: margin-right 1.5s ease;
}
</style>
