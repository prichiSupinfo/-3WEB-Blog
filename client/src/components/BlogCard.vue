<template>
    <div class="blog-card" :class="[i%2 == 0 ? 'alt' : '']">
        <div class="meta">
        <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
        <ul class="details">
            <li class="author">{{author}}</li>
            <li class="date">{{date}}</li>
        </ul>
        </div>
    <div class="description">
      <h1>{{title}}</h1>
      <p class="text">{{text | truncate(150)}}</p>
      <p class="read-more">
        <a :href="id">Read More</a> 
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    i: Number,
    id: String,
    title: String,
    text: String,
    date: String,
    author: String
  },
  filters: {
    truncate(value,limit) {
      if(!value) return
      if(value.length > limit){
        value = value.substring(0,(limit - 3)) + '...'
      }
      return value
    }
  },
  methods: {
    createLink () {
      return ("/blog/" + this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  overflow: hidden;
  word-wrap:break-word;
}
 .description .text {
     display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: horizontal;
 }
</style>
