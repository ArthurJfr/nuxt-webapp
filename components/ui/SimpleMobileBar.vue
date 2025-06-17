<template>
  <div 
    v-if="isMobile"
    class="simple-mobile-bar"
  >
    <div class="simple-mobile-bar__container">
      <div class="simple-mobile-bar__nav">
        <!-- Bouton Accueil -->
        <NuxtLink 
          to="/" 
          class="simple-mobile-bar__item"
          :class="{ 'simple-mobile-bar__item--active': $route.path === '/' }"
        >
          <div class="simple-mobile-bar__icon">
            <FontAwesomeIcon :icon="['fas', 'home']" />
          </div>
        </NuxtLink>

        <!-- Bouton Dashboard -->
        <NuxtLink 
          to="/dashboard" 
          class="simple-mobile-bar__item"
          :class="{ 'simple-mobile-bar__item--active': $route.path.startsWith('/dashboard') }"
        >
          <div class="simple-mobile-bar__icon">
            <FontAwesomeIcon :icon="['fas', 'tachometer-alt']" />
          </div>
        </NuxtLink>

        <!-- Bouton Menu/Plus -->
        <button 
          class="simple-mobile-bar__item simple-mobile-bar__item--accent"
          @click="toggleMenu"
        >
          <div class="simple-mobile-bar__icon">
            <FontAwesomeIcon 
              :icon="['fas', 'plus']" 
              :class="{ 'rotate-45': showMenu }"
            />
          </div>
        </button>

        <!-- Bouton Profil -->
        <NuxtLink 
          to="/profile" 
          class="simple-mobile-bar__item"
          :class="{ 'simple-mobile-bar__item--active': $route.path === '/profile' }"
        >
          <div class="simple-mobile-bar__icon">
            <FontAwesomeIcon :icon="['fas', 'user']" />
          </div>
        </NuxtLink>

        <!-- Bouton Paramètres -->
        <NuxtLink 
          to="/settings" 
          class="simple-mobile-bar__item"
          :class="{ 'simple-mobile-bar__item--active': $route.path === '/settings' }"
        >
          <div class="simple-mobile-bar__icon">
            <FontAwesomeIcon :icon="['fas', 'cog']" />
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Menu contextuel -->
    <Transition 
      name="fade-up"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div v-if="showMenu" class="simple-mobile-bar__overlay" @click="closeMenu">
        <div class="simple-mobile-bar__menu">
          <div class="simple-mobile-bar__menu-item" @click="handleMenuAction('create')">
            <div class="simple-mobile-bar__menu-icon">
              <FontAwesomeIcon :icon="['fas', 'file-alt']" />
            </div>
            <span>📝 Créer une note</span>
          </div>
          
          <div class="simple-mobile-bar__menu-item" @click="handleMenuAction('search')">
            <div class="simple-mobile-bar__menu-icon">
              <FontAwesomeIcon :icon="['fas', 'search']" />
            </div>
            <span>🔍 Rechercher</span>
          </div>

          <div class="simple-mobile-bar__menu-item" @click="handleMenuAction('favorites')">
            <div class="simple-mobile-bar__menu-icon">
              <FontAwesomeIcon :icon="['fas', 'star']" />
            </div>
            <span>⭐ Favoris</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Utiliser le composable mobile
const { isMobile } = useMobile()

// État du menu
const showMenu = ref(false)

// Gestion du menu
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}

const handleMenuAction = (action: string) => {
  console.log(`Action: ${action}`)
  closeMenu()
  
  // Ici vous pouvez ajouter la logique pour chaque action
  switch (action) {
    case 'create':
      // Naviguer vers la création de note ou ouvrir un modal
      break
    case 'search':
      // Ouvrir la recherche
      break
    case 'favorites':
      // Naviguer vers les favoris
      break
  }
}
</script>

<style lang="scss" scoped>
.simple-mobile-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 16px;
  padding-bottom: env(safe-area-inset-bottom, 16px);
  
  &__container {
    @include glassmorphism();
    border-radius: 24px;
    margin-bottom: 16px;
    overflow: hidden;
    
    // Mode sombre
    @media (prefers-color-scheme: dark) {
      @include glassmorphism-dark();
    }
  }
  
  &__nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 12px 8px;
    min-height: 64px;
  }
  
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 20px;
    text-decoration: none;
    color: $gray-600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-width: 48px;
    min-height: 48px;
    cursor: pointer;
    border: none;
    background: transparent;
    
    &:hover {
      background: rgba(37, 99, 235, 0.1);
      color: $primary;
      transform: scale(1.1);
    }
    
    &--active {
      color: $primary;
      background: rgba(37, 99, 235, 0.15);
      
      .simple-mobile-bar__icon {
        transform: scale(1.2);
      }
    }
    
    &--accent {
      background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
      
      &:hover {
        background: linear-gradient(135deg, $primary-dark 0%, $primary 100%);
        transform: scale(1.15);
        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
      }
    }
    
    // Mode sombre
    @media (prefers-color-scheme: dark) {
      color: $gray-300;
      
      &:hover {
        background: rgba(96, 165, 250, 0.15);
        color: $primary-light;
      }
      
      &--active {
        color: $primary-light;
        background: rgba(96, 165, 250, 0.2);
      }
    }
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
  
  &__label {
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    font-family: $font-primary;
  }
}

@media (max-width: 768px) {
  .simple-mobile-bar {
    display: block;
  }
}

@media (min-width: 769px) {
  .simple-mobile-bar {
    display: none;
  }
}
</style> 