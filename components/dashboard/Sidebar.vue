<template> 
  <div class="mobile-menu-toggle" @click="toggleMenu">
    <font-awesome-icon :icon="['fas', 'bars']" />
  </div>

  <aside class="dashboard-sidebar" :class="{ 'is-open': isMenuOpen }">
    <div class="sidebar-header">
      <Logo to="/dashboard" isSidebar />
    </div>
    
    <nav class="sidebar-nav">
      <NuxtLink to="/dashboard" class="nav-item" exact-active-class="active">
        <font-awesome-icon :icon="['fas', 'chart-line']" />
        <span>Vue d'ensemble</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/collaborateurs" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'users']" />
        <span>Collaborateurs</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/notes" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'file-alt']" />
        <span>Notes Markdown</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/categories" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'folder']" />
        <span>Catégories</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/activite" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'history']" />
        <span>Activités</span>
      </NuxtLink>
      <NuxtLink to="/dashboard/stockage" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'database']" />
        <span>Stockage</span>
      </NuxtLink>

>
      <NuxtLink to="/dashboard/espace" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'folder-open']" />
        <span>Espaces</span>
      </NuxtLink>

      <NuxtLink to="/dashboard/parametres" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'cog']" />
        <span>Paramètres</span>
      </NuxtLink>
      <!-- <NuxtLink to="/dashboard/logs" class="nav-item" active-class="active">
        <font-awesome-icon :icon="['fas', 'clipboard-list']" />
        <span>Logs</span>
      </NuxtLink> -->
    </nav>
    
    <div class="sidebar-footer">
      <NuxtLink to="/dashboard/preferences" class="user-profile">
        
        <img 
          :src="user?.avatar || '/images/default-avatar.png'" 
          :alt="user?.username"
          class="avatar"
        />
        <div class="user-info">
          <span class="username">{{ user?.username || 'Utilisateur' }}</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/" class="back-link">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        <span>Retour au site</span>
      </NuxtLink>
      <NuxtLink to="/auth/login" class="logout-btn" @click="logout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <span>Déconnexion</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import Logo from '@/components/ui/Logo.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const logout = () => {
  // Implémentation de la déconnexion
  // À compléter avec la logique d'authentification
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.mobile-menu-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  background-color: $bg-card;
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: 24px;
    height: 24px;
    color: $primary-dark;
  }
  
  &:hover {
    background-color: rgba(255,255,255,0.05);
  }
}

.dashboard-sidebar {
  width: 280px;
  background-color: $bg-card;
  border-right: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,0.1);
    border-radius: 10px;
  }
  
  .sidebar-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: sticky;
    top: 0;
    background-color: $bg-card;
    z-index: 2;
    
    .logo-icon {
      font-size: 1.8rem;
    }
    
    .sidebar-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: $gray-700;
    }
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 1.5rem 0;
    overflow-y: auto;
    
    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      color: $primary-dark;
      text-decoration: none;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
      
      &:hover {
        background-color: rgba(255,255,255,0.05);
        color: $primary-dark;
      }
      
      &.active {
        color: $gray-600;
        background-color: rgba(255,255,255,0.05);
        border-left-color: $primary;
      }
      
      svg {
        width: 20px;
      }
    }
  }
  
  .sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: sticky;
    bottom: 0;
    background-color: $bg-card;
    z-index: 2;
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      text-decoration: none;
      color: $gray-300;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba(255,255,255,0.05);
      }
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .user-info {
        display: flex;
        flex-direction: column;
        
        .username {
          font-weight: 500;
          color: $primary-dark;
        }
      }
    }
    
    .back-link, .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      font-size: 0.9rem;
      
      svg {
        width: 16px;
      }
    }
    
    .back-link {
      color: $gray-300;
      text-decoration: none;
      
      &:hover {
        background-color: rgba(255,255,255,0.05);
      }
    }
    
    .logout-btn {
      background-color: rgba(239, 68, 68, 0.1);
      color: $error;
      border: none;
      cursor: pointer;
      
      &:hover {
        background-color: rgba(239, 68, 68, 0.2);
      }
    }
  }
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    z-index: 999;
    transition: left 0.3s ease;
    
    &.is-open {
      left: 0;
    }
    
    .sidebar-header {
      padding: 1rem;
      
      .logo-icon {
        font-size: 1.5rem;
      }
      
      .sidebar-title {
        font-size: 1.2rem;
      }
    }
    
    .sidebar-nav {
      padding: 1rem 0;
      
      .nav-item {
        padding: 0.5rem 1rem;
        
        span {
          font-size: 0.9rem;
        }
        
        svg {
          width: 16px;
        }
      }
    }
    
    .sidebar-footer {
      padding: 1rem;
      
      .user-profile {
        padding: 0.5rem;
        
        .avatar {
          width: 32px;
          height: 32px;
        }
        
        .user-info {
          .username {
            font-size: 0.9rem;
          }
        }
      }
      
      .back-link, .logout-btn {
        padding: 0.5rem 0.75rem;
        font-size: 0.85rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .dashboard-sidebar {
    .sidebar-nav {
      .nav-item {
        padding: 0.5rem;
        
        span {
          font-size: 0.85rem;
        }
      }
    }
    
    .sidebar-footer {
      .user-profile {
        .avatar {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
}

// Ajout d'un overlay pour fermer le menu en cliquant à l'extérieur
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  
  &.is-visible {
    display: block;
  }
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
}
</style> 