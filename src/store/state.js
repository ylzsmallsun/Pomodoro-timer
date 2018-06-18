const config = {
  workingPomodoro: 1,
  shortBreak: 2,
  longBreak: 3,
  pomodorosTillLongBreak: 3
}
const settings = {
  userName: 'Smallsun',
  email: 'yanglingz610@gmail.com',
  profile_picture: require('../assets/Avatar.png'),
  uid: '',
  isLoggedIn: true
}

const statistics = {
  totalPomodoros: 0
}

const user = {}
export default {
  config,
  settings,
  statistics,
  user,
  isAnonymous: false
}
