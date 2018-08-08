<template>
  <transition name="slide">
    <music-list :songs="songs" :rank='showRank' :title="title" :bg-img="bgImg"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getTopList} from 'api/ranking'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  data () {
    return {
      songs: [],
      showRank: true
    }
  },
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImg () {
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  },
  created () {
    this._getTopList()
  },
  methods: {
    _getTopList () {
      if (!this.topList.id) {
        this.$router.push('/ranking')
        return
      }

      getTopList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        // let {data} = item.data
        let musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all .3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
