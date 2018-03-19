// 用户列表页
const Users = () => import(
    /* webpackChunkName: 'Users' */
    '../../../views/admin/users/list'
)
// 新增/编辑用户页
const User = () => import(
    /* webpackChunkName: 'User' */
    '../../../views/admin/users/user'
)

const routes = [
    {
        path: 'users',
        name: 'Users',
        component: Users
    },
    {
        path: 'users/:userId/edit',
        name: 'EditUser',
        component: User
    },
    {
        path: 'users/create',
        name: 'CreateUser',
        component: User
    }
]

export default routes
