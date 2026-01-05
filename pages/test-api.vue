<!-- pages/test-api.vue -->
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Test API Connection</h1>
    
    <div class="space-y-4">
      <button @click="testGET" class="px-4 py-2 bg-blue-500 text-white rounded">
        Test GET /api/test
      </button>
      
      <button @click="testPOST" class="px-4 py-2 bg-green-500 text-white rounded">
        Test POST /api/blogs
      </button>
      
      <button @click="testBlogs" class="px-4 py-2 bg-purple-500 text-white rounded">
        Test GET /api/blogs
      </button>
    </div>
    
    <div v-if="result" class="mt-6 p-4 bg-gray-100 rounded">
      <h2 class="font-bold mb-2">Response:</h2>
      <pre class="whitespace-pre-wrap">{{ result }}</pre>
    </div>
    
    <div v-if="error" class="mt-6 p-4 bg-red-100 text-red-700 rounded">
      <h2 class="font-bold mb-2">Error:</h2>
      <pre class="whitespace-pre-wrap">{{ error }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const result = ref<any>(null)
const error = ref<string>('')

const testGET = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/test')
    result.value = await response.json()
    error.value = ''
  } catch (err: any) {
    error.value = err.message
    result.value = null
  }
}

const testPOST = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: 'Test from Nuxt',
        content: 'Test content from Nuxt 3',
        category: 'Test'
      })
    })
    result.value = await response.json()
    error.value = ''
  } catch (err: any) {
    error.value = err.message
    result.value = null
  }
}

const testBlogs = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/blogs')
    result.value = await response.json()
    error.value = ''
  } catch (err: any) {
    error.value = err.message
    result.value = null
  }
}
</script>