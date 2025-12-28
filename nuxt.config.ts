
export default {
  
  
  modules: [
    
  '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  axios: {
    // URL de base de votre API Laravel
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    credentials: true, 
    headers: {
      common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_BASE_URL || 'http://localhost:8000',
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' }
        },
        user: {
          property: false
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      home: '/dashboard'
    },
    localStorage: false, 
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 
      }
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
      appName: process.env.APP_NAME || 'Mon Application'
    }
  }
}