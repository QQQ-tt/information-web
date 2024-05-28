<script setup>
import {ref} from "vue";

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const pageNum = ref(1)
const pageSize = ref(10)

const props = defineProps(["listPage", "total"])
const handleSizeChange = (val) => {
  console.log(val, 'items per page')
  if (typeof props.listPage === 'function') {
    props.listPage(pageNum.value, pageSize.value)
  }
}
const handleCurrentChange = (val) => {
  console.log('current page: ', val)
  if (typeof props.listPage === 'function') {
    props.listPage(pageNum.value, pageSize.value)
  }
}
</script>

<template>
  <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
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
</template>

<style scoped lang="scss">

</style>