<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
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
          Dashboard Login
        </h1>
        <p class="text-sm text-gray-500">Accédez à votre espace d'administration</p>
      </div>

      <!-- Formulaire -->
      <div class="space-y-6">
        <!-- Email -->
        <div class="form-group">
          <label class="form-label">Adresse email</label>
          <div class="input-group">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="admin@exemple.com" 
              class="form-input"
              @keyup.enter="handleLogin"
              required
            />
          </div>
        </div>

        <!-- Mot de passe -->
        <div class="form-group">
          <div class="flex justify-between items-center mb-2">
            <label class="form-label">Mot de passe</label>
            <a href="#" class="forgot-link" @click.prevent="forgotPassword">
              Mot de passe oublié ?
            </a>
          </div>
          <div class="input-group">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="••••••••" 
              class="form-input"
              @keyup.enter="handleLogin"
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

        <!-- Se souvenir de moi -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              v-model="form.remember" 
              type="checkbox" 
              id="remember" 
              class="checkbox"
            />
            <label for="remember" class="checkbox-label">
              Se souvenir de moi
            </label>
          </div>
          <div class="text-sm text-gray-500">
            Version 1.0.0
          </div>
        </div>

        <!-- Bouton de connexion -->
        <button 
          class="submit-btn" 
          @click.prevent="handleLogin" 
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span v-else>
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
          </span>
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          
        </div>

        <!-- Boutons de connexion sociale -->
        
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>© {{ currentYear }} Dashboard Admin. Tous droits réservés.</p>
        <p class="mt-1">Pour toute assistance, contactez <a href="mailto:support@dashboard.com" class="footer-link">support@dashboard.com</a></p>
      </div>
    </div>

    <!-- Notification Toast -->
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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: false
})

const router = useRouter()

// État du formulaire
const form = reactive({
  email: '',
  password: '',
  remember: false
})

// États UI
const loading = ref(false)
const showPassword = ref(false)
const toast = reactive({
  show: false,
  type: 'error',
  title: '',
  message: ''
})

// Année courante pour le footer
const currentYear = computed(() => new Date().getFullYear())

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
  
  return true
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Identifiants de démo
    const demoCredentials = [
      { email: 'admin@dashboard.com', password: 'admin123', role: 'admin' },
      { email: 'user@dashboard.com', password: 'user123', role: 'user' },
      { email: 'viewer@dashboard.com', password: 'viewer123', role: 'viewer' }
    ]
    
    const user = demoCredentials.find(
      cred => cred.email === form.email && cred.password === form.password
    )
    
    if (user) {
      // Stocker les infos d'authentification
      if (process.client) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', user.email)
        localStorage.setItem('userRole', user.role)
        if (form.remember) {
          localStorage.setItem('rememberToken', 'demo-token-' + Date.now())
        }
      }
      
      showToast('success', 'Connexion réussie', 'Redirection vers le dashboard...')
      
      // Redirection après un délai
      setTimeout(() => {
        router.push('/')
      }, 1000)
      
    } else {
      showToast('error', 'Échec de connexion', 'Email ou mot de passe incorrect')
    }
    
  } catch (error) {
    showToast('error', 'Erreur', 'Une erreur est survenue lors de la connexion')
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  showToast('info', 'Réinitialisation', 'Veuillez contacter l\'administrateur pour réinitialiser votre mot de passe')
}

const loginWithGoogle = () => {
  showToast('info', 'Connexion Google', 'Cette fonctionnalité sera bientôt disponible')
}

const loginWithGitHub = () => {
  showToast('info', 'Connexion GitHub', 'Cette fonctionnalité sera bientôt disponible')
}
</script>

<style scoped>
/* Base styles */
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Logo */
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  color: #4f46e5; /* Indigo */
}

/* Form groups */
.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

/* Input groups */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: #f9fafb;
  transition: all 0.2s;
}

.input-group:focus-within {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  background-color: #ffffff;
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  margin-left: 12px;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  padding: 12px;
  padding-left: 12px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #111827;
}

.form-input:focus {
  outline: none;
}

.form-input::placeholder {
  color: #9ca3af;
}

/* Toggle password button */
.toggle-password {
  padding: 12px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #4f46e5;
}

/* Forgot password link */
.forgot-link {
  font-size: 13px;
  color: #4f46e5;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #3730a3;
  text-decoration: underline;
}

/* Checkbox */
.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid #d1d5db;
  background-color: white;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s;
}

.checkbox:checked {
  background-color: #4f46e5;
  border-color: #4f46e5;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

.checkbox:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.checkbox-label {
  margin-left: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  user-select: none;
}

/* Submit button */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 24px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #4338ca;
  transform: translateY(-1px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Social buttons */
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: #9ca3af;
  background-color: #f9fafb;
}

.google-btn {
  color: #3c4043;
}

.github-btn {
  color: #24292e;
}

/* Footer links */
.footer-link {
  color: #4f46e5;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #3730a3;
  text-decoration: underline;
}

/* Toast notification */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  z-index: 50;
  animation: slideIn 0.3s ease;
}

.toast.success {
  border-left: 4px solid #10b981;
}

.toast.error {
  border-left: 4px solid #ef4444;
}

.toast.info {
  border-left: 4px solid #3b82f6;
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast.success .toast-icon {
  color: #10b981;
}

.toast.error .toast-icon {
  color: #ef4444;
}

.toast.info .toast-icon {
  color: #3b82f6;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2px;
}

.toast-message {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
}

.toast-close {
  padding: 2px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;
}

.toast-close:hover {
  color: #4f46e5;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 480px) {
  .form {
    padding: 32px 24px;
    margin: 16px;
  }
  
  .toast {
    left: 16px;
    right: 16px;
    max-width: none;
  }
}
</style>