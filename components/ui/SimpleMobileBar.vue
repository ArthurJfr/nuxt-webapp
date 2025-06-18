<template>
  <div 
    v-if="isMobile"
    class="simple-mobile-bar"
    :class="{ 'simple-mobile-bar--dark': isDark }"
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
            <span>Créer une note</span>
          </div>
          
          <div class="simple-mobile-bar__menu-item" @click="handleMenuAction('search')">
            <div class="simple-mobile-bar__menu-icon">
              <FontAwesomeIcon :icon="['fas', 'search']" />
            </div>
            <span>Rechercher</span>
          </div>

          <div class="simple-mobile-bar__menu-item" @click="handleMenuAction('favorites')">
            <div class="simple-mobile-bar__menu-icon">
              <FontAwesomeIcon :icon="['fas', 'star']" />
            </div>
            <span>Favoris</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Utiliser les composables
const { isMobile } = useMobile()
const { isDark } = useTheme()

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
    // Thème clair par défaut
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.7) 100%);
    backdrop-filter: blur(25px) saturate(1.8) brightness(1.1);
    -webkit-backdrop-filter: blur(25px) saturate(1.8) brightness(1.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.15),
      0 8px 25px rgba(0, 0, 0, 0.1),
      0 3px 10px rgba(0, 0, 0, 0.08),
      inset 0 2px 0 rgba(255, 255, 255, 0.8),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2);
    
    border-radius: 28px;
    margin-bottom: 16px;
    overflow: visible;
    position: relative;
    animation: slideUpGlass 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    
    // Effet de réflexion
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.1) 0%, 
        transparent 100%);
      border-radius: inherit;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      pointer-events: none;
    }
  }
  
  // Thème sombre
  &--dark &__container {
    background: linear-gradient(135deg, 
      rgba(30, 41, 59, 0.9) 0%, 
      rgba(15, 23, 42, 0.7) 100%);
    backdrop-filter: blur(25px) saturate(1.8) brightness(0.9);
    -webkit-backdrop-filter: blur(25px) saturate(1.8) brightness(0.9);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.6),
      0 8px 25px rgba(0, 0, 0, 0.4),
      0 3px 10px rgba(0, 0, 0, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08);
      
    &::after {
      background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.05) 0%, 
        transparent 100%);
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
    padding: 14px;
    border-radius: 22px;
    text-decoration: none;
    color: $gray-600;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    min-width: 52px;
    min-height: 52px;
    cursor: pointer;
    border: none;
    background: transparent;
    
    // Effet de survol avec glassmorphisme
    &:hover {
      background: linear-gradient(135deg, 
        rgba(37, 99, 235, 0.15) 0%, 
        rgba(37, 99, 235, 0.08) 100%);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(37, 99, 235, 0.2);
      color: $primary;
      transform: scale(1.1) translateY(-2px);
      box-shadow: 
        0 8px 25px rgba(37, 99, 235, 0.2),
        0 3px 10px rgba(37, 99, 235, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    // État actif avec glassmorphisme renforcé
    &--active {
      color: $primary;
      background: linear-gradient(135deg, 
        rgba(37, 99, 235, 0.25) 0%, 
        rgba(37, 99, 235, 0.12) 100%);
      backdrop-filter: blur(15px) saturate(1.5);
      -webkit-backdrop-filter: blur(15px) saturate(1.5);
      border: 1px solid rgba(37, 99, 235, 0.3);
      box-shadow: 
        0 6px 20px rgba(37, 99, 235, 0.25),
        0 2px 8px rgba(37, 99, 235, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(37, 99, 235, 0.1);
      
      .simple-mobile-bar__icon {
        transform: scale(1.15);
      }
    }
    
    // Bouton accent (Plus) avec effet glassmorphisme premium
    &--accent {
      background: linear-gradient(135deg, 
        rgba(37, 99, 235, 0.9) 0%, 
        rgba(59, 130, 246, 0.8) 50%,
        rgba(37, 99, 235, 0.9) 100%);
      backdrop-filter: blur(20px) saturate(1.8);
      -webkit-backdrop-filter: blur(20px) saturate(1.8);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      box-shadow: 
        0 8px 32px rgba(37, 99, 235, 0.4),
        0 4px 16px rgba(37, 99, 235, 0.3),
        0 1px 4px rgba(37, 99, 235, 0.2),
        inset 0 2px 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 rgba(37, 99, 235, 0.2);
      
      // Effet de pulsation subtile
      animation: pulseGlow 3s ease-in-out infinite;
      
      &:hover {
        background: linear-gradient(135deg, 
          rgba(29, 78, 216, 0.95) 0%, 
          rgba(37, 99, 235, 0.85) 50%,
          rgba(29, 78, 216, 0.95) 100%);
        transform: scale(1.15) translateY(-3px);
        box-shadow: 
          0 12px 40px rgba(37, 99, 235, 0.5),
          0 6px 20px rgba(37, 99, 235, 0.4),
          0 2px 8px rgba(37, 99, 235, 0.3),
          inset 0 2px 0 rgba(255, 255, 255, 0.5),
          inset 0 -1px 0 rgba(29, 78, 216, 0.3);
      }
    }
    

  }
  
  // Styles pour le thème sombre des items
  &--dark &__item {
    color: $gray-300;
    
    &:hover {
      background: linear-gradient(135deg, 
        rgba(96, 165, 250, 0.2) 0%, 
        rgba(96, 165, 250, 0.1) 100%);
      border: 1px solid rgba(96, 165, 250, 0.25);
      color: $primary-light;
      box-shadow: 
        0 8px 25px rgba(96, 165, 250, 0.25),
        0 3px 10px rgba(96, 165, 250, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
    
    &--active {
      color: $primary-light;
      background: linear-gradient(135deg, 
        rgba(96, 165, 250, 0.3) 0%, 
        rgba(96, 165, 250, 0.15) 100%);
      border: 1px solid rgba(96, 165, 250, 0.35);
      box-shadow: 
        0 6px 20px rgba(96, 165, 250, 0.3),
        0 2px 8px rgba(96, 165, 250, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(96, 165, 250, 0.15);
    }
    
    &--accent {
      background: linear-gradient(135deg, 
        rgba(96, 165, 250, 0.9) 0%, 
        rgba(59, 130, 246, 0.8) 50%,
        rgba(96, 165, 250, 0.9) 100%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        background: linear-gradient(135deg, 
          rgba(59, 130, 246, 0.95) 0%, 
          rgba(96, 165, 250, 0.85) 50%,
          rgba(59, 130, 246, 0.95) 100%);
      }
    }
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 24px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    svg {
      width: 100%;
      height: 100%;
    }
    
    .rotate-45 {
      transform: rotate(45deg);
    }
  }

  // Styles pour le menu contextuel
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 120px; // Espace pour la bottom bar
  }

  &__menu {
    // ✅ Propriétés de base d'abord
    border-radius: 28px;
    padding: 20px;
    margin: 0 20px;
    min-width: 300px;
    animation: menuSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    
    // ✅ Mixin sans media queries
    @include glassmorphism-floating-light('strong');
  }
  
  // ✅ Thème sombre séparé
  &--dark &__menu {
    @include glassmorphism-floating-dark('strong');
  }

  &__menu-item {
    display: flex;
    align-items: center;
    padding: 18px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    color: $gray-700;
    position: relative;
    
    // Effet de survol avec glassmorphisme
    &:hover {
      background: linear-gradient(135deg, 
        rgba(37, 99, 235, 0.15) 0%, 
        rgba(37, 99, 235, 0.08) 100%);
      backdrop-filter: blur(10px) saturate(1.5);
      -webkit-backdrop-filter: blur(10px) saturate(1.5);
      border: 1px solid rgba(37, 99, 235, 0.2);
      color: $primary;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 
        0 8px 25px rgba(37, 99, 235, 0.2),
        0 3px 10px rgba(37, 99, 235, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    
    span {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    

  }
  
  // Styles pour le thème sombre du menu
  &--dark &__menu-item {
    color: $gray-200;
    
    &:hover {
      background: linear-gradient(135deg, 
        rgba(96, 165, 250, 0.2) 0%, 
        rgba(96, 165, 250, 0.1) 100%);
      border: 1px solid rgba(96, 165, 250, 0.25);
      color: $primary-light;
      box-shadow: 
        0 8px 25px rgba(96, 165, 250, 0.25),
        0 3px 10px rgba(96, 165, 250, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
  }

  &__menu-icon {
    width: 24px;
    height: 24px;
    font-size: 20px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }
}

// Animations keyframes
@keyframes slideUpGlass {
  0% {
    opacity: 0;
    transform: translateY(100px) scale(0.9);
    backdrop-filter: blur(0px);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    backdrop-filter: blur(25px);
  }
}

@keyframes menuSlideUp {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    backdrop-filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    backdrop-filter: blur(30px);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 
      0 8px 32px rgba(37, 99, 235, 0.4),
      0 4px 16px rgba(37, 99, 235, 0.3),
      0 1px 4px rgba(37, 99, 235, 0.2),
      inset 0 2px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(37, 99, 235, 0.2);
  }
  50% {
    box-shadow: 
      0 12px 40px rgba(37, 99, 235, 0.5),
      0 6px 20px rgba(37, 99, 235, 0.4),
      0 2px 8px rgba(37, 99, 235, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(37, 99, 235, 0.3);
  }
}

// Responsive
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

// Amélioration pour les écrans haute résolution
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .simple-mobile-bar {
    &__container {
      backdrop-filter: blur(30px) saturate(1.8) brightness(1.1);
      -webkit-backdrop-filter: blur(30px) saturate(1.8) brightness(1.1);
    }
  }
}
</style> 