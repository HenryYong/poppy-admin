// 文章列表页
const ArticlesList = () => import(
    /* webpackChunkName: ArticlesList */
    '../../../views/client/articles/index'
)

// 文章详情页
const ArticleDetail = () => import(
    /* webpackChunkName: ArticleDetail */
    '../../../views/client/articles/detail'
)

const routes = [
    {
        path: '',
        redirect: {
            name: 'ClientArticlesList'
        }
    },
    {
        path: 'articles',
        name: 'ClientArticlesList',
        component: ArticlesList
    },
    {
        path: 'articles/:articleId',
        name: 'ClientArticleDetail',
        component: ArticleDetail,
        meta: {
            name: 'ClientArticlesList'
        }
    }
]

export default routes
