<template>
  <div class="register-page">
    <!-- Background avec particules et formes -->
    <div class="register-background">
      <!-- Particules flottantes -->
      <div class="register-particles">
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
      <div class="register-overlay"></div>
    </div>

    <div class="register-container">
      <!-- Section de gauche - Branding et progression -->
      <div class="register-left">
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

          <h1 class="register-title">Rejoignez FileShare</h1>
          <p class="register-subtitle">Créez votre compte et commencez à collaborer dès maintenant</p>
        </div>

        <!-- Indicateur d'étapes visuel -->
        <div class="steps-visual">
          <div class="steps-header">
            <h3 class="steps-title">Votre progression</h3>
            <span class="steps-counter">{{ currentStep + 1 }}/{{ steps.length }}</span>
          </div>
          
          <div class="steps-list">
                <div 
                  v-for="(step, index) in steps" 
                  :key="index"
              :class="['step-item', { 
                'completed': currentStep > index, 
                'active': currentStep === index,
                'pending': currentStep < index
              }]"
            >
              <div class="step-icon">
                <FontAwesomeIcon 
                  v-if="currentStep > index" 
                  :icon="['fas', 'check']" 
                />
                <span v-else>{{ index + 1 }}</span>
                </div>
              <div class="step-content">
                <h4 class="step-name">{{ step.name }}</h4>
                <p class="step-description">{{ step.description }}</p>
              </div>
                </div>
              </div>
              
          <!-- Barre de progression -->
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"></div>
          </div>
        </div>

        <!-- Avantages -->
        <div class="benefits-section">
          <div class="benefits-header">
            <h3 class="benefits-title">Pourquoi FileShare ?</h3>
          </div>
          <div class="benefits-list">
            <div v-for="benefit in benefits" :key="benefit.id" class="benefit-item glass-card-mini">
              <div class="benefit-icon" :style="{ backgroundColor: benefit.color }">
                <FontAwesomeIcon :icon="benefit.icon" />
              </div>
              <div class="benefit-text">
                <h4 class="benefit-title">{{ benefit.title }}</h4>
                <p class="benefit-description">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section de droite - Formulaire d'inscription -->
      <div class="register-right">
        <Card type="auth-card" class="form-wrapper">
          <div class="form-header">
            <h2 class="form-title">{{ steps[currentStep].name }}</h2>
            <p class="form-subtitle">{{ steps[currentStep].subtitle }}</p>
            
            <!-- Indicateur d'étapes horizontal -->
            <div class="step-indicator-horizontal">
              <div class="step-dots">
                <div 
                  v-for="(step, index) in steps" 
                  :key="index"
                  :class="['step-dot', { 
                    'completed': currentStep > index, 
                    'active': currentStep === index,
                    'pending': currentStep < index
                  }]"
                >
                  <FontAwesomeIcon 
                    v-if="currentStep > index" 
                    :icon="['fas', 'check']" 
                    class="step-check"
                  />
                  <span v-else class="step-number">{{ index + 1 }}</span>
                </div>
              </div>
              <div class="step-progress-line">
                <div class="step-progress-fill" :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"></div>
              </div>
              <div class="step-progress-text">
                <span class="progress-label">Étape {{ currentStep + 1 }} sur {{ steps.length }}</span>
                <span class="progress-percentage">{{ Math.round((currentStep / (steps.length - 1)) * 100) }}%</span>
              </div>
            </div>
          </div>
          
          <div class="form-content">
            <form @submit.prevent="handleRegister" class="register-form">
              <!-- Étape 1: Informations de base -->
              <div v-if="currentStep === 0" class="step-content">
                <div class="form-grid">
                <div class="form-group">
                  <label for="username" class="form-label">Nom d'utilisateur</label>
                  <div class="input-container glass-input">
                    <div class="input-icon">
                      <FontAwesomeIcon :icon="['fas', 'user']" />
                    </div>
                    <input 
                      type="text" 
                      id="username" 
                      v-model="form.username" 
                      required
                      placeholder="johndoe123"
                      class="form-input"
                    >
                  </div>
                </div>

                <div class="form-group">
                  <label for="full_name" class="form-label">Nom complet</label>
                  <div class="input-container glass-input">
                    <div class="input-icon">
                      <FontAwesomeIcon :icon="['fas', 'id-card']" />
                    </div>
                    <input 
                      type="text" 
                      id="full_name" 
                      v-model="form.full_name" 
                      required
                      placeholder="John Doe"
                      class="form-input"
                    >
                  </div>
                </div>

                <div class="form-group form-group-full">
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
                      placeholder="vous@entreprise.com"
                      class="form-input"
                    >
                  </div>
                </div>
                </div>
              </div>
              
              <!-- Étape 2: Organisation et photo -->
              <div v-if="currentStep === 1" class="step-content">
              <div class="profile-upload-section">
                <div class="form-group">
                  <label class="form-label">Photo de profil</label>
                  <div class="image-upload-container">
                    <ImageUpload v-model="form.profile_picture" />
                  </div>
                </div>
                </div>
                
              <div class="form-group">
                <label for="organization" class="form-label">Organisation</label>
                <div class="input-container glass-input">
                  <div class="input-icon">
                    <FontAwesomeIcon :icon="['fas', 'building']" />
                  </div>
                  <input 
                    type="text" 
                    id="organization" 
                    v-model="form.organization" 
                    placeholder="Votre entreprise ou équipe"
                    class="form-input"
                  >
                </div>
              </div>
              </div>
              
              <!-- Étape 3: Mot de passe -->
              <div v-if="currentStep === 2" class="step-content">
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
              </div>

              <div class="form-group">
                <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                <div class="input-container glass-input">
                  <div class="input-icon">
                    <FontAwesomeIcon :icon="['fas', 'lock']" />
                  </div>
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    id="confirmPassword" 
                    v-model="form.confirmPassword" 
                    required
                    placeholder="••••••••"
                    class="form-input"
                  >
                  <button 
                    type="button" 
                    class="password-toggle"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <FontAwesomeIcon :icon="['fas', showConfirmPassword ? 'eye-slash' : 'eye']" />
                  </button>
                </div>
              </div>
              
              <!-- Force du mot de passe -->
              <div class="password-strength">
                <div class="strength-bar">
                  <div class="strength-fill" :class="passwordStrengthClass" :style="{ width: `${passwordStrength * 25}%` }"></div>
                </div>
                <span class="strength-text">{{ passwordStrengthText }}</span>
              </div>
              </div>
              
              <!-- Étape 4: Conditions et finalisation -->
              <div v-if="currentStep === 3" class="step-content">
              <div class="summary-card glass-card-mini">
                <h4 class="summary-title">Récapitulatif de votre compte</h4>
                <div class="summary-grid">
                  <div class="summary-item">
                    <span class="summary-label">Nom d'utilisateur</span>
                    <span class="summary-value">{{ form.username }}</span>
                  </div>
                  <div class="summary-item">
                    <span class="summary-label">Nom complet</span>
                    <span class="summary-value">{{ form.full_name }}</span>
                  </div>
                  <div class="summary-item">
                    <span class="summary-label">Email</span>
                    <span class="summary-value">{{ form.email }}</span>
                  </div>
                  <div v-if="form.organization" class="summary-item">
                    <span class="summary-label">Organisation</span>
                    <span class="summary-value">{{ form.organization }}</span>
                  </div>
                </div>
              </div>
                
                <div class="terms-section">
                <label class="terms-checkbox glass-checkbox">
                    <input 
                      type="checkbox" 
                      v-model="form.acceptTerms" 
                      required
                    >
                  <span class="checkmark"></span>
                  <span class="terms-text">
                    J'accepte les <a href="/terms" target="_blank">conditions d'utilisation</a> 
                    et la <a href="/privacy" target="_blank">politique de confidentialité</a>
                  </span>
                  </label>
                </div>
              </div>
              
              <!-- Boutons de navigation -->
            <div class="form-actions">
                <button 
                  v-if="currentStep > 0"
                  type="button" 
                  @click="prevStep"
                class="btn btn-secondary glass-btn"
              >
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
                  <span>Précédent</span>
                </div>
                <div class="btn-shine"></div>
                </button>
                
              <button 
                  v-if="currentStep < steps.length - 1"
                  type="button" 
                  @click="nextStep"
                class="btn btn-primary glass-btn"
              >
                <div class="btn-content">
                  <span>Suivant</span>
                  <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
                </div>
                <div class="btn-shine"></div>
              </button>
              
              <button 
                  v-if="currentStep === steps.length - 1"
                  type="submit" 
                class="btn btn-primary btn-large glass-btn"
                :disabled="isLoading || !form.acceptTerms"
              >
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fas', isLoading ? 'spinner' : 'user-plus']" :class="{ 'fa-spin': isLoading }" />
                  <span>{{ isLoading ? 'Création en cours...' : 'Créer mon compte' }}</span>
                </div>
                <div class="btn-shine"></div>
              </button>
              </div>
            </form>
          </div>
            
            <div class="form-footer">
            <div class="register-section">
              <p class="register-text">Vous avez déjà un compte ?</p>
              <NuxtLink to="/auth/login" class="btn btn-secondary glass-btn">
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fas', 'sign-in-alt']" />
                  <span>Se connecter</span>
            </div>
                <div class="btn-shine"></div>
              </NuxtLink>
      </div>
    </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
// Import du service d'authentification (à implémenter)
// import { authService } from '@/services/api/auth'

// Meta tags
useHead({
  title: 'FileShare - Inscription',
  meta: [
    { name: 'description', content: 'Créez votre compte FileShare et commencez à collaborer avec votre équipe' }
  ]
})

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Définition des étapes avec descriptions détaillées
const steps = [
  { 
    name: 'Informations personnelles',
    subtitle: 'Créons votre identité sur FileShare',
    description: 'Nom, email et identifiant'
  },
  { 
    name: 'Profil et organisation',
    subtitle: 'Personnalisez votre profil',
    description: 'Photo et organisation'
  },
  { 
    name: 'Sécurité',
    subtitle: 'Sécurisez votre compte',
    description: 'Mot de passe sécurisé'
  },
  { 
    name: 'Finalisation',
    subtitle: 'Dernière étape avant de commencer',
    description: 'Validation et conditions'
  }
]

// Avantages de FileShare
const benefits = [
  {
    id: 1,
    title: 'Collaboration instantanée',
    description: 'Travaillez en équipe en temps réel',
    icon: ['fas', 'users'],
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Sécurité avancée',
    description: 'Vos données sont protégées',
    icon: ['fas', 'shield-alt'],
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Synchronisation cloud',
    description: 'Accès partout, tout le temps',
    icon: ['fas', 'cloud'],
    color: '#8B5CF6'
  }
]

// État de l'étape actuelle
const currentStep = ref(0)

// Formulaire réactif
const form = reactive({
  username: '',
  full_name: '',
  email: '',
  organization: '',
  password: '',
  confirmPassword: '',
  profile_picture: null as Blob | null,
  active: 0,
  acceptTerms: false
})

// Force du mot de passe
const passwordStrength = computed(() => {
  const password = form.password
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
})

const passwordStrengthClass = computed(() => {
  switch (passwordStrength.value) {
    case 0: return 'weak'
    case 1: return 'weak'
    case 2: return 'medium'
    case 3: return 'good'
    case 4: return 'strong'
    default: return 'weak'
  }
})

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 0: return 'Très faible'
    case 1: return 'Faible'
    case 2: return 'Moyen'
    case 3: return 'Bon'
    case 4: return 'Excellent'
    default: return 'Très faible'
  }
})

// Fonctions de navigation
const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    // Validation pour chaque étape
    if (currentStep.value === 0 && (!form.username || !form.full_name || !form.email)) {
      alert('Veuillez compléter tous les champs requis')
      return
    }
    
    if (currentStep.value === 2) {
      if (!form.password || !form.confirmPassword) {
        alert('Veuillez renseigner un mot de passe')
        return
      }
      if (form.password !== form.confirmPassword) {
        alert('Les mots de passe ne correspondent pas')
        return
      }
    }
    
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Fonction de gestion de l'inscription
const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert('Les mots de passe ne correspondent pas')
    return
  }
  
  if (!form.acceptTerms) {
    alert('Veuillez accepter les conditions d\'utilisation')
    return
  }
  
  try {
    isLoading.value = true
    
    let profilePictureBase64 = null
    if (form.profile_picture) {
      const reader = new FileReader()
      profilePictureBase64 = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target?.result)
        reader.readAsDataURL(form.profile_picture as Blob)
      })
    }

    const userData = {
      username: form.username,
      full_name: form.full_name,
      email: form.email,
      organization: form.organization,
      password: form.password,
      active: form.active,
      profile_picture: profilePictureBase64
    }

    // Simulation de l'inscription (remplacez par votre logique)
    console.log('Données d\'inscription:', userData)
    
    // Simulation d'une réponse d'API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirection vers la page de confirmation
    router.push('/auth/confirmation-sent')
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
  } finally {
    isLoading.value = false
  }
}

// Animation des particules
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
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.register-page {
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
.register-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.register-particles {
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

.register-overlay {
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
.register-container {
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
    padding: 0 $spacing-sm;
    gap: 0;
    max-width: 100%;
  }
}

// Section de gauche - Branding et progression
.register-left {
  flex: 1;
  min-width: 500px;
  padding: $spacing-md $spacing-lg;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.branding-section {
  text-align: center;
  margin-bottom: $spacing-md;
}

.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: $spacing-md;
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
  
  .register-title {
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
  
  .register-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.4;
}

// Indicateur d'étapes visuel
.steps-visual {
  margin: $spacing-md 0;
}

.steps-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-sm;
}

.steps-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: $white;
  margin: 0;
}

.steps-counter {
  background: rgba(59, 130, 246, 0.2);
  color: rgba(59, 130, 246, 1);
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-full;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  margin-bottom: $spacing-sm;
}

.step-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-md;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  
  &.completed {
    background: rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.2);
    
    .step-icon {
      background: #10B981;
      color: $white;
    }
  }
  
  &.active {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.3);
    
    .step-icon {
      background: $primary;
      color: $white;
    }
  }
  
  &.pending {
    background: rgba(255, 255, 255, 0.05);
    
    .step-icon {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.step-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.step-content {
  flex: 1;
}

.step-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 2px 0;
}

.step-description {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: $radius-full;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, $primary 0%, rgba(139, 92, 246, 0.8) 100%);
  border-radius: $radius-full;
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

// Avantages
.benefits-section {
  flex: 1;
}

.benefits-header {
  margin-bottom: $spacing-sm;
}

.benefits-title {
  font-size: 1.1rem;
      font-weight: 600;
  color: $white;
  margin: 0;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.benefit-item {
  @extend .glass-card-mini;
  padding: $spacing-sm;
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
  }
}

.benefit-icon {
  width: 28px;
  height: 28px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.benefit-text {
  flex: 1;
}

.benefit-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 2px 0;
}

.benefit-description {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.3;
}

// Section de droite - Formulaire
.register-right {
  flex: 1;
  min-width: 450px;
  padding: $spacing-sm $spacing-md;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  
  @media (max-width: $mobile) {
    min-width: 100%;
    padding: $spacing-sm;
  }
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  min-height: auto;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  
  @media (max-width: $mobile) {
    max-height: calc(100vh - 60px);
  }
}

.form-header {
  text-align: center;
  margin-bottom: $spacing-xs;
  flex-shrink: 0;
}

.form-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;
}

// Indicateur d'étapes horizontal
.step-indicator-horizontal {
  position: relative;
  margin-top: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.step-dots {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}
  
  .step-dot {
  width: 32px;
  height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  font-size: 0.85rem;
    transition: all 0.3s ease;
  position: relative;
  
  &.pending {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
    
    &.active {
    background: linear-gradient(135deg, $primary 0%, rgba(139, 92, 246, 0.8) 100%);
      color: $white;
    border: 2px solid $primary;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    transform: scale(1.1);
  }
  
  &.completed {
    background: linear-gradient(135deg, #10B981 0%, #34d399 100%);
    color: $white;
    border: 2px solid #10B981;
    
    .step-check {
      font-size: 0.9rem;
    }
  }
}

.step-number {
  font-size: 0.85rem;
  font-weight: 600;
}

.step-progress-line {
    position: absolute;
    top: 50%;
  left: 16px;
  right: 16px;
    height: 2px;
  background: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%);
  z-index: 1;
}
    
.step-progress-fill {
      height: 100%;
  background: linear-gradient(90deg, $primary 0%, rgba(139, 92, 246, 0.8) 100%);
  border-radius: 1px;
  transition: width 0.5s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 100%);
    animation: progressShine 2s ease-in-out infinite;
  }
}

.step-progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-sm;
  font-size: 0.85rem;
}

.progress-label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.progress-percentage {
  color: $primary;
    font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  padding: 2px 8px;
  border-radius: $radius-sm;
  border: 1px solid rgba(59, 130, 246, 0.2);
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

.register-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: $spacing-xs;
}

.step-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-sm;
  
  .form-group-full {
    grid-column: 1 / -1;
  }
}

.form-group {
  margin-bottom: $spacing-xs;
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

// Upload d'image
.profile-upload-section {
  text-align: center;
  margin-bottom: $spacing-md;
}

.image-upload-container {
  display: flex;
  justify-content: center;
}

// Force du mot de passe
.password-strength {
  margin-top: $spacing-sm;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: $radius-full;
  overflow: hidden;
  margin-bottom: $spacing-xs;
}

.strength-fill {
  height: 100%;
  border-radius: $radius-full;
  transition: all 0.3s ease;
  
  &.weak {
    background: linear-gradient(90deg, #ef4444 0%, #f87171 100%);
  }
  
  &.medium {
    background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
  }
  
  &.good {
    background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
  }
  
  &.strong {
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }
}

.strength-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

// Récapitulatif
.summary-card {
  @extend .glass-card-mini;
  padding: $spacing-md;
  margin-bottom: $spacing-md;
}

.summary-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 $spacing-md 0;
  text-align: center;
}

.summary-grid {
  display: grid;
  gap: $spacing-sm;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
}

.summary-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.summary-value {
  font-size: 0.9rem;
  color: $white;
  font-weight: 600;
}

// Conditions d'utilisation
.terms-section {
  margin-top: $spacing-md;
}
  
.terms-checkbox {
    display: flex;
    align-items: flex-start;
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
    flex-shrink: 0;
    margin-top: 2px;
    
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
  
  .terms-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.4;
    
    a {
      color: rgba(59, 130, 246, 0.8);
      text-decoration: none;
      
      &:hover {
        color: rgba(59, 130, 246, 1);
        text-decoration: underline;
      }
    }
  }
}

// Actions et boutons
.form-actions {
  display: flex;
  gap: $spacing-sm;
  margin: $spacing-sm 0;
  flex-shrink: 0;
  
  @media (max-width: $mobile) {
    flex-direction: column;
    gap: $spacing-xs;
  }
}

.form-footer {
  margin-top: $spacing-sm;
  flex-shrink: 0;
  
  @media (max-width: $mobile) {
    margin-top: $spacing-xs;
  }
}

.register-section {
  text-align: center;
}

.register-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: $spacing-sm;
    font-size: 0.95rem;
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
  flex: 1;
  
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

@keyframes progressShine {
  0% { transform: translateX(-20px); }
  100% { transform: translateX(100px); }
}

// Responsive
@media (max-width: $tablet) {
  .register-page {
    padding: $spacing-sm 0;
  }
  
  .register-container {
    flex-direction: column;
    max-width: 800px;
    gap: $spacing-md;
    height: auto;
    min-height: 100%;
  }
  
  .register-left,
  .register-right {
    min-width: auto;
    padding: $spacing-sm $spacing-md;
    flex: none;
  }
  
  .register-left {
    order: 2;
    min-height: auto;
  }
  
  .register-right {
    order: 1;
    min-height: auto;
  }
  
  .register-title {
    font-size: 1.6rem;
  }
  
  .form-wrapper {
    // Le padding est géré par le composant Card
    max-height: calc(100vh - 100px);
  }
  
  .logo-glass {
    width: 60px;
    height: 60px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .step-content {
    min-height: 120px;
  }
  
  .steps-list {
    gap: 4px;
  }
  
  .step-item {
    padding: 6px $spacing-xs;
  }
  
  .benefits-list {
    gap: 4px;
  }
  
  .benefit-item {
    padding: 6px $spacing-xs;
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
  .register-page {
    padding: $spacing-sm 0;
    height: 100vh;
    max-height: 100vh;
    align-items: flex-start;
    padding-top: $spacing-md;
  }
  
  .register-container {
    max-width: 100%;
    padding: 0;
    gap: 0;
    height: 100%;
    overflow-y: auto;
  }
  
  .register-left,
  .register-right {
    padding: 0;
    min-height: auto;
  }
  
  .register-left {
    display: none; // Masquer sur mobile pour économiser l'espace
  }
  
  .register-right {
    flex: 1;
    order: 1;
  }
  
    .register-title {
    font-size: 1.4rem;
  }
  
  .form-wrapper {
    // Le padding est géré par le composant Card
    max-height: calc(100vh - 60px);
  }
  
  .form-title {
    font-size: 1.2rem;
  }
  
  .form-header {
    margin-bottom: $spacing-sm;
  }
  
  .logo-glass {
    width: 50px;
    height: 50px;
  }
  
  .logo-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .step-content {
    min-height: 80px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: $spacing-xs;
  }
  
  .form-group {
    margin-bottom: $spacing-xs;
  }
  
  .btn {
    height: $button-height-mobile;
    min-height: $glass-element-height-mobile;
    padding: 0 $spacing-md;
    font-size: $button-font-size-mobile;
  }
  
  .form-actions {
    gap: $spacing-xs;
    margin: $spacing-sm 0 $spacing-xs 0;
  }
  
  .input-container {
    height: $glass-element-height-mobile;
    min-height: $input-height-mobile;
  }
  
  .form-input {
    font-size: $input-font-size-mobile;
  }
  
  .summary-card {
    padding: $spacing-sm;
  }
  
  .terms-section {
    margin-top: $spacing-sm;
  }
  
  .form-footer {
    margin-top: $spacing-xs;
  }
}
</style> 