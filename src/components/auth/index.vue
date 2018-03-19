<template>
    <div class="auth-wrapper">
        <!-- <p class="toggle-methods">
            Sign in
        </p> -->
        <img class="auth-welcome" :src="logo" alt="logo">
        <section class="auth-main">
            <!-- sign in -->
            <el-form
                ref="form"
                label-position="top"
                label-width="80px"
                :model="info">
                <el-form-item label="Username">
                    <el-input
                        v-model="info.username"
                        placeholder="Your username, pls">
                    </el-input>
                </el-form-item>

                <el-form-item label="Password">
                    <el-input
                        type="password"
                        v-model="info.password"
                        placeholder="Your password, pls">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="main-btn" type="primary" @click="submit">Sign In</el-button>
                </el-form-item>
            </el-form>
            <!-- sign in -->
        </section>
        <section class="auth-copyright">Copyright &copy; 2018 Henry YANG</section>
    </div>
</template>

<script>
    import {
        Button,
        Input,
        Form,
        FormItem
    } from 'element-ui'
    import logoPNG from 'src/images/logo_trim.png'

    export default {
        props: {
            info: {
                type: Object,
                default () {
                    return {
                        username: '',
                        password: '',
                        email: ''
                    }
                }
            }
        },
        data () {
            return {
                logo: null,
                signInInfo: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            submit () {
                if (this.validate()) {
                    this.$emit('submit')
                }
            },
            /**
             * 验证表单输入
             */
            validate () {
                return true
            },
            /**
             *  注册时切换密码是否明文
             */
            toggleVisible () {

            }
        },
        created () {
            this.logo = logoPNG
        },
        components: {
            'el-button': Button,
            'el-input': Input,
            'el-form': Form,
            'el-form-item': FormItem
        }
    }
</script>

<style lang="scss">
    @import './../../styles/conf';

    .auth-wrapper {
        padding: 20px 0;
        border-right: 1px solid #fafafa;
        box-shadow: 2px 0 10px rgba(0, 0, 0, .035);
        .main-btn {
            border-radius: 0;
        }
        .auth-welcome {
            margin-top: 20%;
            padding: 0 50px;
        }
        .auth-main {
            margin-top: 20%;
            padding: 0 50px;
            .el-form-item__label {
                padding: 0;
                line-height: 1;
            }
            .el-input__inner {
                padding-left: 0;
                border: {
                    top: none;
                    left: none;
                    right: none;
                }
                border-radius: 0;
            }
        }
        .auth-copyright {
            position: absolute;
            left: 30px;
            bottom: 20px;
            color: $fontLight;
            font-size: 14px;
        }
    }
</style>
