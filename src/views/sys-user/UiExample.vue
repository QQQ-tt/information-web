<script setup>
import { reactive } from 'vue'

const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <el-card style="width: auto;margin: 10px" shadow="always" body-style="padding: 8px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select
            v-model="formInline.region"
            placeholder="Activity zone"
            clearable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-date-picker
            v-model="formInline.date"
            type="date"
            placeholder="Pick a date"
            clearable
        />
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="width: auto;margin: 10px" shadow="hover" body-style="padding: 8px">hover</el-card>
  <el-card style="width: auto;margin: 10px" shadow="never" body-style="padding: 8px">never</el-card>
</template>

<style scoped lang="scss">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.demo-form-inline {
  display: flex;
  align-items: center;
}
.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.form-button {
  margin-left: auto;
  margin-right: 0;
}
</style>