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
            Logs système
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Gestion des logs système
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Surveillez et gérez les activités du système, les erreurs et les événements.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total logs</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalLogs }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Erreurs (24h)</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.errorsToday }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
         
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Utilisateurs actifs</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.activeUsers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Requêtes/s</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.requestsPerSecond }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtres avancés -->
    <section class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filtres avancés</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Niveau de log -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Niveau de log
          </label>
          <select 
            v-model="selectedLevel"
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les niveaux</option>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Erreur</option>
            <option value="fatal">Fatal</option>
          </select>
        </div>

        <!-- Date de début -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date de début
          </label>
          <input
            type="datetime-local"
            v-model="startDate"
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Date de fin -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date de fin
          </label>
          <input
            type="datetime-local"
            v-model="endDate"
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Utilisateur -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Utilisateur
          </label>
          <input
            type="text"
            v-model="userFilter"
            placeholder="Filtrer par utilisateur..."
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="resetFilters"
          class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          Réinitialiser
        </button>
        <button
          @click="applyFilters"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Appliquer les filtres
        </button>
        <button
          @click="exportLogs"
          class="px-4 py-2 rounded-lg border border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
        >
          Exporter les logs
        </button>
      </div>
    </section>

    <!-- Tableau des logs -->
    <DataTable
      title="Logs système"
      description="Historique complet des événements et activités du système"
      :columns="columns"
      :data="filteredLogs"
      :filters="tableFilters"
      :loading="loading"
      :searchable="true"
      search-placeholder="Rechercher dans les logs..."
      @view="viewLogDetails"
      @delete="deleteLog"
      @export="exportLogs"
    />

    <!-- Modal de détails du log -->
    <div v-if="selectedLog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl">
        <!-- En-tête -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Détails du log
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span :class="`px-3 py-1 rounded-full text-xs font-medium ${getLevelClass(selectedLog.level)}`">
                {{ getLevelLabel(selectedLog.level) }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDateTime(selectedLog.timestamp) }}
              </span>
            </div>
          </div>
          <button
            @click="selectedLog = null"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <!-- Contenu -->
        <div class="p-6 space-y-4">
          <!-- Informations de base -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Source</p>
              <p class="font-medium text-gray-900 dark:text-white">{{ selectedLog.source }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Utilisateur</p>
              <p class="font-medium text-gray-900 dark:text-white">{{ selectedLog.user || 'Système' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">IP</p>
              <p class="font-medium text-gray-900 dark:text-white">{{ selectedLog.ipAddress || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Session ID</p>
              <p class="font-medium text-gray-900 dark:text-white text-sm">{{ selectedLog.sessionId || 'N/A' }}</p>
            </div>
          </div>

          <!-- Message -->
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Message</p>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p class="text-gray-900 dark:text-white whitespace-pre-wrap">{{ selectedLog.message }}</p>
            </div>
          </div>

          <!-- Données additionnelles -->
          <div v-if="selectedLog.additionalData">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Données additionnelles</p>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre class="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{{ JSON.stringify(selectedLog.additionalData, null, 2) }}</pre>
            </div>
          </div>

          <!-- Stack trace -->
          <div v-if="selectedLog.stackTrace">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Stack trace</p>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-60 overflow-y-auto">
              <pre class="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{{ selectedLog.stackTrace }}</pre>
            </div>
          </div>
        </div>

        <!-- Pied -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            @click="copyLogDetails"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Copier
          </button>
          <button
            @click="selectedLog = null"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'
import DataTable from '~/components/ui/DataTable.vue'

/* Types */
interface LogEntry {
  id: number
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  source: string
  message: string
  timestamp: string
  user: string | null
  ipAddress: string | null
  sessionId: string | null
  additionalData: any
  stackTrace: string | null
}

interface Stats {
  totalLogs: number
  errorsToday: number
  activeUsers: number
  requestsPerSecond: number
}

/* Références */
const loading = ref(false)
const selectedLog = ref<LogEntry | null>(null)
const selectedLevel = ref('')
const startDate = ref('')
const endDate = ref('')
const userFilter = ref('')

/* Stats */
const stats = ref<Stats>({
  totalLogs: 0,
  errorsToday: 0,
  activeUsers: 0,
  requestsPerSecond: 0
})

/* Colonnes du tableau */
const columns = [
  { key: 'level', label: 'Niveau', sortable: true },
  { key: 'timestamp', label: 'Date/Heure', sortable: true },
  { key: 'source', label: 'Source', sortable: true },
  { key: 'message', label: 'Message', sortable: true },
  { key: 'user', label: 'Utilisateur', sortable: true },
  { key: 'ipAddress', label: 'IP', sortable: true }
]

/* Filtres du tableau */
const tableFilters = [
  {
    key: 'level',
    label: 'Niveau',
    options: [
      { value: 'debug', label: 'Debug' },
      { value: 'info', label: 'Info' },
      { value: 'warn', label: 'Warning' },
      { value: 'error', label: 'Erreur' },
      { value: 'fatal', label: 'Fatal' }
    ]
  },
  {
    key: 'source',
    label: 'Source',
    options: [
      { value: 'api', label: 'API' },
      { value: 'frontend', label: 'Frontend' },
      { value: 'database', label: 'Base de données' },
      { value: 'auth', label: 'Authentification' },
      { value: 'system', label: 'Système' }
    ]
  }
]

/* Données mockées */
const logs = ref<LogEntry[]>([
  {
    id: 1,
    level: 'error',
    source: 'api',
    message: 'Échec de l\'authentification pour l\'utilisateur admin',
    timestamp: '2024-01-15T14:30:00Z',
    user: 'admin',
    ipAddress: '192.168.1.100',
    sessionId: 'sess_abc123',
    additionalData: { userId: 1, attempt: 3 },
    stackTrace: 'Error: Invalid credentials\n    at authenticate (auth.js:45)\n    at login (api.js:78)'
  },
  {
    id: 2,
    level: 'info',
    source: 'frontend',
    message: 'Utilisateur connecté avec succès',
    timestamp: '2024-01-15T14:25:00Z',
    user: 'jane.smith',
    ipAddress: '192.168.1.101',
    sessionId: 'sess_def456',
    additionalData: { userId: 2, role: 'user' },
    stackTrace: null
  },
  {
    id: 3,
    level: 'warn',
    source: 'database',
    message: 'Requête lente détectée sur la table users',
    timestamp: '2024-01-15T14:20:00Z',
    user: null,
    ipAddress: null,
    sessionId: null,
    additionalData: { queryTime: 2.5, threshold: 1.0 },
    stackTrace: null
  },
  {
    id: 4,
    level: 'debug',
    source: 'system',
    message: 'Nettoyage du cache effectué',
    timestamp: '2024-01-15T14:15:00Z',
    user: null,
    ipAddress: null,
    sessionId: null,
    additionalData: { cacheSize: '150MB', cleaned: '50MB' },
    stackTrace: null
  },
  {
    id: 5,
    level: 'fatal',
    source: 'api',
    message: 'Échec de connexion à la base de données',
    timestamp: '2024-01-15T14:10:00Z',
    user: null,
    ipAddress: null,
    sessionId: null,
    additionalData: { dbHost: 'localhost', port: 5432 },
    stackTrace: 'Error: Connection refused\n    at connect (db.js:12)\n    at init (server.js:45)'
  },
  {
    id: 6,
    level: 'info',
    source: 'auth',
    message: 'Nouvel utilisateur inscrit',
    timestamp: '2024-01-15T14:05:00Z',
    user: 'new.user',
    ipAddress: '192.168.1.102',
    sessionId: 'sess_ghi789',
    additionalData: { userId: 15, email: 'new@example.com' },
    stackTrace: null
  },
  {
    id: 7,
    level: 'error',
    source: 'frontend',
    message: 'Erreur de validation du formulaire',
    timestamp: '2024-01-15T14:00:00Z',
    user: 'bob.johnson',
    ipAddress: '192.168.1.103',
    sessionId: 'sess_jkl012',
    additionalData: { field: 'email', error: 'Invalid format' },
    stackTrace: null
  },
  {
    id: 8,
    level: 'info',
    source: 'system',
    message: 'Sauvegarde automatique effectuée',
    timestamp: '2024-01-15T13:55:00Z',
    user: null,
    ipAddress: null,
    sessionId: null,
    additionalData: { backupSize: '2.1GB', duration: '45s' },
    stackTrace: null
  }
])

/* Logs filtrés */
const filteredLogs = computed(() => {
  let filtered = [...logs.value]

  // Filtre par niveau
  if (selectedLevel.value) {
    filtered = filtered.filter(log => log.level === selectedLevel.value)
  }

  // Filtre par date
  if (startDate.value) {
    const start = new Date(startDate.value)
    filtered = filtered.filter(log => new Date(log.timestamp) >= start)
  }

  if (endDate.value) {
    const end = new Date(endDate.value)
    filtered = filtered.filter(log => new Date(log.timestamp) <= end)
  }

  // Filtre par utilisateur
  if (userFilter.value) {
    const search = userFilter.value.toLowerCase()
    filtered = filtered.filter(log => 
      log.user?.toLowerCase().includes(search) || false
    )
  }

  return filtered
})

/* Actions */
const viewLogDetails = (log: LogEntry) => {
  selectedLog.value = log
}

const deleteLog = (log: LogEntry) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ce log ?\n${log.message}`)) {
    const index = logs.value.findIndex(l => l.id === log.id)
    if (index !== -1) {
      logs.value.splice(index, 1)
      updateStats()
    }
  }
}

const applyFilters = () => {
  loading.value = true
  // Simuler un chargement
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const resetFilters = () => {
  selectedLevel.value = ''
  startDate.value = ''
  endDate.value = ''
  userFilter.value = ''
}

const exportLogs = () => {
  const dataStr = JSON.stringify(filteredLogs.value, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `logs_${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/* Fonctions utilitaires */
const getLevelClass = (level: string) => {
  switch (level) {
    case 'debug': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    case 'info': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
    case 'warn': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
    case 'error': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
    case 'fatal': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300'
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
  }
}

const getLevelLabel = (level: string) => {
  switch (level) {
    case 'debug': return 'Debug'
    case 'info': return 'Info'
    case 'warn': return 'Warning'
    case 'error': return 'Erreur'
    case 'fatal': return 'Fatal'
    default: return level
  }
}

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const copyLogDetails = () => {
  if (selectedLog.value) {
    const text = JSON.stringify(selectedLog.value, null, 2)
    navigator.clipboard.writeText(text)
    alert('Log copié dans le presse-papier')
  }
}

const updateStats = () => {
  const now = new Date()
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  stats.value = {
    totalLogs: logs.value.length,
    errorsToday: logs.value.filter(log => 
      log.level === 'error' && new Date(log.timestamp) >= last24Hours
    ).length,
    activeUsers: new Set(logs.value.filter(log => 
      log.user && new Date(log.timestamp) >= last24Hours
    ).map(log => log.user)).size,
    requestsPerSecond: 24.5 // Valeur simulée
  }
}

/* Cycle de vie */
onMounted(() => {
  updateStats()
  // Définir les dates par défaut (dernières 24h)
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  
  endDate.value = now.toISOString().slice(0, 16)
  startDate.value = yesterday.toISOString().slice(0, 16)
})
</script>

<style scoped>
/* Styles pour le modal */
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
}

/* Styles pour les niveaux de log */
.bg-gray-100 { background-color: #f3f4f6; }
.dark .bg-gray-700 { background-color: #374151; }
.text-gray-800 { color: #1f2937; }
.dark .text-gray-300 { color: #d1d5db; }

.bg-blue-100 { background-color: #dbeafe; }
.dark .bg-blue-900 { background-color: #1e3a8a; }
.text-blue-800 { color: #1e40af; }
.dark .text-blue-300 { color: #93c5fd; }

.bg-yellow-100 { background-color: #fef3c7; }
.dark .bg-yellow-900 { background-color: #78350f; }
.text-yellow-800 { color: #92400e; }
.dark .text-yellow-300 { color: #fde68a; }

.bg-red-100 { background-color: #fee2e2; }
.dark .bg-red-900 { background-color: #7f1d1d; }
.text-red-800 { color: #991b1b; }
.dark .text-red-300 { color: #fca5a5; }

.bg-purple-100 { background-color: #f3e8ff; }
.dark .bg-purple-900 { background-color: #581c87; }
.text-purple-800 { color: #6b21a8; }
.dark .text-purple-300 { color: #d8b4fe; }
</style>