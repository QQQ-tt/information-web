import request from '@/utils/request'

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