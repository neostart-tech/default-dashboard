export const useDarkMode = () => {
  const isDark = ref(false)
  
  const toggle = () => {
    isDark.value = !isDark.value
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('darkMode', isDark.value.toString())
    }
  }
  
  const init = () => {
    if (process.client) {
      const saved = localStorage.getItem('darkMode')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = saved ? saved === 'true' : prefersDark
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }
  
  return {
    isDark,
    toggle,
    init
  }
}