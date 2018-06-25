import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { firebaseMutations } from 'vuexfire'
// import firebase from 'firebase'

Vue.use(Vuex)
// Initialize Firebase
// let config = {
//   apiKey: 'AIzaSyDwbfvXE2BoRB0TFeyAwSe-3wCn1bUimdk',
//   authDomain: 'pomodoro-timer-5f0f1.firebaseapp.com',
//   databaseURL: 'https://pomodoro-timer-5f0f1.firebaseio.com',
//   storageBucket: 'gs://pomodoro-timer-5f0f1.appspot.com'
// }
// let firebaseApp = firebase.initializeApp(config)
// let configRef = firebaseApp.database().ref('/configuration/test')
// let statisticsRef = firebaseApp.database().ref('/statistics/test')

export default new Vuex.Store({
  state: {
    ...state
    // firebaseApp
    // configRef,
    // statisticsRef
  },
  getters,
  mutations: {
    ...mutations,
    ...firebaseMutations
  },
  actions
})
