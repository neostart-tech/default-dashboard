// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Initialiser le store si nécessaire
  if (!authStore.isAuthenticated) {
    authStore.initialize()
  }
  
  // Pages publiques
  const publicPages = ['/login', '/register', '/forgot-password']
  const isPublicPage = publicPages.includes(to.path)
  
  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page privée
  if (!authStore.isAuthenticated && !isPublicPage) {
    return navigateTo('/login')
  }
  
  // Si l'utilisateur est authentifié et essaie d'accéder à une page de connexion
  if (authStore.isAuthenticated && isPublicPage) {
    return navigateTo('/')
  }
})