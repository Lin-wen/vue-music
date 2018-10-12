<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="kw" class="box" v-model="keyword" :placeholder="placeholder"/>
    <i v-show="keyword" @click="clear" class="icon-dismiss"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/util'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    clear () {
      this.keyword = ''
    },
    setKeyword (keyword) {
      this.keyword = keyword
    },
    blur () {
      this.$refs.kw.blur()
    }
  },
  created () {
    this.$watch('keyword', debounce((newKey) => {
      this.$emit('search', newKey)
    }, 200))
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    // background: $color-highlight-background
    background: #fff
    border: 1px solid #eee
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: #999
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      // background: $color-highlight-background
      background: #fff
      color: #333
      font-size: $font-size-medium
      outline: none
      &::placeholder
        color: #999
    .icon-dismiss
      font-size: 16px
      color: #999
</style>
