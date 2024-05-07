import {createRouter, createWebHistory} from "vue-router";

// createRouter创建路由实例
// createWebHistory创建history模式
// import.meta.env.BASE_URL是打包后项目根路径
// 1.history模式：createWebHistory  地址不带 #
// 2.hash模式：createWebHashHistory  地址带 #

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        },
        {
            path: '/',
            name: 'information',
            component: () => import('@/views/layout/LayoutContainer.vue'),
            redirect : '/sys/user',
            children : [
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

export default router