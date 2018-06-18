<template>
  <div class="container">
    <pomodoro-timer></pomodoro-timer>
    <settings></settings>
  </div>
</template>

<script>
import { PomodoroTimer, Settings } from './sections'
export default {
  components: {
    PomodoroTimer,
    Settings
  }
}
</script>
<style lang="scss" scoped>

</style>
