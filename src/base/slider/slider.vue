<template>
  <div class="slider" ref="slider">
    <swiper :options="swiperOption"  ref="mySwiper">
      <swiper-slide v-for="item in slider" :key="item.picUrl">
        <a :href="item.linkUrl">
          <!-- class="needsclick" 解决fastclick与默认点击事件冲突 -->
          <img class="needsclick" :src="item.picUrl" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    slider: {
      type: Array
    }
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  // 定义这个sweiper对象
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods: {},
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style>
  .swiper-container {
    width: 100%;
    height: auto;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-slide img {
    width: 100%;
  }
</style>
