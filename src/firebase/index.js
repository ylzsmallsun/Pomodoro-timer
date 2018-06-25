// Initialize Firebase
import firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyDwbfvXE2BoRB0TFeyAwSe-3wCn1bUimdk',
  authDomain: 'pomodoro-timer-5f0f1.firebaseapp.com',
  databaseURL: 'https://pomodoro-timer-5f0f1.firebaseio.com',
  storageBucket: 'gs://pomodoro-timer-5f0f1.appspot.com'
}

let firebaseApp
if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(config)
} else {
  firebaseApp = firebase.apps[0]
}
export default firebaseApp
