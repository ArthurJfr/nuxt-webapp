<template>
  <main class="confirmation-sent">
    <div class="confirmation-container">
      <div class="confirmation-content">
        <div class="confirmation-header">
          <h1 class="confirmation-title">Vérifiez votre email</h1>
          <p class="confirmation-subtitle">Un email de confirmation a été envoyé à votre adresse</p>
        </div>

        <FormCard>
          <div class="confirmation-message">
            <div class="icon-wrapper">
              <FontAwesomeIcon :icon="['fas', 'envelope']" class="confirmation-icon" />
            </div>
            <p class="email-sent">
              Email envoyé à<br>
              <strong class="email-highlight">{{ email }}</strong>
            </p>
            <p class="instructions">
              Veuillez cliquer sur le lien dans l'email pour activer votre compte.
              Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
            </p>
          </div>

          <div class="actions">
            <p class="resend-text">Vous n'avez pas reçu l'email ?</p>
            <FormButton 
              @click="handleResendEmail" 
              icon="redo"
              :loading="isResending"
              :disabled="cooldownActive"
            >
              <template v-if="cooldownActive">
                Réessayer dans {{ cooldownTime }}s
              </template>
              <template v-else>
                Renvoyer l'email
              </template>
            </FormButton>
          </div>

          <div class="form-footer">
            <div class="navigation-links">
              <NuxtLink to="/auth/login" class="nav-link">
                <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
                Retour à la connexion
              </NuxtLink>
              <NuxtLink to="/" class="nav-link">
                <FontAwesomeIcon :icon="['fas', 'home']" />
                Page d'accueil
              </NuxtLink>
            </div>
          </div>
        </FormCard>

        <div class="confirmation-features">
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'shield-alt']" class="feature-icon" />
            <h3>Sécurité</h3>
            <p>Votre compte est protégé</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'clock']" class="feature-icon" />
            <h3>24 Heures</h3>
            <p>Le lien expire après 24 heures</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'question-circle']" class="feature-icon" />
            <h3>Besoin d'aide ?</h3>
            <p>Contactez notre support</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { authService } from '~/services/api/auth'

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const email = ref(authStore.pendingEmail || '');
const isResending = ref(false)
const cooldownTime = ref(0)
const cooldownActive = computed(() => cooldownTime.value > 0)

const startCooldown = () => {
  cooldownTime.value = 30 // 30 secondes de cooldown
  const timer = setInterval(() => {
    cooldownTime.value--
    if (cooldownTime.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleResendEmail = async () => {
  if (isResending.value || cooldownActive.value) return
  
  try {
    isResending.value = true
    await authService.resendConfirmationEmail(email.value)
    
    // Afficher une notification de succès
    alert('Email de confirmation renvoyé avec succès')
    
    // Démarrer le cooldown
    startCooldown()
  } catch (error: any) {
    console.error('Erreur lors du renvoi:', error)
    alert(error.message || 'Erreur lors du renvoi de l\'email')
  } finally {
    isResending.value = false
  }
}
</script>

<style lang="scss" scoped>
.confirmation-sent {
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

.confirmation-message {
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
    
    .confirmation-icon {
      font-size: 2rem;
      color: $primary;
    }
  }
  
  .email-sent {
    color: $gray-300;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.6;

    .email-highlight {
      color: $white;
      display: block;
      margin-top: 0.5rem;
      font-size: 1.2rem;
    }
  }

  .instructions {
    color: $gray-400;
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

.actions {
  margin: 2rem 0;
  text-align: center;
  
  .resend-text {
    color: $gray-300;
    margin-bottom: 1rem;
    font-size: 0.95rem;
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

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background-color: $gray-700;
    color: $gray-400;
    cursor: not-allowed;
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

  .navigation-links {
    display: flex;
    justify-content: center;
    gap: 2rem;

    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: $primary-light;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        color: $white;
        transform: translateX(-3px);
      }
      
      svg {
        font-size: 0.9em;
      }
    }
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

@media (max-width: 768px) {
  .confirmation-sent {
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
