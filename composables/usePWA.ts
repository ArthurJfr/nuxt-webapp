import { ref, computed, onMounted } from 'vue'

export const usePWA = () => {
  // État réactif avec valeurs par défaut pour SSR
  const isPWA = ref(false)
  const isMobile = ref(false)
  const isStandalone = ref(false)
  const isInstallable = ref(false)

  // Interface pour l'événement beforeinstallprompt
  let deferredPrompt: any = null

  // Détection PWA
  const checkPWA = () => {
    if (process.client) {
      // Vérifier si l'app est en mode standalone (installée)
      isStandalone.value = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone === true ||
                          document.referrer.includes('android-app://')
      
      // Considérer comme PWA si standalone ou installable
      isPWA.value = isStandalone.value || isInstallable.value
    }
  }

  // Détection mobile
  const checkMobile = () => {
    if (process.client) {
      isMobile.value = window.innerWidth <= 768 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  }

  // Écouter l'événement beforeinstallprompt
  const handleBeforeInstallPrompt = (event: Event) => {
    if (process.client) {
      event.preventDefault()
      deferredPrompt = event
      isInstallable.value = true
      isPWA.value = true
    }
  }

  // Fonction pour installer la PWA
  const installPWA = async () => {
    if (process.client && deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      deferredPrompt = null
      isInstallable.value = false
      return outcome === 'accepted'
    }
    return false
  }

  // Gestion du redimensionnement
  const handleResize = () => {
    if (process.client) {
      checkMobile()
    }
  }

  // Propriétés calculées avec garde SSR
  const showMobileUI = computed(() => {
    // Retourner false côté serveur pour éviter l'hydratation mismatch
    if (process.server) return false
    
    // En développement, afficher sur mobile même sans PWA
    if (process.dev && process.client) {
      return isMobile.value
    }
    
    // En production, seulement si PWA ET mobile
    return isPWA.value && isMobile.value
  })
  
  const canInstall = computed(() => {
    if (process.server) return false
    return isInstallable.value && !isStandalone.value
  })

  // Initialisation client uniquement
  onMounted(() => {
    if (process.client) {
      checkPWA()
      checkMobile()
      
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.addEventListener('resize', handleResize)
      
      // Écouter les changements de display mode
      const mediaQuery = window.matchMedia('(display-mode: standalone)')
      mediaQuery.addEventListener('change', checkPWA)
    }
  })

  // Nettoyage
  const cleanup = () => {
    if (process.client) {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('resize', handleResize)
      
      const mediaQuery = window.matchMedia('(display-mode: standalone)')
      mediaQuery.removeEventListener('change', checkPWA)
    }
  }

  return {
    // État
    isPWA,
    isMobile,
    isStandalone,
    isInstallable,
    
    // Propriétés calculées
    showMobileUI,
    canInstall,
    
    // Méthodes
    installPWA,
    cleanup
  }
} 