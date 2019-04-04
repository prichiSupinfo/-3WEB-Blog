<template>
  <div id="app">
    <div id="nav" v-if="!status.loggedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </div>

    <div id="nav" v-else>
      <router-link to="/">Articles</router-link> |
      <router-link to="/register">Liked Shits</router-link> |
      <router-link to="/login">Hope it changes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed : {
    ...mapState([
      'status'
    ])
  }
}
</script>
