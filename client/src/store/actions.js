export default {
  userAuthAction: ({ commit }, payload) => {
    if (payload) {
      console.log(payload)
      commit('userAuth', true)
    } else {
      commit('userAuth', false)
    }
  },

  userPropsAction: ({ commit }, payload) => {
    // payload sends token
    // api call to server for user details
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({ 'session': payload })
    }
    // send relevant user details to store
    fetch('http://localhost:1337/auth/userProperties', requestOptions)
      .then(res => {
        return res.json()
      })
      .then(json => {
        if (json.error) {
          console.log(json.error)
        } else {
          console.log('gotcha')
          commit('userProps', json.isAdmin)
        }
      })
      .catch(error => console.error(error))
  }
}
