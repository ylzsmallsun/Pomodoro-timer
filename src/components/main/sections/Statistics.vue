<template>
  <div class="container">
    <h1>Statistics</h1>
    <p>Total Pomodoros:{{statistics.totalPomodoros}}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      statistics: 'getStatistics'
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
