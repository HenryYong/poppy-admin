// 标签列表页
const Tags = () => import(
    /* webpackChunkName: 'Tags' */
    '../../../views/admin/tags/list'
)
// 新增/编辑标签页
const Tag = () => import(
    /* webpackChunkName: 'Tag' */
    '../../../views/admin/tags/tag'
)

const routes = [
    {
        path: 'tags',
        name: 'Tags',
        component: Tags
    },
    {
        path: 'tags/:tagId/edit',
        name: 'EditTag',
        component: Tag
    },
    {
        path: 'tags/create',
        name: 'CreateTag',
        component: Tag
    }
]

export default routes
