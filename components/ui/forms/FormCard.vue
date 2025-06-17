<template>
  <div class="form-card">
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-content">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.form-card {
  width: 100%;
  background-color: $bg-card;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;

  .card-header {
    background-color: rgba(255, 255, 255, 0.02);
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      text-align: center;
      color: $primary;
      margin: 0;
    }
  }
  
  .card-content {
    padding: 2rem;
  }
}
</style> 