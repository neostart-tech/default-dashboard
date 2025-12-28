// stores/theme.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  contrast: 'default' | 'high'
  sidebarCaption: boolean
  layout: 'ltr' | 'rtl'
  width: 'full' | 'container'
  reducedMotion: boolean
}

export const useThemeStore = defineStore('theme', () => {
  // État initial
  const isSettingsOpen = ref(false)
  
  const themeSettings = ref<ThemeSettings>({
    mode: 'auto',
    primaryColor: '#3b82f6',
    contrast: 'default',
    sidebarCaption: true,
    layout: 'ltr',
    width: 'full',
    reducedMotion: false
  })

  // Vérifier le mode système
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Appliquer le thème au DOM
  const applyTheme = () => {
    const settings = themeSettings.value
    
    // Déterminer le mode actuel
    let currentMode = settings.mode
    if (settings.mode === 'auto') {
      currentMode = getSystemTheme()
    }

    // Appliquer la classe de mode
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(currentMode)

    // Appliquer la couleur primaire
    root.style.setProperty('--primary-color', settings.primaryColor)

    // Appliquer le contraste
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Appliquer la direction
    root.setAttribute('dir', settings.layout)

    // Appliquer les réductions de mouvement
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Sauvegarder dans localStorage
    localStorage.setItem('themeSettings', JSON.stringify(settings))
  }

  // Initialiser le thème
  const initTheme = () => {
    const saved = localStorage.getItem('themeSettings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        themeSettings.value = { ...themeSettings.value, ...parsed }
      } catch (error) {
        console.error('Erreur lors du chargement du thème:', error)
      }
    }
    applyTheme()

    // Écouter les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (themeSettings.value.mode === 'auto') {
        applyTheme()
      }
    })
  }

  // Mettre à jour les paramètres
  const updateThemeSettings = (updates: Partial<ThemeSettings>) => {
    themeSettings.value = { ...themeSettings.value, ...updates }
    applyTheme()
  }

  // Réinitialiser le layout
  const resetLayout = () => {
    themeSettings.value = {
      mode: 'auto',
      primaryColor: '#3b82f6',
      contrast: 'default',
      sidebarCaption: true,
      layout: 'ltr',
      width: 'full',
      reducedMotion: false
    }
    applyTheme()
  }

  // Toggle le panneau de paramètres
  const toggleSettings = () => {
    isSettingsOpen.value = !isSettingsOpen.value
  }

  // Écouter les changements pour appliquer automatiquement
  watch(themeSettings, applyTheme, { deep: true })

  return {
    isSettingsOpen,
    themeSettings,
    updateThemeSettings,
    resetLayout,
    toggleSettings,
    initTheme,
    applyTheme
  }
})