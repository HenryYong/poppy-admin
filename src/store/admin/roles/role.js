import ajax from 'src/utils/ajax'

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    /**
     * 获取角色列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     *
     * @return {Promise} promise 对象
     */
    requestRoleList ({ commit, state, dispatch }) {
        return ajax.get(`${AJAX_URL}/roles/`).then(response => {
            return response
        })
    },
    /**
     * 获取角色信息
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Number} id 角色id
     *
     * @return {Promise} promise 对象
     */
    requestOneRole ({ commit, state, dispatch }, id) {
        return ajax.get(`${AJAX_URL}/roles?id=${id}`).then(response => {
            return response
        })
    },
    /**
     * 新增角色
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 提交参数
     *
     * @return {Promise} promise 对象
     */
    requestCreateRole ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/create_role/`, params).then(response => {
            return response
        })
    },
    /**
     * 编辑角色
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 角色信息
     *
     * @return {Promise} promise 对象
     */
    requestEditRole ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/roles/`, params).then(response => {
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
