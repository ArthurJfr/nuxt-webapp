<template>
  <div class="home-container">
    <h1>Hello World</h1>
    <Footer />
    <IOSDebug />
  </div>
</template>

<script setup>
import Footer from '~/components/landing/Footer.vue';

</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.home-container {
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding: 2rem;
  padding-bottom: 120px; // Espace pour la bottom bar mobile
  color: var(--text-primary);
  font-family: $font-primary;
  transition: all 0.3s ease;
}
</style> 