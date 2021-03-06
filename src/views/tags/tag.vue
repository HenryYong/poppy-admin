<template>
    <div class="tag-scope">
        <inner-header class="mb20"
            :title="`${pageType === 'CreateTag' ? '新增' : '编辑'}标签`">
        </inner-header>
        <section class="form-wrapper"
        v-loading="loading">
            <el-form
                ref="tagForm"
                label-width='70px'
                :model="config">
                <el-form-item label="标签名">
                    <el-input
                        v-model="config.name"
                        placeholder="请输入标签名">
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
                            name: 'Tags'
                        })">
                        取消
                    </el-button>
                    <el-button class="fr"
                        v-if="pageType === 'EditTag'"
                        type="danger"
                        @click="delTag">
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
        Option,
        Radio
    } from 'element-ui'

    export default {
        data () {
            return {
                pageType: this.$route.name,
                config: {
                    id: 0,
                    name: '',
                    enable: true
                },
                loading: false
            }
        },
        async created () {
            let {
                config,
                $store,
                pageType
            } = this

            if (pageType === 'EditTag') {
                try {
                    this.loading = true

                    let res = await $store.dispatch('tags/requestOneTag', this.$route.params.tagId)
                    let data = res.data

                    config.id = data.id
                    config.name = data.name
                    config.enable = data.enable
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('获取标签接口错误')
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

                let isCreate = pageType === 'CreateTag'
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
                        res = await this.$store.dispatch('tags/requestCreateTag', {
                            name,
                            enable
                        })
                    } else { // 编辑
                        res = await this.$store.dispatch('tags/requestEditTag', {
                            id,
                            name,
                            enable
                        })
                    }
                    
                    this.$message.success(`${isCreate ? '新增' : '编辑'}标签成功`)
                    setTimeout(() => {
                        this.$router.push({
                            name: 'Tags'
                        })
                    }, 500)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${isCreate ? '新增' : '编辑'}标签接口错误`)
                } finally {
                    setTimeout(() => {
                        this.loading = false
                    }, 200)
                }
            },
            async delTag () {
                let {
                    config: {
                        id
                    },
                    $store
                } = this
                let articleCount

                this.$confirm('确定删除标签？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(async () => {
                    try {
                        let {
                            config: {
                                id
                            }
                        } = this

                        this.loading = true

                        let res = await this.$store.dispatch('tags/requestDeleteTag', {
                            id
                        })

                        this.$message.success('删除成功，正在跳转...')
                        setTimeout(() => {
                            this.$router.replace({
                                name: 'Tags'
                            })
                        }, 500)
                    } catch (err) {
                        this.$message.error(`${err.data ? err.data.message : err}`)
                        console.warn(`删除标签接口错误`)
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
            'el-option': Option,
            'el-radio': Radio
        }
    }
</script>
