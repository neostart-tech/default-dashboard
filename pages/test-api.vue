<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Test API Connection</h1>
    
    <div class="space-y-4">
      <button @click="testAll" class="px-4 py-2 bg-blue-500 text-white rounded">
        Test All API Endpoints
      </button>
      
      <div v-if="loading" class="text-gray-600">Testing...</div>
      
      <div v-for="(result, endpoint) in results" :key="endpoint" class="p-4 border rounded">
        <h3 class="font-bold">{{ endpoint }}</h3>
        <div :class="result.status === 'success' ? 'text-green-600' : 'text-red-600'">
          {{ result.status === 'success' ? '✅ Success' : '❌ Error' }}
        </div>
        <pre v-if="result.data" class="mt-2 text-sm overflow-auto">{{ JSON.stringify(result.data, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const results = ref<Record<string, any>>({})
const loading = ref(false)

async function testAll() {
  loading.value = true
  results.value = {}
  
  const endpoints = [
    '/health',
    '/dashboard/stats',
    '/dashboard/recent-users',
    '/dashboard/activities',
    '/users'
  ]
  
  for (const endpoint of endpoints) {
    try {
      const data = await $api(endpoint)
      results.value[endpoint] = {
        status: 'success',
        data
      }
    } catch (error: any) {
      results.value[endpoint] = {
        status: 'error',
        error: error.message
      }
    }
  }
  
  loading.value = false
}
</script>