<template>
  <div class="home">
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
  }
}
</script>

<style scoped>
  .blog-post {
    margin-top: 50px;
  }
</style>
