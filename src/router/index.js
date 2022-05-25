import VueRouter from 'vue-router'
import showBlog from '../pages/showBlog.vue';
import addBlog from '../pages/addBlog.vue';
import blogDetail from '../pages/blogDetail.vue';
const routes = [{
        path: '/',
        redirect: "/showBlog"
    },
    {
        path: "/showBlog",
        name: "showBlog",
        component: showBlog,
        meta: {
            keepAlive: true,
            //scollTopPosition: 0
        }
    }, {
        path: '/addBlog',
        name: "addBlog",
        component: addBlog,
        meta: {
            keepAlive: true,
            //scollTopPosition: 0
        }
    },
    {
        path: '/blog/:id',
        name: "blogDetail",
        component: blogDetail,
        meta: {
            keepAlive: false,
        }
    }

]
const router = new VueRouter({
    mode: 'history',
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return {
    //             x: 0,
    //             y: 0
    //         }
    //     }
    // }
})
export default router;