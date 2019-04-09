<template>
  <div id="app">
    <div id="nav" v-if="!status.isLoggedIn">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <div id="nav" v-else>
      <router-link to="/">Articles</router-link> |
      <router-link to="/new-blog">New Articles</router-link> |
      <router-link to="/register">Liked Articles</router-link> <p style="display:inline"> | </p>
      <router-link to="/blog-create">Add Article</router-link> |
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
      'userAuthAction'
    ]),

    logout (e) {
      e.preventDefault
      this.$cookie.delete('token')
      this.userAuthAction(this.$cookie.get('token'))

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
  }
}
</script>
