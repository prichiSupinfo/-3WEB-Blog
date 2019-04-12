<template>
    <div class="comment-card">
            <div class="comment-block">
                <div class="profile-name" >
                    <p><b>funkib00y</b></p>
                </div>
                <p class="comment-text">{{text}}</p>
                <div class="comment-date"><p>Aug 24, 2014 @ 2:35 PM</p></div>
            </div>
        </div>
</template>

<script>
export default {
    props: {
        username: String,
        text: String
    }
}
</script>

