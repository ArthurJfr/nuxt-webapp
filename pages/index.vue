<template>
  <div class="home-container">
    <h1>Hello World</h1>
    <Footer />
  </div>
</template>

<script setup>
import Footer from '~/components/landing/Footer.vue';

</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.home-container {
  min-height: auto;
  background-color: $white;
  padding: 2rem;
 //background-image: 
    //radial-gradient(circle at 20% 20%, rgba($primary, 0.15) 0%, transparent 50%),
    //radial-gradient(circle at 80% 80%, rgba($primary, 0.1) 0%, transparent 50%);
  color: $markdown-text;
  font-family: $font-primary;
}
</style> 