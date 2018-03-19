import articles from './articles/'
import { mergeModules } from 'src/utils/utils'

const basicModule = {
    namespaced: true,
    state: {
        navList: [
            {
                id: 'ClientArticlesList',
                text: 'Home'
            },
            {
                id: 'ClientCategories',
                text: 'Categories'
            },
            {
                id: 'ClientArchives',
                text: 'Archives'
            },
            {
                id: 'ClientTags',
                text: 'Tags'
            },
            {
                id: 'ClientAbout',
                text: 'About'
            },
            {
                id: 'ClientContact',
                text: 'Contact'
            }
        ]
    },
    getters: {
        getNavList: state => state.navList
    },
    mutations: {},
    actions: {}
}

export default mergeModules(basicModule, articles)
