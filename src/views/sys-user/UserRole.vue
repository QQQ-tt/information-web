<script setup>
import {reactive, ref} from "vue";
import {listUserRolePage} from "@/api/userRole";
import Page from "@/components/page.vue";

let formInline = reactive({
  roleName: '',
  pageSize: 0,
  pageNum: 0,
})

let userRole = reactive({
  id: '',
  roleName: '',
  roleCode: '',
  remark: ''
})

let tableData = ref([])
let total = ref(0)
const drawer = ref(false)
const addOrUpdate = ref(true)

async function listUserRole(pageNum, pageSize) {
  formInline.pageNum = pageNum
  formInline.pageSize = pageSize
  const result = await listUserRolePage(formInline)
  tableData.value = result.data.data.records
  total.value = result.data.data.total
}

async function onQuery() {
  await listUserRole(1, 10)
}
onQuery()
function onRest() {
  formInline.roleName = ''
}



</script>

<template>
  <el-card style="width: auto;margin-top: 5px;margin-bottom: 5px" shadow="never" body-style="padding: 8px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="RoleName">
        <el-input v-model="formInline.roleName" clearable/>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="onQuery">Query</el-button>
        <el-button @click="onRest">Rest</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="width: auto;margin-bottom: 10px; height: 85%" shadow="never" body-style="padding: 8px">
    <el-button type="primary" @click="drawer = true;addOrUpdate = true"
               style="display: flex; margin-bottom: 10px;margin-left: auto">Add
    </el-button>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="roleName" label="RoleName" width="180"/>
      <el-table-column prop="roleCode" label="RoleCode" width="180"/>
      <el-table-column prop="createOn" label="CreateTime" width="180"/>
      <el-table-column prop="status" label="UseNum" width="180"/>
      <el-table-column prop="remark" label="RoleDesc"/>
      <el-table-column fixed="right" label="Operations" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="setRole(scope.row)">Menu</el-button>
          <el-button link type="primary" size="small" @click="drawer = true;addOrUpdate = false;setFormData(scope.row)">Edit</el-button>
          <el-button link type="primary" size="small" @click="deleteRole(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <page :list-page="listUserRole" :total="total"/>
</template>

<style scoped lang="scss">
.demo-form-inline {
  display: flex;
  align-items: center;

  .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .form-button {
    margin-left: auto;
    margin-right: 0;
  }

  .el-input {
    --el-input-width: 220px;
  }

  .el-select {
    --el-select-width: 220px;
  }
}
</style>