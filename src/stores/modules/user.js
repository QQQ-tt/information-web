import {defineStore} from "pinia";
import {ref} from "vue"

// 用户模块token setToken removeToken

export const useUserTokenStore = defineStore('token', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ''
    }
    return {
        token,
        setToken,
        removeToken
    }
}, {persist: true})

export const useUserIdStore = defineStore('userId', () => {
    const userId = ref('')
    const setUserId = (param) => {
        userId.value = param
    }
    const removeUserId = () => {
        userId.value = ''
    }
    return {
        userId,
        setUserId,
        removeUserId
    }
}, {persist: true})

