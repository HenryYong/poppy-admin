<template>
    <div class="poppy-client">
        <div class="poppy-client-main">
            <header>
                <div class="header-wrapper">
                    <div class="header-logo">
                        <img :src="src" alt="logo">
                    </div>
                    <nav class="header-nav">
                        <ul class="header-nav-list">
                            <li class="header-nav-item"
                                v-for="item of navList"
                                :key="item.id"
                                :class="{
                                    'active': $route.name === item.id || $route.meta.name === item.id
                                }"
                                @click="$router.push({
                                    name: item.id
                                })">
                                {{ item.text }}
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div class="router-view-wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import logo from 'src/images/logo.png'

    export default {
        data () {
            return {
                src: null
            }
        },
        computed: {
            ...mapGetters({
                'navList': 'client/getNavList'
            })
        },
        created () {
            this.src = logo
        }
    }
</script>

<style lang="scss">
    @import './../../styles/conf';

    .poppy-client {
        min-height: 100%;
        padding: 50px 0;
        background-color: $themeColor;
        &-main {
            width: 90%;
            max-width: 1400px;
            margin: 0 auto;
            border-radius: 10px;
            background-color: $white;
            box-shadow: 2px 2px 5px rgba(165, 229, 255, .8), -2px -2px 5px rgba(165, 229, 255, .8);
            header {
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid $borderColor;
            }
            .header-wrapper {
                display: flex;
                max-width: 1200px;
                height: 100%;
                margin: 0 auto;
            }
            .header-logo{
                width: 140px;
                text-align: center;
            }
            .header-nav {
                flex: 1;
            }
            .header-nav-list {
                display: flex;
            }
            .header-nav-item {
                flex: 1;
                text-align: center;
                cursor: pointer;
                color: $fontLight;
                transition: color linear .2s;
                &:hover,
                &.active {
                    color: $fontDark;
                }
            }
        }
        .router-view-wrapper {
            padding: 40px 0;
        }
    }
</style>

