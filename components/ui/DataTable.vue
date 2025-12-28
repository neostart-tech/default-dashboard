<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h2>
          <p v-if="description" class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ description }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher..."
              class="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <button
              v-if="filters"
              @click="showFilters = !showFilters"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <span>🔧</span>
              <span>Filtres</span>
            </button>

            <router-link
              v-if="addButton"
              :to="addButton.to"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <span>+</span>
              <span>{{ addButton.label }}</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div v-if="showFilters && filters" class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div class="grid grid-cols-4 gap-4">
          <div v-for="filter in filters" :key="filter.key">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ filter.label }}
            </label>
            <select
              v-model="activeFilters[filter.key]"
              class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Tous</option>
              <option v-for="option in filter.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="item in filteredData"
            :key="item.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 text-sm text-gray-900 dark:text-white"
            >
              <slot :name="`column-${column.key}`" :item="item">
                <span v-if="column.key === 'status'">
                  <span :class="getStatusClass(item.status)">
                    {{ item[column.key] }}
                  </span>
                </span>
                <span v-else-if="column.key === 'actions'">
                  <!-- Actions will be in separate column -->
                </span>
                <span v-else>
                  {{ item[column.key] }}
                </span>
              </slot>
            </td>
            <td class="px-6 py-4 text-right whitespace-nowrap">
              <div class="flex items-center justify-end gap-2">
                <button
                  @click="$emit('edit', item)"
                  class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  title="Modifier"
                >
                  ✏️
                </button>
                <button
                  @click="$emit('delete', item)"
                  class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  title="Supprimer"
                >
                  🗑️
                </button>
                <button
                  v-if="actions && actions.includes('view')"
                  @click="$emit('view', item)"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  title="Voir"
                >
                  👁️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination & empty state -->
    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <div v-if="filteredData.length === 0" class="text-center py-8">
        <div class="text-gray-400 dark:text-gray-500 text-4xl mb-2">📭</div>
        <p class="text-gray-500 dark:text-gray-400">Aucune donnée trouvée</p>
      </div>

      <div v-else class="flex items-center justify-between">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Affichage de {{ startItem }} à {{ endItem }} sur {{ filteredData.length }} éléments
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            ← Précédent
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="page in pageNumbers"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 rounded-lg',
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'


interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Filter {
  key: string
  label: string
  options: Array<{ value: string, label: string }>
}

interface AddButton {
  to: string
  label: string
}

interface Props {
  title: string
  description?: string
  columns: Column[]
  data: any[]
  filters?: Filter[]
  actions?: string[]
  addButton?: AddButton
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  actions: () => ['edit', 'delete']
})

const emit = defineEmits<{
  edit: [item: any]
  delete: [item: any]
  view: [item: any]
}>()

// Search & filters
const searchQuery = ref('')
const activeFilters = ref<Record<string, string>>({})
const showFilters = ref(false)

// Pagination
const currentPage = ref(1)

// Computed
const filteredData = computed(() => {
  let filtered = [...props.data]

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => {
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(query)
      )
    })
  }

  // Apply filters
  if (props.filters) {
    props.filters.forEach(filter => {
      const value = activeFilters.value[filter.key]
      if (value) {
        filtered = filtered.filter(item => item[filter.key] === value)
      }
    })
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / props.itemsPerPage)
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return filteredData.value.slice(start, end)
})

const startItem = computed(() => {
  return (currentPage.value - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * props.itemsPerPage, filteredData.value.length)
})

const pageNumbers = computed(() => {
  const maxVisible = 5
  const pages: number[] = []

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxVisible - 1)

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  return pages
})

// Methods
const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Actif': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Inactif': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    'En attente': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Banni': 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Reset pagination when filters change
watch([searchQuery, activeFilters], () => {
  currentPage.value = 1
})
</script>