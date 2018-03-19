<template>
    <div class="inner-header">
        <div class="inner-header-icon"
            v-if="hasGoBack"
            @click.stop.prevent="$router.go(-1)">
            <i class="icon-arrow-left"></i>
        </div>
        <div class="inner-header-title">
            {{ title }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            hasGoBack: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss">
    .inner-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        &-icon {
            width: 20px;
            margin-right: 15px;
            cursor: pointer;
        }
        &-title {
            width: calc(100% - 20px);
            font-size: 20px;
        }
    }
</style>

