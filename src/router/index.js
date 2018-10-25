import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Recommend = () => import('components/recommend/recommend')
const Singer = () => import('components/singer/singer')
const Ranking = () => import('components/ranking/ranking')
const Search = () => import('components/search/search')
const SingerDetail = () => import('components/singer-detail/singer-detail')
const Disc = () => import('components/disc/disc')
const TopList = () => import('components/top-list/top-list')
const User = () => import('components/user-center/user-center')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/Recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/Singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/Ranking',
      component: Ranking,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/Search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/User',
      component: User
    }
  ],
  linkActiveClass: 'active'
})
