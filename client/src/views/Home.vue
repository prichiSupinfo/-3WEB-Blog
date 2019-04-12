<template>
  <div class="home">
    <h1>All Articles</h1>
    <div class="blog-post" v-for="(article, index) in articles">
      <BlogCard :i="index"  :id='article._id' :title="article.title" :text="article.text" :author="article.writer" :date="article.date"/>
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
      articles: []
    }
  },
  computed: {
    ...mapState([
      'status'
    ]) 
  },
  methods: {
    fetchArticles () {
      const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true"
          },
          body: JSON.stringify({ "session": this.$cookie.get('token')})
        }

        var response = fetch('http://localhost:1337/article/list', requestOptions)
        .then(res => {
          return res.json()
        })
        .then (json => {
          if(json.articles) {
            this.articles = json.articles
            console.log(json.articles)
          }
          else {
            console.log(json.error);
          }
          
        })
        .catch (error => console.error(error))
    }
  },

  beforeMount () {
    this.fetchArticles()
  }
}
</script>

<style scoped>
  .blog-post {
    margin-top: 50px;
  }
</style>
