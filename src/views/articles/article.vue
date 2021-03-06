<template>
    <div class="article-scope">
        <inner-header
            :title="`${pageType === 'CreateArticle' ? '新增' : '编辑'}文章`">
        </inner-header>
        <section class="form-wrapper mb20"
            v-loading="loading">
            <el-form
                ref="articleForm"
                :model="ruleArticle"
                :rules="rules"
                label-width='100px'>
                <!-- 文章标题 start -->
                <el-form-item label="文章标题" prop="title">
                    <el-input
                        v-model="ruleArticle.title"
                        placeholder="请输入文章标题">
                        <template
                            slot="prepend"
                            v-if="pageType === 'EditArticle'">
                            <span
                                v-if="cacheArticle"
                                :class="cacheArticle && (cacheArticle.is_publish ? 'publish-mark' : 'draft-mark')">
                                {{ cacheArticle.is_publish ? '已发布' : '草稿' }}
                            </span>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 文章标题 end -->

                <!-- 文章内容 start -->
                <el-form-item label="文章内容" prop="content">
                    <div id="editor">
                        <mavon-editor
                            ref="editor"
                            :style="{
                                height: editorConfig.height
                            }"
                            v-model="ruleArticle.content"
                            @imgAdd="imgAdd"
                            @imgDel="imgDel"
                            @change="syncContent"
                            @save="saveContentLocal">
                        </mavon-editor>
                        <p class="tips">Ctrl + S 可以本地缓存文章内容</p>
                    </div>
                </el-form-item>
                <!-- 文章内容 end -->

                <!-- 文章分类 start -->
                <el-form-item label="文章分类" prop="category">
                    <el-select
                        v-model="ruleArticle.category"
                        clearable
                        placeholder="请选择文章分类">
                        <el-option
                            v-for="cate of categoryList"
                            :key="cate.name"
                            :label="cate.name"
                            :value="cate.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 文章分类 end -->

                <!-- 文章标签 start -->
                <el-form-item class="article-tags-row" label="文章标签" prop="tags">
                    <el-select
                        v-model="ruleArticle.tags"
                        clearable
                        multiple
                        placeholder="请选择文章标签">
                        <el-option
                            v-for="tag of tagsList"
                            :key="tag.name"
                            :label="tag.name"
                            :value="tag.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 文章标签 end -->

                <!-- 文章SEO标签 start -->
                <el-form-item label="SEO标签">
                    <el-tag
                        :key="tag"
                        v-for="tag in seoTagList"
                        closable
                        :disable-transitions="false"
                        @close="removeTagHandler(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input
                        class="input-seo-tag"
                        v-show="inputSEOVisible"
                        v-model="seoTagValue"
                        ref="seoTagInput"
                        size="small"
                        @keyup.enter.native="addTagHandler"
                        @blur="addTagHandler">
                    </el-input>
                    <el-button class="button-new-tag"
                        v-show="!inputSEOVisible"
                        size="small"
                        @click="showSEOInput">
                        增加SEO标签
                    </el-button>
                </el-form-item>
                <!-- 文章SEO标签 end -->

                <el-form-item>
                    <el-button
                        type="success"
                        @click="submit('articleForm', true)">
                        发布文章
                    </el-button>
                    <el-button
                        type="primary"
                        @click="submit('articleForm', false)">
                        保存草稿
                    </el-button>
                    <el-button
                        @click="$router.push({
                            name: 'Articles'
                        })">
                        取消
                    </el-button>
                    <el-button class="fr"
                        v-if="pageType === 'EditArticle'"
                        type="danger"
                        @click="deleteArticle">
                        删除文章
                    </el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import innerHeader from 'src/components/inner-header'
    import {
        Form,
        FormItem,
        Input,
        Button,
        Radio,
        Select,
        Option,
        Checkbox,
        CheckboxGroup,
        Tag
    } from 'element-ui'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        data () {
            return {
                pageType: this.$route.name,
                cacheArticle: null,
                editorConfig: {
                    height: '100%'
                },
                categoryList: [],
                tagsList: [],
                seoTagList: [],
                inputSEOVisible: false,
                seoTagValue: '',
                loading: true,
                renderContent: '',
                ruleArticle: {
                    title: '',
                    content: '',
                    category: '',
                    tags: []
                },
                rules: {
                    title: [
                        {
                            required: true,
                            message: '请输入文章名称',
                            trigger: 'blur'
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: '请输入文章内容'
                        }
                    ],
                    category: [
                        {
                            required: true,
                            message: '请选择文章分类',
                            trigger: 'change'
                        }
                    ],
                    tags: [
                        {
                            required: true,
                            message: '请选择文章标签',
                            trigger: 'change'
                        }
                    ]
                }
            }
        },
        methods: {
            /**
             * 添加图片
             */
            async imgAdd (pos, $file) {
                try {
                    let res = await this.$store.dispatch('requestUploadImg', $file)

                    this.$refs.editor.$img2Url(pos, res.data)
                } catch (err) {
                    this.$message.error(`${err.data ? err.data.message : err}`)
                    console.warn('上传图片错误')
                }
            },
            imgDel () {

            },
            /**
             * 增加seo标签
             */
            addTagHandler () {
                let {
                    seoTagValue
                } = this

                if (seoTagValue) {
                    this.seoTagList.push(seoTagValue)
                }
                this.inputSEOVisible = false
                this.seoTagValue = ''
            },
            /**
             * 删除seo标签
             */
            removeTagHandler (tag) {
                this.seoTagList.splice(this.seoTagList.indexOf(tag), 1)
            },
            /**
             * 切换SEO标签输入框
             */
            showSEOInput () {
                this.inputSEOVisible = true
                this.$nextTick(() => {
                    this.$refs.seoTagInput.$refs.input.focus()
                })
            },
            /**
             * 缓存渲染后的HTML
             */
            syncContent (val, render) {
                this.renderContent = render.replace(/\n/g, '')
            },
            saveContentLocal (val) {
                localStorage.setItem(`${DOMAIN}-article`, val)
                this.$message.success({
                    message: '本地缓存成功',
                    duration: 1500
                })
            },
            /**
             * 整理需要的参数
             */
            getParams () {
                let {
                    ruleArticle,
                    ruleArticle: {
                        title,
                        content,
                        category,
                        tags
                    },
                    renderContent,
                    seoTagList
                } = this
                // 提取文章描述
                let description = renderContent.match(/^\<blockquote\>[\s\S]*\<\/blockquote\>/)
                let params = {}
                
                if (title) params.title = ruleArticle.title
                if (content) params.content = content
                if (category) params.category = ruleArticle.category
                if (tags.length) params.tags = tags.join(',')
                if (seoTagList.length) params.seo_tags = seoTagList.join(',')
                if (description) params.description = description[0]

                return params
            },
            /**
             * 提交文章
             */
            submit (formName, isPublish) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let params = this.getParams()

                        params.is_publish = isPublish ? 1 : 0

                        try {
                            this.loading = true
                            
                            let res

                            // 新增文章
                            if (this.pageType === 'CreateArticle') {
                                res = await this.$store.dispatch('articles/requestCreateArticle', params)

                                setTimeout(() => {
                                    this.$router.push({
                                        name: 'Articles'
                                    })
                                }, 200)
                            } else { // 编辑文章
                                params.article_id = this.cacheArticle.article_id
                                res = await this.$store.dispatch('articles/requestUpdateArticle', params)
                            }

                            this.$message.success(res.message)
                            setTimeout(() => {
                                localStorage.removeItem(`${DOMAIN}-article`)
                                this.$router.push({
                                    name: 'Articles'
                                })
                            }, 500)
                        } catch (err) {
                            console.error(err)
                            this.$message.error(`${err.data ? err.data.message : err}`)
                        } finally {
                            setTimeout(() => {
                                this.loading = false
                            }, 200)
                        }
                    } else {
                        this.$message.error('请填写相关必填项')
                        return false
                    }
                })
            },
            /**
             * 删除文章
             */
            deleteArticle () {
                this.$confirm('确定删除文章？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(async () => {
                    let msg = ''
                    let type = ''

                    try {
                        this.loading = true

                        let delRes = await this.$store.dispatch('articles/requestDeleteArticle', this.cacheArticle.article_id)

                        msg = delRes.message
                        type = 'success'

                        setTimeout(() => {
                            localStorage.removeItem(`${DOMAIN}-article`)
                            this.$router.replace({
                                name: 'Articles'
                            })
                        }, 500)
                    } catch (err) {
                        console.error(err)
                        msg = err.data.message
                        type = 'error'
                    } finally {
                        this.$message[type](msg)
                        setTimeout(() => {
                            this.loading = false
                        }, 200)
                    }
                })
            }
        },
        async created () {
            let {
                $store,
                pageType
            } = this

            try {
                this.loading = true

                let resCategory = await $store.dispatch('categories/requestCategoriesForList')
                this.categoryList.splice(0, this.categoryList.length, ...resCategory.data)

                let resTag = await $store.dispatch('tags/requestTagList')
                this.tagsList.splice(0, this.tagsList.length, ...resTag.data)

                let {
                    ruleArticle
                } = this
                let localContent = localStorage.getItem(`${DOMAIN}-article`)

                // 编辑文章
                if (this.pageType === 'EditArticle') {
                    try {
                        let articleRes = await $store.dispatch('articles/requestOneArticle', this.$route.params.articleId)
                        let response = articleRes.data

                        ruleArticle.title = response.title
                        ruleArticle.content = localContent || response.content // 编辑时先取本地缓存的文章内容，若没有，再使用请求回来的内容
                        ruleArticle.category = response.category
                        ruleArticle.tags.splice(0, ruleArticle.tags.length, ...response.tags.split(','))
                        response.seo_tags.length && this.seoTagList.splice(0, this.seoTagList.length, ...response.seo_tags.split(','))

                        this.cacheArticle = JSON.parse(JSON.stringify(response))
                    } catch (err) {
                        this.$message.error(`${err.data ? err.data.message : err}`)
                        console.warn('文章内容请求错误')
                    }
                } else { // 新增文章时显示本地缓存的内容
                    ruleArticle.content = localStorage.getItem(`${DOMAIN}-article`) || ''
                }
            } catch (err) {
                this.$message.error(`${err.data ? err.data.message : err}`)
                console.warn('分类列表请求错误')
            } finally {
                setTimeout(() => {
                    this.loading = false
                }, 200)
            }

            this.editorConfig.height = document.body.offsetHeight * 0.5

            window.onresize = () => {
                this.editorConfig.height = document.body.offsetHeight * 0.5
            }
        },
        components: {
            innerHeader,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-input': Input,
            'el-button': Button,
            'el-radio': Radio,
            'el-select': Select,
            'el-option': Option,
            'el-checkbox': Checkbox,
            'el-checkbox-group': CheckboxGroup,
            'el-tag': Tag,
            mavonEditor
        }
    }
</script>

<style lang="scss">
    @import './../../styles/conf';

    .article-scope {
        .article-tags-row {
            font-size: 0;
            .el-checkbox-group {
                display: inline-block;
            }
        }
        .el-tag {
            margin-right: 10px;
        }
        .button-new-tag {
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-seo-tag {
            width: 100px;
            vertical-align: middle;
        }
        .publish-mark {
            color: $success;
        }
        .draft-mark {
            color: $danger;
        }
    }
</style>
