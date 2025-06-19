export default defineNuxtPlugin(() => {
  const { showForNavigation } = useSplashScreen()
  const router = useRouter()
  
  // Détecter si c'est un rechargement de page
  let isPageReload = true
  
  // Hook avant chaque navigation
  router.beforeEach(async (to, from) => {
    // Si ce n'est pas le chargement initial et que l'on change de route
    if (!isPageReload && to.path !== from.path) {
      await showForNavigation()
    }
    isPageReload = false
  })
  
  // Hook après chaque navigation réussie
  router.afterEach(() => {
    // Navigation terminée
  })
  
  // Gérer les erreurs de navigation
  router.onError(() => {
    const { hide } = useSplashScreen()
    hide()
  })
}) 