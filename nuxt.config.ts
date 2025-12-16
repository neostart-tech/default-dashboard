export default defineNuxtConfig({
  // Désactivez complètement la vérification TypeScript
  typescript: {
    strict: false,
    typeCheck: false,
    shim: false,
    tsConfig: {
      compilerOptions: {
        types: []
      }
    }
  },
  
  // Désactivez vite-plugin-checker
  vite: {
    plugins: []
  },
  
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@bhplugin/vue3-datatable/dist/style.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  ssr: true
})