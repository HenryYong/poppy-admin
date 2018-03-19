const AdminDashBoard = () => import(
    /* webpackChunkName: AdminDashBoard */
    './../../../views/admin/dashboard.vue'
)

const routes = [
    {
        path: '',
        name: 'AdminDashBoard',
        component: AdminDashBoard
    }
]

export default routes
