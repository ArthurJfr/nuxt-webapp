import { config as dotenvConfig } from 'dotenv'
import { defineNuxtConfig } from 'nuxt/config'
import { pwaConfig } from './pwa.config'

dotenvConfig() 

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Configuration serveur pour le développement
  devServer: {
    host: '0.0.0.0', // Écouter sur toutes les interfaces
    port: 8080
  },
  
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/scss/main.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables" as *; @use "@/assets/scss/mixins" as *;'
        }
      }
    },
    server: {
      host: '0.0.0.0', // Vite dev server aussi
      port: 8080
    }
  },

  compatibilityDate: '2025-02-23',

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Configuration pour empêcher les erreurs SSR avec Font Awesome
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ]
  },

  runtimeConfig: {
    // Variables privées accessibles uniquement côté serveur
    apiSecret: '', // peut être surchargé par NUXT_API_SECRET

    // Variables publiques accessibles côté client et serveur
    public: {
      apiBase: 'http://localhost:8080/api' // Valeur par défaut
    }
  },

  modules: [
    '@pinia/nuxt',
    ['@vite-pwa/nuxt', pwaConfig]
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  ssr: {
    noExternal: ['@pinia/nuxt']
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    keepalive: false,
    head: {
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'WikiNotes' },
        { name: 'mobile-web-app-capable', content: 'yes' }
      ]
    }
  },
  
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false,
  },
})