// ~/stores/auth.store.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const { $auth } = useNuxtApp()
  
  // État
  const user = computed(() => $auth.user)
  const isAuthenticated = computed(() => $auth.loggedIn)
  const isLoading = ref(false)
  
  // Actions
  const login = async (credentials: { email: string; password: string; remember?: boolean }) => {
    isLoading.value = true
    try {
      await $auth.loginWith('laravelSanctum', { data: credentials })
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la connexion',
        errors: error.response?.data?.errors
      }
    } finally {
      isLoading.value = false
    }
  }
  
  const logout = async () => {
    isLoading.value = true
    try {
      await $auth.logout()
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la déconnexion'
      }
    } finally {
      isLoading.value = false
    }
  }
  
  const register = async (userData: any) => {
    isLoading.value = true
    try {
      await $axios.post('/api/auth/register', userData)
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de l\'inscription',
        errors: error.response?.data?.errors
      }
    } finally {
      isLoading.value = false
    }
  }
  
  const forgotPassword = async (email: string) => {
    isLoading.value = true
    try {
      await $axios.post('/api/auth/forgot-password', { email })
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de l\'envoi',
        errors: error.response?.data?.errors
      }
    } finally {
      isLoading.value = false
    }
  }
  
  const resetPassword = async (resetData: any) => {
    isLoading.value = true
    try {
      await $axios.post('/api/auth/reset-password', resetData)
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la réinitialisation',
        errors: error.response?.data?.errors
      }
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
  }
})