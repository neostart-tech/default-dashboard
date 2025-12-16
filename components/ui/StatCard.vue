<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ value }}</p>
        
        <!-- Tendance -->
        <div v-if="trend" class="flex items-center mt-3">
          <div :class="[
            'flex items-center text-sm font-medium',
            trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          ]">
            <svg v-if="trend.direction === 'up'" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {{ trend.value }}
          </div>
          <span v-if="trend.period" class="text-sm text-gray-500 dark:text-gray-400 ml-2">
            {{ trend.period }}
          </span>
        </div>
      </div>
      
      <!-- Icône -->
      <div :class="['p-3 rounded-lg', iconBg]">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Trend {
  direction: 'up' | 'down'
  value: string
  period?: string
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  iconBg: {
    type: String,
    default: 'bg-primary-500'
  },
  trend: {
    type: Object as () => Trend,
    default: null
  }
})
</script>