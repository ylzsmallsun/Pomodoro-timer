import Vue from 'vue'
import Router from 'vue-router'
// import LandingPage from '@/components/LandingPage'
// import MainContent from '@/components/MainContent'
import { PomodoroTimer, Settings, Statistics, Workouts } from '@/components/main/sections'
import store from '@/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PomodoroTimer
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: Statistics,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/workouts',
      name: 'Workouts',
      component: Workouts,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user || store.state.user.isAnonymous) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
