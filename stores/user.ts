// stores/users.ts
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar?: string
  created_at: string
  last_login?: string
}

interface UserFilters {
  search?: string
  status?: string
  role?: string
  page?: number
  per_page?: number
}

// Données mock
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alexandre Martin',
    email: 'alexandre@example.com',
    role: 'admin',
    status: 'active',
    avatar: '',
    created_at: '2024-01-15T10:30:00Z',
    last_login: '2024-01-15T14:20:00Z'
  },
  {
    id: 2,
    name: 'Sophie Dubois',
    email: 'sophie@example.com',
    role: 'editor',
    status: 'active',
    avatar: '',
    created_at: '2024-01-14T14:20:00Z',
    last_login: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    name: 'Thomas Bernard',
    email: 'thomas@example.com',
    role: 'user',
    status: 'inactive',
    avatar: '',
    created_at: '2024-01-13T09:15:00Z',
    last_login: '2024-01-12T16:45:00Z'
  },
  {
    id: 4,
    name: 'Marie Lambert',
    email: 'marie@example.com',
    role: 'user',
    status: 'active',
    avatar: '',
    created_at: '2024-01-12T16:45:00Z',
    last_login: '2024-01-15T11:20:00Z'
  },
  {
    id: 5,
    name: 'Pierre Moreau',
    email: 'pierre@example.com',
    role: 'editor',
    status: 'active',
    avatar: '',
    created_at: '2024-01-11T11:20:00Z',
    last_login: '2024-01-15T08:30:00Z'
  },
  {
    id: 6,
    name: 'Julie Petit',
    email: 'julie@example.com',
    role: 'user',
    status: 'suspended',
    avatar: '',
    created_at: '2024-01-10T08:45:00Z',
    last_login: '2024-01-09T14:10:00Z'
  },
  {
    id: 7,
    name: 'David Leroy',
    email: 'david@example.com',
    role: 'admin',
    status: 'active',
    avatar: '',
    created_at: '2024-01-09T14:10:00Z',
    last_login: '2024-01-15T13:45:00Z'
  },
  {
    id: 8,
    name: 'Catherine Roux',
    email: 'catherine@example.com',
    role: 'user',
    status: 'inactive',
    avatar: '',
    created_at: '2024-01-08T16:30:00Z',
    last_login: '2024-01-07T10:20:00Z'
  },
  {
    id: 9,
    name: 'Nicolas Blanc',
    email: 'nicolas@example.com',
    role: 'editor',
    status: 'active',
    avatar: '',
    created_at: '2024-01-07T10:20:00Z',
    last_login: '2024-01-15T16:00:00Z'
  },
  {
    id: 10,
    name: 'Isabelle Lefebvre',
    email: 'isabelle@example.com',
    role: 'user',
    status: 'active',
    avatar: '',
    created_at: '2024-01-06T12:15:00Z',
    last_login: '2024-01-15T10:45:00Z'
  }
]

const mockStats = {
  totalUsers: 154,
  newToday: 12,
  onlineNow: 24,
  lastHour: 8,
  emailsSent: 2450,
  emailsToday: 87,
  avgSessionTime: '12 min'
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    total: 0,
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    loading: false,
    error: null as string | null,
    stats: mockStats,
    recentActivities: [] as any[],
    hourlyActivity: [] as any[]
  }),

  actions: {
    // Récupérer tous les utilisateurs (mock)
    async fetchUsers(filters: UserFilters = {}) {
      this.loading = true
      this.error = null
      
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 600))
        
        let filteredUsers = [...mockUsers]
        
        // Appliquer les filtres
        if (filters.search) {
          const search = filters.search.toLowerCase()
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(search) || 
            user.email.toLowerCase().includes(search) ||
            user.role.toLowerCase().includes(search)
          )
        }
        
        if (filters.status) {
          filteredUsers = filteredUsers.filter(user => user.status === filters.status)
        }
        
        if (filters.role) {
          filteredUsers = filteredUsers.filter(user => user.role === filters.role)
        }
        
        // Pagination simulée
        const page = filters.page || 1
        const perPage = filters.per_page || 10
        const startIndex = (page - 1) * perPage
        const endIndex = startIndex + perPage
        
        this.users = filteredUsers.slice(startIndex, endIndex)
        this.total = filteredUsers.length
        this.currentPage = page
        this.perPage = perPage
        this.lastPage = Math.ceil(filteredUsers.length / perPage)
        
        return { success: true, data: this.users }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des utilisateurs'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Récupérer un utilisateur spécifique (mock)
    async fetchUser(id: number) {
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const user = mockUsers.find(u => u.id === id)
        
        if (user) {
          this.currentUser = user
          return { success: true, data: user }
        } else {
          this.error = 'Utilisateur non trouvé'
          return { success: false, message: this.error }
        }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement de l\'utilisateur'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Récupérer les statistiques du dashboard (mock)
    async fetchDashboardStats() {
      this.loading = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Simuler des activités récentes
        this.recentActivities = [
          {
            id: 1,
            user_id: 1,
            action: 'login',
            description: 'S\'est connecté au système',
            created_at: '2024-01-15T14:20:00Z',
            user: { name: 'Alexandre Martin' }
          },
          {
            id: 2,
            user_id: 2,
            action: 'profile_update',
            description: 'A mis à jour son profil',
            created_at: '2024-01-15T13:45:00Z',
            user: { name: 'Sophie Dubois' }
          },
          {
            id: 3,
            user_id: 4,
            action: 'content_create',
            description: 'A publié un nouvel article',
            created_at: '2024-01-15T12:30:00Z',
            user: { name: 'Marie Lambert' }
          }
        ]
        
        return { success: true }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des statistiques'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Créer un utilisateur (mock)
    async createUser(userData: any) {
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newUser: User = {
          id: Math.max(...mockUsers.map(u => u.id)) + 1,
          name: userData.name || 'Nouvel utilisateur',
          email: userData.email || '',
          role: userData.role || 'user',
          status: userData.status || 'active',
          created_at: new Date().toISOString(),
          
        }
        
        mockUsers.unshift(newUser)
        this.users.unshift(newUser)
        this.total++
        
        return { 
          success: true, 
          message: 'Utilisateur créé avec succès',
          data: { user: newUser }
        }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la création'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Mettre à jour un utilisateur (mock)
    async updateUser(id: number, userData: any) {
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const index = mockUsers.findIndex(u => u.id === id)
        
        if (index !== -1) {
          mockUsers[index] = {
            ...mockUsers[index],
            name: userData.name || mockUsers[index].name,
            email: userData.email || mockUsers[index].email,
            role: userData.role || mockUsers[index].role,
            status: userData.status || mockUsers[index].status
          }
          
          // Mettre à jour dans la liste locale aussi
          const localIndex = this.users.findIndex(u => u.id === id)
          if (localIndex !== -1) {
            this.users[localIndex] = mockUsers[index]
          }
          
          return { 
            success: true, 
            message: 'Utilisateur mis à jour avec succès',
            data: { user: mockUsers[index] }
          }
        } else {
          this.error = 'Utilisateur non trouvé'
          return { success: false, message: this.error }
        }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la mise à jour'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Supprimer un utilisateur (mock)
    async deleteUser(id: number) {
      this.loading = true
      this.error = null
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const userIndex = mockUsers.findIndex(u => u.id === id)
        
        if (userIndex !== -1) {
          mockUsers.splice(userIndex, 1)
          this.users = this.users.filter(u => u.id !== id)
          this.total--
          
          return { 
            success: true, 
            message: 'Utilisateur supprimé avec succès'
          }
        } else {
          this.error = 'Utilisateur non trouvé'
          return { success: false, message: this.error }
        }
      } catch (error: any) {
        this.error = error.message || 'Erreur lors de la suppression'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Simuler l'activité horaire (mock)
    simulateHourlyActivity() {
      this.hourlyActivity = [
        { hour: '08h', count: 45, percentage: 60 },
        { hour: '09h', count: 78, percentage: 85 },
        { hour: '10h', count: 92, percentage: 100 },
        { hour: '11h', count: 85, percentage: 92 },
        { hour: '12h', count: 65, percentage: 70 },
        { hour: '13h', count: 55, percentage: 60 },
        { hour: '14h', count: 70, percentage: 76 },
        { hour: '15h', count: 82, percentage: 89 }
      ]
    },

    // Réinitialiser les filtres
    resetFilters() {
      this.currentPage = 1
    }
  },

  getters: {
    // Utilisateurs récents (5 derniers)
    recentUsers: (state) => {
      return state.users.slice(0, 5).map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status === 'active' ? 'Actif' : 
                user.status === 'inactive' ? 'Inactif' : 'Suspendu',
        createdAt: new Date(user.created_at).toLocaleDateString('fr-FR')
      }))
    },

    // Formatage des données pour le dashboard
    formattedStats: (state) => ({
      totalUsers: {
        value: state.stats.totalUsers,
        label: 'Utilisateurs totaux',
        icon: '👥',
        trend: '+12%'
      },
      newToday: {
        value: state.stats.newToday,
        label: 'Nouveaux aujourd\'hui',
        icon: '🆕',
        trend: '+8%'
      },
      onlineNow: {
        value: state.stats.onlineNow,
        label: 'Actuellement en ligne',
        icon: '✅',
        trend: '+5%'
      },
      emailsSent: {
        value: state.stats.emailsSent,
        label: 'Emails envoyés',
        icon: '📧',
        trend: '+15%'
      }
    })
  }
})