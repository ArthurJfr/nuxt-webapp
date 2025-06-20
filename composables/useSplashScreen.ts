export const useSplashScreen = () => {
  // État global du splashscreen
  const isVisible = useState('splashscreen.visible', () => true)
  const isLoading = useState('splashscreen.loading', () => false)
  const loadingType = useState<'initial' | 'navigation' | 'reload'>('splashscreen.type', () => 'initial')
  
  // Durée d'affichage du splashscreen (en ms)
  const SPLASH_DURATION = 2500
  
  // Afficher le splashscreen
  const show = (duration: number = SPLASH_DURATION, type: 'initial' | 'navigation' | 'reload' = 'initial') => {
    isVisible.value = true
    isLoading.value = true
    loadingType.value = type
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        hide()
        resolve()
      }, duration)
    })
  }
  
  // Masquer le splashscreen
  const hide = () => {
    isVisible.value = false
    isLoading.value = false
  }
  
  // Afficher pour une navigation
  const showForNavigation = async () => {
    await show(1800, 'navigation') // Plus court pour les navigations
  }
  
  // Afficher pour le chargement initial
  const showForInitialLoad = async () => {
    await show(SPLASH_DURATION, 'initial')
  }
  
  // Afficher pour un rechargement
  const showForReload = async () => {
    await show(2000, 'reload')
  }
  
  return {
    isVisible: readonly(isVisible),
    isLoading: readonly(isLoading),
    loadingType: readonly(loadingType),
    show,
    hide,
    showForNavigation,
    showForInitialLoad,
    showForReload
  }
} 