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
import { userService } from '@/services/'
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
        userService.register(this.newUser.username, this.newUser.password, this.newUser.email).then(json => {
          if (json.success) {
            console.log('registered')
            this.$router.push({ name: 'confirmEmail' })
          } else {
            console.log(json.error)
          }
        })
        .catch(error => console.error(error))
        
      
      }
    },

    checkValidity () {
      if (!this.newUser.username || !this.newUser.email || !this.newUser.password || !this.newUser.confirmPassword) {
        return false 
      }

      if(this.newUser.password != this.newUser.confirmPassword) {
        return false
      }
        return true
    }
  }
}
</script>
