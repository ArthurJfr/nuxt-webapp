<template>
  <div class="dashboard-layout">
    <Sidebar />
    <main class="dashboard-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '~/components/dashboard/Sidebar.vue';
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background-color: $bg-dark;
  background-image: 
  radial-gradient(circle at 20% 20%, rgba($primary-light, 0.15) 0%, transparent 50%),
  radial-gradient(circle at 80% 80%, rgba($primary-light, 0.1) 0%, transparent 50%);
}

.dashboard-main {
  flex: 1;
  margin-left: 280px; /* Correspond à la largeur de la sidebar */
  min-height: 100vh;
  width: calc(100% - 280px);
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
}
</style> 