import ajax from 'src/utils/ajax'

const state = {
    categoryList: []
}

const getters = {
    getCategoryList: state => state.categoryList
}

const mutations = {
    /**
     * 更新 store.categories 中的 categoryList
     *
     * @param {Object} state store state
     * @param {Array|Object} param 操作的内容
     * @param {String} type 操作的类型，可选值有insert，update，delete，modify
     */
    updateCategoryList (state, { param, type }) {
        switch (type) {
            case 'update':
                state.categoryList.splice(0, state.categoryList.length, ...param)
                break
            case 'insert':
                state.categoryList.unshift(param)
                break
            case 'delete':
                state.categoryList.splice(param.index, 1)
                break
            case 'modify':
                state.categoryList.splice(param.index, 0, param.obj)
                break
        }
    }
}

const actions = {
    /**
     * 获取分类列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     *
     * @return {Promise} promise 对象
     */
    requestAllCategory ({ commit, state, dispatch }) {
        return ajax.get(`${AJAX_URL}/categories/all/`).then(response => {
            return response
        })
    },
    /**
     * 获取分类列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Number} id 分类id
     *
     * @return {Promise} promise 对象
     */
    requestCategoryList ({ commit, state, dispatch }, id) {
        return ajax.get(`${AJAX_URL}/categories/${id ? `?id=${id}` : ''}`).then(response => {
            return response
        })
    },
    /**
     * 获取下拉框使用的分类列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     *
     * @return {Promise} promise 对象
     */
    requestCategoriesForList ({ commit, state, dispatch }) {
        return ajax.get(`${AJAX_URL}/categories/list/`).then(response => {
            return response
        })
    },
    /**
     * 新增分类
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 提交参数
     *
     * @return {Promise} promise 对象
     */
    requestCreateCategory ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/create_category/`, params).then(response => {
            return response
        })
    },
    /**
     * 编辑分类
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 分类信息
     *
     * @return {Promise} promise 对象
     */
    requestEditCategory ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/categories/`, params).then(response => {
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
