import {defineStore} from "pinia";
import {ref} from "vue";

export const userCount = defineStore('count', () => {
    const count = ref(0)
    const increment = () => {
        count.value++
    }
    return {count, increment}
})