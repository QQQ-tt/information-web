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

const drawer = ref(false)
const direction = ref('rtl');

function cancelClick() {
  drawer.value = false
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ?`)
      .then(() => {
        drawer.value = false
      })
      .catch(() => {
        // catch error
      })
}

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmitFrom = () => {
  console.log('submit!')
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
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="phone" label="phone"/>
      <el-table-column prop="userId" label="userId"/>
      <el-table-column prop="status" label="status"/>
      <el-table-column prop="date" label="Date"/>
      <el-table-column prop="address" label="Address"/>
      <el-table-column fixed="right" label="Operations" width="180">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            Detail
          </el-button>
          <el-button link type="primary" size="small" @click="drawer = true">Edit</el-button>
          <el-button link type="primary" size="small">Delete</el-button>
        </template>
      </el-table-column>
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
    <el-drawer v-model="drawer" :direction="direction">
      <template #header>
        <h4>Edit User</h4>
      </template>
      <template #default>
        <div>
          <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="Activity name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
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
              <el-col :span="2" class="text-center">
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
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery" />
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
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio value="Sponsor">Sponsor</el-radio>
                <el-radio value="Venue">Venue</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitFrom">Create</el-button>
              <el-button>Cancel</el-button>
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