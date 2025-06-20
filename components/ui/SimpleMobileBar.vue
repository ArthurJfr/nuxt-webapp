<template>
  <div 
    v-if="isMobile"
    class="webapp-bottom-nav"
  >
    <div class="webapp-bottom-nav__container glass-card">
      <div class="webapp-bottom-nav__nav">
        <NuxtLink 
          v-for="item in navItems"
          :key="item.name"
          :to="item.route"
          class="webapp-bottom-nav__item"
          :class="{ 'webapp-bottom-nav__item--active': isActive(item.route) }"
        >
          <div class="webapp-bottom-nav__icon">
            <FontAwesomeIcon :icon="item.icon" />
          </div>
        </NuxtLink>

        <!-- Bouton Menu -->
        <button 
          class="webapp-bottom-nav__item webapp-bottom-nav__menu-btn"
          :class="{ 'webapp-bottom-nav__item--active': showMenu }"
          @click.stop="toggleMenu"
          type="button"
        >
          <div class="webapp-bottom-nav__icon">
            <FontAwesomeIcon 
              :icon="['fas', 'ellipsis-h']" 
              :class="{ 'rotate-90': showMenu }"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- Menu flottant -->
    <Transition name="menu-slide">
      <div 
        v-if="showMenu" 
        class="webapp-menu-overlay" 
        @click="handleOverlayClick"
        @touchstart="handleOverlayClick"
      >
        <div class="webapp-menu" @click.stop @touchstart.stop>
          <div class="webapp-menu__header">
            <h3>Actions fichiers</h3>
            <button 
              class="webapp-menu__close" 
              @click="forceCloseMenu" 
              @touchstart="forceCloseMenu"
              type="button"
            >
              <FontAwesomeIcon :icon="['fas', 'times']" />
            </button>
          </div>
          
          <div class="webapp-menu__content">
            <button 
              v-for="action in menuActions"
              :key="action.name"
              class="webapp-menu__action"
              @click="handleAction(action.name)"
            >
              <div class="webapp-menu__action-icon">
                <FontAwesomeIcon :icon="action.icon" />
              </div>
              <div class="webapp-menu__action-text">
                <span class="webapp-menu__action-title">{{ action.title }}</span>
                <span class="webapp-menu__action-desc">{{ action.description }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Composable
const { isMobile } = useMobile()
const route = useRoute()
const router = useRouter()

// État
const showMenu = ref(false)

// Navigation items pour app de partage de fichiers
const navItems = [
  {
    name: 'files',
    route: '/dashboard',
    icon: ['fas', 'folder'],
    label: 'Fichiers'
  },
  {
    name: 'shared',
    route: '/shared',
    icon: ['fas', 'share-alt'],
    label: 'Partagés'
  },
  {
    name: 'recent',
    route: '/recent',
    icon: ['fas', 'clock'],
    label: 'Récents'
  },
  {
    name: 'profile',
    route: '/profile',
    icon: ['fas', 'user'],
    label: 'Profil'
  }
]

// Actions du menu pour partage de fichiers
const menuActions = [
  {
    name: 'upload',
    title: 'Upload fichier',
    description: 'Ajouter un nouveau fichier',
    icon: ['fas', 'cloud-upload-alt']
  },
  {
    name: 'create-folder',
    title: 'Nouveau dossier',
    description: 'Créer un dossier',
    icon: ['fas', 'folder-plus']
  },
  {
    name: 'share-link',
    title: 'Lien de partage',
    description: 'Créer un lien de partage',
    icon: ['fas', 'link']
  },
  {
    name: 'collaborate',
    title: 'Collaborer',
    description: 'Inviter des collaborateurs',
    icon: ['fas', 'user-plus']
  },
  {
    name: 'sync',
    title: 'Synchroniser',
    description: 'Sync avec le cloud',
    icon: ['fas', 'sync-alt']
  },
  {
    name: 'settings',
    title: 'Paramètres',
    description: 'Gérer les paramètres',
    icon: ['fas', 'cog']
  }
]

// Vérifier si une route est active
const isActive = (routePath: string) => {
  if (routePath === '/dashboard') {
    return route.path === '/' || route.path === '/dashboard'
  }
  return route.path.startsWith(routePath)
}

// Gestion du menu
const toggleMenu = () => {
  console.log('Toggle menu:', !showMenu.value) // Debug
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  console.log('Fermeture du menu - avant:', showMenu.value) // Debug
  showMenu.value = false
  console.log('Fermeture du menu - après:', showMenu.value) // Debug
}

// Force close pour le bouton X
const forceCloseMenu = (event?: Event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  console.log('Force close menu') // Debug
  showMenu.value = false
}

// Gestion du clic sur l'overlay
const handleOverlayClick = (event: Event) => {
  // Vérifier que le clic est bien sur l'overlay et pas sur le menu
  if (event.target === event.currentTarget) {
    console.log('Clic sur overlay') // Debug
    closeMenu()
  }
}

const handleAction = (actionName: string) => {
  console.log(`Action fichier: ${actionName}`)
  closeMenu()
  
  // Logique pour app de partage de fichiers
  switch (actionName) {
    case 'upload':
      // Ouvrir le sélecteur de fichiers
      triggerFileUpload()
      break
    case 'create-folder':
      // Créer un nouveau dossier
      createNewFolder()
      break
    case 'share-link':
      // Générer un lien de partage
      generateShareLink()
      break
    case 'collaborate':
      // Inviter des collaborateurs
      inviteCollaborators()
      break
    case 'sync':
      // Synchroniser avec le cloud
      syncWithCloud()
      break
    case 'settings':
      // Naviguer vers les paramètres
      router.push('/settings')
      break
    default:
      console.log(`Action non implémentée: ${actionName}`)
  }
}

// Fonctions spécifiques au partage de fichiers
const triggerFileUpload = () => {
  // Créer un input file invisible et le déclencher
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.accept = '*/*'
  input.onchange = (event) => {
    const files = (event.target as HTMLInputElement).files
    if (files) {
      console.log('Fichiers sélectionnés:', files)
      // Ici vous pourrez ajouter la logique d'upload
    }
  }
  input.click()
}

const createNewFolder = () => {
  // Logique pour créer un nouveau dossier
  console.log('Création d\'un nouveau dossier')
  // Ici vous pourrez ajouter un modal ou une popup
}

const generateShareLink = () => {
  // Logique pour générer un lien de partage
  console.log('Génération d\'un lien de partage')
  // Ici vous pourrez ajouter la logique de partage
}

const inviteCollaborators = () => {
  // Logique pour inviter des collaborateurs
  console.log('Invitation de collaborateurs')
  // Ici vous pourrez ajouter un modal d'invitation
}

const syncWithCloud = () => {
  // Logique de synchronisation
  console.log('Synchronisation avec le cloud')
  // Ici vous pourrez ajouter la logique de sync
}

// Gestion des événements clavier
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showMenu.value) {
    console.log('Fermeture par ESC') // Debug
    forceCloseMenu()
  }
}

// Watcher pour debug
watch(showMenu, (newValue, oldValue) => {
  console.log('showMenu changed:', oldValue, '->', newValue)
}, { immediate: true })

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables.scss' as *;

.webapp-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: $spacing-sm;
  background: transparent;
  pointer-events: none;
}

.webapp-bottom-nav__container {
  @extend %glass-card-base;
  max-width: 400px;
  margin: 0 auto;
  border-radius: $radius-2xl;
  padding: $spacing-sm;
  pointer-events: all;
  background: $glass-bg-primary;
  backdrop-filter: $glass-blur-strong;
  -webkit-backdrop-filter: $glass-blur-strong;
  border: 1px solid $glass-border-primary;
  box-shadow: $glass-shadow-medium;
}

.webapp-bottom-nav__nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.webapp-bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: $spacing-sm;
  border-radius: $radius-md;
  text-decoration: none;
  transition: $glass-transition-fast;
  color: $gray-500;
  min-width: 64px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: $glass-bg-secondary;
    border-radius: $radius-md;
    opacity: 0;
    transition: $glass-transition-fast;
  }
  
  &:hover {
    color: $gray-700;
    transform: translateY(-1px);
    
    &::before {
      opacity: 1;
    }
  }
  
  &--active {
    color: $primary;
    
    &::before {
      opacity: 1;
      background: rgba($primary, 0.1);
    }
    
    .webapp-bottom-nav__icon {
      transform: scale(1.1);
    }
  }
}

.webapp-bottom-nav__icon {
  font-size: $mobile-nav-icon-size;
  transition: $glass-transition-fast;
  position: relative;
  z-index: 1;
  
  &.rotate-90 {
    transform: rotate(90deg);
  }
}

.webapp-bottom-nav__label {
  font-size: $mobile-nav-label-size;
  font-weight: 500;
  position: relative;
  z-index: 1;
  white-space: nowrap;
}

// Animation d'entrée
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.webapp-bottom-nav {
  animation: slideUp 0.3s ease-out;
}

// Responsive
@media (max-width: $mobile) {
  .webapp-bottom-nav {
    padding: $spacing-xs;
  }
  
  .webapp-bottom-nav__container {
    max-width: none;
    margin: 0 $spacing-xs;
  }
  
  .webapp-bottom-nav__item {
    min-width: 56px;
    padding: $spacing-xs;
  }
  
  .webapp-bottom-nav__icon {
    font-size: $mobile-nav-icon-size-mobile;
  }
  
  .webapp-bottom-nav__label {
    font-size: $mobile-nav-label-size-mobile;
  }
}

// Menu flottant
.webapp-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1001;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 12px 90px 12px;
  cursor: pointer;
  
  // S'assurer que l'overlay est bien cliquable
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}

.webapp-menu {
  background: $white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  cursor: default;
  pointer-events: all;
  
  // Ombre moderne
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.1);
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 16px 24px;
    border-bottom: 1px solid $gray-100;
    
    h3 {
      font-size: $mobile-menu-header-size;
      font-weight: 600;
      color: $gray-900;
      font-family: $font-primary;
      margin: 0;
    }
  }
  
  &__close {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: $gray-100;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: $gray-200;
      color: $gray-700;
    }
  }
  
  &__content {
    padding: 8px 0 16px 0;
  }
  
  &__action {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    padding: 16px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    
    &:hover {
      background: $gray-50;
    }
    
    &:active {
      background: $gray-100;
    }
  }
  
  &__action-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    font-size: $mobile-menu-action-icon-size;
    flex-shrink: 0;
  }
  
  &__action-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  &__action-title {
    font-size: $mobile-menu-action-title-size;
    font-weight: 600;
    color: $gray-900;
    font-family: $font-primary;
  }
  
  &__action-desc {
    font-size: $mobile-menu-action-desc-size;
    color: $gray-500;
    font-family: $font-primary;
  }
}

// Animations
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.menu-slide-enter-active .webapp-menu,
.menu-slide-leave-active .webapp-menu {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-slide-enter-from .webapp-menu {
  transform: translateY(100px);
}

.menu-slide-leave-to .webapp-menu {
  transform: translateY(100px);
}

// Mode sombre (optionnel)
@media (prefers-color-scheme: dark) {
  .webapp-bottom-nav {
    &__container {
      background: rgba($gray-900, 0.95);
      border-top-color: rgba($gray-700, 0.8);
    }
    
    &__item {
      color: $gray-400;
      
      &:hover {
        background: rgba($primary, 0.15);
        color: $primary-light;
      }
      
      &--active {
        color: $primary-light;
        background: rgba($primary, 0.2);
      }
    }
  }
  
  .webapp-menu {
    background: $gray-800;
    
    &__header {
      border-bottom-color: $gray-700;
      
      h3 {
        color: $white;
      }
    }
    
    &__close {
      background: $gray-700;
      color: $gray-300;
      
      &:hover {
        background: $gray-600;
        color: $white;
      }
    }
    
    &__action {
      &:hover {
        background: $gray-700;
      }
      
      &:active {
        background: $gray-600;
      }
    }
    
    &__action-title {
      color: $white;
    }
    
    &__action-desc {
      color: $gray-400;
    }
  }
}
</style> 