<script setup lang="ts">
import Header from './components/landing/Header.vue';
import SimpleMobileBar from './components/ui/SimpleMobileBar.vue';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';
import { useHead } from 'nuxt/app';

const route = useRoute();
const isDashboard = computed(() => {
  return route.path.startsWith('/dashboard');
});

// Détection mobile pour masquer le Header
const { isMobile } = useMobile();

// Initialisation du thème global
const { isDark } = useTheme();

// Système de splashscreen global
const { isVisible: showSplash, loadingType, showForInitialLoad, showForReload } = useSplashScreen();

// Condition pour afficher le Header : pas dashboard ET pas mobile
const showHeader = computed(() => {
  return !isDashboard.value && !isMobile.value;
});

// Fonction pour s'assurer que le contexte WebGL est nettoyé avant les transitions
const cleanupWebGL = () => {
  // Forcer le nettoyage des contextes WebGL
  const canvases = document.querySelectorAll('canvas');
  canvases.forEach(canvas => {
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (gl) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  });
}

// Gestion du chargement initial
onMounted(async () => {
  // Détecter si c'est un rechargement ou un chargement initial
  const isReload = sessionStorage.getItem('app-loaded') === 'true';
  
  if (isReload) {
    await showForReload();
  } else {
    await showForInitialLoad();
    sessionStorage.setItem('app-loaded', 'true');
  }
});

// Nettoyer au démontage
onBeforeUnmount(() => {
  sessionStorage.removeItem('app-loaded');
});

// Configuration PWA
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }
  ],
  meta: [
    { name: 'theme-color', content: '#000000' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'WikiNotes' }
  ]
})
</script>

<template>
  <div>
    <!-- Splashscreen global - s'affiche pour tous les chargements -->
    <SplashScreen v-show="showSplash" :loading-type="loadingType" :key="'global-splash'" />
    
    <!-- Application principale -->
    <div v-show="!showSplash" class="app-container">
      <Header v-if="showHeader" />
      <NuxtLayout>
        <NuxtPage :transition="{
          name: 'page-transition',
          mode: 'out-in',
          onBeforeLeave: cleanupWebGL
        }" />
      </NuxtLayout>
      <!-- Barre de navigation mobile PWA -->
      <ClientOnly>
        <SimpleMobileBar />
      </ClientOnly>
    </div>
  </div>
</template>

<style>
/* Préchargement des polices critiques */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.15s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
}

/* Transition fluide pour l'application après le splashscreen */
.app-container {
  animation: appFadeIn 0.8s ease-out;
}

@keyframes appFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optimisation pour les navigations rapides */
.splash-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.splash-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Ajustement global pour le contenu mobile avec bottom bar */
@media (max-width: 768px) {
  body {
    padding-bottom: 100px; /* Espace pour la bottom bar */
  }
  
  /* S'assurer que le contenu principal a de l'espace */
  main, .nuxt-page, [data-nuxt-page] {
    padding-bottom: 100px;
  }
}

@use "@/assets/scss/variables" as *;

/* Background global uniforme pour toutes les pages */
html {
  background: linear-gradient(135deg, 
    #000000 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #000000 75%, 
    #1a1a1a 100%
  ) !important;
  background-attachment: fixed;
  min-height: 100vh;
}

body {
  background: transparent !important;
  color: #ffffff;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
}

#__nuxt {
  background: transparent;
  min-height: 100vh;
}

/* Animation spéciale pour les chargements de navigation */
.navigation-loading .splash-screen {
  animation: quickFadeIn 0.4s ease-out;
}

@keyframes quickFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optimisation des performances */
.splash-screen * {
  will-change: transform, opacity;
}

/* Désactiver les interactions pendant le chargement */
.splash-screen {
  pointer-events: none;
  user-select: none;
}
</style>
