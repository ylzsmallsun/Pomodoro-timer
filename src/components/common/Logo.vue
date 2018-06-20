<template>
  <router-link to="/">
    <img class="logo" :src="src" alt="ProFitOro">
  </router-link>
</template>

<script>
import router from '@/router'
export default {
  data () {
    return {
      src: require('@/assets/logo.svg')
    }
  },
  router
}
</script>

<style scoped>
.logo {
  max-width: 50px;
}
</style>
