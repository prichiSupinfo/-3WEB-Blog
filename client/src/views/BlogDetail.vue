<template>
    <div class="blog-detail-wrapper">
        
        <Blog :article="article"/>

        <div class="comments">
            
            <CommentInput />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            
        </div>
        
    </div>

</template>

<script>
import CommentInput from '@/components/CommentInput.vue'
import Comment from '@/components/Comment.vue'
import Blog from '@/components/Blog.vue'
export default {
    components: {
        CommentInput,
        Comment,
        Blog
    },

    data(){
        return {
            article: {
                _id: '',
                title: '',
                text: '',
                writer: '',
                date: '',
            }
        }
    }, 

    methods: {
        fetchBlogPost () {
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

            var response = fetch('http://localhost:1337/article/read', requestOptions)
            .then(res => {
                return res.json()
            })
                .then (json => {
                if(json.article) {
                    this.article = json.article
                }
                else {
                    console.log(json.error);
                }
            
            })
            .catch (error => console.error(error))
        },
    },

    beforeMount() {
        this.fetchBlogPost()
    }
}
</script>
