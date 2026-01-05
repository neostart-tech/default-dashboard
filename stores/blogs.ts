// stores/blogs.ts
import { defineStore } from 'pinia'

// URL de l'API Laravel
const API_BASE_URL = 'http://localhost:8000/api'

// Types
interface Blog {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  image: string | null
  author: string
  tags: string[] | null
  status: 'published' | 'draft'
  views: number
  created_at: string
  updated_at: string
}

interface Stats {
  total: number
  published: number
  draft: number
  totalViews: number
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: any
  total?: number
  current_page?: number
  per_page?: number
  last_page?: number
}

export const useBlogsStore = defineStore('blogs', {
  state: () => ({
    blogs: [] as Blog[],
    categories: [] as string[],
    stats: {
      total: 0,
      published: 0,
      draft: 0,
      totalViews: 0
    } as Stats,
    loading: false,
    error: null as string | null,
    pagination: {
      currentPage: 1,
      perPage: 10,
      total: 0,
      lastPage: 1
    }
  }),

  actions: {
    // Méthode utilitaire pour les appels API
    async apiCall<T>(endpoint: string, options: any = {}): Promise<ApiResponse<T>> {
      const url = `${API_BASE_URL}${endpoint}`
      
      const defaultOptions = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        ...options
      }
      
      try {
        console.log(`🌐 API Call: ${options.method || 'GET'} ${url}`)
        
        const response = await fetch(url, defaultOptions)
        const data = await response.json()
        
        console.log(`📥 API Response from ${endpoint}:`, data)
        
        if (!response.ok) {
          throw new Error(data.message || `HTTP ${response.status}`)
        }
        
        return data
      } catch (error: any) {
        console.error(`❌ API Error (${endpoint}):`, error)
        throw error
      }
    },

    // Récupérer tous les blogs
    async fetchBlogs(filters: any = {}) {
      this.loading = true
      this.error = null
      
      try {
        // Construire les paramètres de requête
        const params = new URLSearchParams()
        
        if (filters.search) params.append('search', filters.search)
        if (filters.category) params.append('category', filters.category)
        if (filters.status) params.append('status', filters.status)
        params.append('page', (filters.page || this.pagination.currentPage).toString())
        params.append('per_page', (filters.perPage || this.pagination.perPage).toString())
        
        const queryString = params.toString()
        const endpoint = `/blogs${queryString ? `?${queryString}` : ''}`
        
        const response = await this.apiCall<Blog[]>(endpoint)
        
        if (response.success) {
          this.blogs = response.data || []
          this.pagination = {
            currentPage: response.current_page || 1,
            perPage: response.per_page || 10,
            total: response.total || 0,
            lastPage: response.last_page || 1
          }
          
          // Calculer les stats locales
          this.calculateLocalStats()
        } else {
          throw new Error(response.message || 'Erreur lors du chargement')
        }
        
        return { success: true, data: this.blogs }
      } catch (error: any) {
        this.error = error.message
        console.error('Error fetching blogs:', error)
        
        // Mode développement: données mock
        if (import.meta.dev && this.blogs.length === 0) {
          await this.getMockBlogs()
        }
        
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Créer un blog
    async createBlog(blogData: any) {
      this.loading = true
      this.error = null
      
      try {
        // Préparer les données
        const dataToSend = {
          title: blogData.title || '',
          content: blogData.content || '',
          category: blogData.category || '',
          excerpt: blogData.excerpt || '',
          image: blogData.image || null,
          author: blogData.author || 'Admin',
          status: blogData.status || 'draft',
          tags: this.formatTags(blogData.tags)
        }
        
        console.log('📤 Creating blog:', dataToSend)
        
        const response = await this.apiCall<Blog>('/blogs', {
          method: 'POST',
          body: JSON.stringify(dataToSend)
        })
        
        if (response.success && response.data) {
          // Recharger la liste
          await this.fetchBlogs()
          
          return {
            success: true,
            message: response.message || 'Blog créé avec succès',
            data: response.data
          }
        } else {
          throw new Error(response.message || 'Erreur lors de la création')
        }
      } catch (error: any) {
        this.error = error.message
        
        // Mode développement: simuler la création
        if (import.meta.dev) {
          const mockBlog = {
            id: Date.now(),
            ...blogData,
            views: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          
          this.blogs.unshift(mockBlog as Blog)
          this.calculateLocalStats()
          
          return {
            success: true,
            message: 'Blog créé (mode simulation)',
            data: mockBlog
          }
        }
        
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Mettre à jour un blog
    async updateBlog(id: number, blogData: any) {
      this.loading = true
      this.error = null
      
      try {
        const dataToSend = {
          title: blogData.title,
          content: blogData.content,
          category: blogData.category,
          excerpt: blogData.excerpt,
          image: blogData.image,
          author: blogData.author,
          status: blogData.status,
          tags: this.formatTags(blogData.tags)
        }
        
        const response = await this.apiCall<Blog>(`/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify(dataToSend)
        })
        
        if (response.success) {
          await this.fetchBlogs()
          return {
            success: true,
            message: response.message || 'Blog mis à jour',
            data: response.data
          }
        } else {
          throw new Error(response.message || 'Erreur lors de la mise à jour')
        }
      } catch (error: any) {
        this.error = error.message
        
        // Mode développement: simuler la mise à jour
        if (import.meta.dev) {
          const index = this.blogs.findIndex(b => b.id === id)
          if (index !== -1) {
            this.blogs[index] = { ...this.blogs[index], ...blogData }
            this.calculateLocalStats()
          }
          
          return {
            success: true,
            message: 'Blog mis à jour (mode simulation)',
            data: this.blogs[index]
          }
        }
        
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Supprimer un blog
    async deleteBlog(id: number) {
      this.loading = true
      this.error = null
      
      try {
        const response = await this.apiCall(`/blogs/${id}`, {
          method: 'DELETE'
        })
        
        if (response.success) {
          await this.fetchBlogs()
          return {
            success: true,
            message: response.message || 'Blog supprimé'
          }
        } else {
          throw new Error(response.message || 'Erreur lors de la suppression')
        }
      } catch (error: any) {
        this.error = error.message
        
        // Mode développement: simuler la suppression
        if (import.meta.dev) {
          this.blogs = this.blogs.filter(b => b.id !== id)
          this.calculateLocalStats()
          
          return {
            success: true,
            message: 'Blog supprimé (mode simulation)'
          }
        }
        
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    // Changer le statut
    async togglePublish(id: number) {
      try {
        const response = await this.apiCall<Blog>(`/blogs/${id}/toggle-publish`, {
          method: 'PATCH'
        })
        
        if (response.success) {
          await this.fetchBlogs()
          return {
            success: true,
            message: response.message || 'Statut mis à jour',
            data: response.data
          }
        } else {
          throw new Error(response.message || 'Erreur lors du changement de statut')
        }
      } catch (error: any) {
        this.error = error.message
        
        // Mode développement: simuler le changement
        if (import.meta.dev) {
          const blog = this.blogs.find(b => b.id === id)
          if (blog) {
            blog.status = blog.status === 'published' ? 'draft' : 'published'
            this.calculateLocalStats()
          }
          
          return {
            success: true,
            message: 'Statut mis à jour (mode simulation)',
            data: blog
          }
        }
        
        return { success: false, message: this.error }
      }
    },

    // Récupérer les catégories
    async fetchCategories() {
      try {
        const response = await this.apiCall<string[]>('/blogs/categories')
        
        if (response.success) {
          this.categories = response.data || []
        } else {
          this.categories = ['Technologie', 'Développement', 'Design', 'Business', 'Marketing', 'Autre']
        }
      } catch (error: any) {
        console.error('Error fetching categories:', error)
        this.categories = ['Technologie', 'Développement', 'Design', 'Business', 'Marketing', 'Autre']
      }
    },

    // Récupérer les statistiques
    async fetchStats() {
      try {
        const response = await this.apiCall<Stats>('/blogs/stats')
        
        if (response.success && response.data) {
          this.stats = response.data
        } else {
          this.calculateLocalStats()
        }
      } catch (error: any) {
        console.error('Error fetching stats:', error)
        this.calculateLocalStats()
      }
    },

    // Méthodes utilitaires
    formatTags(tags: any): string[] {
      if (!tags) return []
      
      if (Array.isArray(tags)) {
        return tags.filter(tag => tag && tag.trim())
      }
      
      if (typeof tags === 'string') {
        return tags.split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
      }
      
      return []
    },

    calculateLocalStats() {
      this.stats = {
        total: this.blogs.length,
        published: this.blogs.filter(b => b.status === 'published').length,
        draft: this.blogs.filter(b => b.status === 'draft').length,
        totalViews: this.blogs.reduce((sum, blog) => sum + blog.views, 0)
      }
    },

    // Données mock pour le développement
    async getMockBlogs() {
      this.blogs = [
        {
          id: 1,
          title: 'Bienvenue sur notre blog',
          excerpt: 'Découvrez nos derniers articles',
          content: 'Contenu complet du premier article...',
          category: 'Général',
          image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500',
          author: 'Admin',
          tags: ['welcome', 'news'],
          status: 'published' as const,
          views: 150,
          created_at: '2024-01-15T10:30:00Z',
          updated_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          title: 'Introduction à Vue.js',
          excerpt: 'Apprenez les bases de Vue.js',
          content: 'Vue.js est un framework JavaScript progressif...',
          category: 'Technologie',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
          author: 'Développeur',
          tags: ['vuejs', 'javascript', 'frontend'],
          status: 'published' as const,
          views: 89,
          created_at: '2024-01-10T14:20:00Z',
          updated_at: '2024-01-10T14:20:00Z'
        }
      ]
      
      this.calculateLocalStats()
    }
  },

  getters: {
    // Statistiques formatées pour l'affichage
    formattedStats: (state) => ({
      total: {
        value: state.stats.total,
        label: 'Total articles',
        icon: '📝'
      },
      published: {
        value: state.stats.published,
        label: 'Articles publiés',
        icon: '✅'
      },
      draft: {
        value: state.stats.draft,
        label: 'Brouillons',
        icon: '📄'
      },
      totalViews: {
        value: state.stats.totalViews,
        label: 'Vues totales',
        icon: '👁️'
      }
    })
  }
})