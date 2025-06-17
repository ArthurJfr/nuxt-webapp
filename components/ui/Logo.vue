<template>
  <NuxtLink :to="to" class="logo" :class="{ 'sidebar-logo': isSidebar }">
    <span class="logo-icon">📝</span>
    <span class="logo-text glow-effect-text">Wiki Notes</span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    default: '/'
  },
  isSidebar: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: $markdown-heading;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: $font-primary;

  .logo-icon {
    font-size: 1.8rem;
  }

  .logo-text {
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 2px;
      background-color: $primary;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }
  }
  
  &:hover .logo-text::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  &.sidebar-logo {
    color: $gray-700;
    
    .logo-icon {
      font-size: 1.8rem;
    }
  }
}

.glow-effect-text {
  text-shadow: 0 0 15px rgba($primary, 0.2);
}

@media (max-width: 768px) {
  .logo {
    font-size: 1.2rem;
    
    .logo-icon {
      font-size: 1.5rem;
    }
    
    &.sidebar-logo {
      .logo-icon {
        font-size: 1.5rem;
      }
    }
  }
}
</style> 