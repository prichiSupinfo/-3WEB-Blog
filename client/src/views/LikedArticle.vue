<template>
    <div class="likedAticle">
        <p v-for="likedArticle in likedArticles">{{likedArticle}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            likedArticles: []
        }
    },
    methods : {
        fetchLikedArticles () {
            const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true"
          },
          body: JSON.stringify({ "session": this.$cookie.get('token') })
        }

        var response = fetch('http://localhost:1337/auth/userLikedArticles', requestOptions)
        .then(res => {
          return res.json()
        })
        .then (json => {
          if(!json.error) {
            this.likedArticles = json.likedArticles
          }
          else {
            console.log(json.error);
          }
          
        })
        .catch (error => console.error(error))
        }
    },

    mounted() {
        this.fetchLikedArticles()
    }
}
</script>
