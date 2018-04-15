<template>
    <div class="articles-list">
         <inner-header class="mb20"
            title="所有文章"
            :has-go-back="false">
        </inner-header>
        <section class="poppy-admin-content articles-content"
            v-if="showContent">
            <p class="create-article mb20">
                <el-button
                    type="primary"
                    @click="$router.push({
                        name: 'CreateArticle'
                    })">
                    新增文章
                </el-button>
            </p>
            <el-table class="mb30"
                v-if="renderList.length"
                :data="renderList"
                @cell-click="cellClickHandler">
                <el-table-column
                    prop="title"
                    label="文章">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="update_time"
                    label="最近修改时间">
                </el-table-column>
                <el-table-column
                    width="70"
                    prop="is_publish"
                    label="状态">
                    <template slot-scope="scope">
                        <span class="status"
                            :class="scope.row.is_publish ? 'published' : 'draft'">
                            {{ scope.row.is_publish ? '已发布' : '草稿' }}
                        </span>
                    </template>
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
                let res = await this.$store.dispatch('articles/requestArticlesList')

                this.renderList.splice(0, this.renderList.length, ...res.data.map(item => {
                    item.create_time = formatTime(item.create_time)
                    item.update_time = formatTime(item.update_time)

                    return item
                }))
                this.showContent = true
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('请求文章列表接口错误')
            }
        },
        methods: {
            /**
             * 跳转详情页
             */
            cellClickHandler (row) {
                this.$router.push({
                    name: 'EditArticle',
                    params: {
                        articleId: row.article_id
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

<style lang="scss">
    @import './../../styles/conf';

    .articles-list {
        .status {
            &.published {
                color: $success;
            }
            &.draft {
                color: $danger;
            }
        }
    }
</style>

