<template>
    <div class="role-scope">
        <inner-header class="mb20"
            :title="`${pageType === 'CreateRole' ? '新增' : '编辑'}角色`">
        </inner-header>
        <section class="form-wrapper">
            <el-form
                ref="roleForm"
                label-width='70px'
                :model="config">
                <el-form-item label="角色ID">
                    <el-input
                        v-model="config.roleId"
                        placeholder="请输入角色ID">
                    </el-input>
                </el-form-item>
                <el-form-item label="角色名">
                    <el-input
                        v-model="config.roleName"
                        placeholder="请输入角色名">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submit">
                        保存
                    </el-button>
                    <el-button
                        @click="$router.push({
                            name: 'Roles'
                        })">
                        取消
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
        Button
    } from 'element-ui'

    export default {
        data () {
            return {
                pageType: this.$route.name,
                config: {
                    id: 0,
                    roleId: '',
                    roleName: ''
                }
            }
        },
        async created () {
            if (this.pageType === 'EditRole') {
                try {
                    let {
                        config
                    } = this
                    let res = await this.$store.dispatch('admin/requestOneRole', this.$route.params.roleId)
                    let {
                        data
                    } = res

                    config.id = data.id
                    config.roleId = data.role_id
                    config.roleName = data.role_name
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('获取角色接口错误')
                }
            }
        },
        methods: {
            async submit () {
                let {
                    pageType
                } = this

                let isCreate = pageType === 'CreateRole'
                try {
                    let {
                        config: {
                            id,
                            roleId,
                            roleName
                        },
                        config
                    } = this
                    let res

                    if (isCreate) { // 新增
                        res = await this.$store.dispatch('admin/requestCreateRole', {
                            role_id: roleId,
                            role_name: roleName
                        })

                        this.$router.push({
                            name: 'Roles'
                        })
                    } else { // 编辑
                        res = await this.$store.dispatch('admin/requestEditRole', {
                            id,
                            role_id: roleId,
                            role_name: roleName
                        })
                    }
                    
                    this.$message.success(`${isCreate ? '新增' : '编辑'}角色成功`)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${isCreate ? '新增' : '编辑'}角色接口错误`)
                }
            }
        },
        components: {
            innerHeader,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-input': Input,
            'el-button': Button
        }
    }
</script>
