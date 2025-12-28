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
          <li class="font-medium text-gray-900 dark:text-white">
            Rapports
          </li>
        </ol>
      </nav>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex-1">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Rapports
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Analysez les performances, générez des rapports détaillés et suivez les indicateurs clés.
          </p>
        </div>
        
        <div class="flex gap-3">
          <button
            @click="generateReport"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouveau rapport
          </button>
          <button
            @click="exportAllReports"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exporter
          </button>
        </div>
      </div>
    </section>

    <!-- Filtres rapides -->
    <section class="mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            Filtres de rapport
          </h2>
          <div class="flex gap-2">
            <button
              @click="applyFilters"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Appliquer
            </button>
            <button
              @click="resetFilters"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Période -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Période
            </label>
            <select
              v-model="filters.period"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Aujourd'hui</option>
              <option value="yesterday">Hier</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
              <option value="custom">Personnalisée</option>
            </select>
          </div>

          <!-- Type de rapport -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de rapport
            </label>
            <select
              v-model="filters.reportType"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="performance">Performance</option>
              <option value="financial">Financier</option>
              <option value="user">Utilisateurs</option>
              <option value="system">Système</option>
              <option value="security">Sécurité</option>
            </select>
          </div>

          <!-- Statut -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Statut
            </label>
            <select
              v-model="filters.status"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="completed">Complété</option>
              <option value="pending">En attente</option>
              <option value="failed">Échoué</option>
              <option value="processing">En traitement</option>
            </select>
          </div>

          <!-- Auteur -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Auteur
            </label>
            <select
              v-model="filters.author"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les auteurs</option>
              <option v-for="user in authors" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Dates personnalisées -->
        <div v-if="filters.period === 'custom'" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date de début
            </label>
            <input
              type="date"
              v-model="filters.startDate"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date de fin
            </label>
            <input
              type="date"
              v-model="filters.endDate"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Métriques -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Rapports générés</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ metrics.totalReports }}</p>
          </div>
          
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span :class="[
              'inline-flex items-center',
              metrics.reportsChange >= 0 ? 'text-green-600' : 'text-red-600'
            ]">
              <svg v-if="metrics.reportsChange >= 0" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ Math.abs(metrics.reportsChange) }}%
            </span>
            <span class="text-gray-500 dark:text-gray-400 ml-2">vs mois dernier</span>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Rapports en attente</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ metrics.pendingReports }}</p>
          </div>
          
        </div>
        <div class="mt-4">
          <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-yellow-500 rounded-full transition-all duration-500"
              :style="{ width: `${(metrics.pendingReports / metrics.totalReports) * 100 || 0}%` }"
            ></div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Taille moyenne</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ metrics.averageSize }}</p>
          </div>
         
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            Dernière génération: {{ metrics.lastGeneration }}
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Taux de succès</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ metrics.successRate }}%</p>
          </div>
          
        </div>
        <div class="mt-4">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Performance</span>
            <span :class="[
              'font-medium',
              metrics.successRate >= 90 ? 'text-green-600' :
              metrics.successRate >= 70 ? 'text-yellow-600' : 'text-red-600'
            ]">
              {{ metrics.successRate >= 90 ? 'Excellent' : metrics.successRate >= 70 ? 'Bon' : 'À améliorer' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Graphiques principaux -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Évolution des rapports -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Évolution des rapports
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Nombre de rapports générés par mois
            </p>
          </div>
          <select
            v-model="chartPeriod"
            class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="refreshCharts"
          >
            <option value="6months">6 derniers mois</option>
            <option value="year">Cette année</option>
            <option value="all">Tout l'historique</option>
          </select>
        </div>
        <div class="h-64 relative">
          <!-- Graphique SVG simple -->
          <svg class="w-full h-full" viewBox="0 0 500 250">
            <!-- Axe X -->
            <line x1="50" y1="200" x2="450" y2="200" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2"/>
            
            <!-- Axe Y -->
            <line x1="50" y1="50" x2="50" y2="200" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2"/>
            
            <!-- Grille horizontale -->
            <line x1="50" y1="150" x2="450" y2="150" stroke="currentColor" class="text-gray-200 dark:text-gray-700" stroke-width="1" stroke-dasharray="5,5"/>
            <line x1="50" y1="100" x2="450" y2="100" stroke="currentColor" class="text-gray-200 dark:text-gray-700" stroke-width="1" stroke-dasharray="5,5"/>
            <line x1="50" y1="50" x2="450" y2="50" stroke="currentColor" class="text-gray-200 dark:text-gray-700" stroke-width="1" stroke-dasharray="5,5"/>
            
            <!-- Ligne du graphique -->
            <path 
              :d="getLineChartPath()" 
              fill="none" 
              stroke="#3b82f6" 
              stroke-width="3" 
              class="transition-all duration-500"
            />
            
            <!-- Points -->
            <circle 
              v-for="(point, index) in lineChartPoints" 
              :key="index"
              :cx="getXPosition(index)" 
              :cy="getYPosition(point.value)" 
              r="4" 
              fill="#3b82f6"
              class="cursor-pointer hover:r-6 transition-all"
              @mouseenter="hoveredPoint = index"
              @mouseleave="hoveredPoint = -1"
            />
            
            <!-- Tooltip -->
            <g v-if="hoveredPoint >= 0">
              <rect 
                :x="getXPosition(hoveredPoint) - 40" 
                :y="getYPosition(lineChartPoints[hoveredPoint].value) - 50" 
                width="80" 
                height="30" 
                rx="6" 
                fill="#1f2937" 
                class="shadow-lg"
              />
              <text 
                :x="getXPosition(hoveredPoint)" 
                :y="getYPosition(lineChartPoints[hoveredPoint].value) - 30" 
                text-anchor="middle" 
                fill="white" 
                font-size="12"
              >
                {{ lineChartPoints[hoveredPoint].label }}: {{ lineChartPoints[hoveredPoint].value }}
              </text>
            </g>
            
            <!-- Labels axe X -->
            <text 
              v-for="(point, index) in lineChartPoints" 
              :key="'label-' + index"
              :x="getXPosition(index)" 
              y="220" 
              text-anchor="middle" 
              fill="currentColor" 
              class="text-gray-500 dark:text-gray-400 text-sm"
            >
              {{ point.label }}
            </text>
            
            <!-- Labels axe Y -->
            <text x="30" y="205" text-anchor="end" fill="currentColor" class="text-gray-500 dark:text-gray-400 text-sm">0</text>
            <text x="30" y="155" text-anchor="end" fill="currentColor" class="text-gray-500 dark:text-gray-400 text-sm">20</text>
            <text x="30" y="105" text-anchor="end" fill="currentColor" class="text-gray-500 dark:text-gray-400 text-sm">40</text>
            <text x="30" y="55" text-anchor="end" fill="currentColor" class="text-gray-500 dark:text-gray-400 text-sm">60</text>
          </svg>
          
          <!-- Légende -->
          <div class="absolute bottom-0 left-0 right-0 flex justify-center mt-4">
            <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div class="w-3 h-3 rounded-full bg-blue-500"></div>
              <span class="text-sm text-gray-700 dark:text-gray-300">Rapports générés par mois</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Répartition par type -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Répartition par type
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Distribution des rapports par catégorie
            </p>
          </div>
          <button
            @click="refreshCharts"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div class="h-64">
          <!-- Graphique circulaire SVG -->
          <div class="flex items-center justify-center h-full">
            <svg class="w-48 h-48" viewBox="0 0 100 100">
              <!-- Camembert -->
              <circle 
                v-for="(slice, index) in pieChartSlices" 
                :key="index"
                :cx="50" 
                :cy="50" 
                :r="40" 
                :fill="slice.color"
                :stroke="slice.borderColor"
                stroke-width="2"
                :transform="`rotate(${slice.startAngle - 90}, 50, 50)`"
                :stroke-dasharray="`${slice.dashArray} 251.2`"
                stroke-dashoffset="0"
                class="transition-all duration-500"
              />
              
              <!-- Centre -->
              <circle cx="50" cy="50" r="20" fill="white" class="dark:fill-gray-800"/>
              
              <!-- Total -->
              <text x="50" y="50" text-anchor="middle" dy="0.3em" font-size="12" font-weight="bold" fill="currentColor" class="text-gray-900 dark:text-white">
                {{ pieChartTotal }}
              </text>
              <text x="50" y="60" text-anchor="middle" dy="0.3em" font-size="8" fill="currentColor" class="text-gray-500 dark:text-gray-400">
                rapports
              </text>
            </svg>
            
            <!-- Légende -->
            <div class="ml-8 space-y-2">
              <div 
                v-for="(slice, index) in pieChartSlices" 
                :key="'legend-' + index"
                class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                @mouseenter="hoveredSlice = index"
                @mouseleave="hoveredSlice = -1"
              >
                <div 
                  class="w-4 h-4 rounded" 
                  :style="{ backgroundColor: slice.color, borderColor: slice.borderColor, borderWidth: '2px' }"
                ></div>
                <span class="text-sm text-gray-700 dark:text-gray-300">
                  {{ slice.label }} ({{ slice.value }}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Liste des rapports -->
    <section class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <!-- En-tête du tableau -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Rapports récents
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ filteredReports.length }} rapport(s) trouvé(s)
            </p>
          </div>
          
          <div class="flex items-center gap-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un rapport..."
                class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
              <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button
              @click="toggleViewMode"
              class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              :title="viewMode === 'grid' ? 'Vue liste' : 'Vue grille'"
            >
              <svg v-if="viewMode === 'grid'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Vue grille -->
      <div v-if="viewMode === 'grid'" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="report in paginatedReports"
            :key="report.id"
            class="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  getReportTypeColor(report.type).bg
                ]">
                  <span :class="getReportTypeColor(report.type).text">
                    {{ getReportIcon(report.type) }}
                  </span>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white line-clamp-1">
                    {{ report.title }}
                  </h4>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(report.createdAt) }}
                  </p>
                </div>
              </div>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusClass(report.status)
              ]">
                {{ getStatusLabel(report.status) }}
              </span>
            </div>
            
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {{ report.description }}
            </p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <span>{{ report.author }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span>{{ report.duration }}</span>
              </div>
            </div>
            
            <div class="flex gap-2">
              <button
                @click="viewReport(report)"
                class="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Voir
              </button>
              <button
                @click="downloadReport(report)"
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                :disabled="report.status !== 'completed'"
                :class="{ 'opacity-50 cursor-not-allowed': report.status !== 'completed' }"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button
                @click="deleteReport(report)"
                class="px-3 py-2 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue tableau -->
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Titre
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Statut
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Créé le
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Auteur
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="report in paginatedReports"
              :key="report.id"
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <td class="py-4 px-6">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ report.title }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {{ report.description }}
                  </p>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center',
                    getReportTypeColor(report.type).bg
                  ]">
                    <span :class="getReportTypeColor(report.type).text">
                      {{ getReportIcon(report.type) }}
                    </span>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {{ report.type }}
                  </span>
                </div>
              </td>
              <td class="py-4 px-6">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  getStatusClass(report.status)
                ]">
                  {{ getStatusLabel(report.status) }}
                </span>
              </td>
              <td class="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(report.createdAt) }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {{ getInitials(report.author) }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-900 dark:text-white">
                    {{ report.author }}
                  </span>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <button
                    @click="viewReport(report)"
                    class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                    title="Voir"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="downloadReport(report)"
                    class="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition"
                    :disabled="report.status !== 'completed'"
                    :class="{ 'opacity-50 cursor-not-allowed': report.status !== 'completed' }"
                    title="Télécharger"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    @click="deleteReport(report)"
                    class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    title="Supprimer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Affichage de {{ startIndex + 1 }} à {{ endIndex }} sur {{ filteredReports.length }} rapports
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div class="flex items-center gap-1">
              <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition',
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
              class="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de génération de rapport -->
    <div
      v-if="showGenerateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <!-- En-tête -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Générer un nouveau rapport
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Configurez les paramètres de votre rapport
            </p>
          </div>
          <button
            @click="showGenerateModal = false"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Contenu -->
        <div class="p-6 space-y-6">
          <!-- Titre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Titre du rapport
            </label>
            <input
              v-model="newReport.title"
              type="text"
              placeholder="Ex: Rapport mensuel des ventes"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              v-model="newReport.description"
              rows="3"
              placeholder="Description détaillée du rapport..."
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Type et format -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type de rapport
              </label>
              <select
                v-model="newReport.type"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="performance">Performance</option>
                <option value="financial">Financier</option>
                <option value="user">Utilisateurs</option>
                <option value="system">Système</option>
                <option value="security">Sécurité</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Format d'export
              </label>
              <select
                v-model="newReport.format"
                class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
            </div>
          </div>

          <!-- Période -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Période
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Date de début</label>
                <input
                  v-model="newReport.startDate"
                  type="date"
                  class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Date de fin</label>
                <input
                  v-model="newReport.endDate"
                  type="date"
                  class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Options supplémentaires -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Options supplémentaires
            </h4>
            <div class="space-y-2">
              <label class="flex items-center gap-2">
                <input
                  v-model="newReport.includeCharts"
                  type="checkbox"
                  class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Inclure les graphiques</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="newReport.includeDetails"
                  type="checkbox"
                  class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Inclure les détails complets</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="newReport.emailNotification"
                  type="checkbox"
                  class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Notification par email à la fin</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Pied -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            @click="showGenerateModal = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Annuler
          </button>
          <button
            @click="submitNewReport"
            :disabled="!newReport.title"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg v-if="generating" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span v-else>Générer le rapport</span>
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

// Types
interface Report {
  id: number
  title: string
  description: string
  type: 'performance' | 'financial' | 'user' | 'system' | 'security'
  status: 'completed' | 'pending' | 'failed' | 'processing'
  createdAt: string
  author: string
  duration: string
  size?: string
}

interface NewReport {
  title: string
  description: string
  type: Report['type']
  format: 'pdf' | 'excel' | 'csv' | 'json'
  startDate: string
  endDate: string
  includeCharts: boolean
  includeDetails: boolean
  emailNotification: boolean
}

interface Filters {
  period: string
  reportType: string
  status: string
  author: string
  startDate: string
  endDate: string
}

interface Metrics {
  totalReports: number
  pendingReports: number
  averageSize: string
  successRate: number
  reportsChange: number
  lastGeneration: string
}

interface ChartPoint {
  label: string
  value: number
}

interface PieSlice {
  label: string
  value: number
  color: string
  borderColor: string
  startAngle: number
  dashArray: number
}

// État
const showGenerateModal = ref(false)
const generating = ref(false)
const viewMode = ref<'grid' | 'table'>('grid')
const searchQuery = ref('')
const chartPeriod = ref('6months')
const currentPage = ref(1)
const hoveredPoint = ref(-1)
const hoveredSlice = ref(-1)
const itemsPerPage = 9

const filters = reactive<Filters>({
  period: 'month',
  reportType: '',
  status: '',
  author: '',
  startDate: '',
  endDate: ''
})

const newReport = reactive<NewReport>({
  title: '',
  description: '',
  type: 'performance',
  format: 'pdf',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  includeCharts: true,
  includeDetails: true,
  emailNotification: false
})

const metrics = reactive<Metrics>({
  totalReports: 0,
  pendingReports: 0,
  averageSize: '2.4 MB',
  successRate: 92,
  reportsChange: 15,
  lastGeneration: '10 min'
})

// Données
const reports = ref<Report[]>([
  {
    id: 1,
    title: 'Rapport mensuel des performances',
    description: 'Analyse détaillée des performances du système pour le mois dernier',
    type: 'performance',
    status: 'completed',
    createdAt: '2024-01-15',
    author: 'Admin System',
    duration: '15 min',
    size: '3.2 MB'
  },
  {
    id: 2,
    title: 'Analyse financière Q4 2023',
    description: 'Rapport financier complet pour le quatrième trimestre 2023',
    type: 'financial',
    status: 'completed',
    createdAt: '2024-01-10',
    author: 'Jane Smith',
    duration: '45 min',
    size: '4.8 MB'
  },
  {
    id: 3,
    title: 'Activité des utilisateurs - Décembre',
    description: 'Suivi des activités et engagement des utilisateurs',
    type: 'user',
    status: 'processing',
    createdAt: '2024-01-12',
    author: 'Support Team',
    duration: '25 min',
    size: '1.5 MB'
  },
  {
    id: 4,
    title: 'Audit de sécurité système',
    description: 'Rapport complet des audits de sécurité et vulnérabilités',
    type: 'security',
    status: 'pending',
    createdAt: '2024-01-08',
    author: 'Security Team',
    duration: '60 min',
    size: '5.2 MB'
  },
  {
    id: 5,
    title: 'Statistiques des erreurs système',
    description: 'Analyse des erreurs et problèmes système survenus',
    type: 'system',
    status: 'failed',
    createdAt: '2024-01-05',
    author: 'Tech Team',
    duration: '30 min',
    size: '2.1 MB'
  },
  {
    id: 6,
    title: 'Rapport des conversions',
    description: 'Suivi des conversions et taux de réussite',
    type: 'performance',
    status: 'completed',
    createdAt: '2024-01-03',
    author: 'Marketing Team',
    duration: '20 min',
    size: '1.8 MB'
  },
  {
    id: 7,
    title: 'Analyse des coûts infrastructure',
    description: 'Détail des coûts d\'infrastructure et optimisation',
    type: 'financial',
    status: 'completed',
    createdAt: '2024-01-01',
    author: 'Finance Team',
    duration: '35 min',
    size: '3.5 MB'
  },
  {
    id: 8,
    title: 'Nouveaux utilisateurs - Janvier',
    description: 'Analyse des nouvelles inscriptions et onboarding',
    type: 'user',
    status: 'completed',
    createdAt: '2024-01-18',
    author: 'Growth Team',
    duration: '18 min',
    size: '2.3 MB'
  },
  {
    id: 9,
    title: 'Test de pénétration réseau',
    description: 'Résultats des tests de pénétration et recommandations',
    type: 'security',
    status: 'processing',
    createdAt: '2024-01-16',
    author: 'Security Team',
    duration: '90 min',
    size: '6.7 MB'
  }
])

const authors = [
  { id: '1', name: 'Admin System' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Support Team' },
  { id: '4', name: 'Security Team' },
  { id: '5', name: 'Tech Team' },
  { id: '6', name: 'Marketing Team' },
  { id: '7', name: 'Finance Team' },
  { id: '8', name: 'Growth Team' }
]

// Données pour les graphiques SVG
const lineChartPoints = computed<ChartPoint[]>(() => {
  if (chartPeriod.value === '6months') {
    return [
      { label: 'Jul', value: 12 },
      { label: 'Aug', value: 19 },
      { label: 'Sep', value: 15 },
      { label: 'Oct', value: 25 },
      { label: 'Nov', value: 22 },
      { label: 'Dec', value: 30 }
    ]
  } else if (chartPeriod.value === 'year') {
    return [
      { label: 'Jan', value: 12 },
      { label: 'Fév', value: 19 },
      { label: 'Mar', value: 15 },
      { label: 'Avr', value: 25 },
      { label: 'Mai', value: 22 },
      { label: 'Jun', value: 30 },
      { label: 'Jul', value: 28 },
      { label: 'Aoû', value: 35 },
      { label: 'Sep', value: 32 },
      { label: 'Oct', value: 40 },
      { label: 'Nov', value: 38 },
      { label: 'Dec', value: 45 }
    ]
  } else {
    return [
      { label: '2021', value: 120 },
      { label: '2022', value: 250 },
      { label: '2023', value: 380 },
      { label: '2024', value: 450 }
    ]
  }
})

const pieChartSlices = computed<PieSlice[]>(() => {
  const total = reports.value.length
  const types = {
    performance: reports.value.filter(r => r.type === 'performance').length,
    financial: reports.value.filter(r => r.type === 'financial').length,
    user: reports.value.filter(r => r.type === 'user').length,
    system: reports.value.filter(r => r.type === 'system').length,
    security: reports.value.filter(r => r.type === 'security').length
  }

  const colors = [
    { color: 'rgba(59, 130, 246, 0.8)', border: 'rgba(59, 130, 246, 1)' }, // Bleu
    { color: 'rgba(16, 185, 129, 0.8)', border: 'rgba(16, 185, 129, 1)' }, // Vert
    { color: 'rgba(139, 92, 246, 0.8)', border: 'rgba(139, 92, 246, 1)' }, // Violet
    { color: 'rgba(245, 158, 11, 0.8)', border: 'rgba(245, 158, 11, 1)' }, // Jaune
    { color: 'rgba(239, 68, 68, 0.8)', border: 'rgba(239, 68, 68, 1)' }   // Rouge
  ]

  const labels = ['Performance', 'Financier', 'Utilisateurs', 'Système', 'Sécurité']
  const values = [types.performance, types.financial, types.user, types.system, types.security]
  
  let startAngle = 0
  const slices: PieSlice[] = []

  values.forEach((value, index) => {
    if (value > 0) {
      const percentage = (value / total) * 100
      const dashArray = (percentage / 100) * 251.2 // Circonférence du cercle (2πr = 2 * 3.14 * 40 = 251.2)
      
      slices.push({
        label: labels[index],
        value: Math.round(percentage),
        color: colors[index].color,
        borderColor: colors[index].border,
        startAngle: startAngle,
        dashArray: dashArray
      })
      
      startAngle += (value / total) * 360
    }
  })

  return slices
})

const pieChartTotal = computed(() => {
  return reports.value.length
})

// Computed
const filteredReports = computed(() => {
  let result = reports.value

  // Filtre de recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(report =>
      report.title.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query) ||
      report.author.toLowerCase().includes(query)
    )
  }

  // Filtres avancés
  if (filters.reportType) {
    result = result.filter(report => report.type === filters.reportType)
  }

  if (filters.status) {
    result = result.filter(report => report.status === filters.status)
  }

  if (filters.author) {
    const author = authors.find(a => a.id === filters.author)
    if (author) {
      result = result.filter(report => report.author === author.name)
    }
  }

  // Filtre par période
  if (filters.period !== 'custom') {
    const now = new Date()
    let startDate = new Date()
    
    switch (filters.period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0)
        break
      case 'yesterday':
        startDate.setDate(now.getDate() - 1)
        startDate.setHours(0, 0, 0, 0)
        break
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
    }
    
    result = result.filter(report => new Date(report.createdAt) >= startDate)
  } else if (filters.startDate && filters.endDate) {
    const start = new Date(filters.startDate)
    const end = new Date(filters.endDate)
    end.setHours(23, 59, 59, 999)
    
    result = result.filter(report => {
      const date = new Date(report.createdAt)
      return date >= start && date <= end
    })
  }

  return result
})

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredReports.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredReports.value.length / itemsPerPage)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, filteredReports.value.length)
})

// Méthodes pour les graphiques SVG
const getXPosition = (index: number) => {
  const spacing = 400 / (lineChartPoints.value.length - 1)
  return 50 + (index * spacing)
}

const getYPosition = (value: number) => {
  const maxValue = Math.max(...lineChartPoints.value.map(p => p.value))
  const scale = 150 / (maxValue || 1)
  return 200 - (value * scale)
}

const getLineChartPath = () => {
  if (lineChartPoints.value.length === 0) return ''
  
  const path = lineChartPoints.value.map((point, index) => {
    const x = getXPosition(index)
    const y = getYPosition(point.value)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
  
  return path
}

// Méthodes principales
const updateMetrics = () => {
  metrics.totalReports = reports.value.length
  metrics.pendingReports = reports.value.filter(r => r.status === 'pending' || r.status === 'processing').length
}

const applyFilters = () => {
  currentPage.value = 1
  updateMetrics()
}

const resetFilters = () => {
  Object.assign(filters, {
    period: 'month',
    reportType: '',
    status: '',
    author: '',
    startDate: '',
    endDate: ''
  })
  searchQuery.value = ''
  currentPage.value = 1
  updateMetrics()
}

const generateReport = () => {
  Object.assign(newReport, {
    title: '',
    description: '',
    type: 'performance',
    format: 'pdf',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    includeCharts: true,
    includeDetails: true,
    emailNotification: false
  })
  showGenerateModal.value = true
}

const submitNewReport = () => {
  if (!newReport.title.trim()) return

  generating.value = true

  // Simuler la génération
  setTimeout(() => {
    const newId = Math.max(...reports.value.map(r => r.id)) + 1
    
    reports.value.unshift({
      id: newId,
      title: newReport.title,
      description: newReport.description || 'Rapport généré automatiquement',
      type: newReport.type,
      status: 'processing',
      createdAt: new Date().toISOString().split('T')[0],
      author: 'Utilisateur courant',
      duration: 'En cours...'
    })

    showGenerateModal.value = false
    generating.value = false
    updateMetrics()

    // Simuler la fin du traitement
    setTimeout(() => {
      const report = reports.value.find(r => r.id === newId)
      if (report) {
        report.status = 'completed'
        report.duration = `${Math.floor(Math.random() * 30) + 5} min`
        report.size = `${(Math.random() * 4 + 1).toFixed(1)} MB`
        updateMetrics()
      }
    }, 3000)
  }, 1000)
}

const viewReport = (report: Report) => {
  console.log('Voir rapport:', report)
  // Navigation vers la page de détails
}

const downloadReport = (report: Report) => {
  if (report.status !== 'completed') return
  
  console.log('Télécharger rapport:', report)
  // Logique de téléchargement
  alert(`Téléchargement du rapport "${report.title}" en cours...`)
}

const deleteReport = (report: Report) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le rapport "${report.title}" ?`)) {
    const index = reports.value.findIndex(r => r.id === report.id)
    if (index !== -1) {
      reports.value.splice(index, 1)
      updateMetrics()
    }
  }
}

const exportAllReports = () => {
  console.log('Exporter tous les rapports')
  // Logique d'export
  alert('Export des rapports en cours...')
}

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'table' : 'grid'
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

const refreshCharts = () => {
  // Pourrait rafraîchir les données des graphiques
  console.log('Rafraîchissement des graphiques')
}

// Fonctions utilitaires
const getReportIcon = (type: string) => {
  switch (type) {
    case 'performance': return '📈'
    case 'financial': return '💰'
    case 'user': return '👥'
    case 'system': return '⚙️'
    case 'security': return '🔒'
    default: return '📄'
  }
}

const getReportTypeColor = (type: string) => {
  switch (type) {
    case 'performance':
      return { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-400' }
    case 'financial':
      return { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-600 dark:text-green-400' }
    case 'user':
      return { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-400' }
    case 'system':
      return { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-600 dark:text-yellow-400' }
    case 'security':
      return { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-600 dark:text-red-400' }
    default:
      return { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-600 dark:text-gray-400' }
  }
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
    case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
    case 'processing': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
    case 'failed': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
    default: return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Complété'
    case 'pending': return 'En attente'
    case 'processing': return 'En cours'
    case 'failed': return 'Échoué'
    default: return status
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Cycle de vie
onMounted(() => {
  updateMetrics()
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Styles pour les graphiques SVG */
text {
  font-family: system-ui, -apple-system, sans-serif;
}
</style>