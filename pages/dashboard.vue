<template>
  <div class="files-dashboard">
    <!-- Header avec effet gradient -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="header-icon">
          <div class="icon-container">
            <div class="main-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="2"/>
                <path d="M12 10v6"/>
                <path d="M9 13h6"/>
              </svg>
            </div>
            <div class="icon-glow"></div>
          </div>
        </div>
        
        <div class="header-text">
          <h1 class="dashboard-title">Tableau de bord</h1>
          <p class="dashboard-subtitle">Gérez vos fichiers et collaborations</p>
        </div>
        
        <!-- Stats rapides -->
        <div class="quick-stats">
          <div class="stat-item">
            <div class="stat-number">{{ stats.totalFiles }}</div>
            <div class="stat-label">Fichiers</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.sharedFiles }}</div>
            <div class="stat-label">Partagés</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.collaborators }}</div>
            <div class="stat-label">Collaborateurs</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions rapides -->
    <div class="quick-actions">
      <h2 class="section-title">Actions rapides</h2>
      <div class="actions-grid">
        <button 
          v-for="action in quickActions"
          :key="action.name"
          class="action-card"
          @click="handleQuickAction(action.name)"
        >
          <div class="action-icon" :style="{ backgroundColor: action.color }">
            <FontAwesomeIcon :icon="action.icon" />
          </div>
          <div class="action-content">
            <h3>{{ action.title }}</h3>
            <p>{{ action.description }}</p>
          </div>
          <div class="action-arrow">
            <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
          </div>
        </button>
      </div>
    </div>

    <!-- Fichiers récents -->
    <div class="recent-files">
      <div class="section-header">
        <h2 class="section-title">Fichiers récents</h2>
        <NuxtLink to="/recent" class="see-all-link">
          Voir tout
          <FontAwesomeIcon :icon="['fas', 'arrow-right']" />
        </NuxtLink>
      </div>
      
      <div class="files-grid">
        <div 
          v-for="file in recentFiles"
          :key="file.id"
          class="file-card"
          @click="openFile(file)"
        >
          <div class="file-icon" :class="`file-type-${file.type}`">
            <FontAwesomeIcon :icon="getFileIcon(file.type)" />
          </div>
          <div class="file-info">
            <h4 class="file-name">{{ file.name }}</h4>
            <p class="file-meta">{{ file.size }} • {{ file.lastModified }}</p>
          </div>
          <div class="file-actions">
            <button class="action-btn" @click.stop="shareFile(file)">
              <FontAwesomeIcon :icon="['fas', 'share']" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Activité collaborative -->
    <div class="activity-feed">
      <h2 class="section-title">Activité récente</h2>
      <div class="activity-list">
        <div 
          v-for="activity in recentActivity"
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-avatar">
            <div class="avatar-placeholder">
              {{ activity.user.name.charAt(0) }}
            </div>
          </div>
          <div class="activity-content">
            <p class="activity-text">
              <strong>{{ activity.user.name }}</strong> {{ activity.action }}
              <span class="activity-file">{{ activity.fileName }}</span>
            </p>
            <span class="activity-time">{{ activity.timeAgo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Meta tags
useHead({
  title: 'FileShare - Dashboard',
  meta: [
    { name: 'description', content: 'Tableau de bord - Gérez vos fichiers et collaborations' }
  ]
})

// États réactifs
const stats = ref({
  totalFiles: 247,
  sharedFiles: 32,
  collaborators: 8
})

// Actions rapides
const quickActions = [
  {
    name: 'upload',
    title: 'Upload fichier',
    description: 'Ajouter de nouveaux fichiers',
    icon: ['fas', 'cloud-upload-alt'],
    color: '#3B82F6'
  },
  {
    name: 'create-folder',
    title: 'Nouveau dossier',
    description: 'Organiser vos fichiers',
    icon: ['fas', 'folder-plus'],
    color: '#10B981'
  },
  {
    name: 'share',
    title: 'Partager',
    description: 'Créer un lien de partage',
    icon: ['fas', 'share-alt'],
    color: '#8B5CF6'
  },
  {
    name: 'collaborate',
    title: 'Collaborer',
    description: 'Inviter des collaborateurs',
    icon: ['fas', 'users'],
    color: '#F59E0B'
  }
]

// Fichiers récents
const recentFiles = ref([
  {
    id: 1,
    name: 'Rapport_Q4_2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    lastModified: 'Il y a 2h'
  },
  {
    id: 2,
    name: 'Présentation_Projet.pptx',
    type: 'presentation',
    size: '15.8 MB',
    lastModified: 'Il y a 5h'
  },
  {
    id: 3,
    name: 'Budget_2025.xlsx',
    type: 'spreadsheet',
    size: '892 KB',
    lastModified: 'Hier'
  },
  {
    id: 4,
    name: 'Logo_Final.png',
    type: 'image',
    size: '1.2 MB',
    lastModified: 'Il y a 2 jours'
  }
])

// Activité récente
const recentActivity = ref([
  {
    id: 1,
    user: { name: 'Marie Dubois' },
    action: 'a partagé',
    fileName: 'Contrat_Client.pdf',
    timeAgo: 'Il y a 15 min'
  },
  {
    id: 2,
    user: { name: 'Thomas Martin' },
    action: 'a modifié',
    fileName: 'Cahier_des_charges.docx',
    timeAgo: 'Il y a 1h'
  },
  {
    id: 3,
    user: { name: 'Sophie Laurent' },
    action: 'a commenté',
    fileName: 'Maquette_V2.fig',
    timeAgo: 'Il y a 3h'
  }
])

// Fonctions utilitaires
const getFileIcon = (type: string) => {
  const icons: Record<string, string[]> = {
    pdf: ['fas', 'file-pdf'],
    presentation: ['fas', 'file-powerpoint'],
    spreadsheet: ['fas', 'file-excel'],
    image: ['fas', 'file-image'],
    document: ['fas', 'file-word'],
    default: ['fas', 'file']
  }
  return icons[type] || icons.default
}

// Actions
const handleQuickAction = (actionName: string) => {
  console.log(`Action rapide: ${actionName}`)
  switch (actionName) {
    case 'upload':
      triggerFileUpload()
      break
    case 'create-folder':
      createFolder()
      break
    case 'share':
      openShareDialog()
      break
    case 'collaborate':
      openCollaborationDialog()
      break
  }
}

const triggerFileUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.multiple = true
  input.click()
}

const createFolder = () => {
  console.log('Création de dossier')
}

const openShareDialog = () => {
  console.log('Dialog de partage')
}

const openCollaborationDialog = () => {
  console.log('Dialog de collaboration')
}

const openFile = (file: any) => {
  console.log('Ouvrir fichier:', file.name)
}

const shareFile = (file: any) => {
  console.log('Partager fichier:', file.name)
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables" as *;

.files-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #000000 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #000000 75%, 
    #1a1a1a 100%
  );
  padding-bottom: 120px;
  color: $white;
}

// Header compact pour dashboard
.dashboard-header {
  padding: 2rem 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.header-icon {
  .icon-container {
    position: relative;
    display: inline-block;
  }
  
  .main-icon {
    color: $primary;
    animation: iconFloat 3s ease-in-out infinite;
  }
  
  .icon-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulseGlow 2s ease-in-out infinite alternate;
  }
}

.header-text {
  flex: 1;
  
  .dashboard-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
    background: linear-gradient(135deg, $white 0%, rgba(255, 255, 255, 0.8) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .dashboard-subtitle {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
}

.quick-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 0.25rem;
  }
}

// Sections
.quick-actions,
.recent-files,
.activity-feed {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: $white;
  margin: 0 0 1.5rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.see-all-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: $primary;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: $primary-light;
    transform: translateX(4px);
  }
}

// Actions rapides
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  font-size: 20px;
  flex-shrink: 0;
}

.action-content {
  flex: 1;
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: $white;
    margin: 0 0 0.25rem 0;
  }
  
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
}

.action-arrow {
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
}

.action-card:hover .action-arrow {
  color: $primary;
  transform: translateX(4px);
}

// Fichiers récents
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
}

.file-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
}

.file-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  
  &.file-type-pdf { background: #DC2626; color: $white; }
  &.file-type-presentation { background: #D97706; color: $white; }
  &.file-type-spreadsheet { background: #059669; color: $white; }
  &.file-type-image { background: #7C3AED; color: $white; }
  &.file-type-document { background: #2563EB; color: $white; }
}

.file-info {
  flex: 1;
  
  .file-name {
    font-size: 1rem;
    font-weight: 500;
    color: $white;
    margin: 0 0 0.25rem 0;
  }
  
  .file-meta {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }
}

.file-actions {
  .action-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: $primary;
      color: $white;
    }
  }
}

// Activité
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.activity-content {
  flex: 1;
  
  .activity-text {
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 0.25rem 0;
    
    strong {
      color: $white;
    }
    
    .activity-file {
      color: $primary;
      font-weight: 500;
    }
  }
  
  .activity-time {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.4);
  }
}

// Animations
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

// Responsive
@media (max-width: $tablet) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .quick-stats {
    gap: 1.5rem;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .files-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: $mobile) {
  .dashboard-header {
    padding: 1.5rem 1rem;
  }
  
  .quick-actions,
  .recent-files,
  .activity-feed {
    padding: 1.5rem 1rem;
  }
}
</style> 