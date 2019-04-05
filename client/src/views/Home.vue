<template>
  <div class="home">
    <!-- <h1>All Articles</h1>
    <div class="blog-post" v-for="index in 10">
      <BlogCard :i='index' /> 
    </div> -->

    <BlogDetail />

  </div>
</template>

<script>
// @ is an alias to /src
import BlogCard from '@/components/BlogCard.vue'
import BlogDetail from '@/views/BlogDetail.vue'

export default {
  name: 'home',
  components: {
    BlogCard,
    BlogDetail
  },
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>
  .blog-post {
    margin-top: 50px;
  }
</style>
