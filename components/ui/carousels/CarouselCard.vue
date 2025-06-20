<template>
  <div 
    class="carousel-card"
    :class="{ 
      'active': isActive,
      'prev': isPrev,
      'next': isNext
    }"
    :style="cardStyle"
    @click="!isDragging && $emit('click')"
  >
    <div class="card-overlay"></div>
    <div class="card-content">
      <h3 class="card-title glow-effect-text">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <button class="card-button glow-effect-button">
        {{ buttonText }} <span class="arrow-icon">→</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  currentSlide: {
    type: Number,
    required: true
  },
  slidesCount: {
    type: Number,
    required: true
  },
  isDragging: {
    type: Boolean,
    default: false
  },
  dragAmount: {
    type: Number,
    default: 0
  }
});

defineEmits(['click']);

const isActive = computed(() => props.currentSlide === props.index);
const isPrev = computed(() => (props.currentSlide - 1 + props.slidesCount) % props.slidesCount === props.index);
const isNext = computed(() => (props.currentSlide + 1) % props.slidesCount === props.index);

// Obtenir le style 3D pour chaque carte
const cardStyle = computed(() => {
  // Calculer la position de base
  const baseTransform = getBaseTransform();
  
  // Ajouter l'effet de drag si nécessaire
  const dragOffset = props.isDragging ? (props.dragAmount / window.innerWidth) * 100 : 0;
  
  // Calculer l'angle de rotation pour l'effet 3D
  const rotateY = getRotationAngle();
  
  // Construire l'objet de style
  return {
    backgroundImage: `url(${props.image})`,
    transform: `
      translateX(calc(${baseTransform.translateX + dragOffset}% + ${baseTransform.extraOffset}px)) 
      scale(${baseTransform.scale}) 
      rotateY(${rotateY}deg)
      perspective(1200px)
    `,
    zIndex: baseTransform.zIndex
  };
});

// Calculer la transformation de base
const getBaseTransform = () => {
  const position = props.index - props.currentSlide;
  const normalizedPosition = ((position + props.slidesCount) % props.slidesCount);
  
  // Calculer la distance minimale (en tenant compte que le carousel est circulaire)
  let minDistance = normalizedPosition;
  if (minDistance > props.slidesCount / 2) {
    minDistance = minDistance - props.slidesCount;
  }
  
  // Paramètres de positionnement selon la distance
  let translateX = minDistance * 100;
  let scale = 1;
  let zIndex = 5;
  let extraOffset = 0;
  
  // Ajuster les paramètres selon la position
  if (minDistance !== 0) {
    scale = 0.85 - Math.min(Math.abs(minDistance) * 0.1, 0.2);
    zIndex = 5 - Math.abs(minDistance);
    
    if (minDistance < 0) {
      extraOffset = -30 * Math.abs(minDistance); // Décalage supplémentaire pour les cartes à gauche
    } else {
      extraOffset = 30 * Math.abs(minDistance); // Décalage supplémentaire pour les cartes à droite
    }
  }
  
  return { translateX, scale, zIndex, extraOffset };
};

// Obtenir l'angle de rotation pour l'effet 3D
const getRotationAngle = () => {
  const position = props.index - props.currentSlide;
  const normalizedPosition = ((position + props.slidesCount) % props.slidesCount);
  
  // Calculer la distance minimale
  let minDistance = normalizedPosition;
  if (minDistance > props.slidesCount / 2) {
    minDistance = minDistance - props.slidesCount;
  }
  
  // Angle de rotation: négatif pour les éléments à gauche, positif pour ceux à droite
  return minDistance * -15; // -15 degrés par position
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.carousel-card {
  position: absolute;
  width: 70%;
  max-width: 800px;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), 
              box-shadow 0.6s ease, 
              opacity 0.6s ease,
              filter 0.6s ease;
  cursor: pointer;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  opacity: 0.7;
  filter: brightness(0.7) blur(1px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 100%);
    z-index: 3;
    pointer-events: none;
  }
  
  &.active {
    opacity: 1;
    filter: brightness(1) blur(0);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 
                0 0 20px 5px rgba(255, 255, 255, 0.15), 
                0 0 40px 15px rgba(255, 255, 255, 0.05);
    z-index: 5;
    
    &::before {
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.15) 100%);
    }
  }
  
  &.prev, &.next {
    opacity: 0.85;
    filter: brightness(0.85) blur(0px);
    z-index: 4;
  }
  
  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 
                0 0 30px 8px rgba(255, 255, 255, 0.2), 
                0 0 50px 15px rgba(255, 255, 255, 0.1);
    
    .card-overlay {
      opacity: 0.65;
    }
    
    .card-button {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 100%);
    opacity: 0.75;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    z-index: 2;
    transform: translateZ(30px); /* Effet 3D sur le contenu */
    transition: transform 0.3s ease;
    
    .card-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      transform: translateZ(10px); /* Effet 3D supplémentaire sur le titre */
    }
    
    .card-description {
      font-size: 1rem;
      color: $gray-300;
      margin-bottom: 1.5rem;
      max-width: 500px;
    }
    
    .card-button {
      display: inline-flex;
      align-items: center;
      background-color: $white;
      color: $bg-dark;
      padding: 0.6rem 1.2rem;
      border-radius: 2rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      transform: translateY(20px);
      opacity: 0;
      
      .arrow-icon {
        margin-left: 0.5rem;
        transition: transform 0.2s ease;
      }
      
      &:hover {
        transform: translateY(-3px);
        
        .arrow-icon {
          transform: translateX(3px);
        }
      }
    }
  }
}

/* Adaptations responsive */
@media (max-width: 992px) {
  .carousel-card {
    width: 85%;
    height: 350px;
  }
}

@media (max-width: 768px) {
  .carousel-card {
    width: 90%;
    height: 300px;
  }
  
  .card-content {
    .card-title {
      font-size: 1.5rem;
    }
    
    .card-description {
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 576px) {
  .carousel-card {
    width: 95%;
    height: 250px;
  }
}
</style>
