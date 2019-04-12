<template>
    <div class="comment-card">
        <div class="comment-block">
            <div class="profile-name" >
                <p>funkib00y</p>
            </div>
                    
            <form action="">
                <textarea name="" id="" cols="30" rows="3" placeholder="ADD COMMENT..." v-model="comment.text"></textarea>
            </form>
            <div class="comment-send" @click.prevent="submitComment"><p>SEND</p></div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

var socket

export default {
    data () {
        return {
            comment: {
                text: null
            }
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
                        text: this.comment.text
                    }
                })
                this.$emit('addComment', this.comment)
                this.comment.text = ''
            }
        }
    },

    mounted () {
        socket = io('http://localhost:1337/comments')
        socket.emit('joinRoom', this.$route.params.id)
        
    }
}
</script>

