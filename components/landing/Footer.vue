<template>
  <footer class="site-footer">
    <p>© {{ new Date().getFullYear() }} - Tous droits réservés. Arthur Jaffro</p>
  </footer>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.site-footer {
  
  color: $gray-500;
  text-align: center;
  padding: 2rem;
}
</style>    
