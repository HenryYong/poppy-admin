<template>
    <div class="tag-scope"
        v-loading="loading">
        <inner-header class="mb20"
            :title="`${pageType === 'CreateTag' ? '新增' : '编辑'}标签`">
        </inner-header>
        <section class="form-wrapper">
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
                <el-form-item label="所属分类">
                    <el-select
                        v-model="config.category"
                        placeholder="请选择所属分类">
                        <el-option
                            v-for="cate of categoryList"
                            :key="cate.name"
                            :label="cate.name"
                            :value="cate.name">
                        </el-option>
                    </el-select>
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
                    category: '',
                    enable: ''
                },
                categoryList: [],
                loading: false
            }
        },
        async created () {
            let {
                config,
                $store,
                pageType
            } = this

            try {
                this.loading = true

                let res = await $store.dispatch('admin/requestCategoriesForList')

                this.categoryList.splice(0, this.categoryList.length, ...res.data)
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('获取分类接口错误')
            }

            if (pageType === 'EditTag') {
                try {
                    let res = await $store.dispatch('admin/requestOneTag', this.$route.params.tagId)
                    let data = res.data[0]

                    config.id = data.id
                    config.name = data.name
                    config.category = data.category
                    config.enable = data.enable
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('获取标签接口错误')
                }
            }

            setTimeout(() => {
                this.loading = false
            }, 200)
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
                            category,
                            enable
                        },
                        config
                    } = this
                    let res

                    this.loading = true

                    if (isCreate) { // 新增
                        res = await this.$store.dispatch('admin/requestCreateTag', {
                            name,
                            category,
                            enable
                        })

                        this.$router.push({
                            name: 'Tags'
                        })
                    } else { // 编辑
                        res = await this.$store.dispatch('admin/requestEditTag', {
                            id,
                            name,
                            category,
                            enable
                        })
                    }
                    
                    this.$message.success(`${isCreate ? '新增' : '编辑'}标签成功`)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn(`${isCreate ? '新增' : '编辑'}标签接口错误`)
                } finally {
                    setTimeout(() => {
                        this.loading = false
                    }, 200)
                }
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
