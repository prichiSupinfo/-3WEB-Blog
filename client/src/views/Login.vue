<template>
  <div class="form-wrapper">
    <div class="form-title">
      <h1>Login</h1>
    </div>

    <div class="form-divider"></div>

    <form>
      <div class="form-group">
        <input type="text" name="username" placeholder="ENTER USERNAME" v-model="newUser.username">
      </div>

      <div class="form-group">
        <input type="password" name="password" placeholder="ENTER PASSWORD" v-model="newUser.password">
      </div>
      
      <button class="form-button" @click.prevent='login'>Log In</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex' 
export default {
  data(){
    return {
      newUser: {
        username : '',
        password : ''
      }
    }
  },

  methods: {
    ...mapActions([
      'userAuthAction'
    ]),
    
    login() {
      let payload = this.newUser
      this.userAuthAction(payload);
    }
  }
}
</script>