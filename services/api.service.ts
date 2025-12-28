// ~/services/api.service.ts
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

class ApiService {
  private $axios: any

  constructor(axios: any) {
    this.$axios = axios
  }

  // Méthode GET
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.$axios.get(url, config)
      return this.handleSuccess<T>(response)
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  // Méthode POST
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.$axios.post(url, data, config)
      return this.handleSuccess<T>(response)
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  // Méthode PUT
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.$axios.put(url, data, config)
      return this.handleSuccess<T>(response)
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  // Méthode PATCH
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.$axios.patch(url, data, config)
      return this.handleSuccess<T>(response)
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  // Méthode DELETE
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.$axios.delete(url, config)
      return this.handleSuccess<T>(response)
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  // Téléchargement de fichier
  async upload<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.$axios.post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config?.headers
        }
      })
      return this.handleSuccess<T>(response)
    } catch (error: any) {
      return this.handleError(error)
    }
  }

  private handleSuccess<T>(response: AxiosResponse): ApiResponse<T> {
    return {
      success: true,
      data: response.data.data || response.data,
      message: response.data.message
    }
  }

  private handleError(error: any): ApiResponse {
    if (error.response) {
      // Erreur du serveur
      return {
        success: false,
        message: error.response.data.message || 'Une erreur est survenue',
        errors: error.response.data.errors
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      return {
        success: false,
        message: 'Impossible de se connecter au serveur'
      }
    } else {
      // Erreur de configuration
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Gestion des tokens CSRF (si Laravel l'utilise)
  async getCsrfToken(): Promise<void> {
    await this.$axios.get('/sanctum/csrf-cookie')
  }
}

export default ApiService