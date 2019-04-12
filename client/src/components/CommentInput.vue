<template>
    <div class="comment-card">
        <div class="comment-block">
            <div class="profile-name" >
                <p>{{username}}</p>
            </div>
                    
            <form action="">
                <textarea name="" id="" cols="30" rows="3" placeholder="ADD COMMENT..." v-model="comment.text" @keyup.enter.prevent="submitComment"></textarea>
            </form>
            <div class="comment-send" @click="submitComment" ><p>SEND</p></div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

var socket

export default {
    props: {
        username: String
    },
    data () {
        return {
            comment: {
                text: null
            },
            sendComment: {
                text: null
            },
            notifCount: 0
        }
    },

    methods: {
        checkValidity () {
            if (!this.comment.text) {
                return false 
            }
            return true
        },

        submitComment () {
            if(this.checkValidity()) {
                socket.emit('comment',{
                    'session': this.$cookie.get('token'),
                    'comment': {
                        text: this.comment.text,
                        username: this.username,
                        date: new Date()
                    }
                })
                this.sendComment = this.comment
                //this.$emit('addComment', this.sendComment)
                
                this.comment.text = ''
            }
        }
    },

    mounted () {
        socket = io('http://localhost:1337/comments')
        socket.emit('joinRoom', this.$route.params.id)
        socket.on('newComment', (comment) => {
            document.title = '(' + ++this.notifCount + ') client' 
            this.$emit('addComment', comment)
        })
        
    }
}
</script>

