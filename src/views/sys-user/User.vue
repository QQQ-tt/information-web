<script setup>
import {reactive, ref} from 'vue'
import {listSysUserPage, deleteSysUser,getHospitalAll,saveOrUpdateUser} from '@/api/user'
import Page from "@/components/page.vue";

let formInline = reactive({
  name: '',
  userId: '',
  pageSize: 0,
  pageNum: 0,
  hospital: ''
})

let hospitalList = ref([])
const listAllHospital = async () => {
  const result = await getHospitalAll()
  hospitalList.value = result.data.data
}

let tableData = ref([])
let total = ref(0)

const listUser = async (pageNum, pageSize) => {
  formInline.pageNum = pageNum
  formInline.pageSize = pageSize
  const result = await listSysUserPage(formInline)
  tableData.value = result.data.data.records
  total.value = result.data.data.total
}
const onQuery = async () => {
  console.log('query!')
  await listUser(1, 10)
}
listAllHospital()
onQuery()

const onRest = () => {
  formInline.name = ''
  formInline.userId = ''
  formInline.hospital = ''
}

const detail = () => {

}

const deleteUser = async row => {
  await ElMessageBox.confirm(
      'proxy will permanently delete the file. Continue?',
      'Confirm the deletion',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  ).then(async () => {
    console.log(row)
    await deleteSysUser(row.id)
    await onQuery()
  }).catch(() => {
    // catch error
  })
}

const drawer = ref(false)
const direction = ref('rtl');
const addOrUpdate = ref(true)
const fromRegister = ref()
let form = reactive({
  id: '',
  name: '',
  region: '',
  date1: '',
  date2: '',
  status: false,
  type: [],
  sex: '',
  desc: '',
  phone: '',
  userId: '',
  password: '',
  confirmPassword:''
})

function closeDrawer() {
  // fromRegister.value.validate()
  fromRegister.value.resetFields()
  form = reactive({
    id: '',
    name: '',
    region: '',
    date1: '',
    date2: '',
    status: false,
    type: [],
    sex: '',
    desc: '',
    phone: '',
    userId: '',
    password: '',
    confirmPassword:''
  })
}
function setFormData(row) {
  form.id = row.id
  form.name = row.name
  form.userId = row.userId
  form.phone = row.phone
  form.status = row.status
}
function cancelClick() {
  drawer.value = false
}

function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ?`)
      .then(async () => {
        fromRegister.value.validate()
        drawer.value = false
        await saveOrUpdateUser(form)
        await onQuery()
        fromRegister.value.resetFields()
      })
      .catch(() => {
        // catch error
      })
}

//自定义确认密码的校验函数
const rePasswordValid = (rule, value, callback) => {
  if (value === null || value === '') {
    return callback(new Error('请再次确认密码'))
  } else if (form.password !== value) {
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
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {validator: rePasswordValid, trigger: 'blur'}
  ]
})
</script>

<template>
  <el-card style="width: auto;margin-bottom: 5px;margin-top: 5px" shadow="never"
           body-style="padding: 8px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline form-centered">
      <el-form-item label="Name">
        <el-input v-model="formInline.name" clearable/>
      </el-form-item>
      <el-form-item label="UserId">
        <el-input v-model="formInline.userId" clearable/>
      </el-form-item>
      <el-form-item label="Hospital">
        <el-select
            v-model="formInline.hospital"
            placeholder="All"
            clearable
        >
          <el-option v-for="item in hospitalList" :key="item.id" :label="item.hospitalName" :value="item.hospitalName"/>
        </el-select>
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="onQuery">Query</el-button>
        <el-button @click="onRest">Rest</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="width: auto;;margin-bottom: 10px; height: 90%;" shadow="never" body-style="padding: 8px;">
    <el-button type="primary" @click="drawer = true;addOrUpdate = true"
               style="display: flex; margin-bottom: 10px;margin-left: auto">Add
    </el-button>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="phone" label="phone"/>
      <el-table-column prop="userId" label="userId"/>
      <el-table-column prop="status" label="status">
        <template #default="scope">
          <el-tag v-if="scope.row.status === true" type="success">开启</el-tag>
          <el-tag v-else type="danger">Disable</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="Address"/>
      <el-table-column prop="createOn" label="Date"/>
      <el-table-column fixed="right" label="Operations" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="detail">
            Detail
          </el-button>
          <el-button link type="primary" size="small" @click="drawer = true;addOrUpdate = false;setFormData(scope.row)">
            Edit</el-button>
          <el-button link type="primary" size="small" @click="deleteUser(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :list-page="listUser" :total="total"/>
    <el-drawer v-model="drawer" :direction="direction" @close="closeDrawer">
      <template #header>
        <h4>Edit User</h4>
      </template>
      <template #default>
        <div>
          <el-form ref="fromRegister" :model="form" label-width="auto" style="max-width: 600px" :rules="registerDataRules">
            <el-form-item prop="name" label="Name">
              <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item prop="userId" label="UserId">
              <el-input v-model="form.userId"/>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input v-model="form.phone"/>
            </el-form-item>
            <div v-if="addOrUpdate">
              <el-form-item prop="password" label="Password">
                <el-input type="password" v-model="form.password"/>
              </el-form-item>
              <el-form-item prop="confirmPassword" label="ConfirmPassword">
                <el-input type="password" v-model="form.confirmPassword"/>
              </el-form-item>
            </div>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai"/>
                <el-option label="Zone two" value="beijing"/>
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker
                    v-model="form.date1"
                    type="date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
              </el-col>
              <el-col :span="2" style="text-align: center">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-time-picker
                    v-model="form.date2"
                    placeholder="Pick a time"
                    style="width: 100%"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox value="Online activities" name="type">
                  Online activities
                </el-checkbox>
                <el-checkbox value="Promotion activities" name="type">
                  Promotion activities
                </el-checkbox>
                <el-checkbox value="Offline activities" name="type">
                  Offline activities
                </el-checkbox>
                <el-checkbox value="Simple brand exposure" name="type">
                  Simple brand exposure
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Sex">
              <el-radio-group v-model="form.sex">
                <el-radio value="1">man</el-radio>
                <el-radio value="0">woman</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="User Status">
              <el-switch v-model="form.status"/>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input v-model="form.desc" type="textarea"/>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">cancel</el-button>
          <el-button type="primary" @click="confirmClick">confirm</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
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