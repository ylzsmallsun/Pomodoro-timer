import firebaseApp from './../firebase/index'
import { firebaseAction } from 'vuexfire'
import uuidv1 from 'uuid/v1'
console.log(firebaseApp)
/**
 * Uploads individual file
 * @param file
 * @returns {firebase.Promise}
 * @private
 */
function _uploadImage (file) {
  let ref = firebaseApp.storage().ref().child('workouts')
  return ref.child(uuidv1()).child(file.name).put(file).then(snapshot => {
    return snapshot.ref.getDownloadURL().then(function (downloadURL) {
      console.log('File available at', downloadURL)
      return downloadURL
    })
  })
}
export default {
  bindConfig: firebaseAction(({bindFirebaseRef, state}) => {
    if (state.user && !state.isAnonymous) {
      let db = firebaseApp.database()
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
  updateUserName ({state, commit}, displayName) {
    state.user.updateProfile({
      displayName
    })
    commit('setDisplayName', displayName)
  },
  updatePhotoURL ({state, commit}, photoURL) {
    state.user.updateProfile({
      photoURL
    })
  },
  updateUserEmail ({state}, email) {
    state.user.updateEmail(email).then(() => {

    }, error => {
      console.log(error)
    })
  },
  updateTotalPomodoros ({state}, totalPomodoros) {
    state.statisticsRef.update({totalPomodoros: totalPomodoros})
  },
  createUser ({state}, {email, password}) {
    firebaseApp.auth().createUserWithEmailAndPassword(
      email, password).catch(error => {
      console.log(error.code, error.message)
    })
  },
  createNewWorkout ({commit, state}, workout) {
    if (!workout) {
      return
    }
    workout.username = state.user.displayName
    workout.uid = state.user.uid
    workout.date = Date.now()
    workout.rate = 0
    // Get a key for a new Workout.
    let newWorkoutKey = state.workoutsRef.push().key
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {}
    updates['/workouts/' + newWorkoutKey] = workout
    updates['/user-workouts/' + state.user.uid + '/' + newWorkoutKey] = workout
    return firebaseApp.database().ref().update(updates)
  },
  uploadImages ({state}, files) {
    return Promise.all(files.map(_uploadImage))
  },
  authenticate ({state}, {email, password}) {
    firebaseApp.auth().signInWithEmailAndPassword(
      email, password)
  },
  authenticateAnonymous ({state}) {
    firebaseApp.auth().signInAnonymously().catch(
      error => {
        console.log(error.code, error.message)
      })
  },
  logout ({state}) {
    firebaseApp.auth().signOut()
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
    let db = firebaseApp.database()
    let configRef = db.ref(`/configuration/${user.uid}`)
    let statisticsRef = db.ref(`/statistics/${user.uid}`)
    let workoutsRef = db.ref('workouts')
    dispatch('bindFirebaseReference', {reference: configRef, toBind: 'config'}).then(() => {
      commit('setConfigRef', configRef)
    })
    dispatch('bindFirebaseReference', {reference: statisticsRef, toBind: 'statistics'}).then(() => {
      commit('setStatisticsRef', statisticsRef)
    })
    dispatch('bindFirebaseReference', {reference: workoutsRef, toBind: 'workouts'}).then(() => {
      commit('setWorkoutsRef', workoutsRef)
    })
  }),
  unbindFirebaseReferences: firebaseAction(({unbindFirebaseRef, commit}) => {
    commit('setConfigRef', null)
    commit('setStatisticsRef', null)
    commit('setWorkoutsRef', null)
    try {
      unbindFirebaseRef('config')
      unbindFirebaseRef('statistics')
      unbindFirebaseRef('workouts')
    } catch (error) {
      console.log(error)
    }
  }),
  bindAuth ({commit, dispatch, state}) {
    firebaseApp.auth().onAuthStateChanged((user) => {
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
