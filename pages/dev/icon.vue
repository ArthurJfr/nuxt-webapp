<template>
  <div class="icon-library">
    <h1>Bibliothèque d'icônes</h1>
    
    <div class="search-container">
      <input 
        v-model="searchTerm" 
        type="text" 
        placeholder="Rechercher une icône..." 
      />
    </div>
    
    <div class="icon-grid">
      <div 
        v-for="iconName in filteredIcons" 
        :key="iconName" 
        class="icon-card"
        @click="copyIconName(iconName)"
      >
        <font-awesome-icon 
          :icon="iconName" 
          class="icon"
        />
        <div class="icon-name">{{ iconName }}</div>
      </div>
    </div>
    
    <div 
      v-if="showCopiedMessage" 
      class="copied-message"
    >
      Copié dans le presse-papier !
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Liste de tous les icônes disponibles
const solidIcons = [
  'square-binary', 'compress-arrows-alt', 'trash-alt', 'archive', 'broom', 'file-archive', 'magic',
  'chart-area', 'laptop', 'tablet', 'tags', 'pencil-alt', 'flask', 'flag', 'map', 'map-marked-alt',
  'map-marked', 'compass', 'car', 'subway', 'calendar', 'calendar-alt', 'heart', 'share', 'comment',
  'sitemap', 'pause', 'chart-pie', 'chart-bar', 'th-large', 'th-list', 'list', 'tag', 'book', 'book-open',
  'bookmark', 'link', 'save', 'list-ul', 'list-ol', 'folder', 'folder-open', 'folder-plus', 'folder-minus',
  'folder-tree', 'bold', 'italic', 'underline', 'heading', 'comments', 'history', 'file-alt', 'eye', 'bars',
  'chevron-left', 'chevron-down', 'chevron-up', 'chevron-right', 'trophy', 'gamepad', 'shopping-cart',
  'coins', 'cogs', 'user-plus', 'sign-in-alt', 'code', 'camera', 'info-circle', 'door-open', 'building',
  'user', 'envelope', 'lock', 'phone', 'image', 'spinner', 'check', 'times', 'project-diagram', 'code-branch',
  'users', 'rocket', 'shield', 'chart-line', 'paper-plane', 'arrow-left', 'home', 'feather', 'cog', 'search',
  'bell', 'sign-out', 'plus', 'edit', 'trash', 'download', 'upload', 'sync', 'filter', 'play', 'arrow-right',
  'star', 'lightbulb', 'video', 'circle-play', 'redo', 'globe', 'puzzle-piece', 'database', 'clipboard-list',
  'sign-out-alt', 'copy', 'stop', 'tachometer-alt', 'memory', 'clock', 'user-slash', 'user-minus', 'ban',
  'user-shield', 'terminal', 'expand', 'plane', 'file', 'minus', 'wrench', 'unlock', 'inbox', 'envelope-open',
  'desktop', 'mobile', 'music', 'volume-up', 'volume-down', 'volume-mute', 'server', 'bug', 'info', 'question',
  'exclamation', 'undo', 'print', 'pen', 'highlighter', 'graduation-cap', 'glasses', 'location-arrow', 'truck',
  'shipping-fast', 'dolly', 'box', 'boxes', 'clipboard', 'clipboard-check', 'tasks', 'check-square', 'circle', 'square'
]

const brandIcons = [
  'github', 'discord', 'youtube', 'twitter', 'twitch', 'instagram'
]

const regularIcons = [
  'envelope'
]

// Ajouter les préfixes aux noms d'icônes
const allIcons = [
  ...solidIcons.map(icon => ['fas', icon]),
  ...brandIcons.map(icon => ['fab', icon]),
  ...regularIcons.map(icon => ['far', icon])
]

const searchTerm = ref('')
const showCopiedMessage = ref(false)

const filteredIcons = computed(() => {
  if (!searchTerm.value) return allIcons
  
  return allIcons.filter(([_, iconName]) => 
    iconName.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function copyIconName([prefix, name]) {
  const iconCode = `<font-awesome-icon :icon="['${prefix}', '${name}']" />`
  navigator.clipboard.writeText(iconCode)
  
  showCopiedMessage.value = true
  setTimeout(() => {
    showCopiedMessage.value = false
  }, 2000)
}
</script>

<style lang="scss" scoped>
.icon-library {
  padding: 1rem;
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .search-container {
    margin-bottom: 1rem;
    
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  .icon-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f5f5f5;
    }
    
    .icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .icon-name {
      font-size: 0.75rem;
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .copied-message {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background-color: #48bb78;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}
</style>
