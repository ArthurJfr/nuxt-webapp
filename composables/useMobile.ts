import { ref, onMounted, onUnmounted } from 'vue'

export const useMobile = (breakpoint: number = 768) => {
  const isMobile = ref(false)
  const isIOS = ref(false)
  const isMobileDevice = ref(false)

  const checkMobile = () => {
    if (process.client) {
      // Détecter les appareils mobiles via User Agent
      const userAgent = navigator.userAgent
      const mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      isMobileDevice.value = mobileDevices.test(userAgent)
      
      // Détecter spécifiquement iOS
      isIOS.value = /iPad|iPhone|iPod/.test(userAgent) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      
      // Considérer comme mobile si :
      // 1. Largeur d'écran <= breakpoint OU
      // 2. Appareil mobile détecté OU
      // 3. Mode touch disponible
      isMobile.value = window.innerWidth <= breakpoint || 
                       isMobileDevice.value || 
                       ('ontouchstart' in window)
      
      // Forcer le mode mobile sur iOS
      if (isIOS.value) {
        isMobile.value = true
        // Ajouter des classes CSS pour forcer le style mobile
        document.body.classList.add('mobile-device', 'ios-device')
        document.documentElement.classList.add('mobile-viewport')
      }
      
      console.log('📱 Détection mobile:', {
        isMobile: isMobile.value,
        isIOS: isIOS.value,
        isMobileDevice: isMobileDevice.value,
        screenWidth: window.innerWidth,
        userAgent: userAgent.substring(0, 50) + '...'
      })
    }
  }

  const handleResize = () => {
    checkMobile()
  }

  onMounted(() => {
    if (process.client) {
      checkMobile()
      window.addEventListener('resize', handleResize)
      window.addEventListener('orientationchange', handleResize)
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  })

  return {
    isMobile,
    isIOS,
    isMobileDevice
  }
} 