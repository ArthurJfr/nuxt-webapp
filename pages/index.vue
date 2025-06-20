<template>
  <div class="landing-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <div class="nav-logo">
            <div class="nav-logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="2"/>
                <path d="M12 10v6"/>
                <path d="M9 13h6"/>
              </svg>
            </div>
            <span class="nav-brand-text">FileShare</span>
          </div>
        </div>
        
        <div class="nav-menu" :class="{ 'nav-menu-open': mobileMenuOpen }">
          <div class="nav-links">
            <a href="#features" class="nav-link" @click="scrollToSection('features')">Fonctionnalités</a>
            <a href="#how-it-works" class="nav-link" @click="scrollToSection('how-it-works')">Comment ça marche</a>
            <a href="#pricing" class="nav-link" @click="scrollToSection('cta')">Tarifs</a>
          </div>
          
          <div class="nav-auth">
            <NuxtLink to="/auth/login" class="btn btn-ghost">
              <FontAwesomeIcon :icon="['fas', 'sign-in-alt']" />
              <span>Connexion</span>
            </NuxtLink>
            <NuxtLink to="/auth/register" class="btn btn-primary-nav">
              <FontAwesomeIcon :icon="['fas', 'user-plus']" />
              <span>Inscription</span>
            </NuxtLink>
          </div>
        </div>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu" :class="{ 'active': mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <!-- Particules flottantes améliorées -->
        <div class="hero-particles">
          <div v-for="i in 25" :key="i" class="particle" :style="getParticleStyle(i)"></div>
        </div>
        
        <!-- Formes géométriques flottantes -->
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
        
        <!-- Gradient overlay amélioré -->
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-logo">
          <Icon3D 
            :icon="['fas', 'folder-plus']" 
            size="xl" 
            color="#3B82F6" 
            glow-color="#3B82F6"
            :particle-count="12"
          />
        </div>
        
        <h1 class="hero-title animated-title">FileShare</h1>
        <div class="hero-subtitle-container glass-card-enhanced">
          <p class="hero-subtitle">
            Collaborez et partagez en toute simplicité
          </p>
        </div>
        
        <div class="hero-actions">
          <NuxtLink to="/auth/register" class="btn btn-primary glass-btn">
            <div class="btn-content">
              <FontAwesomeIcon :icon="['fas', 'rocket']" />
              <span>Commencer gratuitement</span>
            </div>
            <div class="btn-shine"></div>
          </NuxtLink>
          <button class="btn btn-secondary glass-btn" @click="scrollToFeatures">
            <div class="btn-content">
              <FontAwesomeIcon :icon="['fas', 'play']" />
              <span>Voir la démo</span>
            </div>
            <div class="btn-shine"></div>
          </button>
        </div>
        
        <!-- Badge de confiance -->
        <div class="trust-badge">
          <div class="trust-badge-content glass-card-mini">
            <FontAwesomeIcon :icon="['fas', 'shield-alt']" />
            <span>Sécurisé et conforme RGPD</span>
          </div>
        </div>
        
        <!-- Stats globales avec glassmorphisme -->
        <div class="hero-stats">
          <div class="stat glass-card">
            <div class="stat-content">
              <div class="stat-number">10K+</div>
              <div class="stat-label">Utilisateurs actifs</div>
            </div>
            <div class="stat-shine"></div>
          </div>
          <div class="stat glass-card">
            <div class="stat-content">
              <div class="stat-number">1M+</div>
              <div class="stat-label">Fichiers partagés</div>
            </div>
            <div class="stat-shine"></div>
          </div>
          <div class="stat glass-card">
            <div class="stat-content">
              <div class="stat-number">99.9%</div>
              <div class="stat-label">Uptime</div>
            </div>
            <div class="stat-shine"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Stats Section -->
    <section class="live-stats">
      <div class="container">
        <div class="live-stats-header">
          <h3 class="live-stats-title animated-title">En ce moment sur FileShare</h3>
          <p class="live-stats-subtitle">L'activité collaborative en temps réel</p>
        </div>
        
        <div class="live-stats-grid">
          <div class="mini-stat-card glass-card-mini glow-effect" :style="{ '--glow-color': '#3B82F6' }">
            <div class="mini-stat-icon">
              <FontAwesomeIcon :icon="['fas', 'users']" />
            </div>
            <div class="mini-stat-number">{{ liveStats.activeUsers }}</div>
            <div class="mini-stat-label">Utilisateurs actifs</div>
            <div class="live-indicator"></div>
          </div>
          
          <div class="mini-stat-card glass-card-mini">
            <div class="mini-stat-icon">
              <FontAwesomeIcon :icon="['fas', 'file-alt']" />
            </div>
            <div class="mini-stat-number">{{ liveStats.filesShared }}</div>
            <div class="mini-stat-label">Fichiers partagés aujourd'hui</div>
          </div>
          
          <div class="mini-stat-card glass-card-mini glow-effect" :style="{ '--glow-color': '#10B981' }">
            <div class="mini-stat-icon">
              <FontAwesomeIcon :icon="['fas', 'comments']" />
            </div>
            <div class="mini-stat-number">{{ liveStats.activeCollaborations }}</div>
            <div class="mini-stat-label">Collaborations actives</div>
            <div class="live-indicator"></div>
          </div>
          
          <div class="mini-stat-card glass-card-mini">
            <div class="mini-stat-icon">
              <FontAwesomeIcon :icon="['fas', 'clock']" />
            </div>
            <div class="mini-stat-number">{{ liveStats.recentUploads }}</div>
            <div class="mini-stat-label">Uploads cette heure</div>
          </div>
          
          <div class="mini-stat-card glass-card-mini">
            <div class="mini-stat-icon">
              <FontAwesomeIcon :icon="['fas', 'globe']" />
            </div>
            <div class="mini-stat-number">{{ liveStats.countriesActive }}</div>
            <div class="mini-stat-label">Pays connectés</div>
          </div>
          
          <div class="mini-stat-card glass-card-mini glow-effect" :style="{ '--glow-color': '#8B5CF6' }">
            <div class="mini-stat-icon">
              <FontAwesomeIcon :icon="['fas', 'handshake']" />
            </div>
            <div class="mini-stat-number">{{ liveStats.newTeams }}</div>
            <div class="mini-stat-label">Nouvelles équipes</div>
            <div class="live-indicator"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section avec glassmorphisme -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-header">
          <div class="section-title-container glass-card-enhanced glow-effect" :style="{ '--glow-color': '#3B82F6' }">
            <h2 class="section-title animated-title">Collaborer n'a jamais été aussi simple</h2>
            <div class="title-shine"></div>
          </div>
          <p class="section-subtitle">
            Des outils puissants pour collaborer efficacement
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            v-for="feature in features"
            :key="feature.id"
            class="feature-card glass-card-enhanced animated-card"
            :style="{ '--animation-delay': `${feature.id * 0.1}s` }"
          >
            <div class="feature-content">
              <div class="feature-icon-container">
                <div class="feature-icon" :style="{ '--icon-color': feature.color }">
                  <FontAwesomeIcon :icon="feature.icon" />
                </div>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
            <div class="card-shine"></div>
            <div class="card-border"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works avec glassmorphisme -->
    <section id="how-it-works" class="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-title-container glass-card">
            <h2 class="section-title animated-title">Commencez en 3 étapes</h2>
            <div class="title-shine"></div>
          </div>
          <p class="section-subtitle">Simple et efficace</p>
        </div>
        
        <div class="steps">
          <div 
            v-for="(step, index) in steps"
            :key="step.id"
            class="step glass-card-enhanced animated-step"
            :style="{ '--animation-delay': `${index * 0.2}s` }"
          >
            <div class="step-content">
              <div class="step-number-container">
                <div class="step-number">{{ index + 1 }}</div>
                <div class="number-glow"></div>
              </div>
              <div class="step-text">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
            <div class="step-shine"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section -->
    <section class="social-proof">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Ils nous font confiance</h2>
          <p class="section-subtitle">Rejoignez des milliers d'équipes satisfaites</p>
        </div>
        
        <div class="testimonials-grid">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card glass-card-enhanced">
            <div class="testimonial-content">
              <div class="testimonial-quote">
                <FontAwesomeIcon :icon="['fas', 'quote-left']" />
                <p>{{ testimonial.quote }}</p>
              </div>
              <div class="testimonial-author">
                <div class="author-avatar">
                  <img :src="testimonial.avatar" :alt="testimonial.name" />
                </div>
                <div class="author-info">
                  <div class="author-name">{{ testimonial.name }}</div>
                  <div class="author-role">{{ testimonial.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section avec glassmorphisme -->
    <section id="cta" class="cta">
      <div class="container">
        <div class="cta-content glass-card">
          <div class="cta-inner">
            <h2 class="cta-title animated-title">Prêt à commencer ?</h2>
            <p class="cta-subtitle">
              Rejoignez des milliers d'équipes qui collaborent déjà
            </p>
            <div class="cta-actions">
              <NuxtLink to="/auth/register" class="btn btn-primary btn-large glass-btn">
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fas', 'rocket']" />
                  <span>Commencer maintenant</span>
                </div>
                <div class="btn-shine"></div>
              </NuxtLink>
              <NuxtLink to="/auth/login" class="btn btn-secondary btn-large glass-btn">
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fas', 'sign-in-alt']" />
                  <span>Déjà inscrit ?</span>
                </div>
                <div class="btn-shine"></div>
              </NuxtLink>
            </div>
          </div>
          <div class="cta-shine"></div>
          <div class="cta-border"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Meta tags
useHead({
  title: 'FileShare - Partagez et collaborez en toute simplicité',
  meta: [
    { name: 'description', content: 'FileShare est la plateforme collaborative pour partager, synchroniser et gérer vos fichiers entre amis et équipes. Commencez gratuitement dès maintenant.' },
    { name: 'keywords', content: 'partage fichiers, collaboration, stockage cloud, synchronisation, équipe' }
  ]
})

// État du menu mobile
const mobileMenuOpen = ref(false)

// Features axées sur la collaboration - mobile optimized
const features = [
  {
    id: 1,
    title: 'Collaboration',
    description: 'Travaillez ensemble en temps réel',
    icon: ['fas', 'users'],
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Partage sécurisé',
    description: 'Contrôlez les permissions facilement',
    icon: ['fas', 'share-alt'],
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Espaces équipe',
    description: 'Des espaces dédiés à vos projets',
    icon: ['fas', 'layer-group'],
    color: '#8B5CF6'
  },
  {
    id: 4,
    title: 'Discussions',
    description: 'Échangez directement sur vos fichiers',
    icon: ['fas', 'comments'],
    color: '#F59E0B'
  },
  {
    id: 5,
    title: 'Synchronisation',
    description: 'Mises à jour instantanées partout',
    icon: ['fas', 'sync-alt'],
    color: '#EF4444'
  },
  {
    id: 6,
    title: 'Gestion projet',
    description: 'Organisez et suivez vos tâches',
    icon: ['fas', 'tasks'],
    color: '#06B6D4'
  }
]

// Steps axés sur la collaboration - mobile optimized
const steps = [
  {
    id: 1,
    title: 'Créez votre espace',
    description: 'Inscrivez-vous et invitez votre équipe'
  },
  {
    id: 2,
    title: 'Organisez vos projets',
    description: 'Uploadez et structurez vos fichiers'
  },
  {
    id: 3,
    title: 'Collaborez ensemble',
    description: 'Travaillez en temps réel sur vos documents'
  }
]

// Témoignages
const testimonials = [
  {
    id: 1,
    quote: "FileShare a transformé notre façon de collaborer. L'interface est intuitive et les fonctionnalités sont exactement ce dont nous avions besoin.",
    name: "Marie Dubois",
    role: "Chef de projet chez TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c647?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: 2,
    quote: "Fini les emails avec des dizaines de pièces jointes ! Avec FileShare, tout notre équipe travaille sur les mêmes documents en temps réel.",
    name: "Thomas Martin",
    role: "Directeur Marketing chez StartupCo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
  },
  {
    id: 3,
    quote: "La sécurité et la simplicité d'utilisation de FileShare nous ont convaincus dès le premier jour. Nos clients apprécient aussi !",
    name: "Sophie Bernard",
    role: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
  }
]

// Stats en temps réel (simulées avec des refs réactifs)
const liveStats = ref({
  activeUsers: '2.4K',
  filesShared: '847',
  activeCollaborations: '156',
  recentUploads: '89',
  countriesActive: '42',
  newTeams: '23'
})

// Simulation des mises à jour en temps réel
let statsInterval: NodeJS.Timeout
onMounted(() => {
  statsInterval = setInterval(() => {
    // Simuler des fluctuations réalistes
    liveStats.value.activeUsers = `${(2.1 + Math.random() * 0.6).toFixed(1)}K`
    liveStats.value.filesShared = String(820 + Math.floor(Math.random() * 50))
    liveStats.value.activeCollaborations = String(140 + Math.floor(Math.random() * 30))
    liveStats.value.recentUploads = String(80 + Math.floor(Math.random() * 20))
    liveStats.value.newTeams = String(20 + Math.floor(Math.random() * 8))
  }, 3000) // Mise à jour toutes les 3 secondes
})

onUnmounted(() => {
  if (statsInterval) {
    clearInterval(statsInterval)
  }
})

// Fonctions
const getParticleStyle = (index: number) => {
  const delay = Math.random() * 6
  const duration = 8 + Math.random() * 6
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = 1 + Math.random() * 4
  const opacity = 0.1 + Math.random() * 0.3
  
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

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    mobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.landing-page {
  color: $white;
  position: relative;
  overflow-x: hidden;
}

// Navigation Bar
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  color: $white;
}

.nav-logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;
}

.nav-brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, $white 0%, $primary 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: $spacing-xl;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-sm;
  
  &:hover {
    color: $white;
    background: rgba(255, 255, 255, 0.1);
  }
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    color: $white;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
}

.btn-primary-nav {
  background: linear-gradient(135deg, $primary 0%, #8B5CF6 100%);
  color: $white;
  border: none;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  }
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: $spacing-sm;
  
  span {
    width: 24px;
    height: 2px;
    background: $white;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  
  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translateY(6px);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translateY(-6px);
    }
  }
}

// Glassmorphisme style dashboard
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

// Glassmorphisme style dashboard enhanced
.glass-card-enhanced {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.16);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
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

// Hero Section ultra-compact bento
.hero {
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: $spacing-2xl 0;
  margin-top: 70px; // Compensation pour la navbar fixe
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
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
    rgba(59, 130, 246, 0.1) 0%, 
    rgba(139, 92, 246, 0.1) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &.shape-1 {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    top: 10%;
    left: 10%;
    animation: floatShape 20s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 150px;
    height: 150px;
    border-radius: 20px;
    top: 60%;
    right: 15%;
    animation: floatShape 25s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    bottom: 20%;
    left: 20%;
    animation: floatShape 18s ease-in-out infinite;
  }
  
  &.shape-4 {
    width: 120px;
    height: 120px;
    border-radius: 15px;
    top: 30%;
    right: 30%;
    animation: floatShape 22s ease-in-out infinite reverse;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, 
    rgba(0, 0, 0, 0.1) 0%, 
    rgba(0, 0, 0, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 500px;
  padding: $spacing-md;
}

.hero-logo {
  margin-bottom: $spacing-lg;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-title {
  font-size: $hero-title-size;
  font-weight: 700;
  margin: 0 0 $spacing-md 0;
  background: linear-gradient(135deg, 
    $white 0%, 
    rgba(255, 255, 255, 0.9) 50%,
    rgba(59, 130, 246, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
  letter-spacing: -0.02em;
}

.hero-subtitle-container {
  @extend .glass-card;
  border-radius: $radius-md;
  padding: $spacing-md $spacing-lg;
  margin: 0 0 $spacing-2xl 0;
}

.hero-subtitle {
  font-size: $hero-subtitle-size;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.3;
}

.hero-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
  margin-bottom: $spacing-2xl;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-md;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-size: $btn-font-size;
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.btn-primary {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%);
  color: $white;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
  }
}

.btn-secondary {
  color: $white;
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.2) 0%, 
      rgba(255, 255, 255, 0.1) 100%);
    transform: translateY(-4px) scale(1.02);
  }
}

.btn-large {
  padding: $spacing-lg $spacing-3xl;
  font-size: $btn-font-size-large;
}

// Badge de confiance
.trust-badge {
  margin: $spacing-lg 0;
  text-align: center;
}

.trust-badge-content {
  display: inline-flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-md;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  
  svg {
    color: #10B981;
    font-size: 1rem;
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: $spacing-md;
}

.stat {
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
  
  .stat-content {
    position: relative;
    z-index: 2;
  }
  
  .stat-number {
    font-size: $stat-number-size;
    font-weight: 700;
    background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  
  .stat-label {
    font-size: $stat-label-size;
    color: rgba(255, 255, 255, 0.7);
    margin-top: $spacing-xs;
  }
}

// Live Stats Section ultra-bento
.live-stats {
  padding: $spacing-lg 0;
}

.live-stats-header {
  text-align: center;
  margin-bottom: $spacing-md;
}

.live-stats-title {
  font-size: $live-stats-title-size;
  font-weight: 600;
  color: $white;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.01em;
}

.live-stats-subtitle {
  font-size: $live-stats-subtitle-size;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.live-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  max-width: 400px;
  margin: 0 auto;
}

// Mini cards style dashboard
.glass-card-mini {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.mini-stat-card {
  padding: 0.8rem;
  text-align: center;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
}

.mini-stat-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 0 auto 0.5rem auto;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
}

.mini-stat-number {
  font-size: $mini-stat-number-size;
  font-weight: 600;
  color: $white;
  line-height: 1;
  margin-bottom: 0.1rem;
}

.mini-stat-label {
  font-size: $mini-stat-label-size;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.1;
}

// Effet glow simplifié style dashboard
.glow-effect {
  position: relative;
}

// Indicateur live simplifié
.live-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 6px;
  height: 6px;
  background: #10B981;
  border-radius: 50%;
}

// Container ultra-bento
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 $spacing-md;
}

// Sections ultra-bento
.features,
.how-it-works,
.cta {
  padding: $spacing-2xl 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-lg;
}

.section-title-container {
  display: inline-block;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  margin-bottom: $spacing-md;
  position: relative;
}

.section-title {
  font-size: $section-title-size;
  font-weight: 600;
  margin: 0;
  color: $white;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: $section-subtitle-size;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 300px;
  margin: 0 auto;
}

// Features ultra-bento grid
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
}

.feature-card {
  border-radius: $radius-md;
  padding: $spacing-md;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
  
  .feature-content {
    position: relative;
    z-index: 2;
  }
}

.feature-icon-container {
  margin-bottom: $spacing-md;
  display: flex;
  justify-content: center;
}

.feature-icon {
  width: 120px;
  height: 120px;
  border-radius: 28px;
  background: var(--icon-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 
    0 8px 25px rgba(0,0,0,0.3),
    0 4px 12px rgba(0,0,0,0.2),
    inset 0 2px 0 rgba(255,255,255,0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
    border-radius: 28px;
    pointer-events: none;
  }
  
  svg {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    z-index: 1;
    position: relative;
  }
  
  &:hover {
    transform: translateY(-6px) scale(1.1);
    box-shadow: 
      0 15px 40px rgba(0,0,0,0.4),
      0 8px 20px rgba(0,0,0,0.3),
      inset 0 2px 0 rgba(255,255,255,0.3);
  }
}

.feature-title {
  font-size: $feature-title-size;
  font-weight: 600;
  color: $white;
  margin: 0 0 $spacing-sm 0;
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  margin: 0;
  font-size: $feature-description-size;
}

// Steps ultra-bento
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-md;
}

.step {
  border-radius: $radius-md;
  padding: $spacing-md;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
  
  .step-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }
}

.step-number-container {
  position: relative;
  flex-shrink: 0;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $step-number-size;
  font-weight: 700;
  color: $white;
  position: relative;
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 50%;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.4) 0%, 
      transparent 100%);
    border-radius: 50% 50% 0 0;
  }
}

.number-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: numberGlow 2s ease-in-out infinite alternate;
  z-index: -1;
}

.step-text {
  flex: 1;
}

.step-title {
  font-size: $step-title-size;
  font-weight: 600;
  color: $white;
  margin: 0 0 $spacing-sm 0;
}

.step-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.2;
  margin: 0;
  font-size: $step-description-size;
}

// Social Proof Section
.social-proof {
  padding: $spacing-2xl 0;
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.03) 0%, 
    rgba(59, 130, 246, 0.03) 100%);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-card {
  padding: $spacing-xl;
  border-radius: $radius-lg;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
}

.testimonial-content {
  position: relative;
  z-index: 2;
}

.testimonial-quote {
  margin-bottom: $spacing-lg;
  
  svg {
    color: $primary;
    font-size: 1.5rem;
    margin-bottom: $spacing-md;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-style: italic;
  }
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: $white;
  margin-bottom: 2px;
}

.author-role {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

// CTA ultra-bento
.cta {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.05) 0%, 
    rgba(139, 92, 246, 0.05) 100%);
}

.cta-actions {
  display: flex;
  gap: $spacing-md;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-content {
  border-radius: $radius-lg;
  padding: $spacing-2xl;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  
  .cta-inner {
    position: relative;
    z-index: 2;
  }
}

.cta-title {
  font-size: $cta-title-size;
  font-weight: 600;
  margin: 0 0 $spacing-md 0;
  color: $white;
  letter-spacing: -0.01em;
}

.cta-subtitle {
  font-size: $cta-subtitle-size;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 $spacing-2xl 0;
  line-height: 1.3;
}

// Animations simples style dashboard
.animated-title,
.animated-card,
.animated-step {
  opacity: 1;
  transform: none;
}

// Animations simplifiées (effets 3D gérés par le composant Icon3D)

// Responsive ultra-bento
@media (max-width: $tablet) {
  .mobile-menu-toggle {
    display: flex;
  }
  
  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-direction: column;
    padding: $spacing-lg;
    gap: $spacing-lg;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    
    &.nav-menu-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
  
  .nav-links {
    flex-direction: column;
    gap: $spacing-md;
    width: 100%;
  }
  
  .nav-link {
    padding: $spacing-md;
    text-align: center;
    border-radius: $radius-md;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .nav-auth {
    flex-direction: column;
    gap: $spacing-md;
    width: 100%;
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
  
  .testimonial-card {
    padding: $spacing-lg;
  }
  
  .testimonial-quote p {
    font-size: 1rem;
  }
  
  .hero {
    min-height: 45vh;
    padding: $spacing-xl 0;
  }
  
  .hero-title {
    font-size: $hero-title-size-tablet;
  }
  
  .hero-actions {
    flex-direction: row;
    align-items: center;
    gap: $spacing-md;
  }
  
  .hero-stats {
    gap: $spacing-md;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
  }
  
  .live-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-sm;
  }
  
  .steps {
    grid-template-columns: 1fr;
    gap: $spacing-sm;
  }
  
  .cta-content {
    padding: $spacing-xl;
  }
  
  .features,
  .how-it-works,
  .cta {
    padding: $spacing-xl 0;
  }
  
  .live-stats {
    padding: $spacing-lg 0;
  }
}

@media (max-width: $tablet) {
  .live-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    max-width: 500px;
  }
  
  .mini-stat-card {
    padding: $spacing-md;
  }
  
  .mini-stat-number {
    font-size: 1.4rem;
  }
  
  .live-stats-title {
    font-size: 1.3rem;
  }
}

@media (max-width: $mobile) {
  .nav-container {
    padding: 0 $spacing-sm;
  }
  
  .nav-brand-text {
    font-size: 1.1rem;
  }
  
  .nav-menu {
    padding: $spacing-md;
    gap: $spacing-md;
  }
  
  .hero {
    min-height: 35vh;
    padding: $spacing-sm 0;
  }
  
  .hero-content {
    padding: $spacing-xs;
  }
  
  .hero-title {
    font-size: $hero-title-size-mobile;
  }
  
  .hero-subtitle {
    font-size: $hero-subtitle-size-mobile;
  }
  
  .hero-stats {
    gap: $spacing-xs;
  }
  
  .logo-glass {
    width: 60px;
    height: 60px;
  }
  
  .logo-icon svg {
    width: 36px;
    height: 36px;
  }
  
  .container {
    padding: 0 $spacing-sm;
    max-width: 400px;
  }
  
  .features,
  .how-it-works,
  .cta {
    padding: $spacing-sm 0;
  }
  
  .section-title {
    font-size: $section-title-size-mobile;
  }
  
  .cta-title {
    font-size: $cta-title-size-mobile;
  }
  
  .feature-card {
    padding: $spacing-sm;
  }
  
  .step {
    padding: $spacing-sm;
  }
  
  .cta-content {
    padding: $spacing-md;
  }
  
  .live-stats {
    padding: $spacing-sm 0;
  }
  
  .live-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xs;
    max-width: 320px;
  }
  
  .mini-stat-card {
    padding: $spacing-xs;
  }
  
  .mini-stat-number {
    font-size: $mini-stat-number-size-mobile;
  }
  
  .mini-stat-label {
    font-size: $mini-stat-label-size-mobile;
  }
  
  .live-stats-title {
    font-size: $live-stats-title-size-mobile;
  }
  
  .btn {
    padding: $spacing-sm $spacing-lg;
    font-size: $btn-font-size-mobile;
    gap: $spacing-xs;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: $spacing-xs;
  }
  
  .stat {
    padding: $spacing-sm $spacing-md;
  }
  
  .stat-number {
    font-size: $stat-number-size-mobile;
  }
  
  .stat-label {
    font-size: $stat-label-size-mobile;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xs;
  }
  
  .feature-icon {
    width: 28px;
    height: 28px;
    font-size: $feature-icon-size-mobile;
  }
  
  .feature-title {
    font-size: $feature-title-size-mobile;
  }
  
  .feature-description {
    font-size: $feature-description-size-mobile;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    font-size: $step-number-size-mobile;
  }
  
  .step-title {
    font-size: $step-title-size-mobile;
  }
  
  .step-description {
    font-size: $step-description-size-mobile;
  }
}
</style> 