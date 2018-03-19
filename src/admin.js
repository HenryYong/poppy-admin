// /**
//  * file admin entry
//  * @author Henry Yang
//  */

// import Vue from 'vue'
// import Vuex from 'vuex'

// import auth from './utils/auth'
// import store from './store'
// import router from './router/admin'
// import App from './App'
// console.log('admin.js')
// const init = () => {
//     global.poppyVM = new Vue({
//         el: '#app',
//         template: '<App/>',
//         render: h => h(App),
//         components: {
//             App
//         },
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
//     init()
// }
