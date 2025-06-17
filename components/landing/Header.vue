<template>
  <header class="header">
    <nav class="nav">
      <Logo to="/" />
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">
          Accueil
        </NuxtLink>
        <NuxtLink to="/auth/register" class="nav-link">
          S'inscrire
        </NuxtLink>
        <NuxtLink to="/dev/ui" class="nav-link">
          UI
        </NuxtLink>
        <Button to="/auth/login" type="primary" class="login-btn glow-effect-button">
          <span>Se connecter</span>
          <span class="arrow-icon">→</span>
        </Button>
      </div>
    </nav>
  </header>
</template>
<script setup>
import Button from '@/components/ui/Button.vue';
import Logo from '@/components/ui/Logo.vue';
</script>
<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.header {
  padding: 1.5rem 2rem;
  background-color: $bg-card;
  border-bottom: 1px solid $code-border;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;

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
    }

    .nav-links {
      display: flex;
      gap: 2.5rem;
      align-items: center;

      .nav-link {
        color: $markdown-text;
        text-decoration: none;
        position: relative;
        transition: color 0.2s ease;
        font-weight: 500;
        font-size: $font-size-base;

        &:hover, &.router-link-active {
          color: $primary;
        }
        
        &.router-link-active::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 2px;
          background-color: $primary;
        }
      }

      .login-btn {
        color: $white;
        padding: 0.75rem 1.5rem;
        border-radius: 2rem;
        text-decoration: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        font-size: $font-size-base;

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        &:hover {
          background-color: $primary-dark;
          transform: translateY(-2px);
          
          .arrow-icon {
            transform: translateX(3px);
          }
        }
      }
    }
  }
}

.glow-effect-text {
  text-shadow: 0 0 15px rgba($primary, 0.2);
}



@media (max-width: 768px) {
  .header {
    padding: 1rem;

    .nav {
      flex-direction: column;
      gap: 1rem;

      .nav-links {
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1.5rem;
        
        .login-btn {
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style> 