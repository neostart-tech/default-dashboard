<template>
  <DashboardLayout>
    <!-- Header / Breadcrumb -->
    <section class="mb-8">
      <nav aria-label="Breadcrumb" class="mb-2">
        <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <router-link to="/" class="hover:text-gray-700 dark:hover:text-gray-300">
              Tableau de bord
            </router-link>
          </li>
          <li>/</li>
          <li>
            <router-link to="/users" class="hover:text-gray-700 dark:hover:text-gray-300">
              Utilisateurs
            </router-link>
          </li>
          <li>/</li>
          <li class="font-medium text-gray-900 dark:text-white">
            Ajouter un utilisateur
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Ajouter un nouvel utilisateur
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Créez un nouveau compte utilisateur avec les informations et permissions appropriées.
        </p>
      </div>
    </section>

    <!-- Formulaire -->
    <div class="max-w-4xl">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <!-- Onglets -->
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-6 py-3 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Contenu des onglets -->
        <div class="p-6">
          <!-- Informations de base -->
          <div v-if="activeTab === 'info'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prénom *
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom *
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse email *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john.doe@example.com"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+33 1 23 45 67 89"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date de naissance
                </label>
                <input
                  v-model="form.birthDate"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>
          </div>

          <!-- Compte & sécurité -->
          <div v-if="activeTab === 'account'" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom d'utilisateur *
              </label>
              <input
                v-model="form.username"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="johndoe"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mot de passe *
                </label>
                <div class="relative">
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="Minimum 8 caractères"
                  >
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {{ showPassword ? '🙈' : '👁️' }}
                  </button>
                </div>
                <div class="mt-2">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="h-full bg-green-500" :style="{ width: passwordStrength + '%' }"></div>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {{ passwordStrengthLabel }}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmer le mot de passe *
                </label>
                <input
                  v-model="form.confirmPassword"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Retapez le mot de passe"
                >
              </div>
            </div>
          </div>

          <!-- Rôles & permissions -->
          <div v-if="activeTab === 'roles'" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rôle principal *
              </label>
              <select
                v-model="form.role"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionnez un rôle</option>
                <option value="admin">Administrateur</option>
                <option value="moderator">Modérateur</option>
                <option value="editor">Éditeur</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permissions supplémentaires
              </label>
              <div class="space-y-3">
                <label
                  v-for="permission in permissions"
                  :key="permission.id"
                  class="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <input
                    v-model="form.permissions"
                    :value="permission.id"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                  >
                  <div class="flex-1">
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ permission.name }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ permission.description }}
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3">
            <button
              @click="prevTab"
              v-if="activeTab !== 'info'"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              ← Précédent
            </button>
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="resetForm"
              type="button"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              @click="nextTab"
              v-if="activeTab !== 'roles'"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Suivant →
            </button>
            <button
              v-else
              @click="submitForm"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Création...</span>
              <span v-else>Créer l'utilisateur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'
import DataTable from '~/components/ui/DataTable.vue'

const router = useRouter()

// Tabs
const tabs = [
  { id: 'info', label: 'Informations' },
  { id: 'account', label: 'Compte & Sécurité' },
  { id: 'roles', label: 'Rôles & Permissions' }
]
const activeTab = ref('info')

// Form
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  permissions: [] as string[]
})

const showPassword = ref(false)
const loading = ref(false)

// Permissions
const permissions = [
  { id: 'read', name: 'Lecture', description: 'Accès en lecture aux données' },
  { id: 'write', name: 'Écriture', description: 'Modification des données' },
  { id: 'delete', name: 'Suppression', description: 'Suppression des données' },
  { id: 'manage_users', name: 'Gérer les utilisateurs', description: 'Création et modification des comptes' },
  { id: 'manage_roles', name: 'Gérer les rôles', description: 'Configuration des rôles et permissions' }
]

// Password strength
const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[a-z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  
  return strength
})

const passwordStrengthLabel = computed(() => {
  if (passwordStrength.value >= 75) return 'Fort'
  if (passwordStrength.value >= 50) return 'Moyen'
  if (passwordStrength.value >= 25) return 'Faible'
  return 'Très faible'
})

// Navigation entre onglets
const nextTab = () => {
  const currentIndex = tabs.findIndex(tab => tab.id === activeTab.value)
  if (currentIndex < tabs.length - 1) {
    activeTab.value = tabs[currentIndex + 1].id
  }
}

const prevTab = () => {
  const currentIndex = tabs.findIndex(tab => tab.id === activeTab.value)
  if (currentIndex > 0) {
    activeTab.value = tabs[currentIndex - 1].id
  }
}

// Actions
const submitForm = async () => {
  loading.value = true
  
  // Validation
  if (!form.value.password || form.value.password !== form.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas')
    loading.value = false
    return
  }
  
  try {
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Utilisateur créé:', form.value)
    router.push('/users')
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
    permissions: []
  }
  activeTab.value = 'info'
}
</script>