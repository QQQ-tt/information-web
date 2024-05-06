import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

/*
import {useUserStore} from '@/stores/modules/user.js'

export {useUserStore}

import {userCount} from "@/stores/modules/count.js";

export {userCount}*/

export * from './modules/user'
export * from './modules/count'