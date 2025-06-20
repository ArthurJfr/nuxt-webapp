<template>
  <div class="files-dashboard">
    <!-- Background effects -->
    <div class="dashboard-background">
      <div class="dashboard-particles">
        <div 
          v-for="i in 50" 
          :key="i" 
          class="particle"
          :style="{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 25 + 's',
            animationDuration: (Math.random() * 15 + 10) + 's',
            width: (Math.random() * 8 + 3) + 'px',
            height: (Math.random() * 8 + 3) + 'px'
          }"
        />
      </div>
      
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>
    
    <div class="dashboard-overlay"></div>

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
          <div class="stat-item glass-card-mini">
            <div class="stat-number">{{ stats.totalFiles }}</div>
            <div class="stat-label">Fichiers</div>
          </div>
          <div class="stat-item glass-card-mini">
            <div class="stat-number">{{ stats.sharedFiles }}</div>
            <div class="stat-label">Partagés</div>
          </div>
          <div class="stat-item glass-card-mini">
            <div class="stat-number">{{ stats.collaborators }}</div>
            <div class="stat-label">Collaborateurs</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions rapides -->
    <div class="dashboard-content">
      <Card type="auth-card" class="quick-actions dashboard-card">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
          <h2 class="section-title">Actions rapides</h2>
        </div>
        
        <div class="actions-grid">
                     <button 
             v-for="action in quickActions"
             :key="action.name"
             class="action-card glass-card-mini"
             :class="`action-${action.category}`"
             @click="handleQuickAction(action.name)"
           >
             <div class="action-icon" :style="{ background: action.gradient }">
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
      </Card>

      <!-- Fichiers récents -->
      <Card type="auth-card" class="recent-files dashboard-card">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
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
             class="file-card glass-card-mini"
             :class="`file-category-${file.category}`"
             @click="openFile(file)"
           >
             <div class="file-icon" :style="{ background: file.gradient }">
               <FontAwesomeIcon :icon="getFileIcon(file.type)" />
             </div>
            <div class="file-info">
              <h4 class="file-name">{{ file.name }}</h4>
              <p class="file-meta">{{ file.size }} • {{ file.lastModified }}</p>
            </div>
            <div class="file-actions">
              <button class="action-btn glass-btn" @click.stop="shareFile(file)">
                <FontAwesomeIcon :icon="['fas', 'share']" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      <!-- Activité collaborative -->
      <Card type="auth-card" class="activity-feed dashboard-card">
        <div class="section-header">
          <div class="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h2 class="section-title">Activité récente</h2>
        </div>
        
        <div class="activity-list">
          <div 
            v-for="activity in recentActivity"
            :key="activity.id"
            class="activity-item glass-card-mini"
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
      </Card>
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

// Actions rapides avec couleurs spécifiques
const quickActions = [
  {
    name: 'upload',
    title: 'Upload fichier',
    description: 'Ajouter de nouveaux fichiers',
    icon: ['fas', 'cloud-upload-alt'],
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    category: 'action'
  },
  {
    name: 'create-folder',
    title: 'Nouveau dossier',
    description: 'Organiser vos fichiers',
    icon: ['fas', 'folder-plus'],
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    category: 'organization'
  },
  {
    name: 'share',
    title: 'Partager',
    description: 'Créer un lien de partage',
    icon: ['fas', 'share-alt'],
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    category: 'social'
  },
  {
    name: 'collaborate',
    title: 'Collaborer',
    description: 'Inviter des collaborateurs',
    icon: ['fas', 'users'],
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    category: 'collaboration'
  }
]

// Fichiers récents avec couleurs par type
const recentFiles = ref([
  {
    id: 1,
    name: 'Rapport_Q4_2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    lastModified: 'Il y a 2h',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
    category: 'document'
  },
  {
    id: 2,
    name: 'Présentation_Projet.pptx',
    type: 'presentation',
    size: '15.8 MB',
    lastModified: 'Il y a 5h',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706 0%, #92400E 100%)',
    category: 'presentation'
  },
  {
    id: 3,
    name: 'Budget_2025.xlsx',
    type: 'spreadsheet',
    size: '892 KB',
    lastModified: 'Hier',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    category: 'data'
  },
  {
    id: 4,
    name: 'Logo_Final.png',
    type: 'image',
    size: '1.2 MB',
    lastModified: 'Il y a 2 jours',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    category: 'media'
  },
  {
    id: 5,
    name: 'Code_Source.zip',
    type: 'archive',
    size: '45.2 MB',
    lastModified: 'Il y a 3 jours',
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)',
    category: 'archive'
  },
  {
    id: 6,
    name: 'Vidéo_Demo.mp4',
    type: 'video',
    size: '128 MB',
    lastModified: 'Il y a 1 semaine',
    color: '#EA580C',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
    category: 'media'
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

// Fonctions utilitaires avec plus de types
const getFileIcon = (type: string) => {
  const icons: Record<string, string[]> = {
    pdf: ['fas', 'file-pdf'],
    presentation: ['fas', 'file-powerpoint'],
    spreadsheet: ['fas', 'file-excel'],
    image: ['fas', 'file-image'],
    document: ['fas', 'file-word'],
    archive: ['fas', 'file-archive'],
    video: ['fas', 'file-video'],
    audio: ['fas', 'file-audio'],
    code: ['fas', 'file-code'],
    text: ['fas', 'file-alt'],
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
    #0a0a0a 0%, 
    #1a1a1a 25%, 
    #0d1117 50%, 
    #1a1a1a 75%, 
    #0a0a0a 100%
  );
  color: $white;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 120px;
}

// Background effects
.dashboard-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dashboard-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(59, 130, 246, 0.2) 50%,
    transparent 100%);
  border-radius: 50%;
  animation: particleFloat infinite linear;
  filter: blur(0.5px);
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
    rgba(59, 130, 246, 0.08) 0%, 
    rgba(139, 92, 246, 0.08) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &.shape-1 {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    top: 10%;
    left: 5%;
    animation: floatShape 25s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    top: 50%;
    right: 8%;
    animation: floatShape 30s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    bottom: 20%;
    left: 20%;
    animation: floatShape 22s ease-in-out infinite;
  }
  
  &.shape-4 {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    top: 70%;
    right: 30%;
    animation: floatShape 28s ease-in-out infinite;
  }
}

.dashboard-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, 
    rgba(0, 0, 0, 0.1) 0%, 
    rgba(0, 0, 0, 0.3) 100%);
}

// Header compact pour dashboard
.dashboard-header {
  position: relative;
  z-index: 2;
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
    font-size: 3.5rem;
    font-weight: 800;
    margin: 0 0 0.25rem 0;
    background: linear-gradient(135deg, 
      $white 0%, 
      rgba(255, 255, 255, 0.9) 50%,
      rgba(59, 130, 246, 0.8) 100%);
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
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: $spacing-sm $spacing-md;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
  
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

// Contenu principal
.dashboard-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0;
  padding: 0 $spacing-lg;
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  width: 100%;
  box-sizing: border-box;
}

// Sections
.quick-actions,
.recent-files,
.activity-feed {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 !important;
}

// Style spécifique pour les cartes du dashboard
.dashboard-card {
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

// Headers de section
.section-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-sm;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.2) 0%, 
    rgba(139, 92, 246, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(59, 130, 246, 0.8);
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: $white;
  margin: 0;
  flex: 1;
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
  gap: $spacing-md;
}

.action-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border: none;
  background: transparent;
  
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
  gap: $spacing-md;
}

.file-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
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
  color: $white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
    border-radius: 8px;
    pointer-events: none;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }
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
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(59, 130, 246, 0.8);
      color: $white;
    }
  }
}

// Activité
.activity-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.activity-item {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
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
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.8) 0%, 
      rgba(139, 92, 246, 0.8) 100%);
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

// Styles glassmorphisme
.glass-card-mini {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    border-radius: 12px;
    pointer-events: none;
  }
}

.glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

// Styles spécifiques par catégorie
.action-action {
  border-left: 3px solid #3B82F6;
  
  &:hover {
    background: rgba(59, 130, 246, 0.1);
    border-left-color: #1D4ED8;
  }
}

.action-organization {
  border-left: 3px solid #10B981;
  
  &:hover {
    background: rgba(16, 185, 129, 0.1);
    border-left-color: #047857;
  }
}

.action-social {
  border-left: 3px solid #8B5CF6;
  
  &:hover {
    background: rgba(139, 92, 246, 0.1);
    border-left-color: #7C3AED;
  }
}

.action-collaboration {
  border-left: 3px solid #F59E0B;
  
  &:hover {
    background: rgba(245, 158, 11, 0.1);
    border-left-color: #D97706;
  }
}

.file-category-document {
  border-left: 3px solid #DC2626;
  
  &:hover {
    background: rgba(220, 38, 38, 0.1);
    border-left-color: #991B1B;
  }
}

.file-category-presentation {
  border-left: 3px solid #D97706;
  
  &:hover {
    background: rgba(217, 119, 6, 0.1);
    border-left-color: #92400E;
  }
}

.file-category-data {
  border-left: 3px solid #059669;
  
  &:hover {
    background: rgba(5, 150, 105, 0.1);
    border-left-color: #047857;
  }
}

.file-category-media {
  border-left: 3px solid #7C3AED;
  
  &:hover {
    background: rgba(124, 58, 237, 0.1);
    border-left-color: #5B21B6;
  }
}

.file-category-archive {
  border-left: 3px solid #0891B2;
  
  &:hover {
    background: rgba(8, 145, 178, 0.1);
    border-left-color: #0E7490;
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50vh) rotate(180deg) scale(1.2);
    opacity: 0.8;
  }
  100% { 
    transform: translateY(-100vh) rotate(360deg) scale(0.8);
    opacity: 0.4;
  }
}

@keyframes floatShape {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
  }
  50% { 
    transform: translateY(-20px) rotate(180deg) scale(1.1);
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
    gap: 1rem;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .files-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-content {
    padding: 0 $spacing-md;
    max-width: calc(100vw - #{$spacing-md * 2});
  }
  
  .quick-actions,
  .recent-files,
  .activity-feed {
    margin: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}

@media (max-width: $mobile) {
  .dashboard-header {
    padding: 1.5rem 1rem;
  }
  
  .dashboard-content {
    padding: 0 $spacing-sm;
    gap: $spacing-lg;
    max-width: calc(100vw - #{$spacing-sm * 2});
  }
  
  .quick-actions,
  .recent-files,
  .activity-feed {
    margin: 0 !important;
    width: calc(100vw - #{$spacing-sm * 2}) !important;
    max-width: calc(100vw - #{$spacing-sm * 2}) !important;
    box-sizing: border-box;
  }
  
  .header-text {
    .dashboard-title {
      font-size: 1.6rem;
    }
  }
  
  .quick-stats {
    flex-direction: column;
    gap: $spacing-xs;
    width: 100%;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding: $spacing-sm;
    
    .stat-number {
      font-size: 1.2rem;
    }
    
    .stat-label {
      margin-top: 0;
      font-size: 0.9rem;
    }
  }
}
</style> 