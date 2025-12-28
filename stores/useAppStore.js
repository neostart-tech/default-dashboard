import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const darkMode = ref(false)
  const notifications = ref([])
  const user = ref(null)
  const isLoading = ref(false)
  
  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read)
  )
  
  // Actions
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark', darkMode.value)
  }
  
  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.unshift({
      id,
      ...notification,
      read: false,
      timestamp: new Date()
    })
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }
  
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }
  
  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }
  
  const setLoading = (loading) => {
    isLoading.value = loading
  }
  
  const login = async (credentials) => {
    setLoading(true)
    try {
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      user.value = {
        id: 1,
        name: 'Admin',
        email: credentials.email,
        role: 'admin'
      }
      addNotification({
        type: 'success',
        message: 'Connexion réussie'
      })
      return true
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message || 'Échec de la connexion'
      })
      return false
    } finally {
      setLoading(false)
    }
  }
  
  const logout = () => {
    user.value = null
    addNotification({
      type: 'info',
      message: 'Déconnexion réussie'
    })
  }
  
  return {
    // State
    darkMode,
    notifications,
    user,
    isLoading,
    
    // Getters
    isAuthenticated,
    unreadNotifications,
    
    // Actions
    toggleDarkMode,
    addNotification,
    removeNotification,
    markAsRead,
    setLoading,
    login,
    logout
  }
})