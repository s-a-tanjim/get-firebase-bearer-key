export const state = () => ({
  serverData: null,
  // This will be used only for server side
  JWTToken: null,
  refreshToken: null,
  loginCheck: false,
  verifiedUserEmail: false,
  role: null,
  adminBaseUrl: '/admin',
  userInfo: {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    occupation: '',
    ucode: '',
    firebase_uid: '',
    phone_no: '',
    about_user: '',
    followers: 0,
    social_media_links: {
      facebook_link: '',
      twitter_link: '',
      linkedin_link: '',
    },
  },
  errorLog: null,
  showErrorMsg: false,
  allCategories: [], // Popular category
})

export const mutations = {
  setFirebaseInfo: (state, data) => {
    state.userInfo.first_name = data.displayName
    state.userInfo.proPicURL = data.photoURL
    state.userInfo.email = data.email
    state.userInfo.firebase_uid = data.uid
    state.verifiedUserEmail = data.emailVerified
    state.loginCheck = true
  },
  setJWTInfo(state, data) {
    state.JWTToken = data.JWTToken
    state.refreshToken = data.refreshToken
    this.$axios.defaults.headers.common.Authorization =
      'Bearer ' + data.JWTToken
  },
  resetUserInfo: (state) => {
    state.JWTToken = null
    state.loginCheck = false
    state.verifiedUserEmail = false
    state.role = null
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
    // dispatch("getCategoryData");
    // console.log("Store: initialCall: ", getters.getUserInfo.userInfo.userName);
    // if (getters.getLoginCheckData && getters.getUserInfo.userInfo.userName == "") {
    // console.log("Store: LoginCheck True");
    // dispatch("getUserData");
    // }
    // console.log("Store: LoginCheck False");
  },
  async getUserData({ commit }) {
    console.log('getUserData called')
    try {
    } catch (err) {
      console.log(err)
    }
  },
}
