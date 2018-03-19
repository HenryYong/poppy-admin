import ajax from 'src/utils/ajax'

export const state = {
    articlesDetail: {},
    articlesList: []
}

export const getters = {
    getArticlesDetail: state => state.articlesDetail,
    getArticlesList: state => state.articlesList
}

export const mutations = {
    /**
     * 保存文章信息
     * @param {Object} state
     * @param {String} articleId
     * @param {Object} data
     */
    updateArticlesDetail (state, { articleId, data }) {
        state.articlesDetail[articleId] = data
    },
    /**
     * 更新文章列表
     * @param {Object} state
     * @param {Number} startIndex
     * @param {Array} list
     */
    updateArticlesList (state, { startIndex = 0, list }) {
        state.articlesList.splice(startIndex, 0, ...list)
    }
}

export const actions = {
    /**
     * 获取文章列表(暂时未考虑分页)
     */
    requestArticlesList ({ commit, state, dispatch }) {
        return ajax.get(`${CLIENT_AJAX_URL}/articles/`).then(response => {
            commit('updateArticlesList', {
                list: response.data
            })

            return response
        })
    },
    /**
     * 获取一篇文章详情
     * @param {String} articleId
     */
    requestArticleDetail ({ commit, state, dispatch }, articleId) {
        return ajax.get(`${CLIENT_AJAX_URL}/article/?article_id=${articleId}`).then(response => {
            let {
                data
            } = response

            commit('updateArticlesDetail', {
                articleId,
                data
            })

            return data
        })
    }
}
