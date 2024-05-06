<script setup>
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('dfsajfgaskdfhgajkhdfgakjhdfgkjhdsgfk')">登录</el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
</template>

<style scoped lang="scss">

</style>