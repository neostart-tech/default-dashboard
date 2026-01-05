// stores/dashboard.ts
import { defineStore } from 'pinia'

interface DashboardStats {
  total_users: number
  active_users: number
  new_users_today: number
  total_revenue?: number
}

interface RecentUser {
  id: number
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

interface Activity {
  id: number
  user_id: number
  action: string
  description: string
  created_at: string
  user?: {
    name: string
    avatar?: string
  }
}

// Données mock
const mockStats: DashboardStats = {
  total_users: 154,
  active_users: 87,
  new_users_today: 12,
  total_revenue: 12500
}

const mockRecentUsers: RecentUser[] = [
  {
    id: 1,
    name: 'Alexandre Martin',
    email: 'alexandre@example.com',
    role: 'admin',
    status: 'Actif',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Sophie Dubois',
    email: 'sophie@example.com',
    role: 'user',
    status: 'Actif',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'Thomas Bernard',
    email: 'thomas@example.com',
    role: 'user',
    status: 'Inactif',
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    name: 'Marie Lambert',
    email: 'marie@example.com',
    role: 'user',
    status: 'Actif',
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    id: 5,
    name: 'Pierre Moreau',
    email: 'pierre@example.com',
    role: 'moderator',
    status: 'Actif',
    createdAt: '2024-01-11T11:20:00Z'
  }
]

const mockActivities: Activity[] = [
  {
    id: 1,
    user_id: 1,
    action: 'user_create',
    description: 'A créé un nouvel article de blog',
    created_at: '2024-01-15T09:30:00Z',
    user: { name: 'Alexandre Martin' }
  },
  {
    id: 2,
    user_id: 2,
    action: 'user_update',
    description: 'A mis à jour son profil',
    created_at: '2024-01-15T08:15:00Z',
    user: { name: 'Sophie Dubois' }
  },
  {
    id: 3,
    user_id: 3,
    action: 'login',
    description: 'S\'est connecté au système',
    created_at: '2024-01-14T16:45:00Z',
    user: { name: 'Thomas Bernard' }
  },
  {
    id: 4,
    user_id: 4,
    action: 'content_create',
    description: 'A publié un nouvel article',
    created_at: '2024-01-14T14:20:00Z',
    user: { name: 'Marie Lambert' }
  },
  {
    id: 5,
    user_id: 1,
    action: 'settings_update',
    description: 'A modifié les paramètres du site',
    created_at: '2024-01-13T11:10:00Z',
    user: { name: 'Alexandre Martin' }
  }
]

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    stats: null as DashboardStats | null,
    recentUsers: [] as RecentUser[],
    activities: [] as Activity[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    // Récupérer les statistiques (mock)
    async fetchStats() {
      this.loading = true
      this.error = null
      
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.stats = mockStats
        return { success: true, data: mockStats }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des statistiques'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Récupérer les utilisateurs récents (mock)
    async fetchRecentUsers() {
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        this.recentUsers = mockRecentUsers
        return { success: true, data: mockRecentUsers }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des utilisateurs récents'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Récupérer les activités (mock)
    async fetchActivities() {
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 400))
        
        this.activities = mockActivities
        return { success: true, data: mockActivities }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des activités'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Charger toutes les données du dashboard
    async fetchAll() {
      try {
        await Promise.all([
          this.fetchStats(),
          this.fetchRecentUsers(),
          this.fetchActivities()
        ])
        
        return { success: true }
      } catch (error) {
        return { success: false, message: 'Erreur lors du chargement du dashboard' }
      }
    },

    // Rafraîchir les données
    async refresh() {
      await this.fetchAll()
    },

    // Charger les données du dashboard (alias pour fetchAll)
    async fetchDashboardStats() {
      return await this.fetchAll()
    }
  },

  getters: {
    // Formater les statistiques pour l'affichage
    formattedStats: (state) => {
      if (!state.stats) return null
      
      return {
        total_users: {
          value: state.stats.total_users,
          label: 'Utilisateurs totaux',
          icon: '👥',
          trend: '+12%'
        },
        active_users: {
          value: state.stats.active_users,
          label: 'Utilisateurs actifs',
          icon: '✅',
          trend: '+8%'
        },
        new_users_today: {
          value: state.stats.new_users_today,
          label: 'Nouveaux aujourd\'hui',
          icon: '🆕',
          trend: '+5%'
        },
        total_revenue: {
          value: state.stats.total_revenue ? `$${state.stats.total_revenue.toLocaleString()}` : '$0',
          label: 'Revenue total',
          icon: '💰',
          trend: '+15%'
        }
      }
    },
    
    // Activités récentes (5 dernières)
    recentActivities: (state) => {
      return state.activities.slice(0, 5).map(activity => ({
        ...activity,
        user: activity.user || { name: 'Système' }
      }))
    }
  }
})