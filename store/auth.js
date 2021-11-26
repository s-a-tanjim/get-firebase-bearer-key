import firebase from 'firebase/app'

export const state = () => ({
  user: null,
})
/*
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, {
    authUser,
    claims
  }) => {
    //console.log("Mutation -auth");
    //console.log(authUser);
    if (!authUser) return;
    const {
      uid,
      email,
      emailVerified
    } = authUser
    state.user = {
      uid,
      email,
      emailVerified
    }
  }
} */

export const actions = {
  async registerUser({
    commit
  }, authData) {
    let user = null

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(authData.email, authData.password)
      user = firebase.auth().currentUser
      await user.updateProfile({
        displayName: authData.name
      })

    } catch (err) {
      if (user) user.delete()
      console.log(err);
      throw err
    }
  },
  async loginUser({
    commit
  }, authData) {
    try {
      const authUser = await firebase
        .auth()
        .signInWithEmailAndPassword(authData.email, authData.password)

    } catch (err) {
      console.log(err);
      throw err
    }
  },
  onAuthStateChangedAction(ctx, {
    authUser,
    claims
  }) {
    console.log('Action | onAuthStateChangedAction | called!')
    console.log(authUser)

    if (!authUser) {
      // claims = null
      // Perform logout operations
      ctx.commit('resetUserInfo', null, {
        root: true,
      })
    } else {
      console.log("JWTToken");
      console.log(authUser.za);
      console.log("Refresh Token");
      console.log(authUser.refreshToken);
      // # Store JWT token and set axios Authorization header
      ctx.commit(
        'setJWTInfo', {
          JWTToken: authUser.za,
          refreshToken: authUser.refreshToken,
        }, {
          root: true,
        }
      )

      // Store user info from firebase
      ctx.commit('setFirebaseInfo', authUser, {
        root: true,
      })
    }
  },
  async verifyUserEmail() {
    const user = firebase.auth().currentUser
    try {
      return await user.sendEmailVerification()
    } catch (err) {
      throw err
    }
  },
  async getJWT({
    commit,
    dispatch
  }) {
    try {
      const idToken = await firebase
        .auth()
        .currentUser.getIdToken( /* forceRefresh */ true)
      console.log("JWT Token");
      console.log(idToken);
      commit(
        'setJWTInfo', {
          JWTToken: idToken,
        }, {
          root: true,
        }
      )
      /* await dispatch('getUserData', null, {
        root: true
      }); */
    } catch (error) {
      console.log('getJWT error')
      console.log(error)
      throw error
    }
  },
  logoutUser({
    commit
  }) {
    firebase.auth().signOut()
    sessionStorage.clear()
    commit('resetUserInfo', null, {
      root: true,
    })
    this.$router.app.refresh()
  },
}
