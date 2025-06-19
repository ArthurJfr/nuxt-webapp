<template>
  <div class="landing-page">
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
          <div class="logo-container">
            <div class="logo-glass">
              <div class="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
        </div>
        
        <h1 class="hero-title animated-title">FileShare</h1>
        <div class="hero-subtitle-container glass-card-enhanced">
          <p class="hero-subtitle">
            Collaborez et partagez en toute simplicité. La plateforme qui transforme votre travail d'équipe.
          </p>
        </div>
        
        <div class="hero-actions">
          <NuxtLink to="/dashboard" class="btn btn-primary glass-btn">
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
            Des outils puissants pour une collaboration fluide et intuitive
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
                <div class="feature-icon" :style="{ backgroundColor: feature.color }">
                  <FontAwesomeIcon :icon="feature.icon" />
                </div>
                <div class="icon-reflection"></div>
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
    <section class="how-it-works">
      <div class="container">
        <div class="section-header">
          <div class="section-title-container glass-card">
            <h2 class="section-title animated-title">Commencez en 3 étapes</h2>
            <div class="title-shine"></div>
          </div>
          <p class="section-subtitle">Simple, rapide et efficace</p>
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

    <!-- CTA Section avec glassmorphisme -->
    <section class="cta">
      <div class="container">
        <div class="cta-content glass-card">
          <div class="cta-inner">
            <h2 class="cta-title animated-title">Prêt à commencer ?</h2>
            <p class="cta-subtitle">
              Rejoignez des milliers d'équipes qui collaborent avec FileShare
            </p>
            <div class="cta-actions">
              <NuxtLink to="/dashboard" class="btn btn-primary btn-large glass-btn">
                <div class="btn-content">
                  <FontAwesomeIcon :icon="['fas', 'rocket']" />
                  <span>Commencer maintenant</span>
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

// Features axées sur la collaboration
const features = [
  {
    id: 1,
    title: 'Collaboration instantanée',
    description: 'Travaillez ensemble en temps réel sur vos projets. Voyez les modifications de votre équipe au fur et à mesure qu\'elles se produisent.',
    icon: ['fas', 'users'],
    color: '#3B82F6'
  },
  {
    id: 2,
    title: 'Partage intelligent',
    description: 'Partagez vos fichiers avec des permissions granulaires. Contrôlez qui peut voir, modifier ou commenter vos documents.',
    icon: ['fas', 'share-alt'],
    color: '#10B981'
  },
  {
    id: 3,
    title: 'Espaces de travail partagés',
    description: 'Créez des espaces dédiés à vos équipes. Organisez vos projets et travaillez ensemble de manière fluide.',
    icon: ['fas', 'layer-group'],
    color: '#8B5CF6'
  },
  {
    id: 4,
    title: 'Commentaires & Discussions',
    description: 'Échangez directement sur vos fichiers. Commentez, discutez et prenez des décisions ensemble sans quitter la plateforme.',
    icon: ['fas', 'comments'],
    color: '#F59E0B'
  },
  {
    id: 5,
    title: 'Synchronisation d\'équipe',
    description: 'Restez synchronisés avec votre équipe. Notifications instantanées et mises à jour en temps réel sur tous vos appareils.',
    icon: ['fas', 'sync-alt'],
    color: '#EF4444'
  },
  {
    id: 6,
    title: 'Gestion collaborative',
    description: 'Assignez des tâches, suivez les progrès et gérez vos projets d\'équipe avec des outils intuitifs et puissants.',
    icon: ['fas', 'tasks'],
    color: '#06B6D4'
  }
]

// Steps axés sur la collaboration
const steps = [
  {
    id: 1,
    title: 'Créez votre espace collaboratif',
    description: 'Inscrivez-vous et créez instantanément votre espace de travail partagé. Invitez votre équipe en un clic.'
  },
  {
    id: 2,
    title: 'Organisez vos projets ensemble',
    description: 'Uploadez, organisez et structurez vos projets. Créez des dossiers partagés et définissez les rôles de chacun.'
  },
  {
    id: 3,
    title: 'Collaborez en temps réel',
    description: 'Travaillez simultanément sur vos documents, échangez en direct et prenez des décisions ensemble.'
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
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.landing-page {
  background: linear-gradient(135deg, 
    #0a0a0a 0%, 
    #1a1a2e 25%, 
    #16213e 50%, 
    #0f0f23 75%, 
    #0a0a0a 100%
  );
  color: $white;
  position: relative;
  overflow-x: hidden;
}

// Glassmorphisme Apple style amélioré
.glass-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.8) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.4) 50%, 
      transparent 100%);
  }
}

// Glassmorphisme renforcé style Apple
.glass-card-enhanced {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(40px) saturate(2) brightness(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(2) brightness(1.2);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0.8) 50%, 
      rgba(255, 255, 255, 0.6) 70%,
      transparent 100%);
    border-radius: 20px 20px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%);
    border-radius: 20px;
    pointer-events: none;
  }
}

.glass-btn {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(15px) saturate(1.5);
  -webkit-backdrop-filter: blur(15px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

// Hero Section amélioré
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
  max-width: 700px;
  padding: 1.5rem;
}

.hero-logo {
  margin-bottom: 2rem;
}

.logo-container {
  position: relative;
  display: inline-block;
}

.logo-glass {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 30px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(1.8);
  -webkit-backdrop-filter: blur(25px) saturate(1.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: logoFloat 4s ease-in-out infinite;
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
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
  }
}

.logo-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(255, 255, 255, 0.3) 50%, 
    transparent 70%);
  animation: logoShine 3s ease-in-out infinite;
  pointer-events: none;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 3s ease-in-out infinite alternate;
  z-index: -1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  background: linear-gradient(135deg, 
    $white 0%, 
    rgba(255, 255, 255, 0.9) 50%,
    rgba(59, 130, 246, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleReveal 1.5s ease-out 0.3s both;
  text-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
  letter-spacing: -0.02em;
}

.hero-subtitle-container {
  @extend .glass-card;
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin: 0 0 3rem 0;
  animation: titleReveal 1.5s ease-out 0.6s both;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  animation: titleReveal 1.5s ease-out 0.9s both;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  border-radius: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  overflow: hidden;
  
  .btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .btn-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 255, 255, 0.2) 50%, 
      transparent 70%);
    animation: btnShine 2s ease-in-out infinite;
    pointer-events: none;
  }
  
  &.btn-primary {
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
  
  &.btn-secondary {
    color: $white;
    
    &:hover {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.2) 0%, 
        rgba(255, 255, 255, 0.1) 100%);
      transform: translateY(-4px) scale(1.02);
    }
  }
  
  &.btn-large {
    padding: 1.5rem 3rem;
    font-size: 1.1rem;
  }
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  animation: titleReveal 1.5s ease-out 1.2s both;
}

.stat {
  padding: 1.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  
  .stat-content {
    position: relative;
    z-index: 2;
  }
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0.5rem;
  }
  
  .stat-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 40%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 60%);
    animation: statShine 4s ease-in-out infinite;
    pointer-events: none;
  }
}

// Live Stats Section mode bento
.live-stats {
  padding: 3rem 0;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.02) 0%, 
    rgba(139, 92, 246, 0.02) 50%,
    rgba(16, 185, 129, 0.02) 100%);
}

.live-stats-header {
  text-align: center;
  margin-bottom: 3rem;
}

.live-stats-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.01em;
}

.live-stats-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.live-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

// Mini cards style Apple
.glass-card-mini {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.12) 0%, 
    rgba(255, 255, 255, 0.06) 100%);
  backdrop-filter: blur(25px) saturate(1.8);
  -webkit-backdrop-filter: blur(25px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.mini-stat-card {
  padding: 1.2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    backdrop-filter: blur(35px) saturate(2.2);
    -webkit-backdrop-filter: blur(35px) saturate(2.2);
    box-shadow: 
      0 8px 30px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

.mini-stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 0 auto 1rem auto;
  transition: all 0.3s ease;
}

.mini-stat-number {
  font-size: 1.6rem;
  font-weight: 600;
  color: $white;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.mini-stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.3;
}

// Effet glow sélectif pour certaines cards
.glow-effect {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, 
      var(--glow-color, #3B82F6), 
      transparent 60%);
    border-radius: 18px;
    opacity: 0.3;
    z-index: -1;
    filter: blur(8px);
    animation: glowPulse 3s ease-in-out infinite alternate;
  }
}

@keyframes glowPulse {
  0% {
    opacity: 0.2;
    transform: scale(0.98);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.02);
  }
}

// Indicateur live pour les stats actives
.live-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 8px;
  height: 8px;
  background: #10B981;
  border-radius: 50%;
  animation: livePulse 2s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: #10B981;
    border-radius: 50%;
    opacity: 0.3;
    animation: liveRipple 2s ease-in-out infinite;
  }
}

@keyframes livePulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes liveRipple {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

// Container mode bento
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

// Sections mode bento
.features,
.how-it-works,
.cta {
  padding: 5rem 0;
  position: relative;
}



.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title-container {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  position: relative;
  
  .title-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 40%, 
      rgba(255, 255, 255, 0.15) 50%, 
      transparent 60%);
    animation: titleShine 3s ease-in-out infinite;
    pointer-events: none;
  }
}

.section-title {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
  color: $white;
  letter-spacing: -0.01em;
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  max-width: 500px;
  margin: 0 auto;
}

// Features avec animations
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(50px) saturate(2.5);
  -webkit-backdrop-filter: blur(50px) saturate(2.5);
  
  &:hover {
    transform: translateY(-16px) scale(1.03);
    box-shadow: 
      0 25px 80px rgba(0, 0, 0, 0.4),
      0 10px 30px rgba(59, 130, 246, 0.2);
    backdrop-filter: blur(60px) saturate(3);
    -webkit-backdrop-filter: blur(60px) saturate(3);
    
    .feature-icon {
      transform: scale(1.1) rotateY(5deg);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    }
  }
  
  .feature-content {
    position: relative;
    z-index: 2;
  }
  
  .card-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 70%);
    animation: cardShine 4s ease-in-out infinite;
    pointer-events: none;
  }
  
  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.3) 0%, 
      transparent 50%, 
      rgba(59, 130, 246, 0.3) 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    pointer-events: none;
  }
}

.feature-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.feature-icon {
  width: 90px;
  height: 90px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(180deg, 
      rgba(255, 255, 255, 0.4) 0%, 
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%);
    border-radius: 24px 24px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 22px;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.05) 100%);
  }
}

.icon-reflection {
  position: absolute;
  bottom: -45px;
  left: 0;
  right: 0;
  height: 45px;
  background: inherit;
  border-radius: 0 0 24px 24px;
  opacity: 0.3;
  transform: scaleY(-1);
  filter: blur(2px);
  mask: linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%);
  -webkit-mask: linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 100%);
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 0.8rem 0;
}

.feature-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
}

// Steps avec animations
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.step {
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(45px) saturate(2.2);
  -webkit-backdrop-filter: blur(45px) saturate(2.2);
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.3),
      0 8px 25px rgba(59, 130, 246, 0.15);
    backdrop-filter: blur(55px) saturate(2.8);
    -webkit-backdrop-filter: blur(55px) saturate(2.8);
    
    .step-number {
      transform: scale(1.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
  }
  
  .step-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
  }
  
  .step-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 40%, 
      rgba(255, 255, 255, 0.08) 50%, 
      transparent 60%);
    animation: stepShine 5s ease-in-out infinite;
    pointer-events: none;
  }
}

.step-number-container {
  position: relative;
  flex-shrink: 0;
}

.step-number {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.9) 0%, 
    rgba(139, 92, 246, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: $white;
  position: relative;
  
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
  font-size: 1.2rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 0.8rem 0;
}

.step-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
}

// CTA amélioré
.cta {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.05) 0%, 
    rgba(139, 92, 246, 0.05) 100%);
}

.cta-content {
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  
  .cta-inner {
    position: relative;
    z-index: 2;
  }
  
  .cta-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 30%, 
      rgba(255, 255, 255, 0.1) 50%, 
      transparent 70%);
    animation: ctaShine 6s ease-in-out infinite;
    pointer-events: none;
  }
  
  .cta-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 32px;
    padding: 3px;
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.4) 0%, 
      rgba(139, 92, 246, 0.4) 50%,
      rgba(59, 130, 246, 0.4) 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    pointer-events: none;
  }
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 1.2rem 0;
  color: $white;
  letter-spacing: -0.01em;
}

.cta-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2.5rem 0;
  line-height: 1.5;
}

.cta-actions {
  display: flex;
  justify-content: center;
}

// Animations principales
@keyframes logoFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

// Animation des titres
.animated-title {
  animation: titleSlideIn 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes titleSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Animation des cards
.animated-card {
  animation: cardSlideUp 0.8s ease-out forwards;
  animation-delay: var(--animation-delay, 0s);
  opacity: 0;
  transform: translateY(40px);
}

@keyframes cardSlideUp {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Animation des steps
.animated-step {
  animation: stepSlideIn 1s ease-out forwards;
  animation-delay: var(--animation-delay, 0s);
  opacity: 0;
  transform: translateX(-50px);
}

@keyframes stepSlideIn {
  0% {
    opacity: 0;
    transform: translateX(-50px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes logoShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes pulseGlow {
  0% { 
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
  }
  100% { 
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.3);
  }
}

@keyframes titleReveal {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) rotate(360deg);
  }
}

@keyframes floatShape {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes btnShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes statShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes titleShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes cardShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes stepShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes ctaShine {
  0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

@keyframes numberGlow {
  0% { 
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  100% { 
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

// Responsive glassmorphisme
@media (max-width: $tablet) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .steps {
    grid-template-columns: 1fr;
  }
  
  .step-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .cta-content {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: $tablet) {
  .live-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    max-width: 500px;
  }
  
  .mini-stat-card {
    padding: 1rem;
  }
  
  .mini-stat-number {
    font-size: 1.4rem;
  }
  
  .live-stats-title {
    font-size: 1.3rem;
  }
}

@media (max-width: $mobile) {
  .hero-content {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .logo-glass {
    width: 100px;
    height: 100px;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .features,
  .how-it-works,
  .cta {
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .cta-title {
    font-size: 1.8rem;
  }
  
  .feature-card,
  .step,
  .cta-content {
    padding: 1.5rem;
  }
  
  .live-stats {
    padding: 3rem 0;
  }
  
  .live-stats-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    max-width: 280px;
  }
  
  .mini-stat-card {
    padding: 1.2rem 1rem;
  }
  
  .mini-stat-number {
    font-size: 1.3rem;
  }
  
  .mini-stat-label {
    font-size: 0.7rem;
  }
  
  .live-stats-title {
    font-size: 1.2rem;
  }
}
</style> 