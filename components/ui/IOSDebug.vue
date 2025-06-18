<template>
  <div v-if="showDebug" class="ios-debug">
    <h3>🍎 Diagnostic iOS</h3>
    <div class="debug-info">
      <p><strong>Device:</strong> {{ isIOS ? 'iOS détecté' : 'Non iOS' }}</p>
      <p><strong>PWA:</strong> {{ isPWAInstalled ? 'Installée' : 'Non installée' }}</p>
      <p><strong>Thème:</strong> {{ isDark ? 'Sombre' : 'Clair' }}</p>
      <p><strong>Safe Area Top:</strong> {{ safeAreaTop }}</p>
      <p><strong>User Agent:</strong> {{ userAgent }}</p>
      <p><strong>Status Bar Style:</strong> {{ statusBarStyle }}</p>
      <p><strong>Theme Color:</strong> {{ themeColor }}</p>
    </div>
    <button @click="forceUpdate" class="debug-button">
      🔄 Forcer la mise à jour
    </button>
    <button @click="showDebug = false" class="debug-button close">
      ❌ Fermer
    </button>
  </div>
  <button v-else @click="showDebug = true" class="debug-trigger">
    🔍 Debug iOS
  </button>
</template>

<script setup lang="ts">
const showDebug = ref(false)
const { isDark } = useTheme()
const { isIOS, isPWAInstalled } = useIOS()

const userAgent = computed(() => {
  if (process.client) {
    return navigator.userAgent
  }
  return 'N/A'
})

const safeAreaTop = computed(() => {
  if (process.client) {
    return getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0px'
  }
  return 'N/A'
})

const statusBarStyle = computed(() => {
  if (process.client) {
    const meta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
    return meta?.getAttribute('content') || 'N/A'
  }
  return 'N/A'
})

const themeColor = computed(() => {
  if (process.client) {
    const meta = document.querySelector('meta[name="theme-color"]')
    return meta?.getAttribute('content') || 'N/A'
  }
  return 'N/A'
})

const forceUpdate = () => {
  if (process.client) {
    // Déclencher manuellement la mise à jour
    const event = new CustomEvent('ios-statusbar-update', {
      detail: { isDark: isDark.value }
    })
    window.dispatchEvent(event)
    
    console.log('🔄 Mise à jour forcée de la status bar iOS')
  }
}
</script>

<style lang="scss" scoped>
.ios-debug {
  position: fixed;
  top: 50px;
  right: 10px;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  max-width: 300px;
  z-index: 10000;
  font-size: 0.8rem;
  box-shadow: 0 8px 24px var(--shadow-color-strong);
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
  }
  
  .debug-info p {
    margin: 0.25rem 0;
    color: var(--text-secondary);
    word-break: break-all;
  }
  
  .debug-button {
    margin: 0.5rem 0.5rem 0 0;
    padding: 0.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.7rem;
    
    &.close {
      background: var(--danger);
    }
    
    &:hover {
      opacity: 0.8;
    }
  }
}

.debug-trigger {
  position: fixed;
  bottom: 100px;
  right: 10px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 9998;
  font-size: 0.8rem;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  
  &:hover {
    transform: scale(1.1);
  }
}
</style> 