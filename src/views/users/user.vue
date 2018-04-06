<template>
    <div class="user-scope">
        <inner-header class="mb20"
            :title="`${pageType === 'CreateUser' ? '新增' : '编辑'}用户`">
        </inner-header>
        <section class="form-wrapper"
            v-loading="loading">
            <el-form
                ref="userForm"
                label-width='70px'
                :model="config">
                <el-form-item label="用户名">
                    <el-input
                        v-model="config.username"
                        placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        v-model="config.password"
                        placeholder="请输入密码">
                    </el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input
                        v-model="config.email"
                        placeholder="请输入email">
                    </el-input>
                </el-form-item>
                <el-form-item label="个人链接">
                    <el-input
                        v-model="config.personal_link"
                        placeholder="请输入个人链接">
                    </el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input
                        v-model="config.avatar"
                        placeholder="请输入头像">
                    </el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select
                        v-model="config.role"
                        placeholder="请选择角色">
                        <el-option
                            v-for="role of roleList"
                            :key="role.role_id"
                            :label="role.role_name"
                            :value="role.role_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submit">
                        保存
                    </el-button>
                    <el-button
                        @click="$router.push({
                            name: 'Users'
                        })">
                        取消
                    </el-button>
                    <el-button class="fr"
                        v-if="pageType === 'EditUser'"
                        type="danger"
                        @click="delUser">
                        删除
                    </el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import innerHeader from 'src/components/inner-header'
    import {
        Form,
        FormItem,
        Input,
        Button,
        Select,
        Option
    } from 'element-ui'
    import auth from 'src/utils/auth'

    export default {
        data () {
            return {
                pageType: this.$route.name,
                config: {
                    id: 0,
                    username: '',
                    password: '',
                    email: '',
                    link: '',
                    avatar: '',
                    role: ''
                },
                roleList: [],
                loading: false
            }
        },
        async created () {
            let {
                config,
                $store
            } = this

            try {
                let res = await $store.dispatch('roles/requestRoleList')
                
                this.roleList.splice(0, this.roleList.length, ...res.data)
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('获取角色接口错误')
            }

            if (this.pageType === 'EditUser') {
                try {
                    let res = await $store.dispatch('users/requestOneUser', this.$route.params.userId)
                    let {
                        data
                    } = res

                    config.id = data.id
                    config.username = data.username
                    config.password = data.password
                    config.email = data.email
                    config.link = data.personal_link
                    config.avatar = data.avatar
                    config.role = data.role
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('获取用户接口错误')
                }
            }
        },
        methods: {
            async submit () {
                let {
                    pageType
                } = this

                let isCreate = pageType === 'CreateUser'
                try {
                    let {
                        config: {
                            id,
                            username,
                            password,
                            email,
                            link,
                            avatar,
                            role
                        },
                        config
                    } = this
                    let res

                    if (isCreate) { // 新增
                        res = await this.$store.dispatch('users/requestCreateUser', {
                            username,
                            password,
                            email,
                            link,
                            avatar,
                            role
                        })

                        this.$router.push({
                            name: 'Users'
                        })
                    } else { // 编辑
                        res = await this.$store.dispatch('users/requestEditUser', {
                            id,
                            username,
                            password,
                            email,
                            link,
                            avatar,
                            role
                        })

                        // 编辑用户信息后更新localStorage
                        auth.setJWT(res.data.token)
                    }
                    
                    this.$message.success(`${isCreate ? '新增' : '编辑'}角色成功`)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${isCreate ? '新增' : '编辑'}角色接口错误`)
                }
            },
            delUser () {
                this.$confirm('确定删除当前用户？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(async () => {
                    try {
                        let {
                            config: {
                                id,
                                username
                            }
                        } = this

                        this.loading = true

                        let res = await this.$store.dispatch('users/requestDeleteUser', {
                            id
                        })

                        this.$message.success('删除成功，正在跳转...')
                        setTimeout(() => {
                            this.$router.replace({
                                name: 'Users'
                            })
                        }, 500)
                    } catch (err) {
                        this.$message.error(`${err.data ? err.data.message : err}`)
                        console.warn(`删除用户接口错误`)
                    } finally {
                        setTimeout(() => {
                            this.loading = false
                        }, 200)
                    }
                })
            }
        },
        components: {
            innerHeader,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-input': Input,
            'el-button': Button,
            'el-select': Select,
            'el-option': Option
        }
    }
</script>
