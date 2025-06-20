<template>
  <main class="reset-password">
    <div class="reset-container">
      <div class="reset-content">
        <div class="reset-header">
          <h1 class="reset-title">Réinitialisation du mot de passe</h1>
          <p class="reset-subtitle">Entrez votre adresse email pour recevoir un lien de réinitialisation</p>
        </div>

        <FormCard>
          <form @submit.prevent="handleReset" class="reset-form">
            <FormGroup 
              label="Email" 
              id="email"
            >
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                required
                placeholder="votre@email.com"
              >
            </FormGroup>

            <FormButton 
              type="submit" 
              icon="paper-plane"
              :loading="isLoading"
            >
              Envoyer le lien
            </FormButton>

            <div class="form-footer">
              <NuxtLink to="/auth/login" class="back-to-login">
                <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
                Retour à la connexion
              </NuxtLink>
            </div>
          </form>
        </FormCard>

        <div class="reset-features">
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'envelope']" class="feature-icon" />
            <h3>Email Sécurisé</h3>
            <p>Recevez un lien de réinitialisation sécurisé</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'clock']" class="feature-icon" />
            <h3>Lien Valide 24h</h3>
            <p>Votre lien expire après 24 heures</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'lock']" class="feature-icon" />
            <h3>Protection</h3>
            <p>Votre compte reste protégé</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { authService } from '~/services/api/auth'

const email = ref('')
const isLoading = ref(false)

const handleReset = async () => {
  try {
    isLoading.value = true
    const response = await authService.resetPassword(email.value)
    if (response.success) {
      // Rediriger vers une page de confirmation
      navigateTo('/auth/reset-confirmation')
    }
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.reset-password {
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

.reset-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.reset-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.reset-header {
  text-align: center;
  margin-bottom: 2rem;
  
  .reset-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(to right, $white, $primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .reset-subtitle {
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

:deep(.form-group) {
  margin-bottom: 1.75rem;
  position: relative;

  label {
    display: block;
    margin-bottom: 0.75rem;
    color: $gray-300;
    font-weight: 500;
    font-size: 0.95rem;
  }

  input {
    width: 100%;
    padding: 0.85rem 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    color: $white;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: $primary;
      background-color: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 3px rgba($primary, 0.2);
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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

  .back-to-login {
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

.reset-features {
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
  .reset-password {
    padding: 1rem;
  }
  
  .reset-header {
    .reset-title {
      font-size: 2rem;
    }
    
    .reset-subtitle {
      font-size: 1rem;
    }
  }
  
  .reset-features {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style> 