<template>
  <div>
    <button @click="authenticateAnonymous">
      START WITHOUT REGISTRATION
    </button>
    <div>
      <small>This version will not allow you to personalise your profile or add new workouts</small>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions(['authenticateAnonymous'])
  }
}
</script>
<style lang="scss" scoped>

</style>
