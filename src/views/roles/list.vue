<template>
    <div class="roles-list">
        <inner-header class="mb20"
            title="所有角色"
            :has-go-back="false">
        </inner-header>
        <section class="poppy-admin-content roles-content"
            v-if="showContent">
            <p class="create-role mb20">
                <el-button
                    type="primary"
                    @click="$router.push({
                        name: 'CreateRole'
                    })">
                    新增角色
                </el-button>
            </p>
            <el-table class="mb30"
                v-if="renderList.length"
                :data="renderList"
                @cell-click="cellClickHandler">
                <el-table-column
                    prop="role_id"
                    label="角色ID">
                </el-table-column>
                <el-table-column
                    prop="role_name"
                    label="角色名">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="最近修改时间">
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
                let res = await this.$store.dispatch('roles/requestRoleList')

                this.renderList.splice(0, this.renderList.length, ...res.data.map(item => {
                    item.create_time = formatTime(item.create_time)
                    item.update_time = formatTime(item.update_time)

                    return item
                }))
                this.showContent = true
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('请求角色列表接口错误')
            }
        },
        methods: {
            cellClickHandler (row) {
                this.$router.push({
                    name: 'EditRole',
                    params: {
                        roleId: row.id
                    }
                })
            }
        },
        components: {
            'el-button': Button,
            'el-table': Table,
            'el-table-column': TableColumn,
            empty,
            innerHeader
        }
    }
</script>

