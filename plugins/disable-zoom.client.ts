export default defineNuxtPlugin(() => {
  // Désactiver le zoom au double tap sur iOS et Android
  if (process.client) {
    // Empêcher le zoom au double tap
    let lastTouchEnd = 0
    
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, { passive: false })
    
    // Empêcher le pinch-to-zoom
    document.addEventListener('touchmove', function (event) {
      if (event.touches && event.touches.length > 1) {
        event.preventDefault()
      }
    }, { passive: false })
    
    // Empêcher le zoom avec Ctrl+scroll (desktop)
    document.addEventListener('wheel', function (event) {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    }, { passive: false })
    
    // Empêcher les raccourcis clavier de zoom
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && 
          (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault()
      }
    })
  }
}) 