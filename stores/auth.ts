import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: null as string | null,
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const { $api } = useNuxtApp()
        const response = await $api('/login', {
          method: 'POST',
          body: credentials
        })
        
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        
        // Sauvegarder dans les cookies
        useCookie('auth_token').value = response.token
        useCookie('auth_user').value = JSON.stringify(response.user)
        
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          message: error.data?.message || 'Erreur de connexion' 
        }
      }
    },

    async logout() {
      try {
        const { $api } = useNuxtApp()
        await $api('/logout', { method: 'POST' })
      } catch (error) {
        // Ignorer les erreurs de déconnexion
      }
      
      // Nettoyer le store
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      // Nettoyer les cookies
      useCookie('auth_token').value = null
      useCookie('auth_user').value = null
      
      navigateTo('/login')
    },

    async fetchUser() {
      try {
        const { $api } = useNuxtApp()
        const user = await $api('/user')
        this.user = user
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    },

    initialize() {
      // Restaurer depuis les cookies au chargement
      const token = useCookie('auth_token').value
      const userCookie = useCookie('auth_user').value
      
      if (token && userCookie) {
        this.token = token
        this.user = JSON.parse(userCookie)
        this.isAuthenticated = true
      }
    }
  },

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    userName: (state) => state.user?.name || 'Utilisateur',
    userEmail: (state) => state.user?.email,
  }
})