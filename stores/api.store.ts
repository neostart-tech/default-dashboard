// ~/stores/api.store.ts
import { defineStore } from 'pinia'
import ApiService from '~/services/api.service'
import type { ApiResponse } from '~/services/api.service'

export const useApiStore = defineStore('api', () => {
  const { $axios } = useNuxtApp()
  const apiService = new ApiService($axios)

  // Exemple: Récupérer les logs système
  const fetchSystemLogs = async (params?: any): Promise<ApiResponse> => {
    return await apiService.get('/system-logs', { params })
  }

  // Exemple: Créer un log
  const createSystemLog = async (data: any): Promise<ApiResponse> => {
    return await apiService.post('/system-logs', data)
  }

  // Exemple: Supprimer un log
  const deleteSystemLog = async (id: number): Promise<ApiResponse> => {
    return await apiService.delete(`/system-logs/${id}`)
  }

  // Pour votre page Help/Support
  const fetchFAQs = async (params?: any): Promise<ApiResponse> => {
    return await apiService.get('/faqs', { params })
  }

  const createTicket = async (data: any): Promise<ApiResponse> => {
    return await apiService.post('/support-tickets', data)
  }

  const fetchUserTickets = async (userId: number): Promise<ApiResponse> => {
    return await apiService.get(`/users/${userId}/tickets`)
  }

  return {
    fetchSystemLogs,
    createSystemLog,
    deleteSystemLog,
    fetchFAQs,
    createTicket,
    fetchUserTickets
  }
})