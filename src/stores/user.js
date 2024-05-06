import {defineStore} from "pinia";

// 用户模块token setToken removeToken

export const useUserStore = defineStore('big-user', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
        console.log(newToken)
    }
    const removeToken = () => {
        token.value = ''
    }
    return{
        token,
        setToken,
        removeToken
    }
})