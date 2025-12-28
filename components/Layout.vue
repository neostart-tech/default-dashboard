<!-- Layout.vue -->
<template>
  <div :class="['app-layout', { 'dark': store.darkMode }]">
    <header class="app-header">
      <div class="header-left">
        <h1 class="app-title">Mon Application</h1>
        <nav class="main-nav">
          <router-link to="/" class="nav-link">Accueil</router-link>
          <router-link to="/users" class="nav-link">Utilisateurs</router-link>
          <router-link to="/users/dashboard" class="nav-link">Dashboard</router-link>
        </nav>
      </div>
      
      <div class="header-right">
        <button @click="toggleTheme" class="theme-toggle">
          {{ store.darkMode ? '🌞' : '🌙' }}
        </button>
        
        <div class="user-menu">
          <span v-if="store.user">{{ store.user.name }}</span>
          <button v-if="store.user" @click="logout" class="logout-btn">
            Déconnexion
          </button>
        </div>
      </div>
    </header>
    
    <main class="app-main">
      <Breadcrumb />
      <router-view />
    </main>
    
    <Notification />
    <LoadingSpinner v-if="store.isLoading" />
  </div>
</template>

<script setup>
import { useAppStore } from './stores/useAppStore'
import Breadcrumb from './components/Breadcrumb.vue'
import Notification from './components/Notification.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'


const store = useAppStore()

const toggleTheme = () => {
  store.toggleDarkMode()
}

const logout = () => {
  store.logout()
  router.push('/login')
}
</script>

<style>
.app-layout {
  min-height: 100vh;
  background-color: #f9fafb;
  color: #111827;
  transition: background-color 0.3s, color 0.3s;
}

.app-layout.dark {
  background-color: #111827;
  color: #f9fafb;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.dark .app-header {
  background-color: #1f2937;
  border-bottom-color: #374151;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.nav-link.router-link-active {
  background-color: #3b82f6;
  color: white;
}

.dark .nav-link {
  color: #d1d5db;
}

.dark .nav-link:hover {
  background-color: #374151;
  color: #f9fafb;
}

.dark .nav-link.router-link-active {
  background-color: #2563eb;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background-color: #f3f4f6;
}

.dark .theme-toggle:hover {
  background-color: #374151;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #dc2626;
}

.app-main {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Styles globaux */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
}

.dark {
  color-scheme: dark;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>