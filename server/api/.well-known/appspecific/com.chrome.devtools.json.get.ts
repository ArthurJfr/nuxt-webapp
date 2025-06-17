export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/json')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  
  return {
    schemaVersion: "1.0.0",
    applicationName: "WikiNotes",
    applicationVersion: "1.0.0",
    manifestUrl: "/manifest.json",
    devtools: {
      enabled: process.dev,
      remoteDebugging: false
    },
    features: {
      pwa: true,
      serviceWorker: true,
      offlineSupport: true
    }
  }
}) 