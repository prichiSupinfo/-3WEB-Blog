import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

// import scss
import './assets/sass/index.sass'

// use vue cookie
var VueCookie = require('vue-cookie')

Vue.config.productionTip = false
Vue.use(VueCookie)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
