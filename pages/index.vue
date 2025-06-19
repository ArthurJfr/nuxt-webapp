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
            Collaborez et partagez en toute simplicité
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
            Des outils puissants pour collaborer
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

    <!-- CTA Section avec glassmorphisme -->
    <section class="cta">
      <div class="container">
        <div class="cta-content glass-card">
          <div class="cta-inner">
            <h2 class="cta-title animated-title">Prêt à commencer ?</h2>
            <p class="cta-subtitle">
              Rejoignez des milliers d'équipes
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
    #000000 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #000000 75%, 
    #1a1a1a 100%
  );
  color: $white;
  position: relative;
  overflow-x: hidden;
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
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
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
  margin-bottom: $spacing-md;
}

.logo-container {
  position: relative;
  display: inline-block;
}

  .logo-glass {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: $radius-2xl;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(25px) saturate(1.8);
  -webkit-backdrop-filter: blur(25px) saturate(1.8);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: iconFloat 3s ease-in-out infinite;
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
      width: 64px;
      height: 64px;
      filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
    }
  }



  .logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulseGlow 2s ease-in-out infinite alternate;
    z-index: -1;
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
  
  .btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: $spacing-md;
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
    padding: $spacing-lg $spacing-3xl;
    font-size: $btn-font-size-large;
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.mini-stat-card {
  padding: 0.6rem;
  text-align: center;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
}

.mini-stat-icon {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: $mini-stat-icon-size;
  margin: 0 auto 0.4rem auto;
  transition: all 0.2s ease;
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
  position: relative;
  display: inline-block;
  margin-bottom: $spacing-md;
}

.feature-icon {
  width: 36px;
  height: 36px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: $feature-icon-size;
  flex-shrink: 0;
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

// CTA ultra-bento
.cta {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.05) 0%, 
    rgba(139, 92, 246, 0.05) 100%);
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

.cta-actions {
  display: flex;
  justify-content: center;
}



// Animations simples style dashboard
.animated-title,
.animated-card,
.animated-step {
  opacity: 1;
  transform: none;
}

// Animations simples style dashboard
@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes pulseGlow {
  0% { 
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(1);
  }
  100% { 
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

// Responsive ultra-bento
@media (max-width: $tablet) {
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