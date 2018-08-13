/**
 * admin路由配置
 * @author Henry Yang
 */

import Vue from 'vue'
import Router from 'vue-router'

import Auth from './auth'
import Common from './common'
import Articles from './articles'
import Roles from './roles'
import Users from './users'
import Tags from './tags'
import Categories from './categories'
import Comments from './comments'

// admin框架页
const Admin = () => import(
    /* webpackChunkName: 'Admin' */
    './../views/index'
)
let routesArr = [
    Common,
    Auth,
    Articles,
    Roles,
    Users,
    Tags,
    Categories,
    Comments
]
let children = []
let routes = []

if (process.env.NODE_ENV === 'dev') {
    Vue.use(Router)
}

routesArr.map(route => {
    children.push(...route)
})

routes.push(
    {
        path: '/admin',
        component: Admin,
        children
    },
    {
        path: '',
        redirect: {
            path: '/admin'
        }
    }
)

const router = new Router({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach(route => {

})

export default router
