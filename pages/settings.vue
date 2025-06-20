<template>
  <div class="settings-page">
    <!-- Background effects -->
    <div class="settings-background">
      <div class="settings-particles">
        <div 
          v-for="i in 40" 
          :key="i" 
          class="particle"
          :style="{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 30 + 's',
            animationDuration: (Math.random() * 20 + 8) + 's',
            width: (Math.random() * 10 + 2) + 'px',
            height: (Math.random() * 10 + 2) + 'px'
          }"
        />
      </div>
      
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
    
    <div class="settings-overlay"></div>
    
    <div class="settings-container">
      <!-- Header avec titre -->
      <div class="page-header">
        <h1 class="page-title">Paramètres</h1>
        <p class="page-subtitle">Personnalisez votre expérience</p>
      </div>
      
      <div class="settings-content">
        <!-- Section Compte -->
        <Card type="auth-card" class="settings-section">
          <div class="section-header">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          <h3 class="section-title">Compte</h3>
          </div>
          
          <div class="settings-list">
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Informations personnelles</div>
                <div class="setting-description">Modifier vos informations de profil</div>
              </div>
              <div class="setting-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
              </div>
            </div>
            
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Sécurité</div>
                <div class="setting-description">Mot de passe et authentification</div>
              </div>
              <div class="setting-action">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </div>
          </div>
        </div>
        </Card>

        <!-- Section Préférences -->
        <Card type="auth-card" class="settings-section">
          <div class="section-header">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
            </div>
          <h3 class="section-title">Préférences</h3>
          </div>
          
          <div class="settings-list">
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Thème</div>
                <div class="setting-description">{{ themeDescription }}</div>
              </div>
              <button class="theme-btn glass-btn" @click="toggleTheme">
                {{ isDark ? '🌙' : '☀️' }}
              </button>
            </div>
            
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Notifications</div>
                <div class="setting-description">Gérer les notifications push</div>
              </div>
              <div class="toggle-switch">
                <input type="checkbox" id="notifications" class="toggle-input" checked>
                <label for="notifications" class="toggle-label"></label>
              </div>
            </div>
            
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Langue</div>
                <div class="setting-description">Français (France)</div>
              </div>
              <div class="setting-action">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </div>
            </div>
          </div>
        </Card>

        <!-- Section Application -->
        <Card type="auth-card" class="settings-section">
          <div class="section-header">
            <div class="section-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3 class="section-title">Application</h3>
        </div>

          <div class="settings-list">
            <div class="setting-item glass-card-mini" v-if="canInstall">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Installer l'application</div>
                <div class="setting-description">Installer FileShare sur votre appareil</div>
              </div>
              <button class="install-btn btn-primary" @click="handleInstall">
                Installer
              </button>
            </div>
            
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="6" x2="12" y2="12"/>
                  <line x1="16.24" y1="7.76" x2="12" y2="12"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Version</div>
                <div class="setting-description">FileShare v1.0.0</div>
              </div>
              <div class="version-badge">
                <span>Stable</span>
              </div>
            </div>
            
            <div class="setting-item glass-card-mini">
              <div class="setting-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M13 12h3a2 2 0 0 1 2 2v1"/>
                  <path d="M13 12h-3a2 2 0 0 0-2 2v1"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Mise à jour automatique</div>
                <div class="setting-description">Vérifier automatiquement les mises à jour</div>
              </div>
              <div class="toggle-switch">
                <input type="checkbox" id="auto-update" class="toggle-input" checked>
                <label for="auto-update" class="toggle-label"></label>
              </div>
            </div>
          </div>
        </Card>

        <!-- Section Actions -->
        <Card type="auth-card" class="settings-section">
          <div class="section-header">
            <div class="section-icon danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h3 class="section-title danger">Actions</h3>
          </div>
          
          <div class="settings-list">
            <div class="setting-item glass-card-mini danger">
              <div class="setting-icon danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
              <div class="setting-info">
                <div class="setting-label">Se déconnecter</div>
                <div class="setting-description">Fermer votre session</div>
              </div>
              <div class="setting-action danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9,18 15,12 9,6"/>
              </svg>
              </div>
            </div>
          </div>
        </Card>
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
@use "@/assets/scss/variables" as *;

.settings-page {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #0a0a0a 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #1a1a1a 75%, 
    #0a0a0a 100%
  );
  color: $white;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding: $spacing-lg 0;
  padding-bottom: 120px; // Espace pour la bottom bar
}

// Background effects
.settings-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.settings-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: particleFloat infinite linear;
  filter: blur(1px);
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &.shape-1 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    top: 15%;
    left: 10%;
    animation: floatShape 20s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 70px;
    height: 70px;
    border-radius: 15px;
    top: 70%;
    right: 15%;
    animation: floatShape 25s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    bottom: 30%;
    left: 70%;
    animation: floatShape 18s ease-in-out infinite;
  }
}

.settings-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, 
    rgba(0, 0, 0, 0.1) 0%, 
    rgba(0, 0, 0, 0.3) 100%);
}

// Container principal
.settings-container {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
  width: 100%;
  box-sizing: border-box;
}

// Header de la page
.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;
}

.page-title {
  font-size: 4.5rem;
  font-weight: 900;
  color: $white;
  margin: 0 0 $spacing-sm 0;
  background: linear-gradient(135deg, 
    $white 0%, 
    rgba(255, 255, 255, 0.9) 50%,
    rgba(59, 130, 246, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin: 0;
}

// Contenu des paramètres
.settings-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.settings-section {
  width: 100%;
}

// Header de section
.section-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-sm;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:nth-child(1) {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    color: $white;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  }
  
  &:nth-child(2) {
    background: linear-gradient(135deg, #10B981 0%, #047857 100%);
    color: $white;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }
  
  &:nth-child(3) {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    color: $white;
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }
  
  &.danger {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    color: $white;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: $white;
  margin: 0;
  
  &.danger {
    color: rgba(239, 68, 68, 0.9);
  }
}

// Liste des paramètres
.settings-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  &.danger {
    .setting-icon,
    .setting-action {
      color: rgba(239, 68, 68, 0.8);
    }
    
    .setting-label {
      color: rgba(239, 68, 68, 0.9);
    }
  }
}

.setting-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  flex-shrink: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  // Couleurs spécifiques par type de paramètre
  .setting-item:nth-child(1) & {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  }
  
  .setting-item:nth-child(2) & {
    background: linear-gradient(135deg, #10B981 0%, #047857 100%);
  }
  
  .setting-item:nth-child(3) & {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  }
  
  .setting-item:nth-child(4) & {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  }
  
  .setting-item:nth-child(5) & {
    background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
  }
  
  .setting-item:nth-child(6) & {
    background: linear-gradient(135deg, #84CC16 0%, #65A30D 100%);
  }
  
  &.danger {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  }
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-weight: 600;
  color: $white;
  margin-bottom: 2px;
  font-size: 1rem;
}

.setting-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.setting-action {
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: translateX(2px);
  }
  
  &.danger {
    color: rgba(239, 68, 68, 0.8);
  }
}

// Boutons spéciaux
.theme-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: $white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }
}

.install-btn {
  padding: $spacing-xs $spacing-sm;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%);
  color: $white;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
}

.version-badge {
  padding: 4px 12px;
  border-radius: 20px;
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.2) 0%, 
    rgba(5, 150, 105, 0.2) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  
  span {
    color: rgba(16, 185, 129, 0.9);
    font-size: 0.75rem;
    font-weight: 600;
  }
}

// Toggle Switch amélioré
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;
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
  background: rgba(255, 255, 255, 0.2);
  transition: 0.3s;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.7) 100%);
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
}

.toggle-input:checked + .toggle-label {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.8) 0%, 
    rgba(139, 92, 246, 0.8) 100%);
  border-color: rgba(59, 130, 246, 0.5);
}

.toggle-input:checked + .toggle-label:before {
  transform: translateX(20px);
  background: $white;
}

// Styles glassmorphisme
.glass-card-mini {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// Animations
@keyframes megaGradient {
  0% { background-position: 0% 50%; }
  25% { background-position: 100% 25%; }
  50% { background-position: 50% 100%; }
  75% { background-position: 25% 0%; }
  100% { background-position: 0% 50%; }
}

@keyframes titleBounce {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    text-shadow: 0 0 40px rgba(255, 107, 107, 0.6);
  }
  25% {
    transform: scale(1.1) rotate(2deg);
    text-shadow: 0 0 60px rgba(78, 205, 196, 0.8);
  }
  50% { 
    transform: scale(1.15) rotate(-1deg);
    text-shadow: 0 0 80px rgba(69, 183, 209, 1);
  }
  75% {
    transform: scale(1.05) rotate(1deg);
    text-shadow: 0 0 60px rgba(150, 206, 180, 0.8);
  }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.9;
    filter: hue-rotate(0deg);
  }
  33% {
    transform: translateY(-33vh) rotate(120deg) scale(1.3);
    opacity: 1;
    filter: hue-rotate(120deg);
  }
  66% {
    transform: translateY(-66vh) rotate(240deg) scale(0.8);
    opacity: 1;
    filter: hue-rotate(240deg);
  }
  100% { 
    transform: translateY(-100vh) rotate(360deg) scale(1.1);
    opacity: 0.7;
    filter: hue-rotate(360deg);
  }
}

@keyframes floatShape {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    filter: hue-rotate(0deg) brightness(1);
  }
  20% {
    transform: translateY(-10px) rotate(72deg) scale(1.2);
    filter: hue-rotate(72deg) brightness(1.2);
  }
  40% { 
    transform: translateY(-25px) rotate(144deg) scale(1.4);
    filter: hue-rotate(144deg) brightness(1.4);
  }
  60% {
    transform: translateY(-15px) rotate(216deg) scale(1.3);
    filter: hue-rotate(216deg) brightness(1.3);
  }
  80% {
    transform: translateY(-5px) rotate(288deg) scale(1.1);
    filter: hue-rotate(288deg) brightness(1.1);
  }
}

// Responsive
@media (max-width: $tablet) {
  .settings-container {
    padding: 0 $spacing-md;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .settings-content {
    gap: $spacing-md;
  }
}

@media (max-width: $mobile) {
  .settings-page {
    padding: $spacing-md 0;
    padding-bottom: 100px;
  }
  
  .settings-container {
    padding: 0 $spacing-sm;
  }
  
  .page-header {
    margin-bottom: $spacing-lg;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .setting-item {
    padding: $spacing-sm;
    gap: $spacing-sm;
  }
  
  .setting-icon {
    width: 32px;
    height: 32px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  .section-icon {
    width: 28px;
    height: 28px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style> 