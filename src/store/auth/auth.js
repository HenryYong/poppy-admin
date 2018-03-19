import ajax from 'src/utils/ajax'

const state = {
    
}

const getters = {

}

const mutations = {
    /**
     * 更新 store.pipeline 中的 taskTypes
     *
     * @param {Object} state store state
     * @param {Array} arr taskTypes 数组
     */
}

const actions = {
    /**
     * 登录请求
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {String} username 用户名
     * @param {String} password 密码
     *
     * @return {Promise} promise 对象
     */
    requestLogin ({ commit, state, dispatch }, { username, password }) {
        return ajax.post(`${AJAX_URL}/auth/login/`, {
            username,
            password
        }).then(response => {
            return response
        })
    },
    /**
     * 注册请求
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {String} username 用户名
     * @param {String} password 密码
     *
     * @return {Promise} promise 对象
     */
    requestSignup ({ commit, state, dispatch }, { username, password }) {
        return ajax.post(`${AJAX_URL}/auth/signup/`, {
            username,
            password
        }).then(response => {
            return response
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
