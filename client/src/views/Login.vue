<template>
  <div class="form-wrapper">
    <div class="form-title">
      <h1>Login</h1>
    </div>

    <div class="form-divider"></div>

    <form>
      <div class="form-group">
        <input type="text" name="username" placeholder="ENTER USERNAME" v-model="user.username">
      </div>

      <div class="form-group">
        <input type="password" name="password" placeholder="ENTER PASSWORD" v-model="user.password">
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
      user: {
        username : '',
        password : '',
        isAdmin : false
      }
    }
  },

  methods: {
    ...mapActions([
      'userAuthAction',
      'userPropsAction'
    ]),
    
    login() {
      if (this.checkValidity()) {
        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true"
          },
          body: JSON.stringify({ "username": this.user.username, "password": this.user.password })
        }

        var response = fetch('http://localhost:1337/auth/login', requestOptions)
        .then(res => {
          return res.json()
        })
        .then (json => {
          if(json.session) {
            this.$cookie.set('token', json.session, 1)
            this.userAuthAction(this.$cookie.get('token'))
            this.userPropsAction(this.$cookie.get('token'))
            this.$router.push({name: 'home'})
          }
          else {
            console.log(json.error);
          }
          
        })
        .catch (error => console.error(error))
      }
    },

    checkValidity () {
      if (!this.user.username || !this.user.password) {
        return false 
      }
        return true
    }
  }
}
</script>