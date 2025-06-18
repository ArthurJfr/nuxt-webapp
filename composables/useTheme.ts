import { ref, computed, onMounted, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

export const useTheme = () => {
  // FORCER LE THÈME SOMBRE pour l'instant
  const theme = ref<Theme>('dark')
  const systemPrefersDark = ref(true) // Toujours true

  // Thème effectif toujours sombre
  const effectiveTheme = computed(() => 'dark')

  // Propriétés réactives - toujours sombre
  const isDark = computed(() => true)
  const isLight = computed(() => false)

  // Détecter les préférences système
  const detectSystemTheme = () => {
    if (process.client) {
      systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Appliquer le thème sombre au DOM
  const applyTheme = (newTheme: Theme = 'dark') => {
    if (process.client) {
      const root = document.documentElement
      
      // Forcer le thème sombre
      root.classList.remove('light', 'dark', 'auto')
      root.classList.add('dark')
      root.classList.add('ios-glass') // Ajouter le style glassmorphisme iOS
      
      // Sauvegarder dans localStorage
      localStorage.setItem('theme', 'dark')
      
      // Mettre à jour la meta theme-color pour PWA - couleur sombre
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#0f172a')
      }
      
      console.log('🌙 Thème sombre iOS appliqué')
    }
  }

  // Changer le thème - FORCÉ EN SOMBRE
  const setTheme = (newTheme: Theme) => {
    theme.value = 'dark' // Toujours sombre
    applyTheme('dark')
  }

  // Basculer - DÉSACTIVÉ pour l'instant
  const toggleTheme = () => {
    console.log('🌙 Thème sombre forcé - basculement désactivé')
    applyTheme('dark')
  }

  // Initialisation - FORCER LE SOMBRE
  onMounted(() => {
    // Forcer le thème sombre
    theme.value = 'dark'
    localStorage.setItem('theme', 'dark')
    
    // Appliquer immédiatement le thème sombre
    applyTheme('dark')
    
    console.log('🌙 Initialisation forcée en mode sombre')
  })

  // Watcher pour les changements de thème
  watch([theme, systemPrefersDark], () => {
    if (process.client) {
      applyTheme(theme.value)
    }
  })

  return {
    // État
    theme,
    systemPrefersDark,
    effectiveTheme,
    isDark,
    isLight,
    
    // Méthodes
    setTheme,
    toggleTheme,
    detectSystemTheme
  }
} 