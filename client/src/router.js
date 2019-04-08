import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import BlogDetail from './views/BlogDetail.vue'
import BlogCreate from './views/BlogCreate.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blog/:id',
      name: 'blogDetail',
      component: BlogDetail
    },
    {
      path: '/blog-create',
      name: 'blogCreate',
      component: BlogCreate
    }
  ]
})
