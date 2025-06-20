<template>
  <div class="profile-page">
    <!-- Background effects -->
    <div class="profile-background">
      <div class="profile-particles">
        <div 
          v-for="i in 35" 
          :key="i" 
          class="particle"
          :style="{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 25 + 's',
            animationDuration: (Math.random() * 18 + 8) + 's',
            width: (Math.random() * 12 + 3) + 'px',
            height: (Math.random() * 12 + 3) + 'px'
          }"
        />
      </div>
      
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
    
    <div class="profile-overlay"></div>
    
    <div class="profile-container">
      <!-- Header avec titre -->
      <div class="page-header">
        <h1 class="page-title">Mon Profil</h1>
        <p class="page-subtitle">Gérez vos informations personnelles</p>
      </div>

      <!-- Carte principale du profil -->
      <Card type="auth-card" class="profile-main-card">
        <div class="profile-header">
          <div class="profile-avatar-container">
            <div class="profile-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="avatar-glow"></div>
          </div>
          <div class="profile-info">
            <h2 class="profile-name">John Doe</h2>
            <p class="profile-email">john.doe@fileshare.com</p>
            <div class="profile-status">
              <span class="status-indicator active"></span>
              <span class="status-text">En ligne</span>
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="profile-stats">
          <div class="stat-item glass-card-mini">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">42</div>
              <div class="stat-label">Fichiers</div>
            </div>
          </div>
          
          <div class="stat-item glass-card-mini">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">12</div>
              <div class="stat-label">Dossiers</div>
            </div>
          </div>
          
          <div class="stat-item glass-card-mini">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">8</div>
              <div class="stat-label">Favoris</div>
            </div>
          </div>
        </div>

        <!-- Informations détaillées -->
        <div class="profile-details">
          <h3 class="section-title">Informations du compte</h3>
          <div class="details-grid">
            <div class="detail-item">
              <label class="detail-label">Nom d'utilisateur</label>
              <div class="detail-value glass-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>johndoe123</span>
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Email</label>
              <div class="detail-value glass-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>john.doe@fileshare.com</span>
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Membre depuis</label>
              <div class="detail-value glass-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Janvier 2024</span>
              </div>
            </div>
            
            <div class="detail-item">
              <label class="detail-label">Stockage utilisé</label>
              <div class="detail-value glass-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                <span>2.4 GB / 10 GB</span>
              </div>
            </div>
          </div>
          
          <!-- Barre de progression du stockage -->
          <div class="storage-progress">
            <div class="progress-header">
              <span class="progress-label">Espace de stockage</span>
              <span class="progress-percentage">24%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 24%"></div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="profile-actions">
          <button class="action-btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Modifier le profil
          </button>
          
          <button class="action-btn btn-secondary glass-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            Paramètres
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Mon Profil'
})
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.profile-page {
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
.profile-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.profile-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, 
    rgba(255, 107, 107, 0.8) 0%, 
    rgba(78, 205, 196, 0.6) 25%,
    rgba(69, 183, 209, 0.8) 50%,
    rgba(150, 206, 180, 0.6) 75%,
    transparent 100%);
  border-radius: 50%;
  animation: particleFloat infinite linear;
  filter: blur(0.5px);
  box-shadow: 0 0 20px currentColor;
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
    rgba(255, 107, 107, 0.3) 0%, 
    rgba(78, 205, 196, 0.3) 25%,
    rgba(69, 183, 209, 0.3) 50%,
    rgba(150, 206, 180, 0.3) 75%,
    rgba(255, 234, 167, 0.3) 100%);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
  
  &.shape-1 {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    top: 10%;
    left: 5%;
    animation: floatShape 18s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 80px;
    height: 80px;
    border-radius: 15px;
    top: 60%;
    right: 10%;
    animation: floatShape 22s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    bottom: 25%;
    left: 15%;
    animation: floatShape 16s ease-in-out infinite;
  }
  
  &.shape-4 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    top: 40%;
    left: 60%;
    animation: floatShape 20s ease-in-out infinite;
  }
}

.profile-overlay {
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
.profile-container {
  position: relative;
  z-index: 2;
  max-width: 800px;
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
  font-size: 4rem;
  font-weight: 800;
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

// Carte principale
.profile-main-card {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

// Header du profil
.profile-header {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
  padding-bottom: $spacing-lg;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%);
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 2s ease-in-out infinite alternate;
  z-index: 1;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: $white;
  margin: 0 0 $spacing-xs 0;
}

.profile-email {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin: 0 0 $spacing-sm 0;
}

.profile-status {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  
  &.active {
    background: #10B981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  }
}

.status-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

// Statistiques
.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-md;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
}

.stat-icon {
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
  
  // Couleurs spécifiques par type de stat
  .stat-item:nth-child(1) & {
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  }
  
  .stat-item:nth-child(2) & {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  }
  
  .stat-item:nth-child(3) & {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  }
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: $white;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

// Détails du profil
.profile-details {
  margin-bottom: $spacing-xl;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: $white;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-sm;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.detail-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.detail-value {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  color: $white;
  font-size: 0.95rem;
  
  svg {
    color: rgba(255, 255, 255, 0.5);
    flex-shrink: 0;
  }
}

// Barre de progression du stockage
.storage-progress {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: $spacing-md;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-sm;
}

.progress-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
}

.progress-percentage {
  color: $primary;
  font-weight: 600;
  font-size: 0.9rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $primary 0%, rgba(139, 92, 246, 0.8) 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 100%);
    animation: progressShine 2s ease-in-out infinite;
  }
}

// Actions
.profile-actions {
  display: flex;
  gap: $spacing-sm;
  justify-content: center;
}

.action-btn {
  flex: 1;
  max-width: 200px;
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-md;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  min-height: 48px;
  
  &.btn-primary {
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.9) 0%, 
      rgba(139, 92, 246, 0.9) 100%);
    color: $white;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
    }
  }
  
  &.btn-secondary {
    color: $white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
  }
}

// Styles glassmorphisme
.glass-input {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(59, 130, 246, 0.3);
  }
}

.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
}

.glass-card-mini {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

// Animations
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes titlePulse {
  0% { 
    transform: scale(1);
    text-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
  }
  100% { 
    transform: scale(1.05);
    text-shadow: 0 0 50px rgba(78, 205, 196, 0.8), 0 0 80px rgba(69, 183, 209, 0.6);
  }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-50vh) rotate(180deg) scale(1.2);
    opacity: 1;
  }
  100% { 
    transform: translateY(-100vh) rotate(360deg) scale(0.8);
    opacity: 0.6;
  }
}

@keyframes floatShape {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.4);
  }
  25% {
    transform: translateY(-15px) rotate(90deg) scale(1.1);
    box-shadow: 0 12px 40px rgba(78, 205, 196, 0.6);
  }
  50% { 
    transform: translateY(-30px) rotate(180deg) scale(1.2);
    box-shadow: 0 16px 48px rgba(69, 183, 209, 0.8);
  }
  75% {
    transform: translateY(-15px) rotate(270deg) scale(1.1);
    box-shadow: 0 12px 40px rgba(150, 206, 180, 0.6);
  }
}

@keyframes pulseGlow {
  0% { 
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
    background: radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%);
  }
  25% {
    background: radial-gradient(circle, rgba(78, 205, 196, 0.4) 0%, transparent 70%);
  }
  50% {
    background: radial-gradient(circle, rgba(69, 183, 209, 0.5) 0%, transparent 70%);
  }
  75% {
    background: radial-gradient(circle, rgba(150, 206, 180, 0.4) 0%, transparent 70%);
  }
  100% { 
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.3);
    background: radial-gradient(circle, rgba(255, 234, 167, 0.6) 0%, transparent 70%);
  }
}

@keyframes progressShine {
  0% { 
    transform: translateX(-20px);
    background: linear-gradient(90deg, transparent 0%, rgba(255, 107, 107, 0.6) 50%, transparent 100%);
  }
  25% {
    background: linear-gradient(90deg, transparent 0%, rgba(78, 205, 196, 0.6) 50%, transparent 100%);
  }
  50% {
    background: linear-gradient(90deg, transparent 0%, rgba(69, 183, 209, 0.6) 50%, transparent 100%);
  }
  75% {
    background: linear-gradient(90deg, transparent 0%, rgba(150, 206, 180, 0.6) 50%, transparent 100%);
  }
  100% { 
    transform: translateX(100px);
    background: linear-gradient(90deg, transparent 0%, rgba(255, 234, 167, 0.6) 50%, transparent 100%);
  }
}

// Responsive
@media (max-width: $tablet) {
  .profile-container {
    padding: 0 $spacing-sm;
    max-width: calc(100vw - #{$spacing-sm * 2});
  }
  
  .profile-main-card {
    width: 100%;
    max-width: 100%;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: $spacing-md;
  }
  
  .profile-stats {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
  
  .profile-actions {
    flex-direction: column;
  }
  
  .action-btn {
    max-width: none;
  }
}

@media (max-width: $mobile) {
  .profile-page {
    padding: $spacing-sm 0;
    padding-bottom: 100px;
    min-height: auto;
  }
  
  .profile-container {
    padding: 0;
    max-width: 100vw;
  }
  
  .profile-main-card {
    margin: 0 $spacing-sm !important;
    width: calc(100vw - #{$spacing-sm * 2}) !important;
    max-width: calc(100vw - #{$spacing-sm * 2}) !important;
    box-sizing: border-box;
    height: auto !important;
    min-height: auto !important;
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
  
  .profile-avatar {
    width: 60px;
    height: 60px;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
  
  .avatar-glow {
    width: 80px;
    height: 80px;
  }
  
  .profile-name {
    font-size: 1.4rem;
  }
  
  .stat-item {
    padding: $spacing-sm;
  }
  
  .stat-icon {
    width: 32px;
    height: 32px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
}
</style> 