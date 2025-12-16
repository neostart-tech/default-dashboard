<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard
      v-for="stat in stats"
      :key="stat.id"
      :title="stat.title"
      :value="stat.value"
      :icon="stat.icon"
      :icon-bg="stat.iconBg"
      :trend="stat.trend"
      :progress="stat.progress"
    />
  </div>
</template>

<script setup lang="ts">
import StatCard from '../ui/StatCard.vue'

// Props pour personnaliser les stats
const props = defineProps({
  stats: {
    type: Array as () => Array<{
      id: string
      title: string
      value: string | number
      icon: string
      iconBg: string
      trend?: {
        direction: 'up' | 'down'
        value: string
        period?: string
      }
      progress?: {
        value: number
        label?: string
      }
    }>,
    required: true
  }
})
</script>