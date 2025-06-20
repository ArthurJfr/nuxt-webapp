<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeOnOverlayClick && close()">
    <div class="modal" :class="variant" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button class="close-button" @click="close" aria-label="Fermer">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onUnmounted } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'standard',
    validator: value => ['standard', 'dark'].includes(value)
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};

// Bloquer le défilement du body quand la modal est ouverte
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// S'assurer que le défilement est réactivé lors du démontage du composant
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($gray-900, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal {
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  animation: modal-appear 0.3s ease-out;
  
  &.standard {
    background-color: $white;
    color: $markdown-text;
    
    .modal-header {
      background-color: $gray-100;
      border-bottom: 1px solid $gray-200;
    }
    
    .modal-footer {
      background-color: $gray-100;
      border-top: 1px solid $gray-200;
    }
    
    .close-button {
      color: $gray-700;
      
      &:hover {
        color: $gray-900;
      }
    }
  }
  
  &.dark {
    background-color: $gray-800;
    color: $gray-100;
    
    .modal-header {
      background-color: $gray-900;
      border-bottom: 1px solid $gray-700;
    }
    
    .modal-footer {
      background-color: $gray-900;
      border-top: 1px solid $gray-700;
    }
    
    .close-button {
      color: $gray-400;
      
      &:hover {
        color: $white;
      }
    }
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.modal-title {
  margin: 0;
  font-size: $font-size-xl;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.modal-content {
  padding: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
}

.modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 