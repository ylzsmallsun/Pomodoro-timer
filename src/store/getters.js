// import state from './state'

export default {
  getConfig: (state) => state.config,
  getSettings: (state) => state.settings,
  getStatistics: (state) => state.statistics,
  getUSer: state => state.user,
  getDisplayName: state => state.displayName
}
