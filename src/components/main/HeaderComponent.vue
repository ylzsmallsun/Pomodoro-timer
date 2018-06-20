<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-expand-md navbar-light">
      <button class="navbar-toggler navbar-toggler-right" type="button"
      data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-brand">
        <logo></logo>
        <span>{{welcomeInfo}}</span>
      </div>
      <div class="collapse navbar-collapse" id="navbarHeader">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="statisticsPath" :class="{disabled:isAnonymous}">Statistics </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="workoutsPath" :class="{disabled:isAnonymous}">Workouts </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="settingsPath" :class="{disabled:isAnonymous}">Settings </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button v-if="!isAnonymous" class="btn btn-secondary" @click="onLogout">Logout</button>
          <button v-if="isAnonymous" class="btn btn-secondary" @click="onLogout">Go to the login page</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from '../common/Logo'
import {mapGetters, mapState, mapActions} from 'vuex'
import router from '@/router'
export default {
  computed: {
    ...mapGetters({
      name: 'getDisplayName'
    }),
    ...mapState(['user']),
    welcomeInfo () {
      if (this.user.isAnonymous) {
        return 'Welcome visitor'
      } else {
        return `Welcome ${this.user.displayName}`
      }
    },
    isAnonymous () {
      return this.user && this.user.isAnonymous
    },
    settingsPath () {
      return this.isAnonymous ? '/' : 'settings'
    },
    statisticsPath () {
      return this.isAnonymous ? '/' : 'statistics'
    },
    workoutsPath () {
      return this.isAnonymous ? '/' : 'workouts'
    }
  },
  router,
  components: {
    Logo
  },
  methods: {
    ...mapActions(['logout']),
    onLogout () {
      this.logout()
      router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}
ul {
  align-items: start
}
</style>
