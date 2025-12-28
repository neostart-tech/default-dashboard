<template>
  <DashboardLayout>
    <!-- En-tête -->
    <section class="mb-8">
      <nav class="mb-2">
        <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <router-link to="/" class="hover:text-gray-700 dark:hover:text-gray-300">
              Accueil
            </router-link>
          </li>
          <li>/</li>
          <li class="font-medium text-gray-900 dark:text-white">
            Statistiques
          </li>
        </ol>
      </nav>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex-1">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Tableau de bord analytique
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            Visualisez vos performances et prenez des décisions éclairées
          </p>
        </div>
        
        <div class="flex gap-3">
          <button
            @click="rafraichirDonnees"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            :disabled="enCoursDeRafraichissement"
          >
            <svg 
              :class="['w-5 h-5', enCoursDeRafraichissement ? 'animate-spin' : '']" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ enCoursDeRafraichissement ? 'Chargement...' : 'Actualiser' }}
          </button>
          <button
            @click="exporterDonnees"
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

    <!-- Cartes principales -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Visites -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Visites totales</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formaterNombre(statistiques.visites.total) }}</p>
          </div>
          
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center text-sm">
            <span :class="[
              'inline-flex items-center',
              statistiques.visites.evolution >= 0 ? 'text-green-600' : 'text-red-600'
            ]">
              <svg v-if="statistiques.visites.evolution >= 0" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ Math.abs(statistiques.visites.evolution) }}%
            </span>
            <span class="text-gray-500 dark:text-gray-400 ml-2">vs période précédente</span>
          </div>
          <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded">
            {{ statistiques.visites.moyenneQuotidienne }}/jour
          </span>
        </div>
      </div>

      <!-- Utilisateurs actifs -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Utilisateurs actifs</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formaterNombre(statistiques.utilisateursActifs.total) }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center text-sm">
            <span :class="[
              'inline-flex items-center',
              statistiques.utilisateursActifs.evolution >= 0 ? 'text-green-600' : 'text-red-600'
            ]">
              <svg v-if="statistiques.utilisateursActifs.evolution >= 0" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              {{ Math.abs(statistiques.utilisateursActifs.evolution) }}%
            </span>
            <span class="text-gray-500 dark:text-gray-400 ml-2">vs période précédente</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                class="h-full bg-green-500 rounded-full"
                :style="{ width: `${Math.min((statistiques.utilisateursActifs.engagement || 0) * 100, 100)}%` }"
              ></div>
            </div>
            <span class="text-xs text-gray-500">
              {{ Math.round((statistiques.utilisateursActifs.engagement || 0) * 100) }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Conversions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Taux de conversion</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ statistiques.conversions.taux }}%</p>
          </div>
        
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ formaterNombre(statistiques.conversions.total) }} conversions
          </div>
          <span :class="[
            'px-2 py-1 rounded text-xs font-medium',
            statistiques.conversions.tendance === 'hausse' 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
          ]">
            {{ statistiques.conversions.tendance === 'hausse' ? '↑ En hausse' : '↓ En baisse' }}
          </span>
        </div>
      </div>

      <!-- Revenus -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Revenu moyen</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formaterMontant(statistiques.revenus.moyen) }}</p>
          </div>
          
        </div>
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Total: {{ formaterMontant(statistiques.revenus.total) }}
          </div>
          <div class="text-sm">
            <span :class="[
              statistiques.revenus.croissance >= 0 ? 'text-green-600' : 'text-red-600'
            ]">
              {{ statistiques.revenus.croissance >= 0 ? '+' : '' }}{{ statistiques.revenus.croissance }}%
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Graphiques -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Évolution dans le temps -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Évolution dans le temps
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Suivez l'évolution de vos indicateurs
            </p>
          </div>
          <select
            v-model="metriqueGraphique"
            class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="visites">Visites</option>
            <option value="utilisateurs">Utilisateurs</option>
            <option value="conversions">Conversions</option>
            <option value="revenus">Revenus</option>
          </select>
        </div>
        
        <div class="h-64">
          <!-- Graphique simple avec barres -->
          <div class="h-full flex items-end justify-between gap-2 px-4">
            <div 
              v-for="(point, index) in donneesEvolution" 
              :key="index"
              class="flex-1 flex flex-col items-center"
            >
              <div class="w-full flex justify-center">
                <div 
                  class="w-8 rounded-t-md transition-all hover:opacity-80 cursor-pointer"
                  :style="{ 
                    height: `${(point.valeur / valeurMaxGraphique) * 80}%`,
                    backgroundColor: getCouleurMetrique(metriqueGraphique)
                  }"
                  @mouseenter="pointSurvole = index"
                  @mouseleave="pointSurvole = -1"
                ></div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {{ point.jour }}
              </div>
              <div 
                v-if="pointSurvole === index"
                class="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded"
              >
                {{ formaterValeurGraphique(point.valeur) }}
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: getCouleurMetrique(metriqueGraphique) }"></div>
              <span class="text-gray-700 dark:text-gray-300">{{ getLibelleMetrique(metriqueGraphique) }}</span>
            </div>
            <span class="text-gray-500 dark:text-gray-400">
              14 derniers jours
            </span>
          </div>
        </div>
      </div>

      <!-- Sources de trafic -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Sources de trafic
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              D'où viennent vos visiteurs
            </p>
          </div>
          <select
            v-model="typeSourceTrafic"
            class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="visites">Visites</option>
            <option value="conversions">Conversions</option>
          </select>
        </div>
        
        <div class="h-64">
          <div class="h-full flex items-center">
            <!-- Graphique circulaire simple -->
            <div class="relative w-48 h-48">
              <div 
                v-for="(source, index) in sourcesTrafic"
                :key="source.id"
                class="absolute top-0 left-0 w-full h-full"
                :style="{
                  clipPath: `conic-gradient(${source.couleur} 0% ${source.pourcentage}%, transparent ${source.pourcentage}% 100%)`
                }"
              ></div>
              
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex flex-col items-center justify-center">
                <span class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ sourcesTrafic.length }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  sources
                </span>
              </div>
            </div>

            <!-- Légende -->
            <div class="ml-8 space-y-3">
              <div 
                v-for="source in sourcesTrafic" 
                :key="source.id + '-legende'"
                class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
                @mouseenter="sourceSurvolee = source.id"
                @mouseleave="sourceSurvolee = null"
              >
                <div 
                  class="w-4 h-4 rounded" 
                  :style="{ backgroundColor: source.couleur }"
                ></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {{ source.nom }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ source.pourcentage }}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Performances des pages -->
    <section class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Performances des pages
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pages les plus visitées
            </p>
          </div>
          <button
            @click="changerTriPages"
            class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Trier par {{ triPages === 'visites' ? 'visites' : 'temps' }}
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-700">
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Page
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Visites
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Temps moyen
              </th>
              <th class="text-left py-4 px-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                Taux de rebond
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="page in pagesTriees"
              :key="page.id"
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
            >
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                 
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">
                      {{ page.nom }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ page.url }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ formaterNombre(page.visites) }}
                  </p>
                  <p class="text-xs" :class="page.evolutionVisites >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ page.evolutionVisites >= 0 ? '+' : '' }}{{ page.evolutionVisites }}%
                  </p>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-gray-900 dark:text-white">
                    {{ page.tempsMoyen }}
                  </span>
                  <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                    {{ page.evolutionTemps >= 0 ? '+' : '' }}{{ page.evolutionTemps }}s
                  </span>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="flex-1">
                    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        class="h-full rounded-full"
                        :class="getClasseTauxRebond(page.tauxRebond)"
                        :style="{ width: `${page.tauxRebond}%` }"
                      ></div>
                    </div>
                  </div>
                  <span :class="[
                    'text-sm font-medium',
                    getCouleurTexteTauxRebond(page.tauxRebond)
                  ]">
                    {{ page.tauxRebond }}%
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Insights -->
    <section class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Recommandations
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Insight 1 -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <div class="flex items-start gap-3 mb-4">
            
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                Trafic mobile en hausse
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                +32% cette période
              </p>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Pensez à optimiser l'affichage sur mobile pour améliorer l'expérience utilisateur.
          </p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Priorité: Élevée</span>
            <button class="text-blue-600 dark:text-blue-400 hover:underline">
              Voir détails
            </button>
          </div>
        </div>

        <!-- Insight 2 -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <div class="flex items-start gap-3 mb-4">
            
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                Engagement en amélioration
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Temps moyen +45s
              </p>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Les visiteurs restent plus longtemps sur votre site. Continuez dans cette voie.
          </p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Priorité: Moyenne</span>
            <button class="text-blue-600 dark:text-blue-400 hover:underline">
              Voir détails
            </button>
          </div>
        </div>

        <!-- Insight 3 -->
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <div class="flex items-start gap-3 mb-4">
            
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white">
                Opportunité SEO
              </h4>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Trafic organique +15%
              </p>
            </div>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Investissez dans le SEO pour continuer à attirer du trafic gratuit.
          </p>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-400">Priorité: Haute</span>
            <button class="text-blue-600 dark:text-blue-400 hover:underline">
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Résumé -->
    <section class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Aperçu général
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Performance</span>
            <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-medium rounded">
              Excellente
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Objectifs</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">8/10 atteints</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Tendance</span>
            <span class="flex items-center text-green-600 text-sm">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Positive
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Temps moyen</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">4 min 32s</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Pages/visite</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">3.8</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Retour</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">42%</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Source principale</span>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500"></span>
              <span class="text-sm font-medium text-gray-900 dark:text-white">Recherche</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Page populaire</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[150px]">Tableau de bord</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Période active</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">10h-12h</span>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Dernière mise à jour: {{ derniereMiseAJour }}
          </div>
          <button
            @click="programmerRapport"
            class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
          >
            Programmer rapport
          </button>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

// État
const enCoursDeRafraichissement = ref(false)
const metriqueGraphique = ref('visites')
const typeSourceTrafic = ref('visites')
const triPages = ref<'visites' | 'temps'>('visites')
const pointSurvole = ref(-1)
const sourceSurvolee = ref<string | null>(null)

const derniereMiseAJour = ref(new Date().toLocaleTimeString('fr-FR', { 
  hour: '2-digit', 
  minute: '2-digit' 
}))

// Données
const statistiques = reactive({
  visites: {
    total: 12542,
    evolution: 12.5,
    moyenneQuotidienne: '418'
  },
  utilisateursActifs: {
    total: 3248,
    evolution: 8.2,
    engagement: 0.68
  },
  conversions: {
    taux: 3.2,
    total: 401,
    tendance: 'hausse' as 'hausse' | 'baisse'
  },
  revenus: {
    total: 124850,
    moyen: 312.5,
    croissance: 15.3
  }
})

const donneesEvolution = computed(() => {
  const donneesBase = {
    visites: [
      { jour: 'Lun', valeur: 350 },
      { jour: 'Mar', valeur: 420 },
      { jour: 'Mer', valeur: 380 },
      { jour: 'Jeu', valeur: 450 },
      { jour: 'Ven', valeur: 520 },
      { jour: 'Sam', valeur: 480 },
      { jour: 'Dim', valeur: 550 },
      { jour: 'Lun', valeur: 600 },
      { jour: 'Mar', valeur: 580 },
      { jour: 'Mer', valeur: 650 },
      { jour: 'Jeu', valeur: 620 },
      { jour: 'Ven', valeur: 700 },
      { jour: 'Sam', valeur: 680 },
      { jour: 'Dim', valeur: 750 }
    ],
    utilisateurs: [
      { jour: 'Lun', valeur: 85 },
      { jour: 'Mar', valeur: 92 },
      { jour: 'Mer', valeur: 88 },
      { jour: 'Jeu', valeur: 95 },
      { jour: 'Ven', valeur: 102 },
      { jour: 'Sam', valeur: 98 },
      { jour: 'Dim', valeur: 105 },
      { jour: 'Lun', valeur: 110 },
      { jour: 'Mar', valeur: 108 },
      { jour: 'Mer', valeur: 115 },
      { jour: 'Jeu', valeur: 112 },
      { jour: 'Ven', valeur: 120 },
      { jour: 'Sam', valeur: 118 },
      { jour: 'Dim', valeur: 125 }
    ],
    conversions: [
      { jour: 'Lun', valeur: 28 },
      { jour: 'Mar', valeur: 32 },
      { jour: 'Mer', valeur: 30 },
      { jour: 'Jeu', valeur: 35 },
      { jour: 'Ven', valeur: 38 },
      { jour: 'Sam', valeur: 36 },
      { jour: 'Dim', valeur: 40 },
      { jour: 'Lun', valeur: 42 },
      { jour: 'Mar', valeur: 41 },
      { jour: 'Mer', valeur: 45 },
      { jour: 'Jeu', valeur: 44 },
      { jour: 'Ven', valeur: 48 },
      { jour: 'Sam', valeur: 47 },
      { jour: 'Dim', valeur: 50 }
    ],
    revenus: [
      { jour: 'Lun', valeur: 8500 },
      { jour: 'Mar', valeur: 9200 },
      { jour: 'Mer', valeur: 8800 },
      { jour: 'Jeu', valeur: 9500 },
      { jour: 'Ven', valeur: 10200 },
      { jour: 'Sam', valeur: 9800 },
      { jour: 'Dim', valeur: 10500 },
      { jour: 'Lun', valeur: 11000 },
      { jour: 'Mar', valeur: 10800 },
      { jour: 'Mer', valeur: 11500 },
      { jour: 'Jeu', valeur: 11200 },
      { jour: 'Ven', valeur: 12000 },
      { jour: 'Sam', valeur: 11800 },
      { jour: 'Dim', valeur: 12500 }
    ]
  }
  
  return donneesBase[metriqueGraphique.value as keyof typeof donneesBase] || donneesBase.visites
})

const valeurMaxGraphique = computed(() => {
  return Math.max(...donneesEvolution.value.map(p => p.valeur))
})

const sourcesTrafic = computed(() => {
  const sourcesBase = {
    visites: [
      { id: 'recherche', nom: 'Recherche', pourcentage: 36, couleur: '#3b82f6' },
      { id: 'direct', nom: 'Direct', pourcentage: 26, couleur: '#10b981' },
      { id: 'reseaux', nom: 'Réseaux', pourcentage: 20, couleur: '#8b5cf6' },
      { id: 'email', nom: 'Email', pourcentage: 12, couleur: '#f59e0b' },
      { id: 'reference', nom: 'Référence', pourcentage: 6, couleur: '#ef4444' }
    ],
    conversions: [
      { id: 'recherche', nom: 'Recherche', pourcentage: 36, couleur: '#3b82f6' },
      { id: 'direct', nom: 'Direct', pourcentage: 26, couleur: '#10b981' },
      { id: 'reseaux', nom: 'Réseaux', pourcentage: 20, couleur: '#8b5cf6' },
      { id: 'email', nom: 'Email', pourcentage: 12, couleur: '#f59e0b' },
      { id: 'reference', nom: 'Référence', pourcentage: 6, couleur: '#ef4444' }
    ]
  }
  
  return sourcesBase[typeSourceTrafic.value as keyof typeof sourcesBase] || sourcesBase.visites
})

const pagesPerformance = ref([
  { id: 1, nom: 'Tableau de bord', url: '/', visites: 3245, evolutionVisites: 12, tempsMoyen: '5m 24s', evolutionTemps: 45, tauxRebond: 28 },
  { id: 2, nom: 'Statistiques', url: '/analytics', visites: 2850, evolutionVisites: 8, tempsMoyen: '3m 52s', evolutionTemps: 32, tauxRebond: 35 },
  { id: 3, nom: 'Rapports', url: '/reports', visites: 2145, evolutionVisites: 15, tempsMoyen: '4m 18s', evolutionTemps: 28, tauxRebond: 42 },
  { id: 4, nom: 'Paramètres', url: '/settings', visites: 1890, evolutionVisites: 5, tempsMoyen: '2m 36s', evolutionTemps: 15, tauxRebond: 55 },
  { id: 5, nom: 'Utilisateurs', url: '/users', visites: 1620, evolutionVisites: 18, tempsMoyen: '3m 12s', evolutionTemps: 38, tauxRebond: 31 }
])

const pagesTriees = computed(() => {
  return [...pagesPerformance.value].sort((a, b) => {
    if (triPages.value === 'visites') {
      return b.visites - a.visites
    } else {
      const tempsA = parseInt(a.tempsMoyen.split('m')[0]) * 60 + parseInt(a.tempsMoyen.split('m')[1].split('s')[0])
      const tempsB = parseInt(b.tempsMoyen.split('m')[0]) * 60 + parseInt(b.tempsMoyen.split('m')[1].split('s')[0])
      return tempsB - tempsA
    }
  })
})

// Fonctions utilitaires
const formaterNombre = (nombre: number) => {
  return new Intl.NumberFormat('fr-FR').format(nombre)
}

const formaterMontant = (montant: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(montant)
}

const formaterValeurGraphique = (valeur: number) => {
  if (metriqueGraphique.value === 'revenus') {
    return formaterMontant(valeur)
  }
  return formaterNombre(valeur)
}

const getCouleurMetrique = (metrique: string) => {
  switch (metrique) {
    case 'visites': return '#3b82f6'
    case 'utilisateurs': return '#10b981'
    case 'conversions': return '#8b5cf6'
    case 'revenus': return '#f59e0b'
    default: return '#3b82f6'
  }
}

const getLibelleMetrique = (metrique: string) => {
  switch (metrique) {
    case 'visites': return 'Visites'
    case 'utilisateurs': return 'Utilisateurs'
    case 'conversions': return 'Conversions'
    case 'revenus': return 'Revenus'
    default: return metrique
  }
}

const getClasseTauxRebond = (taux: number) => {
  if (taux < 30) return 'bg-green-500'
  if (taux < 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getCouleurTexteTauxRebond = (taux: number) => {
  if (taux < 30) return 'text-green-600 dark:text-green-400'
  if (taux < 50) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

// Actions
const rafraichirDonnees = () => {
  enCoursDeRafraichissement.value = true
  
  setTimeout(() => {
    statistiques.visites.total += Math.floor(Math.random() * 100) - 50
    statistiques.visites.evolution = (Math.random() * 20) - 10
    
    statistiques.utilisateursActifs.total += Math.floor(Math.random() * 50) - 25
    statistiques.utilisateursActifs.evolution = (Math.random() * 15) - 7.5
    
    statistiques.conversions.taux = 3.2 + (Math.random() * 0.4 - 0.2)
    statistiques.conversions.total += Math.floor(Math.random() * 20) - 10
    
    statistiques.revenus.total += Math.floor(Math.random() * 5000) - 2500
    statistiques.revenus.croissance = (Math.random() * 10) - 5
    
    derniereMiseAJour.value = new Date().toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    enCoursDeRafraichissement.value = false
  }, 1500)
}

const exporterDonnees = () => {
  alert('Export des données en cours...')
}

const changerTriPages = () => {
  triPages.value = triPages.value === 'visites' ? 'temps' : 'visites'
}

const programmerRapport = () => {
  alert('Programmation du rapport...')
}
</script>

<style scoped>
.animate-spin {
  animation: tourner 1s linear infinite;
}

@keyframes tourner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>