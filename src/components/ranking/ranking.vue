<template>
  <div class="ranking">
    <div class="top-list" v-for="item in topList" :key="item.id">
      <img :src="item.picUrl" alt="">
    </div>
  </div>
</template>

<script>
import {getRanking} from 'api/ranking'
import {ERR_OK} from 'api/config'

export default {
  data () {
    return {
      topList: []
    }
  },
  created () {
    this._getRanking()
  },
  methods: {
    _getRanking () {
      getRanking().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.topList)
          this.topList = res.data.topList
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
