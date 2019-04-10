export default {
  userAuth: (state, payload) => {
    if (payload) {
      state.status.isLoggedIn = payload
    } else {
      state.status = {
        isLoggedIn: false,
        isAdmin: false
      }
    }
  },

  userProps: (state, payload) => {
    state.status.isAdmin = payload
  }
}
