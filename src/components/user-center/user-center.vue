<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchTab" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="playAll">
        <i class="icon-play"></i>
        <span class="text">播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="playHistory" class="list-scroll" v-if="currentIndex === 0" :data="playHistory">
          <div class="list-inner">
            <songList @select="selectSong" :songs="playHistory"></songList>
          </div>
        </scroll>
        <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex === 1" :data="favoriteList">
          <div class="list-inner">
            <songList @select="selectSong" :songs="favoriteList"></songList>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Song from 'common/js/song'
import {playlistMixin} from 'common/js/mixin'

export default {
  mixins: [
    playlistMixin
  ],
  data () {
    return {
      switches: [
        {name: '最近播放'},
        {name: '我的收藏'}
      ],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'favoriteList'
    ])
  },
  methods: {
    handlePlaylist (playList) {
      let bottom = playList.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.playHistory && this.$refs.playHistory.refresh()
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
    },
    back () {
      this.$router.back()
    },
    switchTab (index) {
      this.currentIndex = index
    },
    playAll () {
      let list = this.currentIndex === 0 ? this.playHistory : this.favoriteList
      list = list.map((item) => {
        return new Song(item)
      })
      this.selectPlay({
        list,
        index: 0
      })
    },
    selectSong (song) {
      this.insertSong(new Song(song))
    },
    ...mapActions([
      'selectPlay',
      'insertSong'
    ])
  },
  components: {
    Switches,
    Scroll,
    SongList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 6px
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: #666
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: #666
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
