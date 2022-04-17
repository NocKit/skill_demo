import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/searchHome',
                name: 'searchHome',
                component: () => import('../views/search/search-home.vue'),
                meta: {
                    title: '搜索首页'
                },
                children: [
                    {
                        path: '/searchHome/searchDetail',
                        name: 'search-detail',
                        component: () => import('../views/search/search-detail'),
                        meta: {
                            title: '搜索结果'
                        }
                    }
                ]
            },{
                path: '/chartHome',
                name: 'chartHome',
                component: () => import('../views/charts/chart-home.vue'),
                meta: {
                    title: '图表首页'
                },
            }
        ]
    },
    {
        path: '/',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    }
]


const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        let breadcrumb = []
        to.matched.forEach(item => {
            if (item.meta.title) {
                breadcrumb.push({
                    label: item.meta.title,
                    path: item.path
                })
            }
        })
        router.app.$options.store.commit('setBreadcrumb', breadcrumb)
        router.app.$options.store.commit('setActiveIndex', to.name)
    }
    next()
})
export default router
