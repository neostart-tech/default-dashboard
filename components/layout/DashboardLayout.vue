<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar :is-open="sidebarOpen" @toggle="toggleSidebar" />
    
    <!-- Contenu principal avec footer -->
    <div :class="['transition-all duration-300 min-h-screen flex flex-col', sidebarOpen ? 'lg:ml-64' : 'lg:ml-20']">
      <!-- Header -->
      <Header @toggle-sidebar="toggleSidebar" />
      
      <!-- Contenu principal -->
      <main class="flex-1 p-4 md:p-6">
        <slot />
      </main>
      
      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './AppSidebar.vue'
import Header from './AppHeader.vue'
import AppFooter from './AppFooter.vue'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
/* Assure que le contenu principal prend tout l'espace disponible */
.min-h-screen {
  min-height: 100vh;
}

.flex-1 {
  flex: 1 1 0%;
}

.flex-col {
  flex-direction: column;
}
</style>