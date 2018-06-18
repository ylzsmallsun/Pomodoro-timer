<template>
  <div>
      <div class="container">
        <div>{{titleText}}</div>
        <form>
            <div class="form-group">
                <input class="form-control" placeholder="email"
                v-model="email" type="text" >
            </div>
            <div class="form-group">
                <input class="form-control" placeholder="password"
                v-model="password" type="password" >
            </div>
            <button class="btn btn-secondary btn-block"
            @click="onAction">{{this.actionButtonText}}</button>
        </form>
        <hr/>
        <button class="btn btn-secondary btn-block"
        @click="onSwitch">{{this.switchButtonText}}</button>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

let TITLE_TEXT = {
  LOGIN: 'Already a member? Log in here!',
  SIGNUP: 'Don\'t have an account? Sign up here!'
}
let ACTION_BUTTON_TEXT = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGN UP'
}
export default {
  data () {
    return {
      isShownLogin: true,
      email: '',
      password: ''
    }
  },
  computed: {
    titleText () {
      return this.isShownLogin ? TITLE_TEXT.LOGIN : TITLE_TEXT.SIGNUP
    },
    actionButtonText () {
      return this.isShownLogin ? ACTION_BUTTON_TEXT.LOGIN : ACTION_BUTTON_TEXT.SIGNUP
    },
    switchButtonText () {
      return this.isShownLogin ? TITLE_TEXT.SIGNUP : TITLE_TEXT.LOGIN
    }
  },
  methods: {
    ...mapActions(['createUser', 'authenticate']),
    onSwitch () {
      this.isShownLogin = !this.isShownLogin
    },
    onAction (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      let method = this.isShownLogin ? this.authenticate : this.createUser
      method({email: this.email, password: this.password})
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  cursor: pointer
}
</style>
