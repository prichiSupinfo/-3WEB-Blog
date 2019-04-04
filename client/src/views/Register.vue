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

      <button class="form-button">Register</button>
      
    </form>
  </div>
</template>

<script>
import func from '../../vue-temp/vue-editor-bridge';
export default {
  data(){
    return {
      newUser: {
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
      }
    }
  },
  methods: {
    
  }
}
</script>
