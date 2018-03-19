<template>
    <!-- <exception type="building"></exception> -->
    <div class="articles-list"
        v-loading="loading">
        <section class="article-item"
            v-for="item of list"
            v-if="list.length"
            :key="item.article_id"
            @click="directToDetail(item.article_id)">
            <div class="title">
                <div class="title-text text-overflow">{{ item.title }}</div>
            </div>
            <div class="subtitle">
                <div class="subtitle-text text-overflow" v-html="item.description"></div>
                <!-- <a href="javascript:;" class="text-link">阅读全文</a> -->
            </div>
            <p class="info">
                <span class="time">{{ localFormatTime(item.create_time) }}</span>
            </p>
        </section>
        <empty v-if="!list.length"></empty>
    </div>
</template>

<script>
    import exception from 'src/components/exception'
    import empty from 'src/components/empty'
    import { mapGetters } from 'vuex'
    import {
        formatTime
    } from 'src/utils/utils'

    export default {
        data () {
            return {
                isLoading: false,
                list: [],
                loading: false
            }
        },
        computed: {
            ...mapGetters({
                'articlesList': 'client/getArticlesList'
            })
        },
        methods: {
            localFormatTime (time) {
                return formatTime(time)
            },
            /**
             * 跳转详情
             */
            directToDetail (articleId) {
                this.$router.push({
                    name: 'ClientArticleDetail',
                    params: {
                        articleId
                    }
                })
            }
        },
        async mounted () {
            if (!this.articlesList.length) {
                try {
                    this.loading = true
                    let response = await this.$store.dispatch('client/requestArticlesList')

                    // this.list.splice(0, this.list.length, ...response.data)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('获取标签接口错误')
                } finally {
                    setTimeout(() => {
                        this.loading = false
                    }, 200)
                }
            } else {
                this.list.splice(0, this.list.length, ...this.articlesList)
            }
        },
        components: {
            exception,
            empty
        }
    }
</script>

<style lang="scss">
    @import './../../../styles/conf';

    .articles-list {
        position: relative;
        padding: 0 60px;
    }
    .article-item {
        display: flex;
        flex-direction: column;
        height: 160px;
        margin-bottom: 30px;
        padding: 20px;
        border: 1px solid $borderColor;
        transition: all linear .2s;
        cursor: pointer;
        &:last-child {
            margin: 0;
        }
        &:hover {
            box-shadow: 2px 2px 3px rgba(0, 0, 0, .075);
        }
        .title {
            display: flex;
            align-items: center;
            flex: 2;
            font-size: 30px;
            &-text {
                &:hover {
                    transition: color linear .2s;
                    color: $themeColor;
                }
            }
        }
        .subtitle {
            display: flex;
            align-items: center;
            flex: 1;
            font-size: 14px;
            color: $fontLight;
        }
        .text-link {
            color: $themeColor;
            &:hover {
                color: $themeDark;
            }
        }
        .info {
            display: flex;
            align-items: center;
            flex: 1;
            font-size: 14px;
            color: $fontLight;
        }
    }
</style>

