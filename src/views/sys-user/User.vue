<script setup>
import {reactive, ref} from 'vue'
import {listSysUserPage} from '@/api/user'

let formInline = reactive({
  name: '',
  userId: '',
  pageSize: 10,
  pageNum: 1,
  hospital: ''
})

let tableData = ref([])
let total = ref(0)

const listUser = async () => {
  const result = await listSysUserPage(formInline)
  tableData.value = result.data.data.records
  total.value = result.data.data.total
}
const onSubmit = async () => {
  console.log('submit!')
  await listUser()
}
onSubmit()

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const handleSizeChange = (val) => {
  console.log(val, 'items per page')
  listUser()
}
const handleCurrentChange = (val) => {
  console.log('current page: ', val)
  listUser()
}
</script>

<template>
  <el-card style="width: auto;margin-bottom: 10px;" shadow="never"
           body-style="padding: 8px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline form-centered">
      <el-form-item label="用户">
        <el-input v-model="formInline.name" clearable/>
      </el-form-item>
      <el-form-item label="用户id">
        <el-input v-model="formInline.userId" clearable/>
      </el-form-item>
      <el-form-item label="医院">
        <el-select
            v-model="formInline.hospital"
            placeholder="全部"
            clearable
        >
          <el-option label="Zone one" value="shanghai"/>
          <el-option label="Zone two" value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="width: auto;;margin-bottom: 10px; height: 90%;" shadow="never" body-style="padding: 8px;">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="phone" label="phone" width="180"/>
      <el-table-column prop="userId" label="userId" width="180"/>
      <el-table-column prop="status" label="status" width="180"/>
      <el-table-column prop="date" label="Date" width="180"/>
      <el-table-column prop="address" label="Address"/>
    </el-table>
    <el-pagination
        v-model:current-page="formInline.pageNum"
        v-model:page-size="formInline.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 15px; justify-content: flex-end"
    />
  </el-card>
</template>

<style scoped lang="scss">
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.form-centered {
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