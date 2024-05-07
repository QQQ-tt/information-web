<script setup>
import {useUserStore,userCount} from "@/stores/index";

const count = userCount();
const userStore = useUserStore();
</script>

<template>
  <hr/>
  <router-view></router-view>
  <hr/>
  <hr/>
  <hr/>
  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('dfsajfgaskdfhgajkhdfgakjhdfgkjhdsgfk')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
  <p>{{ count.count }}</p>
  <el-button @click="count.increment()">增加++</el-button>
</template>

<style scoped lang="scss">

</style>