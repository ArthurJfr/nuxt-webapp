<template>
  <div v-if="isDev" class="pwa-test-banner">
    <div class="pwa-test-content">
      <h4>🔧 Mode Développement - État PWA</h4>
      <div class="pwa-status">
        <div class="status-item">
          <span class="label">PWA Détectée:</span>
          <span class="value" :class="{ active: isPWA }">{{ isPWA ? '✅ Oui' : '❌ Non' }}</span>
        </div>
        <div class="status-item">
          <span class="label">Mobile:</span>
          <span class="value" :class="{ active: isMobile }">{{ isMobile ? '✅ Oui' : '❌ Non' }}</span>
        </div>
        <div class="status-item">
          <span class="label">Standalone:</span>
          <span class="value" :class="{ active: isStandalone }">{{ isStandalone ? '✅ Oui' : '❌ Non' }}</span>
        </div>
        <div class="status-item">
          <span class="label">Installable:</span>
          <span class="value" :class="{ active: isInstallable }">{{ isInstallable ? '✅ Oui' : '❌ Non' }}</span>
        </div>
        <div class="status-item">
          <span class="label">Afficher UI Mobile:</span>
          <span class="value" :class="{ active: showMobileUI }">{{ showMobileUI ? '✅ Oui' : '❌ Non' }}</span>
        </div>
      </div>
      <div class="test-actions">
        <button @click="forceShowMobile = !forceShowMobile" class="test-btn">
          {{ forceShowMobile ? '🔄 Désactiver' : '📱 Forcer Affichage Mobile' }}
        </button>
        <button v-if="canInstall" @click="handleInstall" class="test-btn install">
          📥 Installer PWA
        </button>
      </div>
      <p class="test-hint">
        💡 Pour tester la barre mobile: Redimensionnez la fenêtre ou utilisez le mode responsive du navigateur
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { isPWA, isMobile, isStandalone, isInstallable, showMobileUI, canInstall, installPWA } = usePWA()

const isDev = process.dev
const forceShowMobile = ref(false)

const handleInstall = async () => {
  try {
    const result = await installPWA()
    if (result) {
      console.log('PWA installée avec succès!')
    }
  } catch (error) {
    console.error('Erreur installation PWA:', error)
  }
}

// Pour les tests en développement, on peut forcer l'affichage
const actualShowMobileUI = computed(() => showMobileUI.value || forceShowMobile.value)

// Exposer pour que le parent puisse l'utiliser
defineExpose({
  forceShowMobile: computed(() => forceShowMobile.value)
})
</script>

<style lang="scss" scoped>
.pwa-test-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pwa-test-content {
  padding: 12px 16px;
  max-width: 1200px;
  margin: 0 auto;
}

h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
}

.pwa-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-size: 12px;
}

.label {
  color: #cbd5e1;
  font-weight: 500;
}

.value {
  color: #ef4444;
  font-weight: 600;
  
  &.active {
    color: #22c55e;
  }
}

.test-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.test-btn {
  padding: 6px 12px;
  background: rgba(37, 99, 235, 0.8);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(37, 99, 235, 1);
    transform: translateY(-1px);
  }
  
  &.install {
    background: rgba(34, 197, 94, 0.8);
    
    &:hover {
      background: rgba(34, 197, 94, 1);
    }
  }
}

.test-hint {
  font-size: 11px;
  color: #94a3b8;
  margin: 0;
  font-style: italic;
}

@media (max-width: 768px) {
  .pwa-test-content {
    padding: 8px 12px;
  }
  
  .pwa-status {
    grid-template-columns: 1fr;
  }
  
  h4 {
    font-size: 13px;
  }
}
</style> 