<template>
  <NuxtLink class="button" :class="type" :to="to">
    <slot></slot>
  </NuxtLink>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: value => ['primary', 'secondary', 'danger'].includes(value)
  },
  to: {
    type: String,
    required: false,
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;
  font-size: $font-size-lg;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
}

.primary {
  background-color: $primary;
  border-radius: 2rem;
  color: $white;
  &:hover {
    background-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(37, 99, 235, 0.2);
  }
}

.secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  
  &:hover {
    background-color: var(--bg-card-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px var(--shadow-color);
  }
}

.danger {
  background-color: $danger;
  color: $white;
  
  &:hover {
    background-color: $danger-dark;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(239, 68, 68, 0.2);
  }
}
</style>
