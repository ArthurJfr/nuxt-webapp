<template>
  <div class="settings-page">
    <div class="settings-container">
      <PageTitle title="Paramètres" />
      
      <div class="settings-content">
        <!-- Section Compte -->
        <div class="settings-section">
          <h3 class="section-title">Compte</h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">Informations personnelles</div>
                <div class="setting-description">Modifier vos informations de profil</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">Sécurité</div>
                <div class="setting-description">Mot de passe et authentification</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Section Préférences -->
        <div class="settings-section">
          <h3 class="section-title">Préférences</h3>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">Thème</div>
                <div class="setting-description">{{ themeDescription }}</div>
              </div>
              <UiButton variant="secondary" size="sm" @click="toggleTheme">
                {{ isDark ? '🌙 Sombre' : '☀️ Clair' }}
              </UiButton>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">Notifications</div>
                <div class="setting-description">Gérer les notifications push</div>
              </div>
              <div class="toggle-switch">
                <input type="checkbox" id="notifications" class="toggle-input" checked>
                <label for="notifications" class="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>

        <!-- Section PWA -->
        <div class="settings-section">
          <h3 class="section-title">Application</h3>
          <div class="settings-list">
            <div class="setting-item" v-if="canInstall">
              <div class="setting-info">
                <div class="setting-label">Installer l'application</div>
                <div class="setting-description">Installer WikiNotes sur votre appareil</div>
              </div>
              <UiButton variant="primary" size="sm" @click="handleInstall">
                Installer
              </UiButton>
            </div>
            
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-label">Version</div>
                <div class="setting-description">Version 1.0.0</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Actions -->
        <div class="settings-section">
          <h3 class="section-title">Actions</h3>
          <div class="settings-list">
            <div class="setting-item danger">
              <div class="setting-info">
                <div class="setting-label">Se déconnecter</div>
                <div class="setting-description">Fermer votre session</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { canInstall, installPWA } = usePWADetection()
const { theme, isDark, toggleTheme } = useTheme()

definePageMeta({
  title: 'Paramètres'
})

const themeDescription = computed(() => {
  switch (theme.value) {
    case 'light':
      return 'Thème clair activé'
    case 'dark':
      return 'Thème sombre activé'
    case 'auto':
      return 'Suit les préférences système'
    default:
      return 'Thème automatique'
  }
})

const handleInstall = async () => {
  try {
    const installed = await installPWA()
    if (installed) {
      console.log('Application installée avec succès')
    }
  } catch (error) {
    console.error('Erreur lors de l\'installation:', error)
  }
}
</script>

<style lang="scss" scoped>
.settings-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 2rem 1rem;
  padding-bottom: 120px; // Espace pour la bottom bar
  transition: background-color 0.3s ease;
}

.settings-container {
  max-width: 600px;
  margin: 0 auto;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  padding: 1.5rem 1.5rem 1rem;
  margin: 0;
  transition: color 0.3s ease;
}

.settings-list {
  display: flex;
  flex-direction: column;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--bg-card-hover);
  }

  &.danger {
    .setting-label {
      color: $danger;
    }
    
    svg {
      color: $danger;
    }
  }
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.setting-description {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
}

// Toggle Switch
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border-color);
  transition: 0.3s;
  border-radius: 14px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.toggle-input:checked + .toggle-label {
  background-color: $primary;
}

.toggle-input:checked + .toggle-label:before {
  transform: translateX(20px);
}

@media (max-width: 640px) {
  .settings-page {
    padding: 1rem;
  }
  
  .section-title {
    padding: 1rem 1rem 0.5rem;
  }
  
  .setting-item {
    padding: 1rem;
  }
}
</style> 