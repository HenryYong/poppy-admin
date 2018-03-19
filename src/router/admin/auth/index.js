// 注册登录页路由
const Auth = () => import(
    /* webpackChunkName: 'Auth' */
    '../../../views/admin/auth'
)

const routes = [
    {
        path: 'auth',
        name: 'Auth',
        component: Auth
    }
]

export default routes
