// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-12-30',

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
      appName: 'Neo-Dash'
    }
  },

  imports: {
    dirs: ['stores']
  },

  alias: {
    '~/components': '/components',
    '~/stores': '/stores'
  },

  typescript: {
    strict: false,
    typeCheck: false
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }
  }
})