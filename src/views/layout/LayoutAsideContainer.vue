<script setup>
import {Document, Location, Setting, Menu as IconMenu} from "@element-plus/icons-vue";
import router from "@/router/router.js";

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const menuSelect = async (key, keyPath) => {
  await router.push({name: key})
}
defineProps(["isCollapse"])
</script>

<template>
  <el-menu
      default-active="4"
      class="el-menu-vertical-demo el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="menuSelect"
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
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <setting/>
        </el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item index="user">用户管理</el-menu-item>
      <el-menu-item index="role">角色管理</el-menu-item>
      <el-menu-item index="menu">菜单管理</el-menu-item>
      <el-menu-item index="ui">ui样式</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  height: 100%;
  background: #8f8fda;
}
</style>