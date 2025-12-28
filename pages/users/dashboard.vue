<template>
  <DashboardLayout>
    <!-- Header / Breadcrumb -->
    <section class="mb-8">
      <nav aria-label="Breadcrumb" class="mb-2">
        <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <router-link to="/" class="hover:text-gray-700 dark:hover:text-gray-300">
              Tableau de bord
            </router-link>
          </li>
          <li>/</li>
          <li>
            <router-link to="/users" class="hover:text-gray-700 dark:hover:text-gray-300">
              Utilisateurs
            </router-link>
          </li>
          <li>/</li>
          <li class="font-medium text-gray-900 dark:text-white">
            Statistiques
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Statistiques utilisateurs
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Analyse et visualisation des données utilisateurs.
        </p>
      </div>
    </section>

    <!-- Filtres -->
    <section class="mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Période
            </label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>3 derniers mois</option>
              <option>Cette année</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de graphique
            </label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Barres</option>
              <option>Lignes</option>
              <option>Aires</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Grouper par
            </label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Jour</option>
              <option>Semaine</option>
              <option>Mois</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Métrique
            </label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Nouveaux utilisateurs</option>
              <option>Connexions</option>
              <option>Activité</option>
              <option>Retention</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Graphiques -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Graphique principal -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Activité des utilisateurs (30 jours)
          </h2>
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Exporter
          </button>
        </div>
        <div class="h-80 flex items-end gap-2">
          <div
            v-for="(value, index) in activityData"
            :key="index"
            class="flex-1 flex flex-col items-center"
          >
            <div
              class="w-10 bg-blue-500 hover:bg-blue-600 rounded-t-lg transition-all cursor-pointer"
              :style="{ height: value + '%' }"
              :title="value + ' utilisateurs'"
            ></div>
            <span class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {{ ['L', 'M', 'M', 'J', 'V', 'S', 'D'][index % 7] }}
            </span>
          </div>
        </div>
      </div>

      <!-- Répartition -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Répartition par rôle
        </h2>
        <div class="flex items-center gap-8">
          <!-- Diagramme circulaire -->
          <div class="relative w-48 h-48">
            <svg viewBox="0 0 100 100" class="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                stroke-width="20"
                stroke-dasharray="25 100"
                stroke-dashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#8b5cf6"
                stroke-width="20"
                stroke-dasharray="20 100"
                stroke-dashoffset="-25"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10b981"
                stroke-width="20"
                stroke-dasharray="55 100"
                stroke-dashoffset="-45"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">1,248</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Total</div>
              </div>
            </div>
          </div>

          <!-- Légende -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-blue-500"></div>
              <div class="flex-1">
                <span class="text-sm font-medium text-gray-900 dark:text-white">Administrateurs</span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">15%</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-purple-500"></div>
              <div class="flex-1">
                <span class="text-sm font-medium text-gray-900 dark:text-white">Modérateurs</span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">20%</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-4 h-4 rounded-full bg-green-500"></div>
              <div class="flex-1">
                <span class="text-sm font-medium text-gray-900 dark:text-white">Utilisateurs</span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">65%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tableaux statistiques -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Top utilisateurs -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Top utilisateurs actifs
          </h2>
        </div>
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="user in topUsers"
            :key="user.id"
            class="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span class="text-blue-600 dark:text-blue-400 font-medium">
                  {{ user.initials }}
                </span>
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ user.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ user.activity }} activités
                </p>
              </div>
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ user.lastActive }}
            </span>
          </div>
        </div>
      </div>

      <!-- Statistiques par heure -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Activité par heure (moyenne)
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div
              v-for="hour in hourlyActivity"
              :key="hour.time"
              class="flex items-center gap-4"
            >
              <span class="w-16 text-sm text-gray-500 dark:text-gray-400">
                {{ hour.time }}
              </span>
              <div class="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div
                  class="h-full bg-green-500"
                  :style="{ width: hour.percentage + '%' }"
                ></div>
              </div>
              <span class="w-12 text-right text-sm font-medium text-gray-900 dark:text-white">
                {{ hour.value }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

// Données de graphique
const activityData = [40, 60, 45, 75, 65, 80, 70, 55, 85, 90, 75, 80, 65, 70, 85, 90, 75, 60, 65, 70, 80, 85, 90, 95, 85, 80, 75, 70, 65, 60]

// Top utilisateurs
const topUsers = [
  { id: 1, name: 'Neo Start Tech', initials: 'NT', activity: 248, lastActive: 'Il y a 2h' },
  { id: 2, name: 'Jane Smith', initials: 'JS', activity: 187, lastActive: 'Il y a 5h' },
  { id: 3, name: 'Bob Johnson', initials: 'BJ', activity: 156, lastActive: 'Il y a 1j' },
  { id: 4, name: 'Alice Brown', initials: 'AB', activity: 142, lastActive: 'Il y a 2j' },
  { id: 5, name: 'Charlie Wilson', initials: 'CW', activity: 128, lastActive: 'Il y a 3j' }
]

// Activité par heure
const hourlyActivity = [
  { time: '00h-04h', value: '12', percentage: 15 },
  { time: '04h-08h', value: '25', percentage: 30 },
  { time: '08h-12h', value: '65', percentage: 80 },
  { time: '12h-16h', value: '48', percentage: 60 },
  { time: '16h-20h', value: '72', percentage: 90 },
  { time: '20h-00h', value: '40', percentage: 50 }
]
</script>