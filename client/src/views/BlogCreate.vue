<template>
    <div class="form-wrapper">
        <h1>Blog Create</h1>
        
        <div class="form-divider"></div>

        <form>
            <div class="blog-form-group">
                <label for="blogTitle">Blog Title: </label>
                <input type="text" id="blogTitle" placeholder="INSERT BLOG TITLE HERE..." v-model="blog.title"/>
            
            </div>

            <div class="blog-form-group">
                <label for="blogDescription">Blog Description: </label>
                <textarea type="text" id="blogDescription" placeholder="INSERT BLOG TITLE HERE..." v-model="blog.description"/>
            </div>

            <!-- <div class="blog-form-checkbox">
                <label for="isHidden">Is Blog Hidden? </label>
                <input type="checkbox" id="isHidden" checked/>
            </div> -->
            
            <button class="form-button" @click.prevent="submitArticle">Create</button>
        </form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            blog : {
                title: null,
                description: null
            }
        }
    },

    computed: {
        ...mapState([
            'status'
        ])
    },

    methods: {
        checkValidity () {
            if (!this.blog.title || !this.blog.description) {
                return false 
            }
                return true
        },

        submitArticle () {
            if(this.checkValidity()) {
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
                                'title': this.blog.title,
                                'text': this.blog.description
                            }
                        })
                }

                var response = fetch('http://localhost:1337/article/create', requestOptions)
                .then(res => {
                    return res.json()
                })
                .then (json => {
                    if(json.result === "success") {
                        console.log(json.info)
                       this.$router.push({name: 'home'}) 
                    }
                else {
                    console.log(json.error);
                }
                
                })
                .catch (error => console.error(error))
            }
        }
    },

    beforeMount () {
        if(!this.status.isAdmin){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="scss">
    .blog-form-group { 
        
        padding: 15px;

        input, textarea {
            width: 100%;
            height: 25px;
            outline: none;
            border: none;
            box-shadow: 0 1px 6px rgba(0,0,0,.3); 
        }

        textarea {
            width: 100%;
            height: 90px;
        }

        label {
            float: left;
        }

    }

    .blog-form-checkbox {
        float: left;
        padding: 15px;
    }
</style>
