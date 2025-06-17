<template>
  <main class="confirm-email">
    <div class="confirmation-container">
      <div class="confirmation-content">
        <div class="confirmation-header">
          <h1 class="confirmation-title">Confirmation de l'email</h1>
          <p class="confirmation-subtitle">Vérification de votre adresse email</p>
        </div>

        <FormCard>
          <div v-if="isLoading" class="status-message">
            <div class="icon-wrapper">
              <FontAwesomeIcon :icon="['fas', 'spinner']" class="spinner-icon" />
            </div>
            <h2>Vérification en cours...</h2>
            <p>Veuillez patienter pendant que nous confirmons votre email.</p>
          </div>
          
          <div v-else-if="isConfirmed" class="status-message success">
            <div class="icon-wrapper">
              <FontAwesomeIcon :icon="['fas', 'check-circle']" class="success-icon" />
            </div>
            <h2>Email confirmé avec succès !</h2>
            <p>Votre compte a été activé. Vous pouvez maintenant vous connecter.</p>
            <FormButton 
              to="/auth/login"
              icon="sign-in-alt"
            >
              Se connecter
            </FormButton>
          </div>

          <div v-else-if="error" class="status-message error">
            <div class="icon-wrapper">
              <FontAwesomeIcon :icon="['fas', 'exclamation-circle']" class="error-icon" />
            </div>
            <h2>Erreur de confirmation</h2>
            <p>{{ error }}</p>
            <FormButton 
              to="/"
              icon="home"
              variant="secondary"
            >
              Retour à l'accueil
            </FormButton>
          </div>
        </FormCard>

        <div class="confirmation-features">
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'shield-alt']" class="feature-icon" />
            <h3>Sécurité</h3>
            <p>Votre compte est maintenant sécurisé</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'rocket']" class="feature-icon" />
            <h3>Prêt à démarrer</h3>
            <p>Accédez à toutes les fonctionnalités</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'users']" class="feature-icon" />
            <h3>Collaboration</h3>
            <p>Commencez à travailler en équipe</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '~/services/api/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const isConfirmed = ref(false)
const error = ref<string | null>(null)

// Récupérer le token depuis l'URL
const token = route.query.token as string

onMounted(async () => {
  if (!token) {
    error.value = "Token de confirmation manquant"
    isLoading.value = false
    return
  }
  try {
    const response = await authService.confirmEmail(token)
    
    if (response.success) {
      isConfirmed.value = true
      // Mettre à jour le store si nécessaire
      if (response.user) {
        authStore.setUser(response.user)
      }
    } else {
      error.value = response.message || "Erreur lors de la confirmation de l'email"
    }
  } catch (err: any) {
    error.value = err.message || "Une erreur est survenue lors de la confirmation"
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.confirm-email {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background-color: $bg-dark;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba($primary, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba($primary, 0.1) 0%, transparent 50%);
  padding: 2rem;
  color: $white;
}

.confirmation-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.confirmation-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.confirmation-header {
  text-align: center;
  margin-bottom: 2rem;
  
  .confirmation-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(to right, $white, $primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .confirmation-subtitle {
    font-size: 1.1rem;
    color: $gray-400;
  }
}

:deep(.form-card) {
  width: 100%;
  max-width: 450px;
  background-color: $bg-card;
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  
  .card-content {
    padding: 2rem;
  }
}

.status-message {
  text-align: center;
  
  .icon-wrapper {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background-color: rgba($primary, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .spinner-icon {
      font-size: 2rem;
      color: $primary;
      animation: spin 1s linear infinite;
    }
    
    .success-icon {
      font-size: 2rem;
      color: #50fa7b;
    }
    
    .error-icon {
      font-size: 2rem;
      color: #ff5555;
    }
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $white;
  }
  
  p {
    color: $gray-300;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 0.95rem;
  }
  
  &.success h2 {
    color: #50fa7b;
  }
  
  &.error h2 {
    color: #ff5555;
  }
}

:deep(.form-button) {
  width: 100%;
  padding: 0.85rem;
  background-color: $white;
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
  text-decoration: none;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &.variant-secondary {
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: $white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
  
  svg {
    font-size: 1.1em;
  }
}

.confirmation-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  
  .feature-item {
    text-align: center;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.02);
    border-radius: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .feature-icon {
      font-size: 2rem;
      color: $primary;
      margin-bottom: 1rem;
    }
    
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: $gray-400;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .confirm-email {
    padding: 1rem;
  }
  
  .confirmation-header {
    .confirmation-title {
      font-size: 2rem;
    }
    
    .confirmation-subtitle {
      font-size: 1rem;
    }
  }
  
  .confirmation-features {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>
