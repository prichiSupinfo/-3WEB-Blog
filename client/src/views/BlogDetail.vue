<template>
    <div class="blog-detail-wrapper">
        
        <Blog />

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
    }
}
</script>
