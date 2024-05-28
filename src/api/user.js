import request from '@/utils/request'
import requestList from "@/utils/requestList";

export function registerApi(e) {
    return request.post('/information/sysUser/createSysUser', {
        name: e.name,
        password: e.password,
        userId: e.userId
    })
}

export function loginApi(e) {
    return request.post('/information/sysUser/login', {
        userId: e.userId,
        password: e.password
    })
}

export function getUserByUserId(e) {
    return request.get('/information/sysUser/getUserByUserId', {params: {userId: e}})
}

export function listSysUserPage(e) {
    return requestList.post('/information/sysUser/listSysUserPage', {
        name: e.name,
        userId: e.userId,
        pageNum: e.pageNum,
        pageSize: e.pageSize
    })
}