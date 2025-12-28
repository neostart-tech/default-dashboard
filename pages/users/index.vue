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
          <li class="font-medium text-gray-900 dark:text-white">
            Vue globale des utilisateurs
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Tableau de bord Utilisateurs
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Suivez les activités, emails et connexions des utilisateurs en temps réel.
        </p>
      </div>
    </section>
    

    <!-- Stats détaillées -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span class="text-2xl text-blue-600 dark:text-blue-400">👥</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total utilisateurs</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalUsers }}</p>
            <p class="text-xs text-gray-400 mt-1">
              {{ stats.newToday }} nouveaux aujourd'hui
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <span class="text-2xl text-green-600 dark:text-green-400">✅</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Actuellement en ligne</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.onlineNow }}</p>
            <p class="text-xs text-gray-400 mt-1">
              {{ stats.lastHour }} dans l'heure
            </p>
          </div>
        </div>
      </div>
      

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            <span class="text-2xl text-purple-600 dark:text-purple-400">📧</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Emails envoyés</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.emailsSent }}</p>
            <p class="text-xs text-gray-400 mt-1">
              {{ stats.emailsToday }} aujourd'hui
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
            <span class="text-2xl text-orange-600 dark:text-orange-400">🕒</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Temps moyen</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.avgSessionTime }}</p>
            <p class="text-xs text-gray-400 mt-1">
              par session
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Grille principale avec tableaux -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Colonne 1: Activités récentes -->
      <div class="lg:col-span-2">
        <!-- Tableau des utilisateurs avec emails et horaires -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Activités des utilisateurs
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Emails et heures de connexion
                </p>
              </div>
              <div class="flex items-center gap-3">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  >
                  <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dernière connexion
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Heure
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Dernier email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr 
                  v-for="user in filteredUsers" 
                  :key="user.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                  @click="viewUserDetails(user)"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {{ user.initials }}
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ user.name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          {{ user.role }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">{{ user.email }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      Créé le {{ formatDate(user.createdAt) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 dark:text-white">
                      {{ user.lastLogin.date }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      {{ user.lastLogin.time }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full mr-2" :class="{
                        'bg-green-500': user.status === 'online',
                        'bg-yellow-500': user.status === 'idle',
                        'bg-gray-400': user.status === 'offline'
                      }"></div>
                      <div class="text-sm text-gray-900 dark:text-white">
                        {{ user.lastLogin.duration }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div v-if="user.lastEmail" class="text-sm text-gray-900 dark:text-white">
                      {{ user.lastEmail.subject }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      {{ user.lastEmail ? formatTime(user.lastEmail.time) : 'Aucun email' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-3 py-1 text-xs font-medium rounded-full',
                      user.status === 'online' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : user.status === 'idle'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                    ]">
                      {{ user.status === 'online' ? 'En ligne' : user.status === 'idle' ? 'Inactif' : 'Hors ligne' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Affichage de <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> à 
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span> sur 
                <span class="font-medium">{{ filteredUsers.length }}</span> utilisateurs
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  Page {{ currentPage }} sur {{ totalPages }}
                </span>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline des activités -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Timeline des activités
          </h3>
          <div class="space-y-6">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="flex items-start"
            >
              <div class="flex-shrink-0 mr-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="{
                  'bg-blue-100 dark:bg-blue-900': activity.type === 'login',
                  'bg-green-100 dark:bg-green-900': activity.type === 'email',
                  'bg-purple-100 dark:bg-purple-900': activity.type === 'action'
                }">
                  <span class="text-lg">
                    {{ activity.type === 'login' ? '🔐' : activity.type === 'email' ? '📧' : '⚡' }}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ activity.userName }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {{ activity.description }}
                    </p>
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ activity.time }}
                  </div>
                </div>
                <div v-if="activity.details" class="mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                  {{ activity.details }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne 2: Stats et filtres -->
      <div class="space-y-6">
        <!-- Filtres rapides -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Filtres rapides
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Statut
              </label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="status in ['all', 'online', 'idle', 'offline']"
                  :key="status"
                  @click="setStatusFilter(status)"
                  :class="[
                    'px-3 py-1.5 rounded-lg text-sm transition-colors',
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ status === 'all' ? 'Tous' : status === 'online' ? 'En ligne' : status === 'idle' ? 'Inactif' : 'Hors ligne' }}
                </button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Période
              </label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="period in ['today', 'week', 'month', 'all']"
                  :key="period"
                  @click="setPeriodFilter(period)"
                  :class="[
                    'px-3 py-1.5 rounded-lg text-sm transition-colors',
                    periodFilter === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ period === 'today' ? 'Aujourd\'hui' : period === 'week' ? '7 jours' : period === 'month' ? '30 jours' : 'Tout' }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tri par
              </label>
              <select
                v-model="sortBy"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lastLogin">Dernière connexion</option>
                <option value="name">Nom</option>
                <option value="email">Email</option>
                <option value="createdAt">Date d'inscription</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Statistiques horaires -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Activité horaire
          </h3>
          <div class="space-y-4">
            <div v-for="hour in hourlyActivity" :key="hour.hour" class="flex items-center">
              <div class="w-12 text-sm text-gray-500 dark:text-gray-400">
                {{ hour.hour }}h
              </div>
              <div class="flex-1 ml-4">
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-blue-500 rounded-full" 
                    :style="{ width: `${hour.percentage}%` }"
                  ></div>
                </div>
              </div>
              <div class="w-12 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ hour.count }}
              </div>
            </div>
          </div>
        </div>

        <!-- Emails récents -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Emails récents
          </h3>
          <div class="space-y-4">
            <div 
              v-for="email in recentEmails" 
              :key="email.id"
              class="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div class="flex justify-between items-start mb-1">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ email.user }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ email.time }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                {{ email.subject }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

/* Types */
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'online' | 'idle' | 'offline'
  initials: string
  createdAt: string
  lastLogin: {
    date: string
    time: string
    duration: string
  }
  lastEmail?: {
    subject: string
    time: string
  }
}

interface Activity {
  id: number
  type: 'login' | 'email' | 'action'
  userName: string
  description: string
  time: string
  details?: string
}

interface HourlyActivity {
  hour: string
  count: number
  percentage: number
}

interface RecentEmail {
  id: number
  user: string
  subject: string
  time: string
}

/* Données */
const searchQuery = ref('')
const statusFilter = ref('all')
const periodFilter = ref('today')
const sortBy = ref('lastLogin')
const currentPage = ref(1)
const itemsPerPage = 10

/* Stats */
const stats = reactive({
  totalUsers: 1248,
  newToday: 24,
  onlineNow: 156,
  lastHour: 48,
  emailsSent: 3842,
  emailsToday: 128,
  avgSessionTime: '32 min'
})

/* Utilisateurs avec données détaillées */
const users = ref<User[]>([
  {
    id: 1,
    name: 'Neo Start Tech',
    email: 'admin@neostart.com',
    role: 'Administrateur',
    status: 'online',
    initials: 'NS',
    createdAt: '2024-01-15T08:30:00',
    lastLogin: {
      date: 'Aujourd\'hui',
      time: '14:28',
      duration: '2h 15m'
    },
    lastEmail: {
      subject: 'Rapport mensuel',
      time: '2024-01-15T13:45:00'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Manager',
    status: 'online',
    initials: 'JS',
    createdAt: '2024-01-14T10:15:00',
    lastLogin: {
      date: 'Aujourd\'hui',
      time: '09:45',
      duration: '5h 30m'
    },
    lastEmail: {
      subject: 'Réunion équipe',
      time: '2024-01-15T11:20:00'
    }
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.j@techcorp.com',
    role: 'Développeur',
    status: 'idle',
    initials: 'BJ',
    createdAt: '2024-01-10T14:20:00',
    lastLogin: {
      date: 'Hier',
      time: '16:10',
      duration: '45m'
    },
    lastEmail: {
      subject: 'Bug fix urgent',
      time: '2024-01-14T17:30:00'
    }
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.b@designstudio.com',
    role: 'Designer',
    status: 'online',
    initials: 'AB',
    createdAt: '2024-01-08T09:00:00',
    lastLogin: {
      date: 'Aujourd\'hui',
      time: '08:15',
      duration: '6h 45m'
    },
    lastEmail: {
      subject: 'Maquettes v2',
      time: '2024-01-15T10:10:00'
    }
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'c.wilson@support.com',
    role: 'Support',
    status: 'offline',
    initials: 'CW',
    createdAt: '2024-01-05T13:45:00',
    lastLogin: {
      date: '14/01',
      time: '17:30',
      duration: '3h 20m'
    },
    lastEmail: {
      subject: 'Ticket #4521 résolu',
      time: '2024-01-14T18:15:00'
    }
  },
  {
    id: 6,
    name: 'Diana Miller',
    email: 'diana.m@marketing.com',
    role: 'Marketing',
    status: 'online',
    initials: 'DM',
    createdAt: '2024-01-03T11:30:00',
    lastLogin: {
      date: 'Aujourd\'hui',
      time: '12:45',
      duration: '1h 30m'
    },
    lastEmail: {
      subject: 'Campagne Q1',
      time: '2024-01-15T09:45:00'
    }
  },
  {
    id: 7,
    name: 'Edward Davis',
    email: 'ed.davis@sales.com',
    role: 'Commercial',
    status: 'idle',
    initials: 'ED',
    createdAt: '2023-12-28T16:20:00',
    lastLogin: {
      date: '13/01',
      time: '14:15',
      duration: '2h 10m'
    },
    lastEmail: {
      subject: 'Deal #789',
      time: '2024-01-13T15:30:00'
    }
  },
  {
    id: 8,
    name: 'Fiona Garcia',
    email: 'f.garcia@admin.com',
    role: 'Administrateur',
    status: 'online',
    initials: 'FG',
    createdAt: '2023-12-25T12:00:00',
    lastLogin: {
      date: 'Aujourd\'hui',
      time: '07:30',
      duration: '8h 00m'
    },
    lastEmail: {
      subject: 'Audit sécurité',
      time: '2024-01-15T08:45:00'
    }
  },
  {
    id: 9,
    name: 'George Taylor',
    email: 'g.taylor@dev.com',
    role: 'Développeur',
    status: 'online',
    initials: 'GT',
    createdAt: '2024-01-12T15:45:00',
    lastLogin: {
      date: 'Aujourd\'hui',
      time: '10:20',
      duration: '4h 40m'
    },
    lastEmail: {
      subject: 'Code review',
      time: '2024-01-15T11:30:00'
    }
  },
  {
    id: 10,
    name: 'Helen White',
    email: 'h.white@hr.com',
    role: 'RH',
    status: 'offline',
    initials: 'HW',
    createdAt: '2024-01-07T09:15:00',
    lastLogin: {
      date: '12/01',
      time: '16:45',
      duration: '1h 15m'
    },
    lastEmail: {
      subject: 'Entretiens',
      time: '2024-01-12T17:20:00'
    }
  }
])

/* Activités récentes */
const recentActivities = ref<Activity[]>([
  {
    id: 1,
    type: 'login',
    userName: 'Fiona Garcia',
    description: 'S\'est connecté(e)',
    time: 'Il y a 15 min',
    details: 'IP: 192.168.1.100 - Navigateur: Chrome'
  },
  {
    id: 2,
    type: 'email',
    userName: 'Alice Brown',
    description: 'A envoyé un email',
    time: 'Il y a 25 min',
    details: 'À: team@design.com - Sujet: Maquettes v2'
  },
  {
    id: 3,
    type: 'action',
    userName: 'Neo Start Tech',
    description: 'A modifié les permissions',
    time: 'Il y a 45 min',
    details: 'Utilisateur: Bob Johnson - Nouvelles permissions: admin'
  },
  {
    id: 4,
    type: 'login',
    userName: 'George Taylor',
    description: 'S\'est connecté(e)',
    time: 'Il y a 1h',
    details: 'IP: 192.168.1.105 - Navigateur: Firefox'
  },
  {
    id: 5,
    type: 'email',
    userName: 'Diana Miller',
    description: 'A reçu un email',
    time: 'Il y a 2h',
    details: 'De: marketing@partners.com - Sujet: Collaboration'
  }
])

/* Activité horaire */
const hourlyActivity = ref<HourlyActivity[]>([
  { hour: '08', count: 45, percentage: 60 },
  { hour: '09', count: 78, percentage: 85 },
  { hour: '10', count: 92, percentage: 100 },
  { hour: '11', count: 85, percentage: 92 },
  { hour: '12', count: 65, percentage: 70 },
  { hour: '13', count: 55, percentage: 60 },
  { hour: '14', count: 70, percentage: 76 },
  { hour: '15', count: 82, percentage: 89 }
])

/* Emails récents */
const recentEmails = ref<RecentEmail[]>([
  { id: 1, user: 'admin@neostart.com', subject: 'Rapport de sécurité hebdomadaire', time: '14:30' },
  { id: 2, user: 'jane.smith@company.com', subject: 'Budget Q1 approuvé', time: '13:45' },
  { id: 3, user: 'support@neostart.com', subject: 'Ticket #7891 résolu', time: '12:20' },
  { id: 4, user: 'alice.b@designstudio.com', subject: 'Feedback design v3', time: '11:10' },
  { id: 5, user: 'notifications@system.com', subject: 'Backup complet réussi', time: '10:05' }
])

/* Computed */
const filteredUsers = computed(() => {
  let filtered = [...users.value]

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  }

  // Filtre par statut
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(user => user.status === statusFilter.value)
  }

  // Filtre par période (simulé)
  if (periodFilter.value === 'today') {
    filtered = filtered.filter(user => user.lastLogin.date === 'Aujourd\'hui')
  } else if (periodFilter.value === 'week') {
    // Logique simplifiée
    filtered = filtered.filter(user => 
      user.lastLogin.date === 'Aujourd\'hui' || 
      user.lastLogin.date === 'Hier' ||
      user.lastLogin.date.includes('/01')
    )
  }

  // Tri
  filtered.sort((a, b) => {
    if (sortBy.value === 'lastLogin') {
      return new Date(b.lastLogin.time).getTime() - new Date(a.lastLogin.time).getTime()
    } else if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy.value === 'email') {
      return a.email.localeCompare(b.email)
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage)
})

/* Fonctions utilitaires */
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatTime = (timeString: string) => {
  const date = new Date(timeString)
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const setStatusFilter = (status: string) => {
  statusFilter.value = status
  currentPage.value = 1
}

const setPeriodFilter = (period: string) => {
  periodFilter.value = period
  currentPage.value = 1
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const viewUserDetails = (user: User) => {
  console.log('Voir détails utilisateur:', user)
  // Navigation vers la page de détails
  // router.push(`/users/${user.id}`)
}

const exportActivities = () => {
  const data = {
    exportedAt: new Date().toISOString(),
    totalUsers: users.value.length,
    onlineUsers: users.value.filter(u => u.status === 'online').length,
    users: users.value.map(user => ({
      name: user.name,
      email: user.email,
      lastLogin: user.lastLogin,
      status: user.status
    }))
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `users-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  alert('Export des données terminé !')
}

/* Cycle de vie */
onMounted(() => {
  // Simuler le chargement des données en temps réel
  setInterval(() => {
    // Mettre à jour quelques stats
    stats.onlineNow = Math.floor(Math.random() * 50) + 140
    stats.emailsToday = Math.floor(Math.random() * 20) + 120
    
    // Mettre à jour quelques utilisateurs
    users.value.forEach(user => {
      if (Math.random() > 0.7) {
        user.status = Math.random() > 0.5 ? 'online' : 'idle'
      }
    })
  }, 30000) // Toutes les 30 secondes
})
</script>

<style scoped>
/* Styles spécifiques */
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* Animation pour les nouveaux éléments */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Styles pour les lignes du tableau */
tr {
  transition: background-color 0.2s ease;
}

/* Styles pour les badges de statut */
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
}

.badge::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.375rem;
}

.badge-online::before {
  background-color: #10b981;
}

.badge-idle::before {
  background-color: #f59e0b;
}

.badge-offline::before {
  background-color: #9ca3af;
}
</style>