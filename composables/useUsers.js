export const useUsers = () => {
  const { $api } = useNuxtApp()
  
  const fetchUsers = async (params = {}) => {
    try {
      const response = await $api.get('/users', { params })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error)
      throw error
    }
  }
  
  const createUser = async (userData) => {
    try {
      const response = await $api.post('/users', userData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error)
      throw error
    }
  }
  
  const updateUser = async (id, userData) => {
    try {
      const response = await $api.put(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error)
      throw error
    }
  }
  
  const deleteUser = async (id) => {
    try {
      const response = await $api.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error)
      throw error
    }
  }
  
  const updateUserStatus = async (id, status) => {
    try {
      const response = await $api.put(`/users/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      throw error
    }
  }
  
  return {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus
  }
}