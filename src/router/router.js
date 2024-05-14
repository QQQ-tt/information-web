import {createRouter, createWebHistory} from "vue-router";
import {useUserTokenStore} from "@/stores/index"

// createRouter创建路由实例
// createWebHistory创建history模式
// import.meta.env.BASE_URL是打包后项目根路径
// 1.history模式：createWebHistory  地址不带 #
// 2.hash模式：createWebHashHistory  地址带 #

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: {name: 'login'}
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/sys',
            name: 'information',
            component: () => import('@/views/layout/LayoutContainer.vue'),
            redirect: '/sys/user',
            children: [
                {
                    path: '/sys/user',
                    name: 'user',
                    component: () => import('@/views/sys-user/User.vue')
                },
                {
                    path: '/sys/role',
                    name: 'role',
                    component: () => import('@/views/sys-user/UserRole.vue')
                },
                {
                    path: '/sys/menu',
                    name: 'menu',
                    component: () => import('@/views/sys-user/UserMenu.vue')
                },
                {
                    path: '/package/info',
                    name: 'package-info',
                    component: () => import('@/views/package-info/PackageInfo.vue')
                }
            ]
        }
    ]
})

router.beforeEach((to, from) => {
    // to: 要跳转到的路由对象
    // from: 从哪个路由对象跳转过来的
    // next: 放行函数
    // next()放行 next('/login')强制跳转
    const userToken = useUserTokenStore()
    if (to.path === '/login' || to.path === '/') {
        return true
    } else {
        const token = userToken.info.token
        if (!token) {
            return { name: 'login'}
        } else {
            return true
        }
    }
})

export default router