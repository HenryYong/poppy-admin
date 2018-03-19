// 角色列表页
const Roles = () => import(
    /* webpackChunkName: 'Roles' */
    '../../../views/admin/roles/list'
)
// 新增/编辑角色页
const Role = () => import(
    /* webpackChunkName: 'Role' */
    '../../../views/admin/roles/role'
)

const routes = [
    {
        path: 'roles',
        name: 'Roles',
        component: Roles
    },
    {
        path: 'roles/:roleId/edit',
        name: 'EditRole',
        component: Role
    },
    {
        path: 'roles/create',
        name: 'CreateRole',
        component: Role
    }
]

export default routes
