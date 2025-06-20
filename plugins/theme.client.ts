export default defineNuxtPlugin(() => {
  // Initialiser le thème automatiquement
  if (process.client) {
    const { theme, isDark } = useTheme()
    const { setupIOSStatusBar } = useIOS()
    
    // Fonction pour mettre à jour les meta tags
    const updateMetaTags = (isDarkMode: boolean) => {
      // Couleur du thème principal
      const themeColor = isDarkMode ? '#0f172a' : '#2563eb'
      
      // Mettre à jour theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColor)
      }
      
      // Mettre à jour msapplication-navbutton-color (Edge/IE)
      const metaNavButton = document.querySelector('meta[name="msapplication-navbutton-color"]')
      if (metaNavButton) {
        metaNavButton.setAttribute('content', themeColor)
      }
      
      // Mettre à jour apple-mobile-web-app-status-bar-style pour iOS
      const metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
      if (metaStatusBar) {
        // black-translucent permet à notre CSS de contrôler la couleur
        metaStatusBar.setAttribute('content', 'black-translucent')
      }
      
      // Ajouter du padding-top pour compenser la status bar iOS
      const root = document.documentElement
      if (isDarkMode) {
        root.style.setProperty('--ios-status-bar-bg', '#0f172a')
        root.style.setProperty('--ios-safe-area-top', 'env(safe-area-inset-top)')
      } else {
        root.style.setProperty('--ios-status-bar-bg', '#f8fafc')
        root.style.setProperty('--ios-safe-area-top', 'env(safe-area-inset-top)')
      }
    }
    
    // Appliquer le thème immédiatement
    nextTick(() => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' || 'auto'
      theme.value = savedTheme
      
      // Appliquer le thème au DOM
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      
      let isDarkMode = false
      if (savedTheme === 'auto') {
        isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.add(isDarkMode ? 'dark' : 'light')
      } else {
        isDarkMode = savedTheme === 'dark'
        root.classList.add(savedTheme)
      }
      
      // Mettre à jour les meta tags
      updateMetaTags(isDarkMode)
      
      // Configuration spécifique iOS
      setupIOSStatusBar(isDarkMode)
      
      // Écouter les changements de thème
      watch(() => isDark.value, (newIsDark) => {
        updateMetaTags(newIsDark)
        setupIOSStatusBar(newIsDark)
      }, { immediate: false })
      
      // Écouter les changements de préférences système en mode auto
      if (savedTheme === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', (e) => {
          if (theme.value === 'auto') {
            const root = document.documentElement
            root.classList.remove('light', 'dark')
            root.classList.add(e.matches ? 'dark' : 'light')
            updateMetaTags(e.matches)
            setupIOSStatusBar(e.matches)
          }
        })
      }
    })
  }
}) 