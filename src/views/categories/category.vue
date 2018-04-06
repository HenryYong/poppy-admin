<template>
    <div class="category-scope"
        v-loading="loading">
        <inner-header class="mb20"
            :title="`${pageType === 'CreateCategory' ? '新增' : '编辑'}分类`">
        </inner-header>
        <section class="form-wrapper">
            <el-form
                ref="categoryForm"
                label-width='70px'
                :model="config">
                <el-form-item label="分类名">
                    <el-input
                        v-model="config.name"
                        placeholder="请输入分类名">
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-radio v-model="config.enable" :label="true">是</el-radio>
                    <el-radio v-model="config.enable" :label="false">否</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submit">
                        保存
                    </el-button>
                    <el-button
                        @click="$router.push({
                            name: 'Categories'
                        })">
                        取消
                    </el-button>
                    <el-button class="fr"
                        v-if="pageType === 'EditCategory'"
                        type="danger"
                        @click="delCategory">
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
        Radio
    } from 'element-ui'

    export default {
        data () {
            return {
                pageType: this.$route.name,
                config: {
                    id: 0,
                    name: '',
                    enable: false
                },
                loading: false
            }
        },
        async created () {
            if (this.pageType === 'EditCategory') {
                try {
                    let {
                        config
                    } = this

                    this.loading = true

                    let res = await this.$store.dispatch('categories/requestCategoryList', this.$route.params.categoryId)
                    let data = res.data

                    config.id = data.id
                    config.name = data.name
                    config.enable = data.enable
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('获取分类接口错误')
                } finally {
                    setTimeout(() => {
                        this.loading = false
                    }, 200)
                }
            }
        },
        methods: {
            async submit () {
                let {
                    pageType
                } = this
                let isCreate = pageType === 'CreateCategory'

                try {
                    let {
                        config: {
                            id,
                            name,
                            enable
                        },
                        config
                    } = this
                    let res

                    this.loading = true

                    if (isCreate) { // 新增
                        res = await this.$store.dispatch('categories/requestCreateCategory', {
                            name,
                            enable
                        })

                        setTimeout(() => {
                            this.$router.push({
                                name: 'Categories'
                            })
                        }, 1200)
                    } else { // 编辑
                        res = await this.$store.dispatch('categories/requestEditCategory', {
                            id,
                            name,
                            enable
                        })
                    }
                    
                    this.$message.success(`${isCreate ? '新增' : '编辑'}分类成功`)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${isCreate ? '新增' : '编辑'}分类接口错误`)
                } finally {
                    setTimeout(() => {
                        this.loading = false
                    }, 1000)
                }
            },
            delCategory () {
                let {
                    config: {
                        id
                    },
                    $store
                } = this
                let articleCount
                let tagsCount
                let res

                this.$confirm('确定删除分类？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(async () => {
                    this.loading = true

                    try {
                        res = await $store.dispatch('articles/requestArticleByCondition', { id })
                        let count = Object.keys(res.data).length

                        articleCount = count
                    } catch (err) {
                        this.$message.error(`${err.data ? err.data.message : err}`)
                        console.warn('请求分类下文章数接口错误')
                        this.loading = false
                    }

                    try {
                        res = await $store.dispatch('tags/requestTagByCategory', { id })
                        let count = res.data.length
                        
                        tagsCount = count
                    } catch (err) {
                        this.$message.error(`${err.data ? err.data.message : err}`)
                        console.warn('请求分类下标签数接口错误')
                        this.loading = false
                    }

                    if (articleCount || tagsCount) {
                        this.$message.error('请先删除当前分类下所有文章或标签')
                    } else {
                        try {
                            let res = await $store.dispatch('categories/requestDeleteCategory', id)

                            this.$message.success(`${res.message}, 正在跳转...`)
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'Categories'
                                })
                            }, 1000)
                        } catch (err) {
                            this.$message.error(`${err.data ? err.data.message : err}`)
                            console.warn('删除分类接口错误')
                        }
                    }

                    setTimeout(() => {
                        this.loading = false
                    }, 1000)
                })
            }
        },
        components: {
            innerHeader,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-input': Input,
            'el-button': Button,
            'el-radio': Radio
        }
    }
</script>
