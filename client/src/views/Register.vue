<template>
  <div class="form-wrapper">
    <div class="form-title">
      <h1>Register</h1>
    </div>

    <div class="form-divider"></div>

    <form>
      <div class="form-group">
        <input type="text" name="username" placeholder="ENTER USERNAME" v-model="newUser.username">
      </div>

      <div class="form-group">
        <input type="email" name="email" placeholder="ENTER EMAIL" v-model="newUser.email">
      </div>

      <div class="form-group">
        <input type="password" name="password" placeholder="ENTER PASSWORD" v-model="newUser.password">
      </div>

      <div class="form-group">
        <input type="password" name="confirmPassword" placeholder="CONFIRM PASSWORD" v-model="newUser.confirmPassword">
      </div>

      <button class="form-button" @click.prevent="register">Register</button> 
    </form>
  </div>
</template>

<script>
import { constants } from 'crypto';
import { Promise } from 'q';
export default {
  data () {
    return {
      newUser: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    }
  },
  methods: {
    register () {
      if(this.checkValidity()) {
        //TODO: API CALL
        const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true"
          },
          body: JSON.stringify({ "username": this.newUser.username, "email": this.newUser.email, "password": this.newUser.password })
        }

        var response = fetch('http://localhost:1337/auth/register', requestOptions)
        .then(res => {
          return res.json()
        })
        .then (json => {
          if(json.success) {
            console.log("registered")
            this.$router.push({name: 'confirmEmail'})
          }
        })
      
      }
    },

    checkValidity () {
      if (!this.newUser.username || !this.newUser.email || !this.newUser.password || !this.newUser.confirmPassword) {
        return false 
      }
        return true
    },

    handleResponse (response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok){
          if (response.status === 401) {
            
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error)
        }

        return data
      })
    }
  }
}
</script>
