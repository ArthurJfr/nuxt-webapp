<template>
  <div class="login-page">
    <!-- Background avec particules et formes -->
    <div class="login-background">
      <!-- Particules flottantes -->
      <div class="login-particles">
        <div v-for="i in 15" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
      
      <!-- Formes géométriques flottantes -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      
      <!-- Gradient overlay -->
      <div class="login-overlay"></div>
    </div>

    <div class="login-container">
      <!-- Logo et titre principal -->
      <div class="login-header">
        <div class="logo-container">
          <div class="logo-glass">
            <div class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
        <p class="login-subtitle">Connectez-vous pour accéder à votre espace collaboratif</p>
      </div>

      <!-- Formulaire de connexion -->
      <div class="login-form-container glass-card-enhanced">
        <div class="form-header">
          <h2 class="form-title">Connexion</h2>
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
            <NuxtLink to="/auth/reset-password" class="forgot-password">
              Mot de passe oublié ?
            </NuxtLink>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary btn-large glass-btn"
              :disabled="isLoading"
            >
              <div class="btn-content">
                <FontAwesomeIcon :icon="['fas', isLoading ? 'spinner' : 'sign-in-alt']" :class="{ 'fa-spin': isLoading }" />
                <span>{{ isLoading ? 'Connexion...' : 'Se connecter' }}</span>
              </div>
              <div class="btn-shine"></div>
            </button>
          </div>
        </form>
        
        <div class="form-footer">
          <div class="divider">
            <span>ou</span>
          </div>
          
          <div class="register-section">
            <p class="register-text">Pas encore de compte ?</p>
            <NuxtLink to="/auth/register" class="btn btn-secondary glass-btn">
              <div class="btn-content">
                <FontAwesomeIcon :icon="['fas', 'user-plus']" />
                <span>Créer un compte</span>
              </div>
              <div class="btn-shine"></div>
            </NuxtLink>
          </div>
        </div>
        
        <div class="card-shine"></div>
      </div>

      <!-- Features rapides -->
      <div class="login-features">
        <div class="feature-item glass-card" v-for="feature in features" :key="feature.id">
          <div class="feature-icon" :style="{ backgroundColor: feature.color }">
            <FontAwesomeIcon :icon="feature.icon" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-shine"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

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
  password: ''
})

// Features de la plateforme
const features = [
  {
    id: 1,
    title: 'Collaboration temps réel',
    description: 'Travaillez ensemble instantanément',
    icon: ['fas', 'users'],
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Partage sécurisé',
    description: 'Contrôlez vos permissions',
    icon: ['fas', 'shield-alt'],
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Synchronisation',
    description: 'Accès partout, tout le temps',
    icon: ['fas', 'sync-alt'],
    color: '#8B5CF6'
  }
]

// Fonctions
const getParticleStyle = (index: number) => {
  const delay = Math.random() * 6
  const duration = 8 + Math.random() * 6
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = 1 + Math.random() * 3
  const opacity = 0.1 + Math.random() * 0.2
  
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
    await new Promise(resolve => setTimeout(resolve, 1500))
    
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
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #000000 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #000000 75%, 
    #1a1a1a 100%
  );
  color: $white;
  position: relative;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl 0;
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
  max-width: 450px;
  padding: 0 $spacing-md;
}

// Header avec logo
.login-header {
  text-align: center;
  margin-bottom: $spacing-2xl;
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

// Glassmorphisme styles
.glass-card-enhanced {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

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

// Formulaire
.login-form-container {
  padding: $spacing-2xl;
  margin-bottom: $spacing-xl;
}

.form-header {
  text-align: center;
  margin-bottom: $spacing-xl;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $white;
  margin: 0;
}

.form-group {
  margin-bottom: $spacing-lg;
}

.form-label {
  display: block;
  margin-bottom: $spacing-sm;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.95rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  padding: $spacing-md;
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
  font-size: 1rem;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
}

.password-toggle {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: $spacing-xs;
  margin-left: $spacing-sm;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
}

.forgot-password {
  display: inline-block;
  margin-top: $spacing-sm;
  color: rgba(59, 130, 246, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: rgba(59, 130, 246, 1);
  }
}

.form-actions {
  margin: $spacing-xl 0;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-md;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-size: 1rem;
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
  
  &.btn-large {
    padding: $spacing-lg $spacing-2xl;
    font-size: 1.1rem;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.form-footer {
  margin-top: $spacing-xl;
}

.divider {
  position: relative;
  text-align: center;
  margin: $spacing-xl 0;
  
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

.register-section {
  text-align: center;
}

.register-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: $spacing-md;
  font-size: 0.95rem;
}

// Features
.login-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-md;
}

.feature-item {
  @extend .glass-card;
  padding: $spacing-lg;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 1.2rem;
  margin: 0 auto $spacing-md auto;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 $spacing-sm 0;
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
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

// Shine effects
.card-shine,
.feature-shine,
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

.login-form-container:hover .card-shine,
.feature-item:hover .feature-shine,
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

// Responsive
@media (max-width: $tablet) {
  .login-page {
    padding: $spacing-lg $spacing-md;
  }
  
  .login-container {
    max-width: 400px;
  }
  
  .login-title {
    font-size: 1.8rem;
  }
  
  .login-form-container {
    padding: $spacing-xl;
  }
  
  .logo-glass {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: $mobile) {
  .login-page {
    padding: $spacing-md $spacing-sm;
  }
  
  .login-container {
    max-width: 350px;
  }
  
  .login-title {
    font-size: 1.6rem;
  }
  
  .login-form-container {
    padding: $spacing-lg;
  }
  
  .logo-glass {
    width: 60px;
    height: 60px;
  }
  
  .logo-icon svg {
    width: 32px;
    height: 32px;
  }
}
</style> 