export default {
  userAuth: (state, payload) => {
    state.status = { loggedIn: true }
    state.user = payload
  }
}
