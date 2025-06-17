<template>
  <main class="login">
    <div class="login-container">
      <div class="login-content">
        <div class="login-header">
          <h1 class="login-title">Bienvenue sur Wiki Notes</h1>
          <p class="login-subtitle">Connectez-vous pour accéder à votre espace de documentation</p>
        </div>

        <FormCard title="Connexion">
          <form @submit.prevent="handleLogin" class="login-form">
            <FormGroup 
              label="Email" 
              id="email"
            >
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="votre@email.com"
              >
            </FormGroup>
            
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
              <NuxtLink to="/auth/reset-password" class="forgot-password">
                Mot de passe oublié ?
              </NuxtLink>
            </FormGroup>

            <FormButton 
              type="submit" 
              icon="sign-in-alt"
              :loading="isLoading"
            >
              Se connecter
            </FormButton>
          </form>
          
          <div class="form-footer">
            <p>Pas encore de compte ?</p>
            <NuxtLink to="/auth/register" class="register-link">
              <FontAwesomeIcon :icon="['fas', 'user-plus']" />
              Créer un compte
            </NuxtLink>
          </div>
        </FormCard>

        <!-- <div class="login-features">
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'edit']" class="feature-icon" />
            <h3>Édition Markdown</h3>
            <p>Créez et modifiez vos documents avec un éditeur puissant</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'users']" class="feature-icon" />
            <h3>Collaboration</h3>
            <p>Travaillez en équipe sur vos documents</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'search']" class="feature-icon" />
            <h3>Recherche Avancée</h3>
            <p>Trouvez rapidement vos documents</p>
          </div>
        </div> -->
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { authService } from '~/services/api/auth'
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore();

const router = useRouter()
const isLoading = ref(false)
const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  isLoading.value = true
  try {
    const response = await authService.login(form)
    if (response.token) {
      if (response.user.active) {
        authStore.setToken(response.token);
        authStore.setIsAuthenticated(true);
        authStore.setUser(response.user);
        router.push('/dashboard');
      } else {
        authStore.setPendingEmail(response.user.email);
        await authService.resendConfirmationEmail(response.user.email);
        navigateTo({
          path: '/auth/confirmation-sent',
          query: {
            email: response.user.email
          }
        })
      }
    } else {
      console.error('Erreur de connexion:', response.message);
    }
  } catch (error) {
    console.error('Erreur de connexion:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 80vh;
  display: grid;
  place-items: center;
  background-color: $bg-dark;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba($primary, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba($primary, 0.1) 0%, transparent 50%);
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.login-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
  
  .login-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(to right, $primary-dark, $primary-light);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .login-subtitle {
    font-size: 1.1rem;
    color: $gray-500;
  }
}

:deep(.form-card) {
  width: 100%;
  max-width: 450px;
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
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
   
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

  .forgot-password {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.85rem;
    color: $gray-400;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: $primary-light;
    }
  }
}

:deep(.form-button) {
  width: 100%;
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
  margin-top: 2rem;

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

  p {
    color: $gray-400;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }

  .register-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: $primary-light;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      color: $gray-800;
      transform: translateY(-1px);
    }
    
    svg {
      font-size: 0.9em;
    }
  }
}

.login-features {
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
  .login {
    padding: 1rem;
  }
  
  .login-header {
    .login-title {
      font-size: 2rem;
    }
    
    .login-subtitle {
      font-size: 1rem;
    }
  }
  
  .login-features {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style> 