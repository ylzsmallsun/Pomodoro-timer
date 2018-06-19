import { firebaseAction } from 'vuexfire'

export default {
  bindConfig: firebaseAction(({bindFirebaseRef, state}) => {
    if (state.user && !state.isAnonymous) {
      let db = state.firebaseApp.database()
      bindFirebaseRef('config',
        db.ref(`/configuration/${state.user.uid}`))
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
  bindFirebaseReference: firebaseAction(({bindFirebaseRef, state}, {reference, toBind}) => {
    return reference.once('value').then(snapshot => {
      if (!snapshot.val()) {
        reference.set(state[toBind])
      }
      bindFirebaseRef(toBind, reference)
    })
  }),
  bindFirebaseReferences: firebaseAction(({bindFirebaseRef, state, commit, dispatch}, user) => {
    let db = state.firebaseApp.database()
    let configRef = db.ref(`/configuration/${user.uid}`)
    let statisticsRef = db.ref(`/statistics/${user.uid}`)
    dispatch('bindFirebaseReference', {reference: configRef, toBind: 'config'}).then(() => {
      commit('setConfigRef', configRef)
    })
    dispatch('bindFirebaseReference', {reference: statisticsRef, toBind: 'statistics'}).then(() => {
      commit('setStatisticsRef', statisticsRef)
    })
  }),
  unbindFirebaseReferences: firebaseAction(({unbindFirebaseRef, commit}) => {
    commit('setConfigRef', null)
    commit('setStatisticsRef', null)
    try {
      unbindFirebaseRef('config')
      unbindFirebaseRef('statistics')
    } catch (error) {
      console.log(error)
    }
  }),
  bindAuth ({commit, dispatch, state}) {
    state.firebaseApp.auth().onAuthStateChanged((user) => {
      commit('setUser', user)
      if (user && !user.isAnonymous) {
        dispatch('bindFirebaseReferences', user)
      }
      if (!user) {
        dispatch('unbindFirebaseReferences')
      }
    })
  }
}
