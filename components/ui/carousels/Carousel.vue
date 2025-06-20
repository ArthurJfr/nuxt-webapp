<template>
  <div class="carousel-section">
    <h2 class="section-title glow-effect">{{ title }}</h2>
    
    <div class="carousel-container">
      <button class="carousel-arrow prev" @click="prevSlide">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      
      <div 
        class="carousel-track" 
        ref="carouselTrack"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @mousemove="onDrag"
        @touchmove="onDrag"
        @mouseup="endDrag"
        @touchend="endDrag"
        @mouseleave="endDrag"
      >
        <div 
          v-for="(slide, index) in slides" 
          :key="index" 
          class="carousel-card"
          :class="{ 
            'active': currentSlide === index,
            'prev': (currentSlide - 1 + slides.length) % slides.length === index,
            'next': (currentSlide + 1) % slides.length === index
          }"
          :style="getCardStyle(index)"
          @click="!isDragging && goToSlide(index)"
        >
          <div class="card-overlay"></div>
          <div class="card-content">
            <h3 class="card-title">{{ slide.title }}</h3>
            <p class="card-description">{{ slide.description }}</p>
            <button class="card-button" @click="slide.action">
              {{ slide.buttonText }} <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
      
      <button class="carousel-arrow next" @click="nextSlide">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
    
    <div class="carousel-indicators">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        class="indicator-dot"
        :class="{ 'active': currentSlide === index }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  slides: {
    type: Array,
    required: true
  }
});

const currentSlide = ref(0);
const carouselTrack = ref(null);
let autoplayInterval = null;

// Variables pour la gestion du drag
const isDragging = ref(false);
const dragStartX = ref(0);
const dragCurrentX = ref(0);
const dragAmount = ref(0);
const swipeThreshold = 50;

// Méthodes pour contrôler le carousel
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Obtenir le style pour chaque carte
const getCardStyle = (index) => {
  const position = index - currentSlide.value;
  const normalizedPosition = ((position + props.slides.length) % props.slides.length);
  
  let minDistance = normalizedPosition;
  if (minDistance > props.slides.length / 2) {
    minDistance = minDistance - props.slides.length;
  }
  
  const translateX = minDistance * 100;
  const scale = minDistance === 0 ? 1 : 0.85;
  const zIndex = 5 - Math.abs(minDistance);
  const rotateY = minDistance * -15;
  
  return {
    backgroundImage: `url(${props.slides[index].image})`,
    transform: `translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
    zIndex
  };
};

// Gestion du drag
const startDrag = (event) => {
  isDragging.value = true;
  dragStartX.value = getClientX(event);
  dragCurrentX.value = dragStartX.value;
  dragAmount.value = 0;
  stopAutoplay();
  
  if (event.type === 'touchstart') {
    event.preventDefault();
  }
};

const onDrag = (event) => {
  if (!isDragging.value) return;
  
  dragCurrentX.value = getClientX(event);
  dragAmount.value = dragCurrentX.value - dragStartX.value;
  
  if (event.type === 'touchmove') {
    event.preventDefault();
  }
};

const endDrag = () => {
  if (!isDragging.value) return;
  
  if (Math.abs(dragAmount.value) > swipeThreshold) {
    if (dragAmount.value > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
  
  isDragging.value = false;
  dragAmount.value = 0;
  startAutoplay();
};

const getClientX = (event) => {
  return event.touches?.[0]?.clientX ?? event.clientX;
};

// Autoplay
const startAutoplay = () => {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

// Lifecycle hooks
onMounted(() => {
  startAutoplay();
  
  if (carouselTrack.value) {
    carouselTrack.value.addEventListener('mouseenter', stopAutoplay);
    carouselTrack.value.addEventListener('mouseleave', startAutoplay);
  }
});

onBeforeUnmount(() => {
  stopAutoplay();
  
  if (carouselTrack.value) {
    carouselTrack.value.removeEventListener('mouseenter', stopAutoplay);
    carouselTrack.value.removeEventListener('mouseleave', startAutoplay);
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.carousel-section {
  padding: 4rem 2rem;
  overflow: hidden;
  max-width: 1400px;
  margin: 0 auto;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 500px;
  margin: 2rem 0;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1800px;
  transform-style: preserve-3d;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
}

.carousel-card {
  position: absolute;
  width: 70%;
  max-width: 800px;
  height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.5s ease;
  cursor: pointer;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  opacity: 0.7;
  
  &.active {
    opacity: 1;
    z-index: 5;
  }
  
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.2) 100%);
    opacity: 0.75;
    transition: opacity 0.3s ease;
  }
  
  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    z-index: 2;
    
    .card-title {
      font-size: $font-size-2xl;
      font-weight: 700;
      margin-bottom: 1rem;
      color: $white;
    }
    
    .card-description {
      font-size: $font-size-base;
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
      
      .arrow-icon {
        margin-left: 0.5rem;
        transition: transform 0.2s ease;
      }
      
      &:hover {
        background-color: $primary;
        color: $white;
        
        .arrow-icon {
          transform: translateX(3px);
        }
      }
    }
  }
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: rgba($primary, 0.1);
  border: none;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba($primary, 0.2);
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev { left: 1.5rem; }
  &.next { right: 1.5rem; }
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  
  .indicator-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba($primary, 0.2);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      background-color: $primary;
      transform: scale(1.2);
    }
    
    &:hover:not(.active) {
      background-color: rgba($primary, 0.4);
      transform: scale(1.1);
    }
  }
}

.section-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Adaptations responsive */
@media (max-width: 992px) {
  .carousel-container {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .carousel-card {
    width: 90%;
    height: 300px;
  }
  
  .carousel-container {
    height: 400px;
  }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .carousel-container {
    height: 350px;
  }
}
</style>
