import Role from './role'

const assign = Object.assign

let modules = [
    Role
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
