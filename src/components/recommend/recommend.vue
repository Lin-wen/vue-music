<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="songList">
      <div>
        <div class="slider-wrapper">
          <slider :slider="slider"></slider>
        </div>
        <div class="title">电台</div>
        <div class="radioList-wrapper">
          <div class="radioList-item" v-for="item in radioList" :key="item.Ftitle">
            <div class="img-wrapper">
              <img v-lazy="item.picUrl" alt="">
            </div>
            <span class="name">{{ item.Ftitle }}</span>
          </div>
        </div>
        <div class="title">热门歌单</div>
        <div class="songList-wrapper">
          <div class="songList-item" v-for="item in songList" :key="item.id">
            <div class="img-wrapper">
              <img v-lazy="item.picUrl" alt="">
            </div>
            <span class="name">{{ item.songListDesc }}</span>
          </div>
        </div>
      </div>

      <div class="loading-container" v-show="!songList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
// import {getRecommend, getDiscList} from 'api/recommend'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data () {
    return {
      slider: [],
      radioList: [],
      songList: []
    }
  },
  created () {
    this._getRecommend()
    // this._getDiscList()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.slider = res.data.slider
          this.radioList = res.data.radioList
          this.songList = res.data.songList
        }
      })
    }
    // _getDiscList () {
    //   getDiscList().then((res) => {
    //     if (res.code === ERR_OK) {
    //       console.log(res.data)
    //     }
    //   })
    // }
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
      .songList-item:nth-of-type(2n)
        margin-left: 0
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
