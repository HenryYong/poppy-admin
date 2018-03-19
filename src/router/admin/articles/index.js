// 文章列表页
const Articles = () => import(
    /* webpackChunkName: 'Articles' */
    '../../../views/admin/articles/list'
)
// 新增/编辑文章页
const Article = () => import(
    /* webpackChunkName: 'Article' */
    '../../../views/admin/articles/article.vue'
)

const routes = [
    {
        path: 'articles',
        name: 'Articles',
        component: Articles
    },
    {
        path: 'articles/:articleId/edit',
        name: 'EditArticle',
        component: Article
    },
    {
        path: 'articles/create',
        name: 'CreateArticle',
        component: Article
    }
]

export default routes
