import ajax from 'src/utils/ajax'

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    /**
     * 获取标签列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     *
     * @return {Promise} promise 对象
     */
    requestTagList ({ commit, state, dispatch }) {
        return ajax.get(`${AJAX_URL}/tags/`).then(response => {
            return response
        })
    },
    /**
     * 获取一个标签信息
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Number} id 标签id
     *
     * @return {Promise} promise 对象
     */
    requestOneTag ({ commit, state, dispatch }, id) {
        return ajax.get(`${AJAX_URL}/tags/?id=${id}`).then(response => {
            return response
        })
    },
    /**
     * 根据分类获取标签
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {String} category 指定的分类名
     *
     * @return {Promise} promise 对象
     */
    requestTagByCategory ({ commit, state, dispatch }, category) {
        return ajax.get(`${AJAX_URL}/tags/?category=${category}`).then(response => {
            return response
        })
    },
    /**
     * 新增标签
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 提交参数
     *
     * @return {Promise} promise 对象
     */
    requestCreateTag ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/create_tag/`, params).then(response => {
            return response
        })
    },
    /**
     * 编辑标签
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 标签信息
     *
     * @return {Promise} promise 对象
     */
    requestEditTag ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/tags/`, params).then(response => {
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
