<template>
  <div class="empty-wrapper">
      <img :src="src" alt="">
  </div>
</template>

<script>
    import noData from 'src/images/no_data.png'
    import noResult from 'src/images/no_result.png'

    export default {
        props: {
            $type: {
                type: String,
                default: 'no_data'
            }
        },
        data () {
            return {

            }
        },
        computed: {
            src () {
                return this.$type === 'no_data' ? noData : noResult
            }
        }
    }
</script>

<style lang="scss">
    .empty-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>


