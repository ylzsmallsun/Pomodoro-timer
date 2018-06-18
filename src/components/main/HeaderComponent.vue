<template>
  <div>
    <span>Header</span>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="scss" scoped>

</style>
