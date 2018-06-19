<template>
  <div class="row justify-content-center">
    <div class="col-sm-12 col-md-6 col-lg-4">
      <account-settings></account-settings>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-8">
      <pomodoro-timer-settings></pomodoro-timer-settings>
    </div>
  </div>
</template>

<script>
import AccountSettings from './settings/AccountSettings'
import PomodoroTimerSettings from './settings/PomodoroTimerSettings'

export default {
  components: {
    AccountSettings,
    PomodoroTimerSettings
  }
}
</script>
<style lang="scss" scoped>
.figure-caption {
  text-align: center;
}
</style>
