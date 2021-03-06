import * as articles from './user'
import { mergeModules } from 'src/utils/utils'

const basicModule = {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {}
}

export default mergeModules(basicModule, articles)
