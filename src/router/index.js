import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import MainContent from '@/components/MainContent'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainContent
    }
  ]
})
