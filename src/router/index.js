// import Vue from 'vue'
// import Router from 'vue-router'
// import adminRoutes from './admin'
// import clientRoutes from './client/index.bak.js'

// // admin框架页
// const Admin = () => import(
//     /* webpackChunkName: 'Admin' */
//     './../views/admin/index'
// )

// // client框架页
// const Client = () => import(
//     /* webpackChunkName: 'Client' */
//     './../views/client/index'
// )
// // const None = () => import(
// //     /* webpackChunkName: 'None' */
// //     '../views/none'
// // )

// Vue.use(Router)

// let allRoutes = []

// allRoutes.push(
//     {
//         path: '/admin',
//         component: Admin,
//         children: adminRoutes
//     },
//     {
//         path: '',
//         component: Client,
//         children: clientRoutes
//     }
// )

// const router = new Router({
//     mode: 'history',
//     routes: allRoutes
// })

// router.beforeEach((to, from, next) => {
//     next()
// })

// router.afterEach(route => {

// })

// export default router
/**
 * client路由配置
 * @author Henry Yang
 */

import Vue from 'vue'
import Router from 'vue-router'

import About from './client/about'
import Archives from './client/archives'
import Categories from './client/categories'
import Contact from './client/contact'
import Tags from './client/tags'
import Articles from './client/articles'

// client框架页
const Client = () => import(
    /* webpackChunkName: 'Client' */
    './../views/client/index'
)
let routesArr = [
    About,
    Archives,
    Categories,
    Contact,
    Tags,
    Articles
]
let children = []
let routes = []

Vue.use(Router)

routesArr.map(route => {
    children.push(...route)
})

routes.push(
    {
        path: '',
        component: Client,
        children
    }
)

// export default routes
const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(route => {

})
console.log(router)

export default router
