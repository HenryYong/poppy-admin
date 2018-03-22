// 标签列表页
const Categories = () => import(
    /* webpackChunkName: 'Categories' */
    '../../views/categories/list'
)
// 新增/编辑标签页
const Category = () => import(
    /* webpackChunkName: 'Category' */
    '../../views/categories/category'
)

const routes = [
    {
        path: 'categories',
        name: 'Categories',
        component: Categories
    },
    {
        path: 'categories/:categoryId/edit',
        name: 'EditCategory',
        component: Category
    },
    {
        path: 'categories/create',
        name: 'CreateCategory',
        component: Category
    }
]

export default routes
