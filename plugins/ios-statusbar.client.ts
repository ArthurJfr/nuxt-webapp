export default defineNuxtPlugin(() => {
  if (process.client) {
    // Détecter iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    
    if (!isIOS) return

    const { isDark } = useTheme()

    // Fonction pour créer/mettre à jour la status bar artificielle
    const createStatusBarOverlay = (isDarkMode: boolean) => {
      // Supprimer l'ancien overlay s'il existe
      const existingOverlay = document.getElementById('ios-status-overlay')
      if (existingOverlay) {
        existingOverlay.remove()
      }

      // Créer un nouvel overlay
      const overlay = document.createElement('div')
      overlay.id = 'ios-status-overlay'
      overlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: env(safe-area-inset-top, 44px) !important;
        background-color: ${isDarkMode ? '#0f172a' : '#f8fafc'} !important;
        z-index: 99999 !important;
        pointer-events: none !important;
        transition: background-color 0.3s ease !important;
      `
      
      // Insérer au début du body
      document.body.insertBefore(overlay, document.body.firstChild)
    }

    // Fonction pour mettre à jour les meta tags iOS
    const updateIOSMeta = (isDarkMode: boolean) => {
      // Mettre à jour ou créer le meta tag de status bar
      let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      if (!statusBarMeta) {
        statusBarMeta = document.createElement('meta')
        statusBarMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style')
        document.head.appendChild(statusBarMeta)
      }
      
      // Pour iOS, utiliser 'default' avec notre overlay personnalisé
      statusBarMeta.setAttribute('content', 'default')
      
      // Mettre à jour theme-color
      let themeColorMeta = document.querySelector('meta[name="theme-color"]')
      if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta')
        themeColorMeta.setAttribute('name', 'theme-color')
        document.head.appendChild(themeColorMeta)
      }
      
      const themeColor = isDarkMode ? '#0f172a' : '#2563eb'
      themeColorMeta.setAttribute('content', themeColor)
    }

    // Fonction principale de mise à jour
    const updateStatusBar = (isDarkMode: boolean) => {
      updateIOSMeta(isDarkMode)
      createStatusBarOverlay(isDarkMode)
      
      // Ajuster le padding du body
      document.body.style.paddingTop = 'env(safe-area-inset-top, 44px)'
    }

    // Initialiser au chargement - FORCER LE SOMBRE
    nextTick(() => {
      // Ajouter les classes iOS et glassmorphisme
      document.body.classList.add('ios-device')
      document.documentElement.classList.add('dark', 'ios-glass')
      
      // Forcer le thème sombre
      localStorage.setItem('theme', 'dark')
      const isDarkMode = true // Toujours sombre
      
      updateStatusBar(isDarkMode)
      
      // Debug info dans la console
      console.log('🍎 iOS Status Bar Plugin activé')
      console.log('🌙 Thème sombre forcé')
      console.log('✨ Glassmorphisme iOS activé')
      console.log('📏 Safe area top:', getComputedStyle(document.documentElement).getPropertyValue('--ios-safe-area-top'))
    })

    // Écouter les changements de thème
    watch(() => isDark.value, (newIsDark) => {
      updateStatusBar(newIsDark)
    }, { immediate: false })

    // Écouter les changements de préférences système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      const currentTheme = localStorage.getItem('theme') || 'auto'
      if (currentTheme === 'auto') {
        updateStatusBar(e.matches)
      }
    })

    // Réappliquer après les changements de page
    const router = useRouter()
    router.afterEach(() => {
      nextTick(() => {
        updateStatusBar(isDark.value)
      })
    })
  }
}) 