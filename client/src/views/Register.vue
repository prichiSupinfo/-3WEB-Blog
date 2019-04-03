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

      <input type="submit">
      
    </form>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
  

  .form-wrapper {
    max-width: 400px;
    margin-top: 10px;
    background: transparent;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    padding-bottom: 40px;
    border-radius: 5px;
    background-color: #2c3940;
    box-shadow: 0 1px 6px rgba(0,0,0,.3);
    color: white;
  }

  form {
    width: 100%;
    
  }

  .form-group {
    width: 100%;
    border-bottom: 2px solid white;
    margin-top: 20px;
  }

  input {
    margin: 20px 0 0 0;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    color: white;


  }

  input::placeholder {
    color: white;
  }

  .form-title {
    text-align: center;
  }

  .form-divider {
    border-top: 1px solid white;
  }

</style>
