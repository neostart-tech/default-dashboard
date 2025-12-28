// stores/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // State
  const darkMode = ref(false)
  const user = ref({
    id: 1,
    name: 'Neo Start Tech',
    email: 'neo@example.com',
    role: 'admin',
    avatar: null as string | null
  })

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userInitials = computed(() => {
    return user.value.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  })

  // Actions
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    if (process.client) {
      localStorage.setItem('darkMode', darkMode.value.toString())
    }
  }

  const loadDarkMode = () => {
    if (process.client) {
      const saved = localStorage.getItem('darkMode')
      if (saved === 'true') {
        darkMode.value = true
        document.documentElement.classList.add('dark')
      }
    }
  }

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        user.value = {
          id: 1,
          name: 'Neo Start Tech',
          email,
          role: 'admin',
          avatar: null
        }
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    user.value = null as any
  }

  return {
    // State
    darkMode,
    user,
    
    // Getters
    isAuthenticated,
    userInitials,
    
    // Actions
    toggleDarkMode,
    loadDarkMode,
    login,
    logout
  }
})

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}