<template>
  <aside class="side-menu">
      <div class="logo">
          poppy
      </div>
      <div class="side-menu-list">
          <ul>
              <li class="side-menu-list-item"
                v-for="item of sideMenuList"
                :key="item.id"
                :class="{
                    active: item.id === $route.name || (item.children && item.children.some(child => child === $route.name))
                }"
                @click.stop="itemClickHandler(item.id)">
                  <i class="item-icon"
                    :class="`icon-${item.icon}`"></i>
                  <span class="item-text">
                      {{ item.text }}
                  </span>
              </li>
              <li class="side-menu-list-item"
                  @click="logout">
                  <i class="item-icon icon-switch"></i>
                  <span class="item-text">Logout</span>
              </li>
          </ul>
      </div>
  </aside>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                'sideMenuList': 'getSideMenuList'
            })
        },
        methods: {
            itemClickHandler (id) {
                this.$router.push({
                    name: id
                })
            },
            logout () {
                localStorage.removeItem(`${NODE_ENV === 'production' ? 'www' : NODE_ENV}.sephenry.cn`)
                this.$router.replace({
                    name: 'Auth'
                })
            }
        }
    }
</script>

<style lang="scss">
    @import './../../styles/conf';

    .side-menu {
        width: 240px;
        background-color: rgba(255, 255, 255, .5);
        .logo {
            padding: 40px 40px 11px;
            color: $primary;
            font: {
                size: 18px;
                weight: bold;
            }
        }
        &-list {
            margin-top: 10px;
            &-item {
                display: flex;
                align-items: center;
                padding: 10px 0 10px 40px;
                cursor: pointer;
                color: $grayDarker;
                &:hover {
                    [class^="item"] {
                        transition: color .3s linear;
                        color: $blackLight;
                    }
                }
                &.active {
                    [class^="item"] {
                        color: $primary;
                    }
                }
                .item-text {
                    font-size: 14px;
                }
                .item-icon {
                    margin-right: 15px;
                    line-height: 18px;
                    font-size: 14px;
                }
            }
        }
    }
</style>
