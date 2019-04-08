<template>
    <div class="blog-card" :class="[i%2 == 0 ? 'alt' : '']">
        <div class="meta">
        <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
        <ul class="details">
            <li class="author">John Doe</li>
            <li class="date">Aug. 24, 2015</li>
        </ul>
        </div>
    <div class="description">
      <h1>Learning to Code</h1>
      <h2>Opening a door to the future</h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a :href="/blog/i">Read More</a> 
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    i: Number
  }
}
</script>
