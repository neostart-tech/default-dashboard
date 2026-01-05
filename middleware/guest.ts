// middleware/guest.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  // Si l'utilisateur est déjà authentifié, rediriger vers la page d'accueil
  if (authStore.isAuthenticated) {
    return navigateTo('/')
  }
})