<template>
    <div class="admin-auth">
        <img src="" alt="">
        <authModule class="admin-auth-wrapper"
            :info="info"
            @submit="submitHandler('login')">
        </authModule>
    </div>
</template>

<script>
    import authModule from 'src/components/auth'
    import auth from 'src/utils/auth'

    export default {
        data () {
            return {
                info: {
                    username: '',
                    password: '',
                    email: ''
                }
            }
        },
        methods: {
            /**
             * 提交表单，登录/注册
             */
            async submitHandler (type) {
                let req = ''
                
                if (type === 'login') {
                    req = 'Login'
                } else if (type === 'signup') {
                    req = 'Signup'
                }

                try {
                    let {
                        info
                    } = this
                    let res = await this.$store.dispatch(`auth/request${req}`, {
                        username: info.username,
                        password: info.password
                    })

                    auth.setJWT(res.data.token) // 将token存入localStorage

                    const pathBeforeLogin = localStorage.getItem('poppyBeforeLogin')

                    if (pathBeforeLogin) {
                        localStorage.removeItem('poppyBeforeLogin')
                        this.$router.push({
                            name: pathBeforeLogin
                        })
                    } else {
                        if (this.$route.path.includes('admin')) { // admin
                            this.$router.push({
                                name: 'AdminDashBoard'
                            })
                        } else {
                            this.$router.push({
                                name: 'DashBoard'
                            })
                        }
                    }
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${type === 'login' ? '登录' : '注册'}接口错误`)
                }
            }
        },
        components: {
            authModule
        }
    }
</script>


<style lang="scss">
    @import './../../styles/conf';

    .admin-auth {
        position: relative;
        height: 100%;
        &-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            min-width: 300px;
            width: 33%;
        }
    }
</style>

