// 评论列表页
const Comments = () => import(
    /* webpackChunkName: 'Comments' */
    '../../views/comments/list'
)

const routes = [
    {
        path: 'comments',
        name: 'Comments',
        component: Comments
    }
]

export default routes
