<template>
  <div>
    <h2>Manage workouts</h2>
    <div class="form-group">
      <input class="form-control" type="search" placeholder="Search for workouts">
    </div>
    <div class="card-columns">
      <div class="card" v-for="(workout, index) in workoutsToDisplay" :key="index">
        <img class="card-img-top img-fluid" :src="workout.pictures && workout.pictures.length && workout.pictures[0]"
        :alt="workout.name">
        <div class="card-block">
          <p class="card-text">{{ workout.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchTerm: ''
    }
  },
  computed: {
    ...mapState(['workouts']),
    workoutsToDisplay () {
      return this.workouts.filter(workout => {
        let name = workout.name.toLowerCase()
        let description = workout.description.toLowerCase()
        let username = workout.username.toLowerCase()
        let term = this.searchTerm.toLowerCase()
        return name.indexOf(term) >= 0 || description.indexOf(term) >= 0 || username.indexOf(term) >= 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
p.card-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
