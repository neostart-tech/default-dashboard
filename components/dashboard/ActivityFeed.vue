<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Activités récentes</h3>
      <button class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
        Voir tout
      </button>
    </div>
    
    <div class="space-y-4">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-start gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors"
      >
        <div :class="['p-2 rounded-lg', activity.bgColor]">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.icon" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
          <div class="flex items-center gap-2 mt-2">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</span>
          </div>
        </div>
        <span :class="['px-2 py-1 text-xs font-medium rounded-full', activity.statusClass]">
          {{ activity.status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Activity {
  id: string
  title: string
  description: string
  time: string
  icon: string
  bgColor: string
  status: string
  statusClass: string
}

const props = defineProps({
  activities: {
    type: Array as () => Activity[],
    required: true
  }
})
</script>