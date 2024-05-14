import {defineStore} from "pinia";
import {ref,reactive} from "vue"
import {getUserByUserId} from "@/api/user.js";

// 用户模块token setToken removeToken

export const useUserTokenStore = defineStore('token', () => {
    const info = reactive({
        token: '', userId: ''
    })
    const setToken = (newToken, userId) => {
        info.token = newToken
        info.userId = userId
    }
    const removeToken = () => {
        info.token = ''
        info.userId = ''
    }
    return {
        info,
        setToken,
        removeToken
    }
}, {persist: true})

export const useUserStore = defineStore('user', () => {
    const user = ref('')
    const getUser = async () => {
        const userId = useUserTokenStore()
        if (user.value === ''){
            const res = await getUserByUserId(userId.info.userId)
            if (res.data.code === 200) {
                user.value = res.data.data
            }
        }
    }
    const removeUser = () => {
        user.value = ''
    }
    return {
        user,
        getUser,
        removeUser
    }
}, {persist: true})

