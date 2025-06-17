<template>
  <div class="profile-page">
    <div class="profile-container">
      <UiPageTitle title="Profil" />
      
      <div class="profile-content">
        <div class="profile-header">
          <div class="profile-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2>Utilisateur</h2>
          <p class="profile-email">utilisateur@example.com</p>
        </div>

        <div class="profile-stats">
          <div class="stat-item">
            <div class="stat-value">42</div>
            <div class="stat-label">Notes créées</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">12</div>
            <div class="stat-label">Catégories</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">8</div>
            <div class="stat-label">Favoris</div>
          </div>
        </div>

        <div class="profile-actions">
          <UiButton variant="primary" size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            Modifier le profil
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Profil'
})
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: $gray-50;
  padding: 2rem 1rem;
  padding-bottom: 120px; // Espace pour la bottom bar
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
}

.profile-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: $primary;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.profile-header h2 {
  font-size: 1.5rem;
  color: $gray-900;
  margin-bottom: 0.5rem;
}

.profile-email {
  color: $gray-600;
  font-size: 0.9rem;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: $gray-50;
  border-radius: 12px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: $primary;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: $gray-600;
}

.profile-actions {
  text-align: center;
}

@media (max-width: 640px) {
  .profile-page {
    padding: 1rem;
  }
  
  .profile-content {
    padding: 1.5rem;
  }
}
</style> 