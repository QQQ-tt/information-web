<script setup>
import {ref} from 'vue'
import LayoutHeaderContainer from "@/views/layout/LayoutHeaderContainer.vue";
import LayoutAsideContainer from "@/views/layout/LayoutAsideContainer.vue";

const isCollapse = ref(false)

const getCollapse = (value) => {
  isCollapse.value = value
}
</script>

<template>
  <el-container class="layout-container">
    <el-header class="el-header-new">
      <LayoutHeaderContainer :getCollapse="getCollapse"/>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <LayoutAsideContainer :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-main style="padding: 8px">
          <router-view></router-view>
        </el-main>
        <el-footer style="padding: 0;display: flex;align-items: center;justify-content: center;">
          信息管理 ©2024 Created by QQQtx
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
.layout-container {
  height: 100vh;

  .el-header-new {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    background-color: #9cbae6;
    color: #d15c5c;
    line-height: 60px;
  }
}


.toggle-button {
  transition: margin-right 1.5s ease;
}
</style>
