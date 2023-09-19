import { createWebHistory, createRouter } from "vue-router";
// 从pinia中引入导出的 创建pinia实例的方法  类似 useroute/userouter
import { useMain } from "../store/home.ts";


export let routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        redirect: '/welcome',
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('../views/pagetwo/welcome.vue'),
                meta: {
                    title: '控制台'
                }
            }
        ]
    },
    {
        // 配置404页面s
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue'),
        beforeEnter(to: any, from: any, next: any) {
            const store = useMain()
            console.log(to, from);
            if (store.pathObj != null) {
                next(store.pathObj)
            }

        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: {
            title: '登录页'
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})
// 先声明一个值为true  添加动态路由后变为false 仅在true的情况下触发  只登陆时触发一次
var flag = true

router.beforeEach((to, from, next) => {
    document.title = to.meta.title as string
    if (to.path != '/login') {
        let token = localStorage.getItem('token')
        if (token) {
            // 使用pinia 创建实例store 
            const store = useMain()
            // 仅在flag为true且pinia中存储的有数据的情况下触发
            if (flag == true && store.menuList.length != 0) {
                console.log(from);
                store.menuList.forEach(item => {
                    let obj = {
                        name: item.name,
                        path: item.path,
                        meta: item.meta,
                        component: getComponents(item.name)
                    }
                    router.addRoute('home', obj)
                })
                flag = false
                next({ ...to, replace: true })
            } else {
                next()
            }
        } else {
            next('/login')
        }
    } else {
        next()
    }
})





var getComponents = (name: string) => {
    return () => import('../views/pagetwo/' + name + '.vue')
}


export default router



