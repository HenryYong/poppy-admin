import Vue from 'vue'
import Vuex from 'vuex'
import articles from './articles'
import categories from './categories'
import tags from './tags'
import roles from './roles'
import users from './users'

const assign = Object.assign
let modules = [
    articles,
    categories,
    tags,
    roles,
    users
]
let state = {}
let getters = {}
let mutations = {}
let actions = {}

modules.map(v => {
    for (let key in v) {
        assign(state, v.state)
        assign(getters, v.getters)
        assign(mutations, v.mutations)
        assign(actions, v.actions)
    }
})

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
