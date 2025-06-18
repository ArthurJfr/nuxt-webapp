import type { ModuleOptions } from '@vite-pwa/nuxt'

export const pwaConfig: ModuleOptions = {
  registerType: 'autoUpdate',
  workbox: {
    navigateFallback: '/',
    globPatterns: ['**/*.{js,css,html,png,svg,ico}']
  },
  client: {
    installPrompt: true,
    periodicSyncForUpdates: 20
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: 'module'
  },
  manifest: {
    name: 'WikiNotes',
    short_name: 'WikiNotes',
    description: 'Application de prise de notes intelligente',
    theme_color: '#2563eb',
    background_color: '#f8fafc',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    categories: ['productivity', 'utilities'],
    lang: 'fr',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/icon-72x72.svg',
        sizes: '72x72',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-96x96.svg',
        sizes: '96x96',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-128x128.svg',
        sizes: '128x128',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-144x144.svg',
        sizes: '144x144',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-152x152.svg',
        sizes: '152x152',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-384x384.svg',
        sizes: '384x384',
        type: 'image/svg+xml'
      },
      {
        src: '/icons/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml'
      }
    ]
  }
} 