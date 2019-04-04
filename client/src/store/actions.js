export default {
  userAuthAction: ({ commit }, payload) => {
    // login requested

    // API call goes here

    // Returns either success or failure

    commit('userAuth', payload)
  }
}
