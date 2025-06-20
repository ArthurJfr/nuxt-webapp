<template>
  <main class="reset-confirmation">
    <div class="confirmation-container">
      <div class="confirmation-content">
        <div class="confirmation-header">
          <h1 class="confirmation-title">Email envoyé !</h1>
          <p class="confirmation-subtitle">Vérifiez votre boîte de réception pour réinitialiser votre mot de passe</p>
        </div>

        <FormCard>
          <div class="confirmation-message">
            <div class="icon-wrapper">
              <FontAwesomeIcon :icon="['fas', 'envelope']" class="confirmation-icon" />
            </div>
            <p>Nous avons envoyé un lien de réinitialisation à votre adresse email. Le lien est valable pendant 24 heures.</p>
            <p class="note">Si vous ne trouvez pas l'email, vérifiez votre dossier spam.</p>
          </div>

          <div class="form-footer">
            <NuxtLink to="/auth/login" class="back-to-login">
              <FontAwesomeIcon :icon="['fas', 'arrow-left']" />
              Retour à la connexion
            </NuxtLink>
          </div>
        </FormCard>

        <div class="confirmation-features">
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'shield-alt']" class="feature-icon" />
            <h3>Sécurité</h3>
            <p>Votre compte reste protégé pendant le processus</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'clock']" class="feature-icon" />
            <h3>24 Heures</h3>
            <p>Le lien expire après 24 heures</p>
          </div>
          <div class="feature-item">
            <FontAwesomeIcon :icon="['fas', 'question-circle']" class="feature-icon" />
            <h3>Besoin d'aide ?</h3>
            <p>Contactez notre support si nécessaire</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.reset-confirmation {
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
  
  p {
    color: $gray-300;
    line-height: 1.6;
    margin-bottom: 1rem;
    
    &.note {
      font-size: 0.9rem;
      color: $gray-400;
      font-style: italic;
    }
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
  .reset-confirmation {
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