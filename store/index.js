export const state = () => ({
  // This will be used only for server side
  JWTToken: null,
  refreshToken: null,
  loginCheck: false,
  userInfo: {
    name:'',
    email: '',
    firebase_uid: '',
  },
  errorLog: null,
  showErrorMsg: false,
})

export const mutations = {
  setFirebaseInfo: (state, data) => {
    state.userInfo.name = data.displayName
    state.userInfo.email = data.email
    state.userInfo.firebase_uid = data.uid
    state.loginCheck = true
  },
  setJWTInfo(state, data) {
    state.JWTToken = data.JWTToken
    state.refreshToken = data.refreshToken
    //this.$axios.defaults.headers.common.Authorization =
    //  'Bearer ' + data.JWTToken
  },
  resetUserInfo: (state) => {
    state.JWTToken = null
    state.refreshToken = null
    state.loginCheck = false
  },
  handleError: (state, log) => {
    state.errorLog = log
    state.showErrorMsg = true
  },
  handleFirebaseError: (state, log) => {
    state.errorLog = log
    state.showErrorMsg = true
  },
}

export const actions = {
  initialCall({ commit, dispatch, getters }) {
  }
}
