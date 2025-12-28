export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  
  const $api = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    onRequest({ options }) {
      // Ajouter le token d'authentification
      const token = authStore.token || useCookie('auth_token').value
      
      if (token) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        }
      }
    },
    onResponse({ response }) {
      // Traiter les réponses réussies
      return response._data
    },
    onResponseError({ error }) {
      // Gérer les erreurs
      if (error.response?.status === 401) {
        authStore.logout()
        navigateTo('/login')
      }
      
      return Promise.reject(error)
    }
  })
  
  return {
    provide: {
      api: $api
    }
  }
})