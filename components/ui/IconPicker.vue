<template>
  <div class="icon-picker-container">
    <div class="icon-preview" @click="toggleIconList">
      <div class="current-icon">
        <font-awesome-icon v-if="modelValue" :icon="['fas', modelValue]" />
        <span v-else class="placeholder">Choisir une icône</span>
      </div>
      <div class="toggle-icon">
        <font-awesome-icon :icon="['fas', isOpen ? 'chevron-up' : 'chevron-down']" />
      </div>
    </div>
    
    <div v-if="isOpen" class="icon-dropdown">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchTerm" 
          placeholder="Rechercher une icône..."
          class="search-input"
          @input="searchIcons"
          ref="searchInput"
        />
        <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
      </div>
      
      <div class="icons-grid">
        <div v-if="!filteredIcons.length" class="no-results">
          Aucune icône trouvée
        </div>
        <div 
          v-for="icon in filteredIcons" 
          :key="icon" 
          class="icon-item"
          :class="{ 'selected': modelValue === icon }"
          @click="selectIcon(icon)"
        >
          <font-awesome-icon :icon="['fas', icon]" />
          <span class="icon-name">{{ icon }}</span>
        </div>
      </div>
      
      <div class="popular-icons" v-if="!searchTerm">
        <h4>Icônes populaires</h4>
        <div class="popular-grid">
          <div 
            v-for="icon in popularIcons" 
            :key="icon" 
            class="icon-item"
            :class="{ 'selected': modelValue === icon }"
            @click="selectIcon(icon)"
          >
            <font-awesome-icon :icon="['fas', icon]" />
            <span class="icon-name">{{ icon }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchTerm = ref('');
const searchInput = ref(null);

// Liste complète des icônes FontAwesome (solid)
// Cette liste pourrait être beaucoup plus longue dans une implémentation réelle
const allIcons = [
  'folder', 'folder-open', 'file', 'file-alt', 'plus', 'minus', 'times', 'check',
  'user', 'users', 'cog', 'wrench', 'search', 'bell', 'home', 'star',
  'heart', 'calendar', 'clock', 'trash', 'edit', 'eye', 'lock', 'unlock',
  'shield', 'link', 'paper-plane', 'inbox', 'download', 'upload', 'share',
  'bookmark', 'tag', 'tags', 'comment', 'comments', 'envelope', 'envelope-open',
  'desktop', 'laptop', 'mobile', 'tablet', 'camera', 'image', 'video',
  'music', 'play', 'pause', 'stop', 'volume-up', 'volume-down', 'volume-mute',
  'chart-bar', 'chart-line', 'chart-pie', 'chart-area', 'database', 'server',
  'code', 'terminal', 'bug', 'info', 'question', 'exclamation', 'history',
  'sync', 'redo', 'undo', 'save', 'print', 'pencil-alt', 'pen', 'highlighter',
  'book', 'books', 'bookmark', 'graduation-cap', 'glasses', 'flask',
  'sitemap', 'project-diagram', 'map', 'compass', 'location-arrow', 'car',
  'plane', 'truck', 'subway', 'shipping-fast', 'dolly', 'box',
  'boxes', 'clipboard', 'clipboard-list', 'clipboard-check', 'list', 'list-ul',
  'list-ol', 'tasks', 'check-square', 'circle', 'square'
];

// Icônes populaires à afficher en premier
const popularIcons = [
  'folder', 'file-alt', 'book', 'bookmark', 'chart-line', 'clipboard-list',
  'edit', 'users', 'tag', 'star', 'cog', 'code', 'database'
];

const filteredIcons = computed(() => {
  if (!searchTerm.value) return [];
  
  return allIcons.filter(icon => 
    icon.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const toggleIconList = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    // Focus sur le champ de recherche quand on ouvre la liste
    setTimeout(() => {
      searchInput.value?.focus();
    }, 0);
  }
};

const selectIcon = (icon) => {
  emit('update:modelValue', icon);
  isOpen.value = false;
  searchTerm.value = '';
};

const searchIcons = () => {
  // La recherche est déjà gérée par le computed filteredIcons
};

// Fermer la liste d'icônes si on clique en dehors
const handleClickOutside = (event) => {
  const container = document.querySelector('.icon-picker-container');
  if (container && !container.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.icon-picker-container {
  position: relative;
  width: 100%;
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid $gray-300;
  border-radius: 0.375rem;
  background-color: $white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: $gray-400;
  }
  
  .current-icon {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: $gray-800;
    
    svg {
      font-size: 1.25rem;
      color: $primary;
    }
    
    .placeholder {
      color: $gray-400;
    }
  }
  
  .toggle-icon {
    color: $gray-500;
  }
}

.icon-dropdown {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-width: 100%;
  max-height: 300px;
  background-color: $white;
  border: 1px solid $gray-300;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-container {
  position: relative;
  padding: 0.75rem;
  border-bottom: 1px solid $gray-200;
  
  .search-input {
    width: 100%;
    padding: 0.5rem 0.75rem 0.5rem 2rem;
    border: 1px solid $gray-300;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    
    &:focus {
      outline: none;
      border-color: $primary;
      box-shadow: 0 0 0 2px rgba($primary, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    color: $gray-400;
    pointer-events: none;
  }
}

.icons-grid, .popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  padding: 0.75rem;
  overflow-y: auto;
  max-height: 200px;
}

.popular-icons {
  padding: 0.75rem;
  border-top: 1px solid $gray-200;
  
  h4 {
    margin: 0 0 0.75rem 0;
    font-size: 0.875rem;
    color: $gray-500;
  }
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    font-size: 1.25rem;
    color: $gray-700;
  }
  
  .icon-name {
    font-size: 0.75rem;
    color: $gray-600;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  
  &:hover {
    background-color: $gray-100;
    
    svg {
      color: $primary;
    }
  }
  
  &.selected {
    background-color: rgba($primary, 0.1);
    border: 1px solid rgba($primary, 0.2);
    
    svg {
      color: $primary;
    }
  }
}

.no-results {
  grid-column: 1 / -1;
  padding: 1.5rem;
  text-align: center;
  color: $gray-500;
  font-size: 0.875rem;
}
</style> 