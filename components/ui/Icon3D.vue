<template>
  <div class="icon-3d-container" :style="containerStyle">
    <div class="icon-3d-wrapper" ref="iconWrapper">
      <!-- Couches de profondeur 3D extrême -->
      <div class="depth-layer depth-1"></div>
      <div class="depth-layer depth-2"></div>
      <div class="depth-layer depth-3"></div>
      <div class="depth-layer depth-4"></div>
      
      <!-- Base métallique -->
      <div class="metal-base">
        <div class="metal-texture"></div>
        <div class="metal-shine"></div>
      </div>
      
      <!-- Couche principale glassmorphisme ultra -->
      <div class="main-layer">
        <!-- Reflets multiples -->
        <div class="reflection top"></div>
        <div class="reflection left"></div>
        <div class="reflection right"></div>
        <div class="reflection bottom"></div>
        
        <!-- Contenu 3D avec extrusion -->
        <div class="content-3d">
          <div class="content-shadow"></div>
          <div class="content-base"></div>
          <div class="content-icon">
            <FontAwesomeIcon v-if="icon" :icon="icon" />
            <slot v-else></slot>
          </div>
          <div class="content-highlight"></div>
        </div>
        
        <!-- Effets de brillance -->
        <div class="shine-effect shine-1"></div>
        <div class="shine-effect shine-2"></div>
        <div class="shine-effect shine-3"></div>
        
        <!-- Bordure 3D -->
        <div class="border-3d"></div>
      </div>
      
      <!-- Ombres multiples -->
      <div class="shadow-layer shadow-1"></div>
      <div class="shadow-layer shadow-2"></div>
      <div class="shadow-layer shadow-3"></div>
      
      <!-- Particules orbitales -->
      <div class="particles-orbit">
        <div v-for="i in particleCount" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
      
      <!-- Particules flottantes -->
      <div class="particles-float">
        <div v-for="i in 6" :key="i" class="float-particle" :style="getFloatingParticleStyle(i)"></div>
      </div>
      
      <!-- Auras multiples -->
      <div class="aura aura-1"></div>
      <div class="aura aura-2"></div>
      <div class="aura aura-3"></div>
      
      <!-- Rayons de lumière -->
      <div class="rays-container">
        <div v-for="i in 8" :key="i" class="ray" :style="getRayStyle(i)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  icon?: string[]
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  glowColor?: string
  animated?: boolean
  interactive?: boolean
  particleCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: '#3B82F6',
  glowColor: '#3B82F6',
  animated: true,
  interactive: true,
  particleCount: 8
})

const iconWrapper = ref<HTMLElement>()
const mousePosition = ref({ x: 0, y: 0 })
const isHovered = ref(false)

const containerStyle = computed(() => {
  const sizes = {
    sm: '60px',
    md: '80px',
    lg: '100px',
    xl: '120px'
  }
  
  return {
    '--icon-size': sizes[props.size],
    '--icon-color': props.color,
    '--glow-color': props.glowColor,
    '--mouse-x': `${mousePosition.value.x}px`,
    '--mouse-y': `${mousePosition.value.y}px`
  }
})

const handleMouseMove = (event: MouseEvent) => {
  if (!props.interactive || !iconWrapper.value) return
  
  const rect = iconWrapper.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  mousePosition.value = {
    x: (event.clientX - centerX) / 8,
    y: (event.clientY - centerY) / 8
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  mousePosition.value = { x: 0, y: 0 }
}

const getParticleStyle = (index: number) => {
  const angle = (360 / props.particleCount) * index
  const radius = 45 + Math.random() * 15
  const delay = Math.random() * 2
  const duration = 2 + Math.random() * 2
  
  return {
    '--angle': `${angle}deg`,
    '--radius': `${radius}px`,
    '--delay': `${delay}s`,
    '--duration': `${duration}s`
  }
}

const getFloatingParticleStyle = (index: number) => {
  const angle = (index / 6) * 360
  const radius = 60 + Math.sin(Date.now() / 1500 + index) * 20
  const x = Math.cos(angle * Math.PI / 180) * radius
  const y = Math.sin(angle * Math.PI / 180) * radius
  const delay = index * 0.3
  const duration = 4 + Math.random() * 3
  const scale = 0.3 + Math.random() * 0.4
  
  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    transform: `scale(${scale})`,
    '--glow-color': props.glowColor
  }
}

const getRayStyle = (index: number) => {
  const angle = (index / 8) * 360
  const delay = index * 0.2
  const duration = 3 + Math.random() * 2
  
  return {
    transform: `rotate(${angle}deg)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    '--glow-color': props.glowColor
  }
}

onMounted(() => {
  if (props.interactive && iconWrapper.value) {
    iconWrapper.value.addEventListener('mousemove', handleMouseMove)
    iconWrapper.value.addEventListener('mouseenter', handleMouseEnter)
    iconWrapper.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onUnmounted(() => {
  if (iconWrapper.value) {
    iconWrapper.value.removeEventListener('mousemove', handleMouseMove)
    iconWrapper.value.removeEventListener('mouseenter', handleMouseEnter)
    iconWrapper.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.icon-3d-container {
  position: relative;
  width: var(--icon-size);
  height: var(--icon-size);
  perspective: 2000px;
  transform-style: preserve-3d;
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6));
}

.icon-3d-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  animation: floatRotate 8s ease-in-out infinite;
  
  &:hover {
    transform: 
      translateX(var(--mouse-x, 0)) 
      translateY(var(--mouse-y, 0)) 
      rotateX(calc(var(--mouse-y, 0) * -1)) 
      rotateY(calc(var(--mouse-x, 0) * 1))
      translateZ(40px)
      scale(1.15);
    animation-play-state: paused;
  }
}

// Couches de profondeur 3D extrême
.depth-layer {
  position: absolute;
  border-radius: 28px;
  
  &.depth-1 {
    top: 12px; left: 12px; right: 12px; bottom: 12px;
    background: linear-gradient(145deg, rgba(0,0,0,0.9), rgba(20,20,30,0.7), rgba(0,0,0,0.95));
    transform: translateZ(-60px);
    filter: blur(8px);
    box-shadow: 0 0 40px rgba(0,0,0,0.9);
  }
  
  &.depth-2 {
    top: 8px; left: 8px; right: 8px; bottom: 8px;
    background: linear-gradient(145deg, rgba(10,10,20,0.8), rgba(30,30,40,0.6), rgba(10,10,20,0.85));
    transform: translateZ(-40px);
    filter: blur(6px);
    box-shadow: 0 0 30px rgba(0,0,0,0.8);
  }
  
  &.depth-3 {
    top: 4px; left: 4px; right: 4px; bottom: 4px;
    background: linear-gradient(145deg, rgba(20,20,30,0.7), rgba(40,40,50,0.5), rgba(20,20,30,0.75));
    transform: translateZ(-20px);
    filter: blur(4px);
    box-shadow: 0 0 20px rgba(0,0,0,0.7);
  }
  
  &.depth-4 {
    top: 2px; left: 2px; right: 2px; bottom: 2px;
    background: linear-gradient(145deg, rgba(30,30,40,0.6), rgba(50,50,60,0.4), rgba(30,30,40,0.65));
    transform: translateZ(-10px);
    filter: blur(2px);
    box-shadow: 0 0 15px rgba(0,0,0,0.6);
  }
}

// Base métallique
.metal-base {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(145deg, #2c3e50, #34495e, #2c3e50, #1a252f, #2c3e50);
  border-radius: 24px;
  transform: translateZ(-5px);
  box-shadow: 
    inset 0 4px 8px rgba(255,255,255,0.15),
    inset 0 -4px 8px rgba(0,0,0,0.4),
    0 0 30px rgba(0,0,0,0.6);
  
  .metal-texture {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: 
      repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0.05) 2px),
      repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(0,0,0,0.05) 1px, rgba(0,0,0,0.05) 2px);
    border-radius: 24px;
  }
  
  .metal-shine {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: 
      radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 75% 85%, rgba(255,255,255,0.15) 0%, transparent 50%);
    border-radius: 24px;
    animation: metalShine 6s ease-in-out infinite;
  }
}

// Couche principale glassmorphisme ultra
.main-layer {
  position: relative;
  width: 100%; height: 100%;
  background: linear-gradient(145deg, 
    rgba(255,255,255,0.5) 0%, 
    rgba(255,255,255,0.2) 25%,
    rgba(255,255,255,0.1) 50%,
    rgba(255,255,255,0.25) 75%,
    rgba(255,255,255,0.4) 100%);
  backdrop-filter: blur(50px) saturate(2.5) brightness(1.3);
  -webkit-backdrop-filter: blur(50px) saturate(2.5) brightness(1.3);
  border: 4px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: translateZ(0);
  box-shadow: 
    0 20px 80px rgba(0,0,0,0.5),
    0 8px 32px rgba(0,0,0,0.4),
    inset 0 4px 0 rgba(255,255,255,0.8),
    inset 0 -4px 0 rgba(0,0,0,0.4),
    inset 4px 0 0 rgba(255,255,255,0.4),
    inset -4px 0 0 rgba(0,0,0,0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: conic-gradient(from 0deg, 
      transparent 0deg, rgba(255,255,255,0.15) 90deg, 
      transparent 180deg, rgba(255,255,255,0.08) 270deg, transparent 360deg);
    border-radius: 24px;
    animation: rotateConic 10s linear infinite;
  }
}

// Reflets multiples
.reflection {
  position: absolute;
  pointer-events: none;
  
  &.top {
    top: 0; left: 0; right: 0; height: 70%;
    background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 40%, transparent 100%);
    border-radius: 24px 24px 0 0;
    transform: translateZ(3px);
    mix-blend-mode: overlay;
  }
  
  &.left {
    top: 0; left: 0; width: 40%; height: 100%;
    background: linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 60%, transparent 100%);
    border-radius: 24px 0 0 24px;
    transform: translateZ(2px);
  }
  
  &.right {
    top: 0; right: 0; width: 25%; height: 100%;
    background: linear-gradient(-90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 60%, transparent 100%);
    border-radius: 0 24px 24px 0;
    transform: translateZ(2px);
  }
  
  &.bottom {
    bottom: 0; left: 0; right: 0; height: 35%;
    background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 60%, transparent 100%);
    border-radius: 0 0 24px 24px;
    transform: translateZ(2px);
  }
}

// Contenu 3D avec extrusion
.content-3d {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(20px);
  transform-style: preserve-3d;
}

.content-shadow {
  position: absolute;
  top: 4px; left: 4px; right: -4px; bottom: -4px;
  background: rgba(0,0,0,0.8);
  border-radius: 50%;
  filter: blur(8px);
  transform: translateZ(-12px);
}

.content-base {
  position: absolute;
  top: 2px; left: 2px; right: -2px; bottom: -2px;
  background: linear-gradient(145deg, rgba(0,0,0,0.5), rgba(60,60,60,0.4), rgba(0,0,0,0.6));
  border-radius: 50%;
  transform: translateZ(-6px);
}

.content-icon {
  position: relative;
  z-index: 25;
  color: $white;
  font-size: calc(var(--icon-size) * 0.5);
  transform: translateZ(20px);
  filter: 
    drop-shadow(0 0 25px var(--glow-color))
    drop-shadow(0 0 50px var(--glow-color))
    drop-shadow(0 6px 12px rgba(0,0,0,0.6))
    drop-shadow(0 12px 24px rgba(0,0,0,0.4));
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-shadow: 
    0 0 15px var(--glow-color),
    0 0 30px var(--glow-color),
    0 3px 6px rgba(0,0,0,0.9);
  
  .icon-3d-wrapper:hover & {
    transform: translateZ(35px) scale(1.3);
    filter: 
      drop-shadow(0 0 40px var(--glow-color))
      drop-shadow(0 0 80px var(--glow-color))
      drop-shadow(0 12px 24px rgba(0,0,0,0.7))
      drop-shadow(0 24px 48px rgba(0,0,0,0.5));
  }
}

.content-highlight {
  position: absolute;
  top: -2px; left: -2px; right: 2px; bottom: 2px;
  background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 40%, transparent 70%);
  border-radius: 50%;
  transform: translateZ(15px);
}

// Effets de brillance
.shine-effect {
  position: absolute;
  pointer-events: none;
  border-radius: 24px;
  transform: translateZ(4px);
  
  &.shine-1 {
    top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
    animation: shine1 5s ease-in-out infinite;
  }
  
  &.shine-2 {
    top: -100%; left: 0; width: 100%; height: 100%;
    background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
    animation: shine2 6s ease-in-out infinite 1.5s;
  }
  
  &.shine-3 {
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 30%, transparent 70%);
    animation: shine3 4s ease-in-out infinite 0.5s;
  }
}

// Bordure 3D
.border-3d {
  position: absolute;
  top: -4px; left: -4px; right: -4px; bottom: -4px;
  border: 3px solid rgba(255,255,255,0.4);
  border-radius: 28px;
  background: linear-gradient(45deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.15) 100%);
  transform: translateZ(-2px);
  animation: borderGlow 3s ease-in-out infinite;
}

// Ombres multiples
.shadow-layer {
  position: absolute;
  left: 50%;
  background: radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
  transform: translateX(-50%) translateY(-50%) rotateX(90deg);
  filter: blur(15px);
  transition: all 0.5s ease;
  
  &.shadow-1 {
    top: 70%; width: 100%; height: 40%;
    transform: translateX(-50%) translateY(-50%) translateZ(-80px) rotateX(90deg);
    
    .icon-3d-wrapper:hover & {
      width: 120%; height: 50%;
      background: radial-gradient(ellipse, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%);
      transform: translateX(-50%) translateY(-50%) translateZ(-100px) rotateX(90deg);
    }
  }
  
  &.shadow-2 {
    top: 60%; width: 80%; height: 30%;
    transform: translateX(-50%) translateY(-50%) translateZ(-50px) rotateX(90deg);
    filter: blur(12px);
  }
  
  &.shadow-3 {
    top: 50%; width: 60%; height: 20%;
    transform: translateX(-50%) translateY(-50%) translateZ(-30px) rotateX(90deg);
    filter: blur(8px);
  }
}

// Particules orbitales
.particles-orbit {
  position: absolute;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 5px; height: 5px;
  background: var(--glow-color);
  border-radius: 50%;
  opacity: 0;
  animation: particleOrbit var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
  box-shadow: 
    0 0 10px var(--glow-color),
    0 0 20px var(--glow-color),
    0 0 30px var(--glow-color);
  
  &::before {
    content: '';
    position: absolute;
    top: -3px; left: -3px; right: -3px; bottom: -3px;
    background: inherit;
    border-radius: 50%;
    filter: blur(4px);
    opacity: 0.6;
  }
}

// Particules flottantes
.particles-float {
  position: absolute;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.float-particle {
  position: absolute;
  width: 3px; height: 3px;
  background: var(--glow-color);
  border-radius: 50%;
  opacity: 0.7;
  animation: floatingParticle var(--animation-duration) ease-in-out infinite;
  animation-delay: var(--animation-delay);
  box-shadow: 0 0 8px var(--glow-color);
}

// Auras multiples
.aura {
  position: absolute;
  top: 50%; left: 50%;
  background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  
  &.aura-1 {
    width: 160%; height: 160%;
    opacity: 0.2;
    transform: translate(-50%, -50%) translateZ(-20px);
    animation: auraGlow1 5s ease-in-out infinite alternate;
    
    .icon-3d-wrapper:hover & {
      opacity: 0.5;
      width: 200%; height: 200%;
    }
  }
  
  &.aura-2 {
    width: 130%; height: 130%;
    opacity: 0.25;
    transform: translate(-50%, -50%) translateZ(-15px);
    animation: auraGlow2 4s ease-in-out infinite alternate 1.5s;
    
    .icon-3d-wrapper:hover & {
      opacity: 0.6;
      width: 170%; height: 170%;
    }
  }
  
  &.aura-3 {
    width: 110%; height: 110%;
    opacity: 0.3;
    transform: translate(-50%, -50%) translateZ(-10px);
    animation: auraGlow3 3s ease-in-out infinite alternate 0.8s;
    
    .icon-3d-wrapper:hover & {
      opacity: 0.7;
      width: 150%; height: 150%;
    }
  }
}

// Rayons de lumière
.rays-container {
  position: absolute;
  top: 50%; left: 50%;
  width: 1px; height: 1px;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.ray {
  position: absolute;
  width: 3px; height: 80px;
  background: linear-gradient(180deg, var(--glow-color) 0%, transparent 100%);
  border-radius: 2px;
  opacity: 0;
  transform-origin: bottom center;
  animation: rayPulse var(--animation-duration) ease-in-out infinite;
  animation-delay: var(--animation-delay);
  box-shadow: 0 0 6px var(--glow-color);
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: -2px; right: -2px; bottom: 0;
    background: inherit;
    border-radius: 2px;
    filter: blur(3px);
    opacity: 0.6;
  }
}

// Animations spectaculaires
@keyframes floatRotate {
  0%, 100% { transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg); }
  25% { transform: rotateY(8deg) rotateX(4deg) rotateZ(2deg); }
  50% { transform: rotateY(0deg) rotateX(-4deg) rotateZ(-2deg); }
  75% { transform: rotateY(-8deg) rotateX(4deg) rotateZ(2deg); }
}

@keyframes rotateConic {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes metalShine {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes shine1 {
  0%, 60% { left: -100%; }
  100% { left: 100%; }
}

@keyframes shine2 {
  0%, 60% { top: -100%; }
  100% { top: 100%; }
}

@keyframes shine3 {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 0.6; transform: scale(1.3); }
}

@keyframes borderGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
  50% { box-shadow: 0 0 40px rgba(255,255,255,0.6); }
}

@keyframes particleOrbit {
  0% {
    transform: rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle)));
    opacity: 0;
  }
  20%, 80% {
    opacity: 1;
  }
  100% {
    transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)) rotate(calc(-1 * (var(--angle) + 360deg)));
    opacity: 0;
  }
}

@keyframes floatingParticle {
  0%, 100% { opacity: 0.4; transform: scale(0.6) translateY(0); }
  50% { opacity: 1; transform: scale(1.4) translateY(-30px); }
}

@keyframes auraGlow1 {
  0% { opacity: 0.15; transform: translate(-50%, -50%) translateZ(-20px) scale(0.9); }
  100% { opacity: 0.4; transform: translate(-50%, -50%) translateZ(-20px) scale(1.2); }
}

@keyframes auraGlow2 {
  0% { opacity: 0.2; transform: translate(-50%, -50%) translateZ(-15px) scale(0.8); }
  100% { opacity: 0.45; transform: translate(-50%, -50%) translateZ(-15px) scale(1.3); }
}

@keyframes auraGlow3 {
  0% { opacity: 0.25; transform: translate(-50%, -50%) translateZ(-10px) scale(0.7); }
  100% { opacity: 0.5; transform: translate(-50%, -50%) translateZ(-10px) scale(1.4); }
}

@keyframes rayPulse {
  0%, 100% { opacity: 0; transform: scaleY(0.3); }
  50% { opacity: 1; transform: scaleY(2); }
}
</style> 