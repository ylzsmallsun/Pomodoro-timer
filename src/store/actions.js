import { firebaseAction } from 'vuexfire'

export default {
  bindConfig: firebaseAction(({bindFirebaseRef, state}) => {
    debugger
    if (state.user && !state.isAnonymous) {
      bindFirebaseRef('config', state.configRef)
    }
  }),
  bindStatistics: firebaseAction(({bindFirebaseRef, state}) => {
    if (state.user && !state.isAnonymous) {
      bindFirebaseRef('statistics', state.statisticsRef)
    }
  }),
  setWorkingPomodoro ({commit, state}, workingPomodoro) {
    if (!workingPomodoro) {
      return
    }
    if (state.configRef) {
      workingPomodoro = parseInt(workingPomodoro, 10)
      state.configRef.update({workingPomodoro})
    } else {
      commit('setWorkingPomodoro', parseInt(workingPomodoro, 10))
    }
  },
  setShortBreak ({commit, state}, shortBreak) {
    if (!shortBreak) {
      return
    }
    if (state.configRef) {
      shortBreak = parseInt(shortBreak, 10)
      state.configRef.update({shortBreak})
    } else {
      commit('setShortBreak', parseInt(shortBreak, 10))
    }
  },
  setLongBreak ({commit, state}, longBreak) {
    if (!longBreak) {
      return
    }
    if (state.configRef) {
      longBreak = parseInt(longBreak, 10)
      state.configRef.update({longBreak})
    } else {
      commit('setLongBreak', parseInt(longBreak, 10))
    }
  },
  updateTotalPomodoros ({state}, totalPomodoros) {
    state.statisticsRef.update({totalPomodoros: totalPomodoros})
  },
  createUser ({state}, {email, password}) {
    state.firebaseApp.auth().createUserWithEmailAndPassword(
      email, password).catch(error => {
      console.log(error.code, error.message)
    })
  },
  authenticate ({state}, {email, password}) {
    state.firebaseApp.auth().signInWithEmailAndPassword(
      email, password)
  },
  authenticateAnonymous ({state}) {
    state.firebaseApp.auth().signInAnonymously().catch(
      error => {
        console.log(error.code, error.message)
      })
  },
  logout ({state}) {
    state.firebaseApp.auth().signOut()
  },
  bindAuth ({commit, state}) {
    state.firebaseApp.auth().onAuthStateChanged((user) => {
      commit('setUser', user)
    })
  }
}
