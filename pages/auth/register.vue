<template>
  <main class="register">
    <div class="register-container">
      <div class="register-content">
        <div class="register-header">
          <h1 class="register-title">Rejoignez Wiki Notes</h1>
          <p class="register-subtitle">Créez votre compte pour commencer à documenter vos connaissances</p>
        </div>

        <FormCard title="Créer un compte">
          <template #default>
            <form @submit.prevent="handleRegister" class="register-form">
              <!-- Indicateur d'étapes -->
              <div class="step-indicator">
                <div 
                  v-for="(step, index) in steps" 
                  :key="index"
                  :class="['step-dot', { 'active': currentStep >= index }]"
                  @click="goToStep(index)"
                >
                  {{ index + 1 }}
                </div>
                <div class="step-progress">
                  <div class="step-progress-bar" :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"></div>
                </div>
              </div>
              
              <!-- Étape 1: Informations de base -->
              <div v-if="currentStep === 0" class="step-content">
                
                <div class="form-grid">
                  <FormGroup 
                    label="Nom d'utilisateur" 
                    id="username"
                  >
                    <input 
                      type="text" 
                      id="username" 
                      v-model="form.username" 
                      required
                      placeholder="johndoe123"
                    >
                  </FormGroup>

                  <FormGroup 
                    label="Nom complet" 
                    id="full_name"
                  >
                    <input 
                      type="text" 
                      id="full_name" 
                      v-model="form.full_name" 
                      required
                      placeholder="John Doe"
                    >
                  </FormGroup>

                  <FormGroup 
                    label="Email" 
                    id="email"
                  >
                    <input 
                      type="email" 
                      id="email" 
                      v-model="form.email" 
                      required
                      placeholder="vous@entreprise.com"
                    >
                  </FormGroup>
                </div>
              </div>
              
              <!-- Étape 2: Organisation et photo -->
              <div v-if="currentStep === 1" class="step-content">
                <h3 class="step-title">Organisation et profil</h3>
                
                <div class="profile-image-section">
                  <FormGroup 
                    label="Photo de profil" 
                    id="profile_picture"
                    textAlign="center"
                  >
                    <ImageUpload v-model="form.profile_picture" />
                  </FormGroup>
                </div>
                
                <FormGroup 
                  label="Organisation" 
                  id="organization"
                >
                  <input 
                    type="text" 
                    id="organization" 
                    v-model="form.organization" 
                    placeholder="Votre entreprise ou équipe"
                  >
                </FormGroup>
              </div>
              
              <!-- Étape 3: Mot de passe -->
              <div v-if="currentStep === 2" class="step-content">
                <h3 class="step-title">Sécurité</h3>
                
                <FormGroup 
                  label="Mot de passe" 
                  id="password"
                >
                  <input 
                    type="password" 
                    id="password" 
                    v-model="form.password" 
                    required
                    placeholder="••••••••"
                  >
                </FormGroup>

                <FormGroup 
                  label="Confirmer le mot de passe" 
                  id="confirmPassword"
                >
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    v-model="form.confirmPassword" 
                    required
                    placeholder="••••••••"
                  >
                </FormGroup>
              </div>
              
              <!-- Étape 4: Conditions et finalisation -->
              <div v-if="currentStep === 3" class="step-content">
                <h3 class="step-title">Finalisation</h3>
                
                <div class="terms-section">
                  <label class="terms-label">
                    <input 
                      type="checkbox" 
                      v-model="form.acceptTerms" 
                      required
                    >
                    <span>J'accepte les <a href="/terms" target="_blank">conditions d'utilisation</a> et la <a href="/privacy" target="_blank">politique de confidentialité</a></span>
                  </label>
                </div>
                
                <div class="summary-section">
                  <h4>Récapitulatif</h4>
                  <p><strong>Nom d'utilisateur:</strong> {{ form.username }}</p>
                  <p><strong>Nom complet:</strong> {{ form.full_name }}</p>
                  <p><strong>Email:</strong> {{ form.email }}</p>
                  <p v-if="form.organization"><strong>Organisation:</strong> {{ form.organization }}</p>
                </div>
              </div>
              
              <!-- Boutons de navigation -->
              <div class="form-nav-buttons">
                <button 
                  v-if="currentStep > 0"
                  type="button" 
                  @click="prevStep"
                  class="back-link"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-left']" /> Retour
                </button>
                
                <FormButton 
                  v-if="currentStep < steps.length - 1"
                  type="button" 
                  @click="nextStep"
                  icon="arrow-right"
                  icon-position="right"
                >
                  Suivant
                </FormButton>
                
                <FormButton 
                  v-if="currentStep === steps.length - 1"
                  type="submit" 
                  icon="user-plus"
                  :loading="isLoading"
                >
                  Créer mon compte
                </FormButton>
              </div>
            </form>
            
            <div class="form-footer">
              <p>Déjà inscrit ?</p>
              <NuxtLink to="/auth/login">Se connecter</NuxtLink>
            </div>
          </template>
        </FormCard>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">


const router = useRouter();
const isLoading = ref(false);

// Définition des étapes
const steps = [
  { name: 'Informations de base' },
  { name: 'Organisation et profil' },
  { name: 'Sécurité' },
  { name: 'Finalisation' }
];

// État de l'étape actuelle
const currentStep = ref(0);

// Méthodes de navigation entre étapes
const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    // Validation basique pour l'étape 1
    if (currentStep.value === 0) {
      if (!form.username || !form.full_name || !form.email) {
        alert('Veuillez compléter tous les champs requis');
        return;
      }
    }
    
    // Validation basique pour l'étape 3
    if (currentStep.value === 2) {
      if (!form.password || !form.confirmPassword) {
        alert('Veuillez renseigner un mot de passe');
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
      }
    }
    
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const goToStep = (step: number) => {
  if (step <= currentStep.value) {
    currentStep.value = step;
  }
};

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

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return
  }
  
  if (!form.acceptTerms) {
    alert('Veuillez accepter les conditions d\'utilisation');
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
    };

    const response = await authService.register(userData)
    if (response.userId) {
      const authStore = useAuthStore();
      authStore.setPendingEmail(form.email);
      authStore.setIsAuthenticated(false);
      router.push('/auth/confirmation-sent');
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register {
  min-height: 80vh;
  display: grid;
  place-items: center;
  background-color: $bg-dark;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba($primary, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba($primary, 0.1) 0%, transparent 50%);
  padding: 2rem;
  color: $white;
}

.register-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.register-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
  
  .register-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    
    background: linear-gradient(to right, $primary-dark, $primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .register-subtitle {
    font-size: 1.1rem;
    color: $gray-500;
  }
}

:deep(.form-card) {
  width: 100%;
  max-width: 700px;
  background-color: $bg-card;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  
  .card-header {
    background-color: rgba(255, 255, 255, 0.02);
    padding: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      text-align: center;
    }
  }
  
  .card-content {
    padding: 2rem;
  }
}

.step-indicator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  
  .step-dot {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: $gray-700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    z-index: 2;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &.active {
      background-color: $primary;
      color: $white;
    }
  }
  
  .step-progress {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    z-index: 1;
    transform: translateY(-50%);
    
    .step-progress-bar {
      height: 100%;
      background-color: $primary;
      transition: width 0.3s ease;
    }
  }
}

.step-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  
  .step-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    color: $primary-light;
  }
}

.profile-image-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

:deep(.form-group) {
  margin-bottom: 1.75rem;
  position: relative;

  label {
    display: block;
    margin-bottom: 0.75rem;
    color: $gray-700;
    font-weight: 600;
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    color: $gray-800;
    font-size: 1rem;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: $primary;
      background-color: $white;
      box-shadow: 0 0 0 3px rgba($primary, 0.3);
    }
    
    &::placeholder {
      color: $gray-400;
    }
  }
}

.terms-section {
  margin-bottom: 2rem;
  
  .terms-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: $gray-700;
    font-size: 0.95rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin-top: 0.25rem;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 0.25rem;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background-color: $white;
      cursor: pointer;
      
      &:checked {
        background-color: $primary;
        border-color: $primary;
      }
    }
    
    a {
      color: $primary;
      font-weight: 500;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    span {
      color: $gray-700;
    }
  }
}

.summary-section {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $primary;
  }
  
  p {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: $gray-700;
    
    strong {
      color: $gray-900;
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
}

.form-nav-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  
  .back-link {
    background: none;
    border: none;
    color: $primary;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: $primary-dark;
      transform: translateX(-3px);
    }
    
    i {
      font-size: 0.9em;
    }
  }
  
  :deep(.form-button) {
    flex: 1;
  }
}

:deep(.form-button) {
  padding: 0.85rem;
  background-color: $primary;
  color: $bg-dark;
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background-color: $primary-dark;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  svg {
    font-size: 1.1em;
  }
}

.form-footer {
  margin-top: 2rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  p {
    color: $gray-700;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }

  a {
    color: $primary-light;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      color: $white;
    }
  }
}

@media (max-width: 768px) {
  .register {
    padding: 1rem;
  }
  
  .register-header {
    .register-title {
      font-size: 2rem;
    }
    
    .register-subtitle {
      font-size: 1rem;
    }
  }
}
</style> 