<template>
  <button 
    :type="type" 
    class="form-button"
    :class="{ loading }"
  >
    <FontAwesomeIcon v-if="icon" :icon="['fas', icon]" />
    <slot></slot>
    <span v-if="loading" class="loading-indicator">
      <FontAwesomeIcon :icon="['fas', 'spinner']" spin />
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit'
  icon?: string
  loading?: boolean
}>()
</script>

<style lang="scss" scoped>
.form-button {
  width: 100%;
  padding: 0.85rem;
  background-color: $white;
  color: $bg-dark;
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover:not(.loading) {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active:not(.loading) {
    transform: translateY(-1px);
  }
  
  &.loading {
    cursor: not-allowed;
    opacity: 0.8;
    
    .loading-indicator {
      position: absolute;
      right: 1rem;
    }
  }
  
  svg {
    font-size: 1.1em;
  }
}
</style> 