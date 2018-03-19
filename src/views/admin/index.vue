<template>
    <div class="poppy-admin"
        v-if="$route.name !== 'Auth'">
        <side-menu></side-menu>
        <div class="poppy-admin-container">
            <header class="poppy-admin-header">
                <ul class="tools">
                    <!-- <li class="tools-item">
                        <i class="tools-item-icon icon-indent-decrease"></i>
                    </li> -->
                    <li class="tools-item"
                        @click="logout">
                        <i class="tools-item-icon icon-switch"></i>
                    </li>
                </ul>
            </header>
            <router-view></router-view>
        </div>
    </div>
    <router-view v-else></router-view>
</template>

<script>
    import Vue from 'vue'
    import sideMenu from 'src/components/side-menu'
    import {
        MessageBox
    } from 'element-ui'

    Vue.prototype.$confirm = MessageBox.confirm

    export default {
        methods: {
            logout () {
                localStorage.removeItem(`${NODE_ENV === 'production' ? 'www' : NODE_ENV}.sephenry.cn`)
                this.$router.push({
                    name: 'Auth'
                })
            }
        },
        components: {
            'side-menu': sideMenu
        }
    }
</script>

<style lang="scss">
    .poppy-admin {
        display: flex;
        height: 100%;
        .poppy-admin-container {
            float: right;
            width: calc(100% - 240px);
            height: 100%;
            margin-left: 240px;
            padding: 30px 25px 0;
            .poppy-admin-header {
                padding-bottom: 30px;
            }
            .tools {
                &-item {
                    padding: 10px 0;
                    &-icon {
                        vertical-align: middle;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>

