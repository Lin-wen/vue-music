<template>
  <div id="app">
    <m-header></m-header>
    <div class="tab">
      <router-link to="/Recommend" tag="div" class="tab-item">推荐<span></span></router-link>
      <router-link to="/Singer" tag="div" class="tab-item">歌手<span></span></router-link>
      <router-link to="/Ranking" tag="div" class="tab-item">排行<span></span></router-link>
      <router-link to="/Search" tag="div" class="tab-item">搜索<span></span></router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Player from 'components/player/player'

export default {
  components: {
    MHeader,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
body
  background-color: #ccc
#app
  color: $color-theme
  .tab
    display: flex
    background-color: #f86166
    .tab-item
      position: relative
      flex: 1
      color: #333
      height: 44px
      line-height: 44px
      color: #fff
      text-align: center
      span
        display: block
        position: absolute
        bottom: 5px
        left: 50%
        transform: translateX(-50%)
        width: 20px
        height: 4px
        border-radius: 10px
      &.active
        span
          color: #fff
          background: rgba(255, 255, 255, .9)
</style>
