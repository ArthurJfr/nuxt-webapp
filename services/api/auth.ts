const BASE_URL = 'http://localhost:3000/api/auth'
 

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    return response.json()
  },

  async register(userData: any) {
    console.log("register", BASE_URL)
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    return response.json()
  },
  

  async resetPassword(email: string) {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    return response.json()
  },

  async confirmEmail(token: string) {
    try {
      const response = await fetch(`${BASE_URL}/confirm-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      })
      return await response.json()
    } catch (error) {
      console.error('Erreur lors de la confirmation de l\'email:', error)
      throw error
    }
  },

  async resendConfirmationEmail( email: string ) {
    try {
      const response = await fetch(`${BASE_URL}/resend-confirmation-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur lors du renvoi de l\'email')
      }
      
      return await response.json()
    } catch (error) {
      console.error('Erreur lors du renvoi de l\'email:', error)
      throw error
    }
  }
} 