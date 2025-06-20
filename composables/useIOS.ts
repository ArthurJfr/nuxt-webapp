export const useIOS = () => {
  const isIOS = computed(() => {
    if (process.client) {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    }
    return false
  })

  const isStandalone = computed(() => {
    if (process.client && 'standalone' in window.navigator) {
      return (window.navigator as any).standalone
    }
    return false
  })

  const isPWAInstalled = computed(() => {
    if (process.client) {
      return window.matchMedia('(display-mode: standalone)').matches ||
             window.matchMedia('(display-mode: fullscreen)').matches ||
             isStandalone.value
    }
    return false
  })

  const setupIOSStatusBar = (isDark: boolean) => {
    if (!process.client || !isIOS.value) return

    // Mettre à jour la couleur de la status bar
    const metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
    if (metaStatusBar) {
      metaStatusBar.setAttribute('content', 'black-translucent')
    }

    // Créer ou mettre à jour l'élément de status bar
    let statusBarElement = document.getElementById('ios-status-bar')
    if (!statusBarElement) {
      statusBarElement = document.createElement('div')
      statusBarElement.id = 'ios-status-bar'
      statusBarElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: env(safe-area-inset-top, 44px);
        background-color: ${isDark ? '#0f172a' : '#f8fafc'};
        z-index: 9999;
        transition: background-color 0.3s ease;
      `
      document.body.appendChild(statusBarElement)
    } else {
      statusBarElement.style.backgroundColor = isDark ? '#0f172a' : '#f8fafc'
    }
  }

  const addIOSInstallPrompt = () => {
    if (!process.client || !isIOS.value || isPWAInstalled.value) return false

    // iOS ne supporte pas l'événement beforeinstallprompt
    // On peut afficher un guide d'installation personnalisé
    return true
  }

  return {
    isIOS,
    isStandalone,
    isPWAInstalled,
    setupIOSStatusBar,
    addIOSInstallPrompt
  }
} 