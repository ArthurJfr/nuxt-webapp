import { ref, onMounted, onUnmounted } from 'vue'

export const useMobile = (breakpoint: number = 768) => {
  const isMobile = ref(false)

  const checkMobile = () => {
    if (process.client) {
      isMobile.value = window.innerWidth <= breakpoint
    }
  }

  const handleResize = () => {
    checkMobile()
  }

  onMounted(() => {
    if (process.client) {
      checkMobile()
      window.addEventListener('resize', handleResize)
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', handleResize)
    }
  })

  return {
    isMobile
  }
} 