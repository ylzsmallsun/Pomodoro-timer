<template>
  <div class="container">
    <pomodoro-timer></pomodoro-timer>
    <settings v-if='user && !user.isAnonymous'></settings>
    <statistics v-if='user && !user.isAnonymous'></statistics>
  </div>
</template>

<script>
import { PomodoroTimer, Settings, Statistics } from './sections'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: {
    PomodoroTimer,
    Settings,
    Statistics
  }
}
</script>
<style lang="scss" scoped>

</style>
