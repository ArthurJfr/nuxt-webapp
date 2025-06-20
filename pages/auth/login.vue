<template>
  <div class="login-page">
    <!-- Background avec particules et formes -->
    <div class="login-background">
      <!-- Particules flottantes -->
      <div class="login-particles">
        <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
      
      <!-- Formes géométriques flottantes -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      
      <!-- Gradient overlay -->
      <div class="login-overlay"></div>
    </div>

    <div class="login-container">
      <!-- Section de gauche - Branding et informations -->
      <div class="login-left">
        <div class="branding-section">
      <!-- Logo et titre principal -->
        <div class="logo-container">
          <div class="logo-glass">
            <div class="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="2"/>
                <path d="M12 10v6"/>
                <path d="M9 13h6"/>
              </svg>
            </div>
            <div class="logo-shine"></div>
          </div>
          <div class="logo-glow"></div>
        </div>
        
        <h1 class="login-title">Bienvenue sur FileShare</h1>
          <p class="login-subtitle">La plateforme collaborative qui transforme votre façon de travailler en équipe</p>
          
          <!-- Stats en temps réel -->
          <div class="live-stats">
            <div class="stat-item glass-card-mini">
              <div class="stat-number">{{ liveStats.activeUsers }}</div>
              <div class="stat-label">Utilisateurs connectés</div>
              <div class="live-indicator"></div>
            </div>
            <div class="stat-item glass-card-mini">
              <div class="stat-number">{{ liveStats.filesShared }}</div>
              <div class="stat-label">Fichiers partagés</div>
            </div>
            <div class="stat-item glass-card-mini">
              <div class="stat-number">{{ liveStats.activeTeams }}</div>
              <div class="stat-label">Équipes actives</div>
              <div class="live-indicator"></div>
            </div>
          </div>
      </div>

        <!-- Features rapides -->
        <div class="login-features">
          <div class="features-header">
            <h3 class="features-title">Pourquoi choisir FileShare ?</h3>
          </div>
          <div class="features-grid">
            <div class="feature-item glass-card" v-for="feature in features" :key="feature.id">
              <div class="feature-icon" :style="{ backgroundColor: feature.color }">
                <FontAwesomeIcon :icon="feature.icon" />
              </div>
              <div class="feature-content">
                <h4 class="feature-title">{{ feature.title }}</h4>
                <p class="feature-description">{{ feature.description }}</p>
              </div>
              <div class="feature-shine"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section de droite - Formulaire de connexion -->
      <div class="login-right">
        <Card type="auth-card" class="form-wrapper">
        <div class="form-header">
            <h2 class="form-title">Se connecter</h2>
            <p class="form-subtitle">Accédez à votre espace collaboratif</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Adresse email</label>
            <div class="input-container glass-input">
              <div class="input-icon">
                <FontAwesomeIcon :icon="['fas', 'envelope']" />
              </div>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="votre@email.com"
                class="form-input"
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="input-container glass-input">
              <div class="input-icon">
                <FontAwesomeIcon :icon="['fas', 'lock']" />
              </div>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="form.password" 
                required
                placeholder="••••••••"
                class="form-input"
              >
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <FontAwesomeIcon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
              </button>
            </div>
              <div class="form-options">
                <label class="remember-me glass-checkbox">
                  <input type="checkbox" v-model="form.rememberMe">
                  <span class="checkmark"></span>
                  <span class="checkbox-label">Se souvenir de moi</span>
                </label>
            <NuxtLink to="/auth/reset-password" class="forgot-password">
              Mot de passe oublié ?
            </NuxtLink>
              </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary btn-large glass-btn"
              :disabled="isLoading"
            >
              <div class="btn-content">
                <FontAwesomeIcon :icon="['fas', isLoading ? 'spinner' : 'sign-in-alt']" :class="{ 'fa-spin': isLoading }" />
                  <span>{{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}</span>
              </div>
              <div class="btn-shine"></div>
            </button>
          </div>
        </form>
        
        <div class="form-footer">
          <div class="divider">
            <span>ou</span>
          </div>
            
            <!-- Connexion sociale -->
            <div class="social-login">
              <button class="btn btn-social glass-btn" type="button">
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fab', 'google']" />
                  <span>Continuer avec Google</span>
                </div>
                <div class="btn-shine"></div>
              </button>
              <button class="btn btn-social glass-btn" type="button">
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fab', 'microsoft']" />
                  <span>Continuer avec Microsoft</span>
                </div>
                <div class="btn-shine"></div>
              </button>
            </div>
          
          <div class="register-section">
              <p class="register-text">Vous n'avez pas encore de compte ?</p>
            <NuxtLink to="/auth/register" class="btn btn-secondary glass-btn">
              <div class="btn-content">
                <FontAwesomeIcon :icon="['fas', 'user-plus']" />
                  <span>Créer un compte gratuitement</span>
              </div>
              <div class="btn-shine"></div>
            </NuxtLink>
          </div>
        </div>
                  </Card>

        <!-- Liens rapides -->
        <div class="quick-links">
          <NuxtLink to="/" class="quick-link">
            <FontAwesomeIcon :icon="['fas', 'home']" />
            <span>Retour à l'accueil</span>
          </NuxtLink>
          <NuxtLink to="/support" class="quick-link">
            <FontAwesomeIcon :icon="['fas', 'life-ring']" />
            <span>Besoin d'aide ?</span>
          </NuxtLink>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// Meta tags
useHead({
  title: 'FileShare - Connexion',
  meta: [
    { name: 'description', content: 'Connectez-vous à FileShare pour accéder à votre espace collaboratif' }
  ]
})

// États réactifs
const isLoading = ref(false)
const showPassword = ref(false)
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Stats en temps réel
const liveStats = ref({
  activeUsers: '2.4K',
  filesShared: '847',
  activeTeams: '156'
})

// Features de la plateforme
const features = [
  {
    id: 1,
    title: 'Collaboration temps réel',
    description: 'Travaillez ensemble instantanément sur vos documents',
    icon: ['fas', 'users'],
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Sécurité avancée',
    description: 'Vos données protégées avec un chiffrement de bout en bout',
    icon: ['fas', 'shield-alt'],
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Synchronisation intelligente',
    description: 'Accédez à vos fichiers partout, sur tous vos appareils',
    icon: ['fas', 'sync-alt'],
    color: '#8B5CF6'
  },
  {
    id: 4,
    title: 'Espaces de travail',
    description: 'Organisez vos projets dans des espaces dédiés',
    icon: ['fas', 'layer-group'],
    color: '#F59E0B'
  }
]

// Simulation des mises à jour en temps réel
let statsInterval: NodeJS.Timeout
onMounted(() => {
  statsInterval = setInterval(() => {
    liveStats.value.activeUsers = `${(2.1 + Math.random() * 0.6).toFixed(1)}K`
    liveStats.value.filesShared = String(820 + Math.floor(Math.random() * 50))
    liveStats.value.activeTeams = String(140 + Math.floor(Math.random() * 30))
  }, 4000)
})

onUnmounted(() => {
  if (statsInterval) {
    clearInterval(statsInterval)
  }
})

// Fonctions
const getParticleStyle = (index: number) => {
  const delay = Math.random() * 8
  const duration = 10 + Math.random() * 8
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = 1 + Math.random() * 4
  const opacity = 0.05 + Math.random() * 0.15
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: opacity
  }
}

const handleLogin = async () => {
  isLoading.value = true
  
  // Simulation de connexion (remplacez par votre logique)
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirection vers le dashboard
    await navigateTo('/dashboard')
  } catch (error) {
    console.error('Erreur de connexion:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.login-page {
  height: 100vh;
  max-height: 100vh;
  background: linear-gradient(135deg, 
    #000000 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #000000 75%, 
    #1a1a1a 100%
  );
  color: $white;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-md 0;
  
  @media (max-width: $mobile) {
    padding: $spacing-sm 0;
    align-items: flex-start;
    padding-top: $spacing-md;
  }
}

// Background effects
.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.login-particles {
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
    width: 150px;
    height: 150px;
    border-radius: 50%;
    top: 15%;
    left: 10%;
    animation: floatShape 20s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    top: 70%;
    right: 15%;
    animation: floatShape 25s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    bottom: 20%;
    left: 20%;
    animation: floatShape 18s ease-in-out infinite;
  }
  
  &.shape-4 {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    animation: floatShape 22s ease-in-out infinite;
  }
}

.login-overlay {
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
.login-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  height: 100%;
  padding: 0 $spacing-md;
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-lg;
  align-items: stretch;
  
  @media (max-width: $mobile) {
    padding: 0;
    gap: 0;
    max-width: 100%;
  }
}

// Section de gauche - Branding et informations
.login-left {
  flex: 1;
  min-width: 500px;
  padding: $spacing-lg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.branding-section {
  text-align: center;
  margin-bottom: $spacing-lg;
}

// Stats en temps réel
.live-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-sm;
  margin-top: $spacing-lg;
}

.stat-item {
  @extend .glass-card-mini;
  padding: $spacing-sm;
  text-align: center;
  position: relative;
  min-height: $card-min-height-mobile;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
}

.stat-number {
  font-size: $mini-stat-number-size;
  font-weight: 700;
  color: $primary;
  line-height: 1;
  margin-bottom: $spacing-xs;
}

.stat-label {
  font-size: $mini-stat-label-size;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.live-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
  animation: pulseIndicator 2s infinite;
}

// Section de droite - Formulaire
.login-right {
  flex: 1;
  min-width: 450px;
  padding: $spacing-md;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  
  @media (max-width: $mobile) {
    min-width: 100%;
    padding: 0;
  }
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  min-height: auto;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.form-header {
  text-align: center;
  margin-bottom: $spacing-sm;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: $white;
  margin: 0 0 $spacing-xs 0;
  background: linear-gradient(135deg, 
    $white 0%, 
    rgba(255, 255, 255, 0.9) 50%,
    rgba(59, 130, 246, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: $spacing-sm;
}

.form-label {
  display: block;
  margin-bottom: $spacing-xs;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.9rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 $spacing-md;
  height: $glass-element-height;
  min-height: $input-height;
}

.input-icon {
  color: rgba(255, 255, 255, 0.5);
  margin-right: $spacing-sm;
  font-size: 1rem;
}

.form-input {
  flex: 1;
  background: transparent;
  border: none;
  color: $white;
  font-size: $input-font-size;
  height: 100%;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
}

.password-toggle {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: $spacing-sm;
  border-radius: $radius-sm;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  svg {
    width: 18px;
    height: 18px;
  }
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-md;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  cursor: pointer;
  
  input[type="checkbox"] {
    display: none;
  }
  
  .checkmark {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    transition: all 0.2s ease;
    
    &::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid $white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  }
  
  input:checked + .checkmark {
    background: $primary;
    border-color: $primary;
    
    &::after {
      opacity: 1;
    }
  }
  
  .checkbox-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
  }
}

.forgot-password {
  color: rgba(59, 130, 246, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(59, 130, 246, 1);
  }
}

.form-actions {
  margin: $spacing-lg 0 $spacing-md 0;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  margin: $spacing-md 0;
}

.register-section {
  text-align: center;
  margin-top: $spacing-md;
}

.register-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: $spacing-sm;
  font-size: 0.95rem;
}

.quick-links {
  display: flex;
  justify-content: center;
  gap: $spacing-md;
  margin-top: $spacing-md;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
}

.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: $spacing-lg;
}

.logo-glass {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: $radius-xl;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(1.8);
  -webkit-backdrop-filter: blur(25px) saturate(1.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: iconFloat 3s ease-in-out infinite;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.3) 0%, 
      transparent 100%);
  }
}

.logo-icon {
  position: relative;
  z-index: 2;
  color: $white;
  
  svg {
    filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.6));
  }
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 2s ease-in-out infinite alternate;
  z-index: -1;
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 $spacing-sm 0;
  background: linear-gradient(135deg, 
    $white 0%, 
    rgba(255, 255, 255, 0.9) 50%,
    rgba(59, 130, 246, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
  letter-spacing: -0.02em;
}

.login-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.4;
}

// Styles pour les éléments glassmorphisme internes

.glass-input {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:focus-within {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

// Features
.login-features {
  margin-top: $spacing-lg;
  flex: 1;
}

.features-header {
  text-align: center;
  margin-bottom: $spacing-lg;
}

.features-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $white;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: $spacing-sm;
}

.feature-item {
  @extend .glass-card;
  padding: $spacing-md;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
}

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: $feature-icon-size;
  margin: 0 auto $spacing-sm auto;
  flex-shrink: 0;
}

.feature-content {
  text-align: left;
}

.feature-title {
  font-size: $feature-title-size;
  font-weight: 600;
  color: $white;
  margin: 0 0 $spacing-xs 0;
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: $feature-description-size;
  margin: 0;
  line-height: 1.3;
}

// Buttons styles
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: 0 $spacing-xl;
  height: $button-height;
  min-height: $glass-element-height;
  border-radius: $radius-md;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-size: $button-font-size;
  width: 100%;
  
  .btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }
  
  &.btn-primary {
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.9) 0%, 
      rgba(139, 92, 246, 0.9) 100%);
    color: $white;
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
    }
  }
  
  &.btn-secondary {
    color: $white;
    
    &:hover {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.15) 0%, 
        rgba(255, 255, 255, 0.1) 100%);
      transform: translateY(-2px);
    }
  }
  
  &.btn-social {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
  }
  
  &.btn-large {
    height: $button-height-large;
    min-height: $glass-element-height-large;
    padding: 0 $spacing-2xl;
    font-size: $btn-font-size-large;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.divider {
  position: relative;
  text-align: center;
  margin: $spacing-md 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
  
  span {
    background: linear-gradient(135deg, 
      #000000 0%, 
      #1a1a1a 100%);
    padding: 0 $spacing-lg;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }
}

// Glassmorphisme cards
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.glass-card-mini {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

// Shine effects pour les boutons
.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}

.btn:hover .btn-shine {
  left: 100%;
}

// Animations
@keyframes particleFloat {
  0% { transform: translateY(0px) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
}

@keyframes floatShape {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes pulseGlow {
  0% { 
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(1);
  }
  100% { 
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes pulseIndicator {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.5;
    transform: scale(1.2);
  }
}

// Responsive
@media (max-width: $tablet) {
  .login-page {
    padding: $spacing-sm 0;
  }
  
  .login-container {
    flex-direction: column;
    max-width: 800px;
    gap: $spacing-md;
    height: auto;
    min-height: 100%;
  }
  
  .login-left,
  .login-right {
    min-width: auto;
    padding: $spacing-md;
    flex: none;
  }
  
  .login-left {
    order: 2;
    min-height: auto;
  }
  
  .login-right {
    order: 1;
    min-height: auto;
  }
  
  .login-title {
    font-size: 1.6rem;
  }
  
  .form-wrapper {
    // Le padding est géré par le composant Card
  }
  
  .logo-glass {
    width: 60px;
    height: 60px;
  }
  
  .live-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xs;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xs;
  }
  
  .quick-links {
    flex-direction: column;
    gap: $spacing-xs;
  }
  
  .branding-section {
    margin-bottom: $spacing-md;
  }
  
  .login-features {
    margin-top: $spacing-md;
  }
  
  .input-container {
    height: $glass-element-height;
    min-height: $input-height;
  }
  
  .btn {
    height: $button-height;
    min-height: $glass-element-height;
    padding: 0 $spacing-lg;
    font-size: $button-font-size;
  }
}

@media (max-width: $mobile) {
  .login-page {
    padding: 0;
    height: 100vh;
    max-height: 100vh;
  }
  
  .login-container {
    max-width: 100%;
    padding: 0 $spacing-sm;
    gap: $spacing-sm;
    height: 100%;
    overflow-y: auto;
  }
  
  .login-left,
  .login-right {
    padding: $spacing-sm;
    min-height: auto;
  }
  
  .login-left {
    display: none; // Masquer sur mobile pour économiser l'espace
  }
  
  .login-right {
    flex: 1;
    order: 1;
  }
  
  .login-title {
    font-size: 1.4rem;
  }
  
  .form-wrapper {
    // Le padding est géré par le composant Card
    margin-bottom: $spacing-sm;
  }
  
  .form-title {
    font-size: 1.3rem;
  }
  
  .form-header {
    margin-bottom: $spacing-md;
  }
  
  .logo-glass {
    width: 50px;
    height: 50px;
  }
  
  .logo-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .live-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xs;
  }
  
  .stat-number {
    font-size: $mini-stat-number-size-mobile;
  }
  
  .stat-label {
    font-size: $mini-stat-label-size-mobile;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: $spacing-xs;
  }
  
  .feature-item {
    padding: $spacing-sm;
  }
  
  .social-login {
    gap: $spacing-xs;
  }
  
  .btn {
    height: $button-height-mobile;
    min-height: $glass-element-height-mobile;
    padding: 0 $spacing-md;
    font-size: $button-font-size-mobile;
  }
  
  .quick-links {
    flex-direction: row;
    gap: $spacing-sm;
    justify-content: center;
    margin-top: $spacing-sm;
  }
  
  .form-group {
    margin-bottom: $spacing-sm;
  }
  
  .input-container {
    height: $glass-element-height-mobile;
    min-height: $input-height-mobile;
  }
  
  .form-input {
    font-size: $input-font-size-mobile;
  }
  
  .form-actions {
    margin: $spacing-md 0 $spacing-sm 0;
  }
  
  .divider {
    margin: $spacing-sm 0;
  }
  
  .register-section {
    margin-top: $spacing-sm;
  }
}
</style> 