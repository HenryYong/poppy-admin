<template>
    <div class="categories-list">
        <innerHeader class="mb20"
            title="所有分类"
            :has-go-back="false">
        </innerHeader>
        <section class="poppy-admin-content categories-content"
            v-if="showContent">
            <p class="create-category mb20">
                <el-button
                    type="primary"
                    @click="$router.push({
                        name: 'CreateCategory'
                    })">
                    新增分类
                </el-button>
            </p>
            <el-table class="mb30"
                v-if="renderList.length"
                :data="renderList"
                @cell-click="cellClickHandler">
                <el-table-column
                    prop="name"
                    label="分类名">
                </el-table-column>
                <el-table-column
                    prop="creator"
                    label="创建人">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="最近更新时间">
                </el-table-column>
                <el-table-column
                    width="80"
                    prop="enable"
                    label="是否启用">
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
                let res = await this.$store.dispatch('admin/requestCategoryList')

                this.renderList.splice(0, this.renderList.length, ...res.data.map(item => {
                    item.create_time = formatTime(item.create_time)
                    item.update_time = formatTime(item.update_time)
                    item.enable = item.enable ? '是' : '否'

                    return item
                }))
                this.showContent = true
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('请求分类列表接口错误')
            }
        },
        methods: {
            cellClickHandler (row) {
                this.$router.push({
                    name: 'EditCategory',
                    params: {
                        categoryId: row.id
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
