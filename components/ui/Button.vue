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
  box-shadow: 0 4px 6px rgba($primary, 0.1);
  transition: all 0.3s ease;
  font-size: $font-size-lg;
  font-weight: 600;
  text-decoration: none;
}

.primary {
  background-color: $primary;
  border-radius: 2rem;
  color: $white;
  &:hover {
    background-color: $primary-dark;
  }
}
</style>
