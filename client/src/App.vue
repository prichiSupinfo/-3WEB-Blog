<template>
  <div id="app">
    <div id="nav" v-if="!status.isLoggedIn">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <div id="nav" v-else>
      <router-link to="/">Articles</router-link> |
      <router-link to="/new-blog">New Articles</router-link> |
      <router-link to="/liked-articles">Liked Articles</router-link> <p v-if="status.isAdmin" style="display:inline"> | </p>
      <router-link to="/blog-create" v-if="status.isAdmin">Add Article</router-link> |
      <router-link to="/login"  @click.native="logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed : {
    ...mapState([
      'status'
    ])
  },

  methods: {
    ...mapActions([
      'userAuthAction',
      'userPropsAction'
    ]),

    logout (e) {
      e.preventDefault
      const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true"
          },
          body: JSON.stringify({ 'session': this.$cookie.get('token') })
        }

        var response = fetch('http://localhost:1337/auth/logout', requestOptions)
        .then(res => {
          return res.json()
        })
        .then (json => {
          if(json.logout === 'sucess') {
            this.$cookie.delete('token')
            this.userAuthAction(this.$cookie.get('token'))
            this.$router.push({name: 'home'})
          }
          else {
            console.log(json.error);
          }
          
        })
        .catch (error => console.error(error))
    },
  
    userLoggedIn() {
      if(this.$cookie.get('token')){
        return true
      }

      return false
    }
  },

  mounted() {
    this.userAuthAction(this.$cookie.get('token'))
    this.userPropsAction(this.$cookie.get('token'))
  }
}
</script>
