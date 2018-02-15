import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Province from '@/views/Province.vue'
import City from '@/views/City.vue'
import Distribute from '@/views/Distribute.vue'

const router = new VueRouter({
    routes: [
        {   
            path: '/',
            redirect: "/home",
        },
        {   
            path: '/home',
            component: Home,
        },
        {   
            path: '/city',
            component: City,
        },
        {   
            path: '/login',
            component: Login,
        },
        {   
            path: '/province',
            component: Province,
            meta: {
                breadcrumbs: [{
                    name: '经销商分配',
                }],
                keepAlive: false,
            }
        },
        {   
            path: '/distribute',
            component: Distribute,
            meta: {
                breadcrumbs: [{
                    name: '经销商分配',
                }],
                keepAlive: false,
            }
        }
    ],
    mode: 'hash'
})

export default router