import request from '@/utils/request'

export function registerApi(query) {
    return request.post('/information/sysUser/createSysUser', {
        name: query.name,
        password: query.password,
        userId: query.userId
    })
}