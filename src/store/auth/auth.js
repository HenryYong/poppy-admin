import ajax from 'src/utils/ajax'

export const state = {
    
}

export const getters = {

}

export const mutations = {
}

export const actions = {
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
