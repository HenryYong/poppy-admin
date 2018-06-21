<template>
    <div class="poppy-admin"
        v-if="$route.name !== 'Auth'">
        <side-menu></side-menu>
        <div class="poppy-admin-container">
            <!-- <header class="poppy-admin-header">
                <ul class="tools"> -->
                    <!-- <li class="tools-item">
                        <i class="tools-item-icon icon-indent-decrease"></i>
                    </li> -->
                    <!-- <li class="tools-item"
                        @click="logout">
                        <i class="tools-item-icon icon-switch"></i>
                    </li> -->
                <!-- </ul>
            </header> -->
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
        components: {
            'side-menu': sideMenu
        }
    }
</script>

<style lang="scss">
    .poppy-admin {
        display: flex;
        min-height: 100%;
        background: linear-gradient(to top right, #C8D0FC, #FCC3DF);
        .poppy-admin-container {
            flex: 1;
            padding: 30px 25px 0;
            background-color: #fff;
            // .poppy-admin-header {
            //     padding-bottom: 30px;
            // }
            // .tools {
            //     &-item {
            //         padding: 10px 0;
            //         &-icon {
            //             vertical-align: middle;
            //             cursor: pointer;
            //         }
            //     }
            // }
        }
    }
</style>

