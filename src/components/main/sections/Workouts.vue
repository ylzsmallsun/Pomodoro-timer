<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <workouts-component></workouts-component>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <new-workout-component></new-workout-component>
      </div>
    </div>

  </div>
</template>

<script>
import WorkoutsComponent from './workouts/WorkoutsComponent'
import NewWorkoutComponent from './workouts/NewWorkoutComponent'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['workouts'])
  },
  components: {
    WorkoutsComponent,
    NewWorkoutComponent
  }
}
</script>
<style lang="scss" scoped>

</style>
