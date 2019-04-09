export default {
  userAuthAction: ({ commit }, payload) => {
    if (payload) {
      commit('userAuth', { isLoggedIn: true })
    } else {
      commit('userAuth', { isLoggedIn: false })
    }
  }
}
