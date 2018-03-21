<template>
    <div class="users-list">
        <innerHeader class="mb20"
            title="所有用户"
            :has-go-back="false">
        </innerHeader>
        <section class="poppy-admin-content users-content"
            v-if="showContent">
            <p class="create-user mb20">
                <el-button
                    type="primary"
                    @click="$router.push({
                        name: 'CreateUser'
                    })">
                    新增用户
                </el-button>
            </p>
            <el-table class="mb30"
                v-if="renderList.length"
                :data="renderList"
                @cell-click="cellClickHandler">
                <el-table-column
                    prop="avatar"
                    label="头像">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="Email">
                </el-table-column>
                <el-table-column
                    prop="personal_link"
                    label="个人链接">
                </el-table-column>
                <el-table-column
                    prop="role"
                    label="角色">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="最近更新时间">
                </el-table-column>
            </el-table>
            <empty v-else></empty>
        </section>
    </div>
</template>

<script>
    import {
        formatTime
    } from 'src/utils/utils'
    import innerHeader from 'src/components/inner-header'
    import empty from 'src/components/empty'
    import {
        Button,
        Table,
        TableColumn
    } from 'element-ui'

    export default {
        data () {
            return {
                renderList: [],
                showContent: false
            }
        },
        async created () {
            try {
                let res = await this.$store.dispatch('admin/requestUserList')

                this.renderList.splice(0, this.renderList.length, ...res.data.map(item => {
                    item.create_time = formatTime(item.create_time)
                    item.update_time = formatTime(item.update_time)

                    return item
                }))
                this.showContent = true
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('请求用户列表接口错误')
            }
        },
        methods: {
            cellClickHandler (row) {
                this.$router.push({
                    name: 'EditUser',
                    params: {
                        userId: row.id
                    }
                })
            }
        },
        components: {
            empty,
            innerHeader,
            'el-button': Button,
            'el-table': Table,
            'el-table-column': TableColumn
        }
    }
</script>

