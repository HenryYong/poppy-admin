/**
 * auth
 * @author Henry Yang
 */

import ajax from './ajax'

export default {
    validateUser () {
        return new Promise((resolve, reject) => {
            if (location.href.match(/\/auth$/)) { // 登录页不需要验证
                resolve()
            } else {
                const jwt = `Bearer ${this.getJWT()}`

                if (!jwt) {
                    reject(new Error('Unauthorized'))
                } else {
                    ajax.post(`${AJAX_URL}/auth/user/`).then(res => {
                        if (res.result) {
                            resolve()
                        } else {
                            reject(new Error('Unauthorized'))
                        }
                    }, rej => {
                        reject(new Error('Unauthorized'))
                    })
                }
            }
        })
    },
    setJWT (jwt) {
        localStorage.setItem(DOMAIN, jwt)
    },
    getJWT () {
        return localStorage.getItem(DOMAIN) || ''
    }
}
