import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// import { PomodoroTimer, Settings, Statistics, Workouts } from '@/components/main/sections'

// lazy loading resources
const PomodoroTimer = () => import('@/components/main/sections/PomodoroTimer')
const Settings = () => import('@/components/main/sections/Settings')
const Statistics = () => import('@/components/main/sections/Statistics')
const Workouts = () => import('@/components/main/sections/Workouts')

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
