export const apiConfig = {
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
  version: process.env.NUXT_PUBLIC_API_VERSION,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  getAuthHeader() {
    const token = localStorage.getItem('token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }
} 