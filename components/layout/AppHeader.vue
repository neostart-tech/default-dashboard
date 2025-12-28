<template>
  <header
    class="sticky top-0 z-40 bg-white/90 backdrop-blur
           dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700"
  >
    <div class="px-4 md:px-6 h-16 flex items-center justify-between">

      <!-- LEFT -->
      <div class="flex items-center gap-4">
        <!-- Burger -->
        <button
          @click="emit('toggle-sidebar')"
          class="p-2 rounded-lg text-gray-600 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Search -->
        <div class="hidden md:block w-72">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Rechercher..."
              class="w-full pl-10 pr-4 py-2 rounded-lg
                     bg-gray-50 dark:bg-gray-800
                     border border-gray-300 dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="flex items-center gap-2">

        <!-- Dark mode -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg text-gray-600 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646
                 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <!-- Notifications -->
        <button
          class="relative p-2 rounded-lg text-gray-600 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                 a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341
                 C7.67 6.165 6 8.388 6 11v3.159
                 c0 .538-.214 1.055-.595 1.436L4 17h5
                 m6 0v1a3 3 0 11-6 0v-1" />
          </svg>

          <span
            v-if="notificationCount"
            class="absolute -top-1 -right-1 text-[10px]
                   bg-red-500 text-white rounded-full
                   min-w-[16px] h-4 flex items-center justify-center px-1"
          >
            {{ notificationCount }}
          </span>
        </button>

        <!-- Profile -->
        <button
          class="flex items-center gap-2 px-2 py-1 rounded-lg
                 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div
            class="w-8 h-8 rounded-full bg-primary-600
                   flex items-center justify-center text-white font-semibold"
          >
            NST
          </div>

          <div class="hidden md:block text-left">
            <p class="text-sm font-medium">Neo Start Tech</p>
            <p class="text-xs text-gray-500">Administrateur</p>
          </div>
        </button>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar'])

const isDark = ref(false)
const notificationCount = ref(3)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>