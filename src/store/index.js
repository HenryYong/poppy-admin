/**
 * store
 * @author Henry Yang
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from 'src/utils/ajax'
import auth from './auth'
import admin from './admin'
import client from './client'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        admin,
        client
    },
    // 公共state
    state: {
        sideMenuList: [
            {
                id: 'AdminDashBoard',
                text: 'DashBoard',
                icon: 'home'
            },
            {
                id: 'Articles',
                text: 'Articles',
                icon: 'article',
                children: [
                    'CreateArticle',
                    'EditArticle'
                ]
            },
            {
                id: 'Categories',
                text: 'Categories',
                icon: 'folder',
                children: [
                    'CreateCategory',
                    'EditCategory'
                ]
            },
            {
                id: 'Tags',
                text: 'Tags',
                icon: 'tags',
                children: [
                    'CreateTag',
                    'EditTag'
                ]
            },
            {
                id: 'Users',
                text: 'Users',
                icon: 'users',
                children: [
                    'CreateUser',
                    'EditUser'
                ]
            },
            {
                id: 'Roles',
                text: 'Roles',
                icon: 'role',
                children: [
                    'CreateRole',
                    'EditRole'
                ]
            },
            {
                id: 'Comments',
                text: 'Comments',
                icon: 'bubbles'
            }
        ]
    },
    getters: {
        getSideMenuList: state => state.sideMenuList
    },
    // 公共mutations
    mutations: {
        
    },
    // 公共actions
    actions: {
        requestUploadImg ({ commit, state, dispatch }, file) {
            let formdata = new FormData()

            formdata.append('image', file)

            return ajax.post(`${COMMON_AJAX_URL}/upload_img/`, formdata).then(response => {
                return response
            })
        }
    }
})
