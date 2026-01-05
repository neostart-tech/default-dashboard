<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="register-container">
      <!-- Formulaire d'inscription -->
      <div class="form-section">
        <div class="form">
          <!-- Logo et nom du dashboard -->
          <div class="text-center mb-8">
            <div class="logo-container">
              <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              Créer un compte
            </h1>
            <p class="text-sm text-gray-500">Rejoignez notre plateforme</p>
          </div>

          <!-- Formulaire d'inscription -->
          <div class="space-y-6">
            <!-- Nom complet -->
            <div class="form-group">
              <label class="form-label">Nom complet *</label>
              <div class="input-group">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                  v-model="form.name" 
                  type="text" 
                  placeholder="Votre nom complet" 
                  class="form-input"
                  required
                />
              </div>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label class="form-label">Adresse email *</label>
              <div class="input-group">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder="exemple@email.com" 
                  class="form-input"
                  required
                />
              </div>
            </div>

            <!-- Mot de passe -->
            <div class="form-group">
              <label class="form-label">Mot de passe *</label>
              <div class="input-group">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                  v-model="form.password" 
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="•••••••• (minimum 8 caractères)" 
                  class="form-input"
                  required
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirmation du mot de passe -->
            <div class="form-group">
              <label class="form-label">Confirmer le mot de passe *</label>
              <div class="input-group">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input 
                  v-model="form.password_confirmation" 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  placeholder="••••••••" 
                  class="form-input"
                  required
                />
                <button 
                  type="button" 
                  class="toggle-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Bouton d'inscription -->
            <button 
              class="submit-btn" 
              @click.prevent="handleRegister" 
              :disabled="loading"
            >
              <svg v-if="loading" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span v-else>
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
              </span>
              {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
            </button>

            <!-- Lien vers la connexion -->
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Vous avez déjà un compte ?
                <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 font-medium">
                  Connectez-vous
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notification -->
    <transition name="fade">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path v-if="toast.type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="toast-content">
          <p class="toast-title">{{ toast.title }}</p>
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        <button @click="toast.show = false" class="toast-close">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'empty',
  middleware: 'guest'
})

const router = useRouter()
const authStore = useAuthStore()

// État du formulaire
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

// États UI
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const toast = reactive({
  show: false,
  type: 'error',
  title: '',
  message: ''
})

// Méthodes
const showToast = (type, title, message) => {
  toast.type = type
  toast.title = title
  toast.message = message
  toast.show = true
  
  setTimeout(() => {
    toast.show = false
  }, 4000)
}

const validateForm = () => {
  if (!form.name.trim()) {
    showToast('error', 'Nom requis', 'Veuillez entrer votre nom complet')
    return false
  }
  
  if (!form.email.trim()) {
    showToast('error', 'Email requis', 'Veuillez entrer votre adresse email')
    return false
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    showToast('error', 'Email invalide', 'Veuillez entrer une adresse email valide')
    return false
  }
  
  if (!form.password) {
    showToast('error', 'Mot de passe requis', 'Veuillez entrer votre mot de passe')
    return false
  }
  
  if (form.password.length < 8) {
    showToast('error', 'Mot de passe trop court', 'Le mot de passe doit contenir au moins 8 caractères')
    return false
  }
  
  if (form.password !== form.password_confirmation) {
    showToast('error', 'Mots de passe différents', 'Les mots de passe ne correspondent pas')
    return false
  }
  
  return true
}

const handleRegister = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const result = await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    })
    
    if (result.success) {
      showToast('success', 'Inscription réussie', 'Votre compte a été créé avec succès')
      
      // Redirection après un délai
      setTimeout(() => {
        navigateTo('/')
      }, 2000)
      
    } else {
      if (result.errors) {
        const firstError = Object.values(result.errors)[0][0]
        showToast('error', 'Erreur d\'inscription', firstError)
      } else {
        showToast('error', 'Erreur d\'inscription', result.message || 'Une erreur est survenue')
      }
    }
    
  } catch (error) {
    console.error('Registration error:', error)
    showToast('error', 'Erreur', 'Une erreur est survenue lors de l\'inscription')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Vérifier si l'utilisateur est déjà connecté
  if (authStore.isAuthenticated) {
    navigateTo('/')
  }
})
</script>

<style scoped>
/* Conteneur d'inscription */
.register-container {
  display: flex;
  width: 100%;
  max-width: 500px;
  min-height: 600px;
  background-color: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

</style>