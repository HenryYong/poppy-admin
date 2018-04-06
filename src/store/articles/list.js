import ajax from 'src/utils/ajax'

export const state = {
    articlesList: []
}

export const getters = {
    getArticlesList: state => state.articlesList
}

export const mutations = {
    /**
     * 更新 store.articles 中的 articlesList
     *
     * @param {Object} state store state
     * @param {Array} arr articlesList 数组
     */
    updateArticlesList (state, arr) {
        state.articlesList.splice(0, state.articlesList.length, ...arr)
    }
}

export const actions = {
    /**
     * 获取文章列表
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     *
     * @return {Promise} promise 对象
     */
    requestArticlesList ({ commit, state, dispatch }) {
        return ajax.get(`${AJAX_URL}/articles/`).then(response => {
            return response
        })
    },
    /**
     * 获取指定文章内容
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {String} articleId 文章的articleId
     *
     * @return {Promise} promise 对象
     */
    requestOneArticle ({ commit, state, dispatch }, articleId) {
        return ajax.get(`${AJAX_URL}/articles/?article_id=${articleId}`).then(response => {
            return response
        })
    },
    /**
     * 新增文章
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 新增的文章的内容
     *
     * @return {Promise} promise 对象
     */
    requestCreateArticle ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/create_article/`, params).then(response => {
            return response
        })
    },
    /**
     * 更新文章
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 更新的文章的内容
     *
     * @return {Promise} promise 对象
     */
    requestUpdateArticle ({ commit, state, dispatch }, params) {
        return ajax.post(`${AJAX_URL}/articles/`, params).then(response => {
            return response
        })
    },
    /**
     * 删除文章
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Number} articleId 被删除的文章的articleId
     *
     * @return {Promise} promise 对象
     */
    requestDeleteArticle ({ commit, state, dispatch }, articleId) {
        return ajax.post(`${AJAX_URL}/delete_articles/`, { article_id: articleId }).then(response => {
            return response
        })
    },
    /**
     * 根据条件获取文章
     *
     * @param {Function} commit store commit mutation handler
     * @param {Object} state store state
     * @param {Function} dispatch store dispatch action handler
     * @param {Object} params 查找条件
     *
     * @return {Promise} promise 对象
     */
    requestArticleByCondition ({ commit, state, dispatch }, params) {
        let query = ''

        for (let key in params) {
            query += `${query.length ? '&' : ''}${key}=${params[key]}`
        }

        return ajax.get(`${AJAX_URL}/articles/?${query}`).then(response => {
            return response
        })
    }
}
