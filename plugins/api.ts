export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  return {
    provide: {
      api: async (endpoint: string, options: any = {}) => {
        const baseURL = config.public.apiBaseUrl
        
        try {
          const response = await $fetch(`${baseURL}${endpoint}`, {
            ...options,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...options.headers,
            },
            credentials: 'include',
          })
          
          return response
        } catch (error: any) {
          console.error(`API Error (${endpoint}):`, error)
          throw error
        }
      }
    }
  }
})