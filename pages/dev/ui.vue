<template>
  <div>
    <h1 class="library-header">Bibliothèque de Composants</h1>



    <div class="library-content"> 
      <h2>Boutons</h2>
      <h2>Formulaires</h2>
      <h2>Modaux</h2>
      <h2>Cartes</h2>
      <h2>Divers</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';




</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.component-library {
  min-height: 100vh;
  background-color: $bg-dark;
  color: $markdown-text;
  font-family: $font-primary;
  padding: 2rem;
}

.library-header {
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    font-size: 2rem;
    color: $primary;
    margin: 0;
  }
}


</style>
