<template>
    <section class="none">
        <div class="none-wrapper">
            <img class="none-image" :src="typeMap[type]" :alt="type">
            <p class="none-tips">{{ typeMap[`${type}Tips`] }}</p>
        </div>
    </section>
</template>

<script>
    import notFound from 'src/images/404.png'

    export default {
        props: {
            type: {
                type: String,
                default: 'notFound'
            }
        },
        data () {
            return {
                typeMap: {
                    notFound,
                    notFoundTips: '页面找不到了'
                }
            }
        },
        mounted () {

        }
    }
</script>

<style lang="scss">
    @import './../styles/conf';

    .none {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        &-image {
            display: block;
            width: 308px;
            margin-bottom: 20px;
        }
        &-tips {
            color: $grayDarker;
            text-align: center;
        }
    }
</style>

