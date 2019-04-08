<template>
  <div class="home" v-if="status.loggedIn">
    <h1>All Articles</h1>
    <div class="blog-post" v-for="index in 10">
      <BlogCard :i='index' /> 
    </div> 

  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    BlogCard
  },
  data(){
    return {
      
    }
  },
  computed: {
    ...mapState([
      'status'
    ]) 
  },

  created(){
    if (!this.status.loggedIn) {
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
  .blog-post {
    margin-top: 50px;
  }
</style>
