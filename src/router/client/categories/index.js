// 文章分类页
const Categories = () => import(
    /* webpackChunkName: Categories */
    '../../../views/client/categories/index'
)

const routes = [
    {
        path: 'categories',
        name: 'ClientCategories',
        component: Categories
    }
]

export default routes
