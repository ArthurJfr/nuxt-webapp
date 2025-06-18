<script setup lang="ts">
import Header from './components/landing/Header.vue';
// import MobileBottomBar from './components/ui/MobileBottomBar.vue';
import SimpleMobileBar from './components/ui/SimpleMobileBar.vue';
// import PWATestBanner from './components/ui/PWATestBanner.vue';
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

// Configuration PWA
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.json' }
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'WikiNotes' }
  ]
})
</script>

<template>
  <div>
    <!-- Splashscreen iOS -->
    <SplashScreen />
    
    <!-- Bannière de test PWA (développement uniquement) -->
    <!-- <PWATestBanner /> -->
    
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
</template>

<style>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: opacity 0.15s ease;
}

.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
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
</style>
