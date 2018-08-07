<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="songList" ref="scroll">
      <div>
        <div class="slider-wrapper">
          <slider :slider="slider"></slider>
        </div>
        <div class="title">热门歌单</div>
        <div class="songList-wrapper">
          <div class="songList-item" v-for="item in songList" :key="item.dissid" @click="selectItem(item)">
            <div class="img-wrapper">
              <img v-lazy="item.imgurl" alt="">
            </div>
            <span class="name">{{ item.dissname }}</span>
          </div>
        </div>
      </div>

      <div class="loading-container" v-show="!songList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [
    playlistMixin
  ],
  data () {
    return {
      slider: [],
      songList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    handlePlaylist (playList) {
      let bottom = playList.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.songList = res.data.list
          // console.log(this.songList)
        }
      })
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
    .title
      padding: 10px 10px 0
      color: #333
      line-height: 2.0
    .radioList-wrapper
      display: flex
      justify-content: space-between
      padding: 10px
      box-sizing: border-box
      .radioList-item
        width: 170px
        background-color: #fff
        .img-wrapper
          width: 170px
          height: 170px
          img
            width: 100%
            height: 100%
        .name
          display: block
          padding: 5px
          height: 50px
          box-sizing: border-box
          font-size: 14px
          line-height: 1.5
          color: #333
    .songList-wrapper
      display: flex
      flex-wrap: wrap;
      justify-content: space-between
      padding: 10px
      box-sizing: border-box
      .songList-item
        margin-bottom: 10px
        width: 110px
        background-color: #fff
        .img-wrapper
          width: 110px
          height: 110px
          img
            width: 100%
            height: 100%
        .name
          display: block
          padding: 5px
          height: 50px
          box-sizing: border-box
          font-size: 12px
          line-height: 1.5
          color: #333
      .songList-item:nth-of-type(2n)
        margin-left: 0
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
