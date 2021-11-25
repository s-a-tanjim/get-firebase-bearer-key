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
        displayName: authData.first_name,
        photoURL: 'https://hootstory.s3.us-east-2.amazonaws.com/profile_images/default_dp.jpg',
      })

      await this.$axios.post('/signup', {
        first_name: authData.first_name,
        last_name: authData.last_name,
        email: authData.email,
        firebase_uid: user.uid,
        gender: authData.gender,
        date_of_birth: authData.dob
      })

      //this.$router.push('/verify')
    } catch (err) {
      if (user) user.delete()
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

      // If user signed in but not email verified and not in verify page
      if (!authUser.emailVerified && window.location.pathname !== '/verify') {
        /* this.$router.replace({
          path: '/verify'
        }); */
        // if($nuxt.$route.path)
        // location.replace('/verify');
        // this.$router.push('/verify');
      }
      // If user signend in and email verified but in verify poae
      if (authUser.emailVerified && window.location.pathname === '/verify') {
        location.replace('/')
      }
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
