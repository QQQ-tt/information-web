import request from '@/utils/request'
import requestList from "@/utils/requestList";

export function listUserRolePage(e) {
  return requestList.post("/information/sysRole/listByRolePage",{
      roleName: e.roleName,
      pageNum: e.pageNum,
      pageSize: e.pageSize,
  })
}