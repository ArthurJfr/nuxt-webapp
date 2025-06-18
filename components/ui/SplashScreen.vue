<template>
  <Transition name="splash" appear>
    <div v-if="showSplash" class="splash-screen">
      <div class="splash-content">
        <!-- Logo animé -->
        <div class="splash-logo">
          <div class="logo-container">
            <div class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div class="logo-glow"></div>
          </div>
          <h1 class="app-name">WikiNotes</h1>
          <p class="app-tagline">Vos notes, simplifiées</p>
        </div>

        <!-- Indicateur de chargement -->
        <div class="loading-indicator">
          <div class="loading-dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>

      <!-- Effet de particules -->
      <div class="particles">
        <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const showSplash = ref(true)

// Masquer le splashscreen après 2.5 secondes
onMounted(() => {
  setTimeout(() => {
    showSplash.value = false
  }, 2500)
})

// Générer des styles aléatoires pour les particules
const getParticleStyle = (index: number) => {
  const delay = Math.random() * 2
  const duration = 3 + Math.random() * 2
  const x = Math.random() * 100
  const y = Math.random() * 100
  const size = 2 + Math.random() * 4
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style lang="scss" scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: linear-gradient(135deg, 
    #000000 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #000000 75%, 
    #1a1a1a 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.splash-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.splash-logo {
  margin-bottom: 3rem;
}

.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.logo-icon {
  position: relative;
  z-index: 2;
  color: #ffffff;
  animation: logoFloat 3s ease-in-out infinite;
  
  svg {
    filter: drop-shadow(0 0 20px rgba(37, 99, 235, 0.5));
  }
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 2s ease-in-out infinite alternate;
}

.app-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
  animation: textReveal 1s ease-out 0.5s both;
}

.app-tagline {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 400;
  animation: textReveal 1s ease-out 0.8s both;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
  
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
}

// Particules flottantes
.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: particleFloat infinite linear;
}

// Animations
@keyframes logoFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulseGlow {
  0% { 
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  100% { 
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes textReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
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

// Transitions du splashscreen
.splash-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.splash-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

// Responsive
@media (max-width: 640px) {
  .app-name {
    font-size: 2rem;
  }
  
  .app-tagline {
    font-size: 1rem;
  }
  
  .logo-icon svg {
    width: 60px;
    height: 60px;
  }
  
  .logo-glow {
    width: 100px;
    height: 100px;
  }
}
</style> 