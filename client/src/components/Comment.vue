<template>
    <div class="comment-card">
            <div class="comment-block">
                <div class="profile-name" >
                    <p><b>{{username}}</b></p>
                </div>
                <p class="comment-text">{{text}}</p>
                <div class="comment-date"><p>{{date}}</p></div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        username: String,
        text: String,
        date: String
    }
}
</script>

