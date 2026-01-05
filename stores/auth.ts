// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)

  // Getters
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isUser = computed(() => user.value?.role === 'user')

  // Actions
  const initialize = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')
      
      if (storedToken && storedUser) {
        try {
          token.value = storedToken
          user.value = JSON.parse(storedUser)
          isAuthenticated.value = true
        } catch (error) {
          console.error('Error parsing stored user:', error)
          logout()
        }
      }
    }
  }

  const login = async (credentials) => {
    loading.value = true
    
    try {
      console.log('🔐 Attempting login with credentials:', credentials)
      
      // Préparer les données exactement comme Laravel les attend
      const requestData = {
        email: credentials.email.trim(),
        password: credentials.password,
        remember: credentials.remember || false
      }
      
      console.log('📤 Sending request data:', requestData)
      
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })

      console.log('📥 Response status:', response.status, response.statusText)
      
      // Lire la réponse
      const responseText = await response.text()
      console.log('📥 Raw response:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
        console.log('📥 Parsed JSON:', data)
      } catch (jsonError) {
        console.error('❌ JSON parse error:', jsonError)
        throw new Error('Invalid JSON response from server')
      }

      if (!response.ok) {
        console.error('❌ API error response:', data)
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      if (data.success) {
        console.log('✅ Login successful!')
        const { user: userData, token: authToken } = data.data
        
        user.value = userData
        token.value = authToken
        isAuthenticated.value = true
        
        // Stocker dans localStorage
        if (process.client) {
          localStorage.setItem('auth_token', authToken)
          localStorage.setItem('auth_user', JSON.stringify(userData))
          
          if (credentials.remember) {
            localStorage.setItem('remember_token', 'true')
          }
        }
        
        return { success: true, data: data.data }
      } else {
        console.error('❌ Login failed:', data.message)
        return { success: false, message: data.message, errors: data.errors }
      }
      
    } catch (error) {
      console.error('❌ Login error:', error)
      return { 
        success: false, 
        message: error.message || 'Erreur de connexion au serveur' 
      }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await fetch('http://localhost:8000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token.value}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Nettoyer le store
      user.value = null
      token.value = null
      isAuthenticated.value = false
      
      // Nettoyer localStorage
      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('remember_token')
      }
    }
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    
    // Getters
    isAdmin,
    isUser,
    
    // Actions
    initialize,
    login,
    logout,
  }
})