<template>
    <div class="main-content">
        <router-view></router-view>
    </div>
</template>

<script>
    // import public components
    import Vue from 'vue'
    import {
        Message,
        Loading
    } from 'element-ui'

    Vue.use(Loading.directive)
    Vue.prototype.$message = Message

    export default {
        
    }
</script>


<style lang="scss">
    @import './styles/reset';
    @import './styles/app';

    .main-content {
        height: 100%;
    }
</style>
