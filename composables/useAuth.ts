// ~/composables/useAuth.ts
export const useAuth = () => {
  const { $auth } = useNuxtApp()
  
  const login = async (credentials: { email: string; password: string }) => {
    try {
      await $auth.loginWith('laravelSanctum', { data: credentials })
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Échec de la connexion'
      }
    }
  }

  const logout = async () => {
    await $auth.logout()
  }

  const user = computed(() => $auth.user)
  const loggedIn = computed(() => $auth.loggedIn)

  return {
    login,
    logout,
    user,
    loggedIn
  }
}