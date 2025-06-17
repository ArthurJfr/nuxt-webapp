<template>
  <div 
    v-if="showMobileUI"
    class="mobile-bottom-bar"
    :class="{ 'mobile-bottom-bar--hidden': isHidden }"
  >
    <div class="mobile-bottom-bar__container">
      <div class="mobile-bottom-bar__nav">
        <!-- Bouton Accueil -->
        <NuxtLink 
          to="/" 
          class="mobile-bottom-bar__item"
          :class="{ 'mobile-bottom-bar__item--active': currentRoute === '/' }"
        >
          <div class="mobile-bottom-bar__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
          </div>
          <span class="mobile-bottom-bar__label">Accueil</span>
        </NuxtLink>

        <!-- Bouton Dashboard -->
        <NuxtLink 
          to="/dashboard" 
          class="mobile-bottom-bar__item"
          :class="{ 'mobile-bottom-bar__item--active': currentRoute.startsWith('/dashboard') }"
        >
          <div class="mobile-bottom-bar__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            </svg>
          </div>
          <span class="mobile-bottom-bar__label">Dashboard</span>
        </NuxtLink>

        <!-- Bouton Menu/Plus -->
        <button 
          class="mobile-bottom-bar__item mobile-bottom-bar__item--accent"
          @click="toggleMenu"
        >
          <div class="mobile-bottom-bar__icon">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
              :class="{ 'rotate-45': showMenu }"
            >
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <span class="mobile-bottom-bar__label">Menu</span>
        </button>

        <!-- Bouton Profil -->
        <NuxtLink 
          to="/profile" 
          class="mobile-bottom-bar__item"
          :class="{ 'mobile-bottom-bar__item--active': currentRoute === '/profile' }"
        >
          <div class="mobile-bottom-bar__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span class="mobile-bottom-bar__label">Profil</span>
        </NuxtLink>

        <!-- Bouton Paramètres -->
        <NuxtLink 
          to="/settings" 
          class="mobile-bottom-bar__item"
          :class="{ 'mobile-bottom-bar__item--active': currentRoute === '/settings' }"
        >
          <div class="mobile-bottom-bar__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
          </div>
          <span class="mobile-bottom-bar__label">Paramètres</span>
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
      <div v-if="showMenu" class="mobile-bottom-bar__overlay" @click="closeMenu">
        <div class="mobile-bottom-bar__menu">
          <div class="mobile-bottom-bar__menu-item" @click="handleMenuAction('create')">
            <div class="mobile-bottom-bar__menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <span>Créer une note</span>
          </div>
          
          <div class="mobile-bottom-bar__menu-item" @click="handleMenuAction('search')">
            <div class="mobile-bottom-bar__menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <span>Rechercher</span>
          </div>

          <div class="mobile-bottom-bar__menu-item" @click="handleMenuAction('favorites')">
            <div class="mobile-bottom-bar__menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            </div>
            <span>Favoris</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'nuxt/app'

// Utiliser le composable PWA
const { showMobileUI } = usePWA()

// État réactif
const isHidden = ref(false)
const showMenu = ref(false)
const lastScrollY = ref(0)

// Route actuelle
const route = useRoute()
const currentRoute = computed(() => route.path)

// Gestion du scroll pour masquer/afficher la barre
const handleScroll = () => {
  if (process.client) {
    const currentScrollY = window.scrollY
    
    if (currentScrollY > lastScrollY.value && currentScrollY > 100) {
      // Scroll vers le bas - masquer
      isHidden.value = true
    } else {
      // Scroll vers le haut - afficher
      isHidden.value = false
    }
    
    lastScrollY.value = currentScrollY
  }
}

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

// Lifecycle
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style lang="scss" scoped>
.mobile-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 16px;
  padding-bottom: env(safe-area-inset-bottom, 16px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &--hidden {
    transform: translateY(100%);
  }
  
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 16px;
    text-decoration: none;
    color: $gray-600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    min-width: 56px;
    cursor: pointer;
    border: none;
    background: transparent;
    
    &:hover {
      background: rgba(37, 99, 235, 0.08);
      color: $primary;
      transform: scale(1.05);
    }
    
    &--active {
      color: $primary;
      background: rgba(37, 99, 235, 0.12);
      
      .mobile-bottom-bar__icon {
        transform: scale(1.1);
      }
    }
    
    &--accent {
      background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
      
      &:hover {
        background: linear-gradient(135deg, $primary-dark 0%, $primary 100%);
        transform: scale(1.1);
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
      transition: transform 0.3s ease;
      
      &.rotate-45 {
        transform: rotate(45deg);
      }
    }
  }
  
  &__label {
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    text-align: center;
    font-family: $font-primary;
  }
  
  &__overlay {
    @include overlay(rgba(0, 0, 0, 0.4));
    z-index: 999;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0 16px;
    padding-bottom: calc(80px + env(safe-area-inset-bottom, 16px));
  }
  
  &__menu {
    @include glassmorphism(rgba(255, 255, 255, 0.9));
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    max-width: 320px;
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 4px 20px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
  
  &__menu-item {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: $gray-700;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background: rgba(37, 99, 235, 0.08);
      color: $primary;
      
      .mobile-bottom-bar__menu-icon {
        transform: scale(1.1);
        color: $primary;
      }
    }
    
    &:active {
      transform: scale(0.98);
    }
    
    span {
      font-size: 16px;
      font-weight: 500;
      font-family: $font-primary;
    }
    
    // Mode sombre
    @media (prefers-color-scheme: dark) {
      color: $gray-200;
      border-bottom-color: rgba(255, 255, 255, 0.1);
      
      &:hover {
        background: rgba(96, 165, 250, 0.15);
        color: $primary-light;
      }
    }
  }
  
  &__menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 16px;
    transition: all 0.2s ease;
    color: $gray-500;
  }
}

// Mode sombre global
@media (prefers-color-scheme: dark) {
  .mobile-bottom-bar__menu {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.3),
      0 4px 20px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

// Animations
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

// Support pour les écrans avec encoches
@supports (padding: max(0px)) {
  .mobile-bottom-bar {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
  
  .mobile-bottom-bar__overlay {
    padding-bottom: max(80px, calc(80px + env(safe-area-inset-bottom)));
  }
}
</style> 