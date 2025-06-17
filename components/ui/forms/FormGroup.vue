<template>
  <div class="form-group">
    <label :for="id" :style="{ textAlign: textAlign }">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  id: string
  textAlign?: 'left' | 'center' | 'right'
}>()
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1.75rem;
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.75rem;
    color: $gray-300;
    font-weight: 500;
    font-size: 0.95rem;
  }
}
</style> 