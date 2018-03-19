import ajax from 'src/utils/ajax'

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    /**
     * 获取用户列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     *
     * @return {Promise} promise 对象
     */
    requestUserList ({ commit, state, dispatch }) {
        return ajax.get(`${AJAX_URL}/users/`).then(response => {
            return response
        })
    },
    /**
     * 获取一个用户信息
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Number} id 用户id
     *
     * @return {Promise} promise 对象
     */
    requestOneUser ({ commit, state, dispatch }, id) {
        return ajax.get(`${AJAX_URL}/users/?id=${id}`).then(response => {
            return response
        })
    },
    /**
     * 新增用户
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 提交参数
     *
     * @return {Promise} promise 对象
     */
    requestCreateUser ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/create_user/`, params).then(response => {
            return response
        })
    },
    /**
     * 编辑用户
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 用户信息
     *
     * @return {Promise} promise 对象
     */
    requestEditUser ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/users/`, params).then(response => {
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
