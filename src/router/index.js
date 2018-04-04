import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Ranking from 'components/ranking/ranking'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/Recommend',
      component: Recommend
    },
    {
      path: '/Singer',
      component: Singer
    },
    {
      path: '/Ranking',
      component: Ranking
    },
    {
      path: '/Search',
      component: Search
    }
  ],
  linkActiveClass: 'active'
})
