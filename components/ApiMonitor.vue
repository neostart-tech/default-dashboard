<template>
  <div class="fixed bottom-4 right-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-4 w-80">
      <div class="flex justify-between items-center mb-3">
        <h3 class="font-semibold">État des API</h3>
        <span class="text-xs px-2 py-1 rounded-full" 
              :class="allApisWorking ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          {{ allApisWorking ? 'Tout OK' : 'Problèmes détectés' }}
        </span>
      </div>
      
      <div class="space-y-2">
        <div v-for="api in apiStatusList" :key="api.name" 
             class="flex items-center justify-between text-sm">
          <span class="flex items-center gap-2">
            <span :class="api.status ? 'text-green-500' : 'text-red-500'">
              {{ api.status ? '●' : '●' }}
            </span>
            {{ api.name }}
          </span>
          <span class="text-xs text-gray-500">{{ api.endpoint }}</span>
        </div>
      </div>
      
      <button @click="refreshStatus" 
              class="mt-3 w-full text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
        Rafraîchir
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const apiStatusList = ref([
  { name: 'API Health', endpoint: '/health', status: false },
  { name: 'Dashboard Stats', endpoint: '/dashboard/stats', status: false },
  { name: 'Users List', endpoint: '/users', status: false },
  { name: 'Recent Users', endpoint: '/dashboard/recent-users', status: false },
  { name: 'Activities', endpoint: '/dashboard/activities', status: false }
])

const checkApiStatus = async (endpoint: string) => {
  try {
    await $api(endpoint)
    return true
  } catch {
    return false
  }
}

const refreshStatus = async () => {
  for (const api of apiStatusList.value) {
    api.status = await checkApiStatus(api.endpoint)
  }
}

const allApisWorking = computed(() => {
  return apiStatusList.value.every(api => api.status)
})

// Rafraîchir périodiquement
onMounted(async () => {
  await refreshStatus()
  
  // Rafraîchir toutes les minutes
  setInterval(refreshStatus, 60000)
})
</script>