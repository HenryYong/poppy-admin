/**
 * file main entry
 * @author Henry Yang
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import auth from './utils/auth'
import store from './store'
import router from './router'
import App from './App'

global.poppyVM = new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    router,
    store
})

// const init = () => {
//     global.poppyVM = new Vue({
//         el: '#app',
//         template: '<App/>',
//         components: {
//             App
//         },
//         // clientRouter,
//         router,
//         store
//     })
// }

// if (location.href.includes('admin')) {
//     auth.validateUser().then((jwt) => {
//         if (jwt && jwt !== auth.getJWT()) {
//             auth.setJWT(jwt)
//         }

//         init()
//     }, () => {
//         localStorage.setItem('poppyBeforeLogin', 'AdminDashBoard')
//         location.replace(`http://${location.host}/admin/auth`)
//     })
// } else {
//     console.log(1)
//     init()
//     console.log(3)
// }
