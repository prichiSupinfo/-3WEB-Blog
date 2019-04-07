<template>
  <div id="app">
    <div id="nav" v-if="!status.loggedIn">
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <div id="nav" v-else>
      <router-link to="/">Articles</router-link> |
      <router-link to="/new-blog">New Articles</router-link> |
      <router-link to="/register">Liked Articles</router-link> <p style="display:inline" v-if="user.isAdmin"> | </p>
      <router-link to="/login" v-if="user.isAdmin">Add Article</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed : {
    ...mapState([
      'status',
      'user'
    ])
  }
}
</script>
