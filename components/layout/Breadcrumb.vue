<template>
  <div class="mb-6">
    <!-- Fil d'Ariane -->
    <nav class="mb-2">
      <ol class="flex items-center flex-wrap gap-2 text-sm">
        <li v-for="(item, index) in items" :key="index" class="flex items-center">
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="text-gray-500 hover:text-primary-600 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span v-else class="text-gray-900 font-medium">
            {{ item.label }}
          </span>
          <span v-if="index < items.length - 1" class="mx-2 text-gray-400">/</span>
        </li>
      </ol>
    </nav>

    <!-- Titre et actions -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {{ title }}
        </h1>
        <p v-if="subtitle" class="text-gray-600 dark:text-gray-400 mt-1">
          {{ subtitle }}
        </p>
      </div>
      
      <!-- Slot pour les actions -->
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
  title: string
  subtitle?: string
}>()
</script>