// contact页
const Contact = () => import(
    /* webpackChunkName: Contact */
    '../../../views/client/contact/index'
)

const routes = [
    {
        path: 'contact',
        name: 'ClientContact',
        component: Contact
    }
]

export default routes
