<template>
  <div class="notifications-container">
    <transition-group name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
        @click="markAsRead(notification.id)"
      >
        <div class="notification-icon">
          <span v-if="notification.type === 'success'">✅</span>
          <span v-else-if="notification.type === 'error'">❌</span>
          <span v-else-if="notification.type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="notification-content">
          <div class="notification-title">{{ notification.title || formatTitle(notification.type) }}</div>
          <div class="notification-message">{{ notification.message }}</div>
          <div class="notification-time">{{ formatTime(notification.timestamp) }}</div>
        </div>
        <button @click.stop="remove(notification.id)" class="notification-close">
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/useAppStore'

const store = useAppStore()

const notifications = computed(() => store.notifications)

const formatTitle = (type) => {
  const titles = {
    success: 'Succès',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Information'
  }
  return titles[type] || 'Notification'
}

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - new Date(timestamp)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  
  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes} min`
  if (hours < 24) return `Il y a ${hours} h`
  return new Date(timestamp).toLocaleTimeString()
}

const remove = (id) => {
  store.removeNotification(id)
}

const markAsRead = (id) => {
  store.markAsRead(id)
}
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 350px;
}

.notification {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

.notification:hover {
  transform: translateX(-5px);
}

.notification-success {
  background-color: #d1fae5;
  border-left: 4px solid #10b981;
  color: #065f46;
}

.notification-error {
  background-color: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #7f1d1d;
}

.notification-warning {
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
  color: #92400e;
}

.notification-info {
  background-color: #dbeafe;
  border-left: 4px solid #3b82f6;
  color: #1e40af;
}

.notification-icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.notification-message {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.notification-time {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  opacity: 0.75;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: inherit;
  opacity: 0.5;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.dark .notification-success {
  background-color: #064e3b;
  color: #a7f3d0;
}

.dark .notification-error {
  background-color: #7f1d1d;
  color: #fecaca;
}

.dark .notification-warning {
  background-color: #92400e;
  color: #fde68a;
}

.dark .notification-info {
  background-color: #1e40af;
  color: #dbeafe;
}
</style>