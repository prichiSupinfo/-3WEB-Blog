<template>
    <article>
        <header>
            <div class="cs-header-left">
                <h1 class="blog-detail-title">{{article.title}}</h1>
                <p class="date">by {{article.writer}} on {{article.date}}</p>
                <div class="like-position">
                    <div class="like-button" :class="[hasLiked ? 'has-liked':'']" @click='like'></div>
                </div>
                <div v-if="status.isAdmin">
                        <button @click.prevent="editArticle">edit</button>
                        <button @click.prevent="deleteArticle">delete</button>
                </div>
            
            </div>
        </header>
        <div class="content">
            <p>{{article.text}}</p>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
      article : {
          type: Object
      }
    
    },

    data() {
        return {
            hasLiked : false,
        }
    },
    computed: {
        ...mapState([
            'status'
        ])
    },

    methods : {
        like () {
            
            if(!this.hasLiked) {
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    body: JSON.stringify({ 
                        "session": this.$cookie.get('token'),
                        "article": {
                            "id": this.$route.params.id
                        }
                    })
                }

                var response = fetch('http://localhost:1337/article/like', requestOptions)
                .then(res => {
                    return res.json()
                })
                .then (json => {
                    if(json.result === "success") {
                        this.hasLiked = !this.hasLiked
                        console.log(json)
                    }
                    else {
                        console.log(json.error);
                    }
                
                })
                .catch (error => console.error(error))
                }

                else {
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type, Authorization",
                        "Access-Control-Allow-Credentials": "true"
                    },
                    body: JSON.stringify({ 
                        "session": this.$cookie.get('token'),
                        "article": {
                            "id": this.$route.params.id
                        }
                    })
                }

                var response = fetch('http://localhost:1337/article/unlike', requestOptions)
                .then(res => {
                    return res.json()
                })
                .then (json => {
                    if(json.result === "success") {
                        this.hasLiked = !this.hasLiked
                        console.log(json)
                    }
                    else {
                        console.log(json.error);
                    }
                
                })
                .catch (error => console.error(error))
                }
            
        },

        hasUserLiked() {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify({ 
                    "session": this.$cookie.get('token'),
                    "article": {
                        "id": this.$route.params.id
                    }
                    })
            }

            var response = fetch('http://localhost:1337/article/hasLiked', requestOptions)
            .then(res => {
                return res.json()
            })
                .then (json => {
                if(!json.error) {
                    this.hasLiked = json.hasLiked
                }
                else {
                    console.log(json.error);
                }
            
            })
            .catch (error => console.error(error))     
        },

        editArticle () {
            const pageLink = '/blog-edit/' + this.article._id
            this.$router.push(pageLink)
        },

        deleteArticle () {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify({ 
                    "session": this.$cookie.get('token'),
                    "article": {
                        "id": this.$route.params.id
                    }
                    })
            }
            var response = fetch('http://localhost:1337/article/delete', requestOptions)
            .then(res => {
                return res.json()
            })
                .then (json => {
                if(json.result === 'success') {
                    this.$router.push('/')
                }
                else {
                    console.log(json.error);
                }
            
            })
            .catch (error => console.error(error)) 
        }
    },

    beforeMount() {
        this.hasUserLiked()
    }
}
</script>
