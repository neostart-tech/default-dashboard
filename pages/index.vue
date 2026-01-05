<template>
  <DashboardLayout>
    <!-- Header / Breadcrumb -->
    <section class="mb-8">
      <nav aria-label="Breadcrumb" class="mb-2">
        <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li class="font-medium text-gray-900 dark:text-white">
            Tableau de bord
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Bienvenue, {{ authStore.userName }}. Voici votre tableau de bord
        </p>
      </div>
    </section>

    <!-- Indicateur de chargement -->
    <div v-if="dashboardStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="dashboardStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <p class="text-red-600">{{ dashboardStore.error }}</p>
      <button 
        @click="loadDashboardData" 
        class="mt-2 text-blue-500 hover:text-blue-700"
      >
        Réessayer
      </button>
    </div>

    <!-- Contenu principal -->
    <div v-else>
      <!-- Statistiques -->
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="stat in Object.values(dashboardStore.formattedStats || {})" 
          :key="stat.label"
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span class="text-2xl">{{ stat.icon }}</span>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {{ stat.value }}
              </p>
              <p class="text-xs text-green-500 mt-1" v-if="stat.trend">
                {{ stat.trend }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contenu principal -->
      <section class="space-y-8">
        <!-- Tableau des utilisateurs récents -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Utilisateurs récents
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Derniers comptes utilisateurs enregistrés
                </p>
              </div>
              <NuxtLink 
                to="/users" 
                class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Voir tout
              </NuxtLink>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Nom
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Rôle
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Statut
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="user in dashboardStore.recentUsers" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {{ user.name.charAt(0) }}
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ user.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 py-1 text-xs font-medium rounded-full',
                      user.role === 'admin' 
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                        : user.role === 'moderator'
                        ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    ]">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 py-1 text-xs font-medium rounded-full',
                      user.status === 'Actif'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    ]">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ formatDate(user.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activités récentes -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Activités récentes
            </h3>
            <button 
              @click="refreshActivities"
              class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              Rafraîchir
            </button>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="activity in dashboardStore.recentActivities" 
              :key="activity.id"
              class="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div class="flex-shrink-0 mr-4">
                <div :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  getActivityColor(activity.action)
                ]">
                  <span class="text-lg">{{ getActivityIcon(activity.action) }}</span>
                </div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ activity.user?.name || 'Système' }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ activity.description }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {{ formatDate(activity.created_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  await dashboardStore.fetchDashboardStats()
}

const refreshActivities = async () => {
  await dashboardStore.fetchActivities()
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getActivityIcon = (action: string) => {
  const icons: Record<string, string> = {
    'user_create': '👤',
    'user_update': '✏️',
    'login': '🔑',
    'content_create': '📝',
    'settings_update': '⚙️'
  }
  return icons[action] || '📊'
}

const getActivityColor = (action: string) => {
  const colors: Record<string, string> = {
    'user_create': 'bg-blue-100 dark:bg-blue-900',
    'user_update': 'bg-green-100 dark:bg-green-900',
    'login': 'bg-purple-100 dark:bg-purple-900',
    'content_create': 'bg-yellow-100 dark:bg-yellow-900',
    'settings_update': 'bg-orange-100 dark:bg-orange-900'
  }
  return colors[action] || 'bg-gray-100 dark:bg-gray-900'
}
</script>

<style scoped>
/* Styles optionnels pour améliorer l'apparence */
.hover-lift {
  transition: transform 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
}

.table-row-hover:hover {
  background-color: rgba(59, 130, 246, 0.05);
}
</style>