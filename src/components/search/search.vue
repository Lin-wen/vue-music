<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @search="keyChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!keyword">
      <scroll :data="shortcut" ref="shortcut" class="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="item in hotKey" :key="item.n" @click="addKey(item.k)" class="item">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>

          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @select="addKey" @delItem="deleteSearchHistory" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="keyword">
      <suggest ref="suggest" @listScroll="blurInput" @select="saveSearch" :keyword="keyword"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史" confirmBtnText="清空" @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Scroll from 'base/scroll/scroll'
import {getHotKey} from 'api/search'
import Suggest from 'components/suggest/suggest'
import {ERR_OK} from 'api/config'
import {mapGetters, mapActions} from 'vuex'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import {playlistMixin} from 'common/js/mixin'

export default {
  mixins: [
    playlistMixin
  ],
  data () {
    return {
      hotKey: [],
      keyword: ''
    }
  },
  created () {
    this._getHotKey()
  },
  computed: {
    shortcut () {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    handlePlaylist (playList) {
      let bottom = playList.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.suggest.refresh()
    },
    _getHotKey () {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    addKey (keyword) {
      this.$refs.searchBox.setKeyword(keyword)
    },
    keyChange (keyword) {
      this.keyword = keyword
    },
    blurInput () {
      this.$refs.searchBox.blur()
    },
    saveSearch () {
      this.saveSearchHistory(this.keyword)
    },
    showConfirm () {
      this.$refs.confirm.show()
      // this.clearSearchHistory()
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  watch: {
    keyword (newKeyword) {
      if (!newKeyword) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Scroll,
    Suggest,
    SearchList,
    Confirm
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 10px
    .shortcut-wrapper
      position: fixed
      top: 148px
      bottom: 0
      width: 100%
      background: #fff
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 10px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: #333
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 20px
            font-size: $font-size-medium
            color: #999
            border: 1px solid #999
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: #666
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: #666
    .search-result
      position: fixed
      width: 100%
      top: 148px
      bottom: 0
      background: #fff
</style>
