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
            Paramètres
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Paramètres du système
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Personnalisez l'apparence et le comportement de l'application.
        </p>
      </div>
    </section>

    <!-- Grille de paramètres - Layout flex deux par deux -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Colonne gauche : Thème et Layout -->
      <div class="space-y-8">
        <!-- Section Thème -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Personnalisation du thème
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Ajustez l'apparence de l'interface
              </p>
            </div>
            <button
              @click="resetTheme"
              class="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 transition"
            >
              Réinitialiser
            </button>
          </div>

          <!-- Mode du thème -->
          <div class="mb-8">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Mode du thème
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                v-for="mode in themeModes"
                :key="mode.value"
                @click="updateThemeSetting('mode', mode.value)"
                :class="[
                  'px-4 py-4 rounded-lg border text-left transition-all duration-200',
                  themeSettings.mode === mode.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
                ]"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div :class="[
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      mode.value === 'light' ? 'bg-yellow-100 text-yellow-600' :
                      mode.value === 'dark' ? 'bg-gray-800 text-gray-300' :
                      'bg-blue-100 text-blue-600'
                    ]">
                      <span class="text-lg">{{ mode.icon }}</span>
                    </div>
                    <div class="text-left">
                      <span class="font-medium text-gray-900 dark:text-white block">
                        {{ mode.label }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ mode.description }}
                      </span>
                    </div>
                  </div>
                  <svg
                    v-if="themeSettings.mode === mode.value"
                    class="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Couleurs principales -->
          <div class="mb-8">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Couleur principale
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Choisissez la couleur d'accentuation de l'interface
            </p>
            <div class="grid grid-cols-5 sm:grid-cols-10 gap-3">
              <button
                v-for="color in themeColors"
                :key="color.value"
                @click="updateThemeSetting('primaryColor', color.value)"
                :class="[
                  'relative w-full aspect-square rounded-lg border-2 transition-transform hover:scale-105',
                  themeSettings.primaryColor === color.value
                    ? 'border-gray-800 dark:border-white scale-105'
                    : 'border-gray-300 dark:border-gray-600',
                ]"
                :style="{ backgroundColor: color.value }"
                :title="color.name"
              >
                <svg
                  v-if="themeSettings.primaryColor === color.value"
                  class="w-5 h-5 absolute inset-0 m-auto text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="absolute bottom-1 left-1 right-1">
                  <span 
                    class="text-xs font-medium text-white truncate block text-center" 
                    :style="{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }"
                  >
                    {{ color.name }}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- Contraste -->
          <div class="mb-8">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Contraste du thème
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="contrast in contrasts"
                :key="contrast.value"
                @click="updateThemeSetting('contrast', contrast.value)"
                :class="[
                  'px-4 py-4 rounded-lg border text-left transition-all duration-200',
                  themeSettings.contrast === contrast.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
                ]"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div :class="[
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      contrast.value === 'default' ? 'bg-gray-100 text-gray-600' : 'bg-gray-900 text-white'
                    ]">
                      <span class="text-lg">{{ contrast.icon }}</span>
                    </div>
                    <div>
                      <span class="font-medium text-gray-900 dark:text-white block">
                        {{ contrast.label }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-gray-400">
                        {{ contrast.description }}
                      </span>
                    </div>
                  </div>
                  <svg
                    v-if="themeSettings.contrast === contrast.value"
                    class="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Options d'affichage -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Options d'affichage
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span class="text-lg">📐</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">
                      Légende sidebar
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Afficher les titres dans la sidebar
                    </span>
                  </div>
                </div>
                <button
                  @click="toggleThemeSetting('sidebarCaption')"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                    themeSettings.sidebarCaption
                      ? 'bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600',
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                      themeSettings.sidebarCaption
                        ? 'translate-x-6'
                        : 'translate-x-1',
                    ]"
                  />
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span class="text-lg">📱</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">
                      Animations réduites
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      Réduire les animations pour l'accessibilité
                    </span>
                  </div>
                </div>
                <button
                  @click="toggleThemeSetting('reducedMotion')"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                    themeSettings.reducedMotion
                      ? 'bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600',
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                      themeSettings.reducedMotion
                        ? 'translate-x-6'
                        : 'translate-x-1',
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section Layout -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Configuration du layout
          </h2>

          <!-- Direction du layout -->
          <div class="mb-8">
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Direction du layout
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="layout in layouts"
                :key="layout.value"
                @click="updateThemeSetting('layout', layout.value)"
                :class="[
                  'px-4 py-4 rounded-lg border text-center transition-all duration-200',
                  themeSettings.layout === layout.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
                ]"
              >
                <div class="flex flex-col items-center gap-2">
                  <div :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    layout.value === 'ltr' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  ]">
                    <span class="text-lg">{{ layout.icon }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">
                      {{ layout.label }}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ layout.description }}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Largeur du layout -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Largeur du layout
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="width in widths"
                :key="width.value"
                @click="updateThemeSetting('width', width.value)"
                :class="[
                  'px-4 py-4 rounded-lg border text-center transition-all duration-200',
                  themeSettings.width === width.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
                ]"
              >
                <div class="flex flex-col items-center gap-2">
                  <div :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    width.value === 'full' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  ]">
                    <span class="text-lg">{{ width.icon }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">
                      {{ width.label }}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ width.description }}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Colonne droite : Réseaux sociaux et Actions -->
      <div class="space-y-8">
        <!-- Section Réseaux sociaux -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Liens des réseaux sociaux
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Configurez les URLs des réseaux sociaux dans le footer
              </p>
            </div>
            <button
              @click="resetSocialLinks"
              class="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 transition"
            >
              Réinitialiser
            </button>
          </div>

          <div class="space-y-6">
            <!-- Facebook -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">Facebook</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">URL de votre page Facebook</span>
                  </div>
                </label>
              </div>
              <div class="flex gap-2">
                <input
                  type="url"
                  v-model="socialLinks.facebook"
                  placeholder="https://facebook.com/votre-page"
                  class="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  @click="saveSocialLinks"
                  :class="[
                    'px-4 py-3 rounded-lg border transition font-medium',
                    socialLinksChanged.facebook
                      ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
                  ]"
                  :disabled="!socialLinksChanged.facebook"
                >
                  💾
                </button>
              </div>
            </div>

            <!-- Twitter/X -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">Twitter/X</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">URL de votre profil Twitter</span>
                  </div>
                </label>
              </div>
              <div class="flex gap-2">
                <input
                  type="url"
                  v-model="socialLinks.twitter"
                  placeholder="https://twitter.com/votre-profil"
                  class="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  @click="saveSocialLinks"
                  :class="[
                    'px-4 py-3 rounded-lg border transition font-medium',
                    socialLinksChanged.twitter
                      ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
                  ]"
                  :disabled="!socialLinksChanged.twitter"
                >
                  💾
                </button>
              </div>
            </div>

            <!-- LinkedIn -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">LinkedIn</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">URL de votre page LinkedIn</span>
                  </div>
                </label>
              </div>
              <div class="flex gap-2">
                <input
                  type="url"
                  v-model="socialLinks.linkedin"
                  placeholder="https://linkedin.com/company/votre-entreprise"
                  class="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  @click="saveSocialLinks"
                  :class="[
                    'px-4 py-3 rounded-lg border transition font-medium',
                    socialLinksChanged.linkedin
                      ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
                  ]"
                  :disabled="!socialLinksChanged.linkedin"
                >
                  💾
                </button>
              </div>
            </div>

            <!-- YouTube -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-[#FF0000]/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 dark:text-white block">YouTube</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">URL de votre chaîne YouTube</span>
                  </div>
                </label>
              </div>
              <div class="flex gap-2">
                <input
                  type="url"
                  v-model="socialLinks.youtube"
                  placeholder="https://youtube.com/@votre-chaine"
                  class="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  @click="saveSocialLinks"
                  :class="[
                    'px-4 py-3 rounded-lg border transition font-medium',
                    socialLinksChanged.youtube
                      ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'border-gray-300 dark:border-gray-600 text-gray-400 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
                  ]"
                  :disabled="!socialLinksChanged.youtube"
                >
                  💾
                </button>
              </div>
            </div>

            <!-- Prévisualisation -->
            <div class="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Aperçu des liens</h4>
              <div class="flex flex-wrap gap-2">
                <a 
                  v-for="(url, platform) in socialLinks" 
                  :key="platform"
                  :href="url" 
                  target="_blank"
                  :class="[
                    'px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition',
                    getSocialLinkPreviewClass(platform)
                  ]"
                  v-if="url && url !== 'https://facebook.com/' && url !== 'https://twitter.com/' && url !== 'https://linkedin.com/'"
                >
                  <span>{{ platform }}</span>
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </a>
                <span v-if="Object.values(socialLinks).every(url => !url || url === 'https://facebook.com/' || url === 'https://twitter.com/' || url === 'https://linkedin.com/')" class="text-gray-500 dark:text-gray-400 text-sm">
                  Aucun lien configuré
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions et sauvegarde -->
        <div class="space-y-8">
          <!-- Bouton de sauvegarde manuelle -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Sauvegarde des paramètres
            </h2>
            
            <div class="space-y-4">
              

              <div class="grid grid-cols-2 gap-3">
                
              </div>

              <button
                @click="resetAllSettings"
                class="w-full px-4 py-3 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center justify-center gap-3"
              >
                <span class="text-lg">🔄</span>
                Tout réinitialiser
              </button>
            </div>
          </div>

          <!-- Informations système -->
          <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Informations système
            </h2>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Version UI</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">v2.1.0</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Dernière sauvegarde</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatTime(lastSaved) }}</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Thème actuel</span>
                <span 
                  class="text-sm font-medium capitalize"
                  :style="{ color: themeSettings.primaryColor }"
                >
                  {{ getModeLabel(themeSettings.mode) }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Couleur principale</span>
                <div class="flex items-center gap-2">
                  <div 
                    class="w-4 h-4 rounded border"
                    :style="{ backgroundColor: themeSettings.primaryColor }"
                  ></div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ getColorName(themeSettings.primaryColor) }}
                  </span>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500 dark:text-gray-400">Modifications</span>
                <span 
                  :class="[
                    'text-sm font-medium',
                    hasUnsavedChanges ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'
                  ]"
                >
                  {{ hasUnsavedChanges ? 'Non sauvegardées' : 'Sauvegardées' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Snackbar de confirmation -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"
    >
      <span class="text-lg">✅</span>
      <span>Paramètres sauvegardés avec succès</span>
      <button @click="showSuccess = false" class="ml-4 hover:opacity-80">✕</button>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

// Types
interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto'
  primaryColor: string
  contrast: 'default' | 'high'
  sidebarCaption: boolean
  layout: 'ltr' | 'rtl'
  width: 'full' | 'container'
  reducedMotion: boolean
}

interface SocialLinks {
  facebook: string
  twitter: string
  linkedin: string
  youtube: string
}

// État réactif
const showSuccess = ref(false)
const lastSaved = ref(new Date())

// Original settings for comparison
const originalThemeSettings = reactive<ThemeSettings>({
  mode: 'auto',
  primaryColor: '#3b82f6',
  contrast: 'default',
  sidebarCaption: true,
  layout: 'ltr',
  width: 'full',
  reducedMotion: false
})

const originalSocialLinks = reactive<SocialLinks>({
  facebook: 'https://facebook.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://linkedin.com/',
  youtube: ''
})

// Current settings
const themeSettings = reactive<ThemeSettings>({
  mode: 'auto',
  primaryColor: '#3b82f6',
  contrast: 'default',
  sidebarCaption: true,
  layout: 'ltr',
  width: 'full',
  reducedMotion: false
})

const socialLinks = reactive<SocialLinks>({
  facebook: 'https://facebook.com/',
  twitter: 'https://twitter.com/',
  linkedin: 'https://linkedin.com/',
  youtube: ''
})

// Track changes
const socialLinksChanged = reactive<Record<keyof SocialLinks, boolean>>({
  facebook: false,
  twitter: false,
  linkedin: false,
  youtube: false
})

// Données pour les options
const themeColors = [
  { name: "Bleu", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Rose", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
  { name: "Émeraude", value: "#10b981" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Jaune", value: "#eab308" },
  { name: "Gris", value: "#6b7280" },
  { name: "Rouge", value: "#ef4444" },
]

const themeModes = [
  { value: 'light' as const, label: 'Clair', description: 'Thème clair par défaut', icon: '☀️' },
  { value: 'dark' as const, label: 'Sombre', description: 'Thème sombre par défaut', icon: '🌙' },
  { value: 'auto' as const, label: 'Système', description: 'Basé sur les préférences système', icon: '🔄' }
]

const contrasts = [
  { value: 'default' as const, label: 'Défaut', description: 'Contraste standard', icon: '🔳' },
  { value: 'high' as const, label: 'Haut contraste', description: 'Contraste amélioré', icon: '🔲' }
]

const layouts = [
  { value: 'ltr' as const, label: 'LTR', description: 'Gauche à droite', icon: '←' },
  { value: 'rtl' as const, label: 'RTL', description: 'Droite à gauche', icon: '→' }
]

const widths = [
  { value: 'full' as const, label: 'Complet', description: 'Largeur totale', icon: '↔' },
  { value: 'container' as const, label: 'Conteneur', description: 'Largeur limitée', icon: '▢' }
]

// Computed properties
const hasUnsavedChanges = computed(() => {
  const themeChanged = JSON.stringify(themeSettings) !== JSON.stringify(originalThemeSettings)
  const socialChanged = Object.values(socialLinksChanged).some(changed => changed)
  return themeChanged || socialChanged
})

const unsavedChangesCount = computed(() => {
  let count = 0
  
  // Count theme changes
  Object.keys(themeSettings).forEach(key => {
    const k = key as keyof ThemeSettings
    if (themeSettings[k] !== originalThemeSettings[k]) {
      count++
    }
  })
  
  // Count social links changes
  count += Object.values(socialLinksChanged).filter(changed => changed).length
  
  return count
})

// Initialisation
onMounted(() => {
  loadSettings()
  loadSocialLinks()
  applyThemePreview()
})

// Watchers pour détecter les changements
watch(
  () => ({ ...themeSettings }),
  (newSettings, oldSettings) => {
    // Mettre à jour les changements détectés
    Object.keys(newSettings).forEach(key => {
      const k = key as keyof ThemeSettings
      if (newSettings[k] !== originalThemeSettings[k]) {
        // Le changement sera détecté par hasUnsavedChanges
      }
    })
    applyThemePreview()
  },
  { deep: true }
)

watch(
  () => ({ ...socialLinks }),
  (newLinks, oldLinks) => {
    // Mettre à jour les états de changement
    Object.keys(newLinks).forEach(key => {
      const k = key as keyof SocialLinks
      socialLinksChanged[k] = newLinks[k] !== originalSocialLinks[k]
    })
  },
  { deep: true }
)

// Convertir hex en rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Appliquer le thème en prévisualisation (pas de sauvegarde)
const applyThemePreview = () => {
  const root = document.documentElement
  
  // Déterminer le mode actuel pour l'affichage
  let currentMode = themeSettings.mode
  if (themeSettings.mode === 'auto') {
    currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Appliquer la classe de mode temporairement
  root.classList.remove('light', 'dark')
  root.classList.add(currentMode)

  // Appliquer la couleur primaire temporairement
  root.style.setProperty('--primary-color', themeSettings.primaryColor)

  // Appliquer le contraste temporairement
  if (themeSettings.contrast === 'high') {
    root.classList.add('high-contrast')
  } else {
    root.classList.remove('high-contrast')
  }

  // Appliquer la direction temporairement
  root.setAttribute('dir', themeSettings.layout)

  // Appliquer les réductions de mouvement temporairement
  if (themeSettings.reducedMotion) {
    root.classList.add('reduce-motion')
  } else {
    root.classList.remove('reduce-motion')
  }
}

// Mettre à jour les paramètres du thème (sans sauvegarde)
const updateThemeSetting = (key: keyof ThemeSettings, value: any) => {
  ;(themeSettings as any)[key] = value
  applyThemePreview()
}

// Basculer un paramètre booléen du thème (sans sauvegarde)
const toggleThemeSetting = (key: keyof ThemeSettings) => {
  ;(themeSettings as any)[key] = !(themeSettings as any)[key]
  applyThemePreview()
}

// Réinitialiser le thème
const resetTheme = () => {
  if (confirm('Réinitialiser les paramètres du thème ?')) {
    Object.assign(themeSettings, { ...originalThemeSettings })
    applyThemePreview()
  }
}

// Réinitialiser les liens sociaux
const resetSocialLinks = () => {
  if (confirm('Réinitialiser tous les liens sociaux ?')) {
    Object.assign(socialLinks, { ...originalSocialLinks })
    Object.keys(socialLinksChanged).forEach(key => {
      socialLinksChanged[key as keyof SocialLinks] = false
    })
  }
}

// Sauvegarder les liens sociaux
const saveSocialLinks = () => {
  try {
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks))
    console.log('Liens sociaux sauvegardés:', socialLinks)
    
    // Mettre à jour les originaux
    Object.assign(originalSocialLinks, { ...socialLinks })
    
    // Réinitialiser les indicateurs de changement
    Object.keys(socialLinksChanged).forEach(key => {
      socialLinksChanged[key as keyof SocialLinks] = false
    })
    
    showSuccessMessage()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des liens sociaux:', error)
    alert('Erreur lors de la sauvegarde')
  }
}

// Sauvegarder tous les paramètres
const saveAllSettings = () => {
  try {
    // Sauvegarder le thème
    localStorage.setItem('themeSettings', JSON.stringify(themeSettings))
    
    // Sauvegarder les liens sociaux
    localStorage.setItem('socialLinks', JSON.stringify(socialLinks))
    
    // Mettre à jour les originaux
    Object.assign(originalThemeSettings, { ...themeSettings })
    Object.assign(originalSocialLinks, { ...socialLinks })
    
    // Réinitialiser les indicateurs de changement
    Object.keys(socialLinksChanged).forEach(key => {
      socialLinksChanged[key as keyof SocialLinks] = false
    })
    
    // Appliquer le thème définitivement
    applyThemeDefinitively()
    
    lastSaved.value = new Date()
    showSuccessMessage()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    alert('Erreur lors de la sauvegarde')
  }
}

// Appliquer le thème définitivement (après sauvegarde)
const applyThemeDefinitively = () => {
  // Même logique que applyThemePreview mais c'est maintenant définitif
  applyThemePreview()
  console.log('Thème appliqué définitivement')
}

// Réinitialiser tous les paramètres
const resetAllSettings = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ? Cette action est irréversible.')) {
    resetTheme()
    resetSocialLinks()
  }
}

// Charger les paramètres depuis localStorage
const loadSettings = () => {
  try {
    // Charger le thème
    const savedTheme = localStorage.getItem('themeSettings')
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme)
      Object.assign(themeSettings, parsed)
      Object.assign(originalThemeSettings, parsed)
    }
  } catch (error) {
    console.error('Erreur lors du chargement du thème:', error)
  }
}

// Charger les liens sociaux
const loadSocialLinks = () => {
  try {
    const saved = localStorage.getItem('socialLinks')
    if (saved) {
      const parsed = JSON.parse(saved)
      Object.assign(socialLinks, parsed)
      Object.assign(originalSocialLinks, parsed)
    }
  } catch (error) {
    console.error('Erreur lors du chargement des liens sociaux:', error)
  }
}

// Exporter les paramètres
const exportSettings = () => {
  const data = {
    themeSettings,
    socialLinks,
    exportDate: new Date().toISOString(),
    version: '2.1.0'
  }
  const dataStr = JSON.stringify(data, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `parametres-systeme_${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Importer les paramètres
const importSettings = () => {
  if (!confirm('Importer de nouveaux paramètres écrasera vos paramètres actuels. Continuer ?')) {
    return
  }

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        try {
          const data = JSON.parse(e.target.result)
          
          if (data.themeSettings) {
            Object.assign(themeSettings, data.themeSettings)
            Object.assign(originalThemeSettings, data.themeSettings)
          }
          
          if (data.socialLinks) {
            Object.assign(socialLinks, data.socialLinks)
            Object.assign(originalSocialLinks, data.socialLinks)
          }
          
          applyThemePreview()
          showSuccessMessage()
        } catch (error) {
          alert('Erreur lors de l\'importation des paramètres. Format JSON invalide.')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

// Fonctions utilitaires
const getModeLabel = (mode: string) => {
  const found = themeModes.find(m => m.value === mode)
  return found ? found.label : mode
}

const getColorName = (colorValue: string) => {
  const color = themeColors.find(c => c.value === colorValue)
  return color ? color.name : 'Personnalisé'
}

const getSocialLinkPreviewClass = (platform: string) => {
  const classes: Record<string, string> = {
    facebook: 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20',
    twitter: 'bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20',
    linkedin: 'bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20',
    youtube: 'bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20'
  }
  return classes[platform] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes} min`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Il y a ${hours} h`
  
  return date.toLocaleDateString('fr-FR')
}

const showSuccessMessage = () => {
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Styles pour les réductions de mouvement */
:global(.reduce-motion) .transition,
:global(.reduce-motion) .transition-all,
:global(.reduce-motion) .transition-transform,
:global(.reduce-motion) .transition-colors,
:global(.reduce-motion) .animate-slide-up {
  transition: none !important;
  animation: none !important;
}

/* Styles pour le haut contraste */
:global(.high-contrast) button,
:global(.high-contrast) input,
:global(.high-contrast) select {
  border-width: 2px !important;
}

/* Support RTL */
:global([dir="rtl"]) .text-left {
  text-align: right;
}

:global([dir="rtl"]) .text-right {
  text-align: left;
}

:global([dir="rtl"]) .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}

:global([dir="rtl"]) .mr-4 {
  margin-right: 0;
  margin-left: 1rem;
}

:global([dir="rtl"]) .translate-x-6 {
  transform: translateX(-1.5rem);
}

:global([dir="rtl"]) .translate-x-1 {
  transform: translateX(0.25rem);
}

/* Styles pour la couleur primaire dynamique */
:root {
  --primary-color: #3b82f6;
}
</style>