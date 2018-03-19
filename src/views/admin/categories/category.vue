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
                    enable: ''
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

                    let res = await this.$store.dispatch('admin/requestCategoryList', this.$route.params.categoryId)
                    let data = res.data[0]

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

                    if (isCreate) { // 新增
                        res = await this.$store.dispatch('admin/requestCreateCategory', {
                            name,
                            enable
                        })

                        this.$router.push({
                            name: 'Categories'
                        })
                    } else { // 编辑
                        res = await this.$store.dispatch('admin/requestEditCategory', {
                            id,
                            name,
                            enable
                        })
                    }
                    
                    this.$message.success(`${isCreate ? '新增' : '编辑'}分类成功`)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${isCreate ? '新增' : '编辑'}分类接口错误`)
                }
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
