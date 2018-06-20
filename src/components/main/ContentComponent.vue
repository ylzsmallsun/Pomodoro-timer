<template>
  <div class="container">
    <!-- <pomodoro-timer></pomodoro-timer>
    <settings v-if='user && !user.isAnonymous'></settings>
    <statistics v-if='user && !user.isAnonymous'></statistics> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import { PomodoroTimer, Settings, Statistics } from './sections'
// import { mapState } from 'vuex'
import router from '@/router'
export default {
  // computed: {
  //   ...mapState(['user'])
  // },
  // components: {
  //   PomodoroTimer,
  //   Settings,
  //   Statistics
  // }
  router
}
</script>
<style lang="scss" scoped>

</style>
