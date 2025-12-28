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
            Aide & Support
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Centre d'aide
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Trouvez des réponses à vos questions et obtenez de l'aide pour utiliser l'application.
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">FAQ disponibles</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalFAQs }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Articles résolus</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.solvedArticles }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Temps de réponse moyen</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.avgResponseTime }}h</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Tickets ouverts</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.openTickets }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recherche et catégories -->
    <section class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          Comment pouvons-nous vous aider ?
        </h2>
        <div class="relative w-full md:w-96">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher dans l'aide..."
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200',
            selectedCategory === category.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-750'
          ]"
        >
          <div :class="`p-3 rounded-lg ${category.color} mb-3`">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon" />
            </svg>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ category.name }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ category.count }} articles</span>
        </button>
      </div>
    </section>

    <!-- FAQ et articles populaires -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- FAQ -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Questions fréquentes
            </h2>
            <button
              @click="showAllFAQs = !showAllFAQs"
              class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {{ showAllFAQs ? 'Voir moins' : 'Voir tout' }}
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="faq in visibleFAQs"
              :key="faq.id"
              class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                @click="toggleFAQ(faq.id)"
                class="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition"
              >
                <span class="font-medium text-gray-900 dark:text-white">{{ faq.question }}</span>
                <svg
                  class="w-5 h-5 text-gray-500 transition-transform duration-200"
                  :class="{ 'transform rotate-180': openFAQs.includes(faq.id) }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                v-if="openFAQs.includes(faq.id)"
                class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                <p class="text-gray-600 dark:text-gray-300">{{ faq.answer }}</p>
                <div v-if="faq.tags" class="flex flex-wrap gap-2 mt-3">
                  <span
                    v-for="tag in faq.tags"
                    :key="tag"
                    class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact et ressources -->
      <div class="space-y-6">
        <!-- Contact support -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contacter le support
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Vous ne trouvez pas de réponse à votre question ? Notre équipe support est là pour vous aider.
          </p>
          <div class="space-y-4">
            <button
              @click="openTicketModal"
              class="w-full px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Ouvrir un ticket
            </button>
            <button
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@example.com
            </button>
          </div>
        </div>

        <!-- Ressources -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ressources
          </h3>
          <div class="space-y-3">
            <a
              v-for="resource in resources"
              :key="resource.id"
              :href="resource.url"
              target="_blank"
              class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition group"
            >
              <div :class="`p-2 rounded-lg ${resource.color}`">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="resource.icon" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {{ resource.title }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ resource.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal d'ouverture de ticket -->
    <div v-if="showTicketModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg">
        <!-- En-tête -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Ouvrir un ticket de support
          </h3>
          <button
            @click="showTicketModal = false"
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <!-- Formulaire -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sujet
            </label>
            <input
              v-model="ticketForm.subject"
              type="text"
              placeholder="Décrivez brièvement votre problème"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Catégorie
            </label>
            <select
              v-model="ticketForm.category"
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="technical">Problème technique</option>
              <option value="billing">Facturation</option>
              <option value="account">Compte utilisateur</option>
              <option value="feature">Demande de fonctionnalité</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              v-model="ticketForm.description"
              rows="4"
              placeholder="Décrivez votre problème en détail..."
              class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priorité
            </label>
            <div class="flex gap-2">
              <button
                v-for="priority in priorities"
                :key="priority.value"
                @click="ticketForm.priority = priority.value"
                :class="[
                  'flex-1 px-4 py-2 rounded-lg border text-center transition',
                  ticketForm.priority === priority.value
                    ? priority.selectedClass
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                ]"
              >
                {{ priority.label }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pièces jointes (optionnel)
            </label>
            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-gray-500 dark:text-gray-400 mb-2">
                Glissez-déposez des fichiers ou
                <button class="text-blue-600 dark:text-blue-400 hover:underline">
                  parcourez
                </button>
              </p>
              <p class="text-xs text-gray-400">
                PNG, JPG, PDF jusqu'à 10MB
              </p>
            </div>
          </div>
        </div>

        <!-- Pied -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            @click="showTicketModal = false"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Annuler
          </button>
          <button
            @click="submitTicket"
            :disabled="!ticketForm.subject || !ticketForm.description"
            :class="[
              'px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition',
              (!ticketForm.subject || !ticketForm.description) && 'opacity-50 cursor-not-allowed'
            ]"
          >
            Envoyer le ticket
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '~/components/layout/DashboardLayout.vue'

/* Types */
interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  tags?: string[]
  views: number
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
  count: number
}

interface Resource {
  id: number
  title: string
  description: string
  url: string
  icon: string
  color: string
}

interface TicketForm {
  subject: string
  category: string
  description: string
  priority: string
}

interface Stats {
  totalFAQs: number
  solvedArticles: number
  avgResponseTime: number
  openTickets: number
}

/* Références */
const searchQuery = ref('')
const selectedCategory = ref<string>('')
const showAllFAQs = ref(false)
const openFAQs = ref<number[]>([])
const showTicketModal = ref(false)

const ticketForm = ref<TicketForm>({
  subject: '',
  category: '',
  description: '',
  priority: 'medium'
})

/* Stats */
const stats = ref<Stats>({
  totalFAQs: 0,
  solvedArticles: 0,
  avgResponseTime: 0,
  openTickets: 0
})

/* Catégories */
const categories = ref<Category[]>([
  { id: 'getting-started', name: 'Premiers pas', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', count: 12 },
  { id: 'account', name: 'Compte', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', count: 8 },
  { id: 'billing', name: 'Facturation', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', count: 6 },
  { id: 'technical', name: 'Technique', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', count: 15 }
])

/* FAQ */
const faqs = ref<FAQ[]>([
  { id: 1, question: 'Comment créer un nouveau compte ?', answer: 'Pour créer un compte, cliquez sur le bouton "S\'inscrire" en haut à droite de la page d\'accueil. Remplissez le formulaire avec vos informations et validez votre adresse email.', category: 'account', tags: ['compte', 'inscription'], views: 1250 },
  { id: 2, question: 'Comment réinitialiser mon mot de passe ?', answer: 'Sur la page de connexion, cliquez sur "Mot de passe oublié". Entrez votre adresse email et suivez les instructions reçues par email pour créer un nouveau mot de passe.', category: 'account', tags: ['sécurité', 'mot de passe'], views: 980 },
  { id: 3, question: 'Comment mettre à jour mes informations de facturation ?', answer: 'Accédez à votre profil > Facturation. Vous pouvez modifier votre méthode de paiement, adresse de facturation et télécharger vos anciennes factures.', category: 'billing', tags: ['paiement', 'facture'], views: 750 },
  { id: 4, question: 'Comment exporter mes données ?', answer: 'Dans les paramètres de votre compte, allez dans "Sécurité et confidentialité" > "Export des données". Vous pouvez demander un export complet de toutes vos données.', category: 'account', tags: ['données', 'export'], views: 420 },
  { id: 5, question: 'Comment configurer les notifications ?', answer: 'Accédez à Paramètres > Notifications. Vous pouvez activer/désactiver les notifications par email, SMS et in-app pour chaque type d\'événement.', category: 'getting-started', tags: ['configuration', 'notifications'], views: 620 },
  { id: 6, question: 'Quels navigateurs sont supportés ?', answer: 'Notre application supporte les dernières versions de Chrome, Firefox, Safari et Edge. Nous recommandons d\'utiliser Chrome pour la meilleure expérience.', category: 'technical', tags: ['compatibilité', 'navigateur'], views: 350 },
  { id: 7, question: 'Comment contacter le support ?', answer: 'Vous pouvez contacter notre équipe support via le formulaire sur cette page, par email à support@example.com, ou par téléphone au 01 23 45 67 89.', category: 'getting-started', tags: ['support', 'contact'], views: 890 },
  { id: 8, question: 'Comment annuler mon abonnement ?', answer: 'Accédez à Facturation > Abonnement. Cliquez sur "Annuler l\'abonnement" et suivez les instructions. Votre accès restera actif jusqu\'à la fin de la période payée.', category: 'billing', tags: ['abonnement', 'annulation'], views: 550 }
])

/* Ressources */
const resources = ref<Resource[]>([
  { id: 1, title: 'Documentation complète', description: 'Guide détaillé et API', url: '#', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
  { id: 2, title: 'Tutoriels vidéo', description: 'Vidéos explicatives', url: '#', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
  { id: 3, title: "Communauté d'entraide", description: 'Forum des utilisateurs', url: '#', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
  { id: 4, title: 'Centre de téléchargement', description: 'Applications et outils', url: '#', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' }
])

/* Priorités */
const priorities = [
  { value: 'low', label: 'Basse', selectedClass: 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' },
  { value: 'medium', label: 'Moyenne', selectedClass: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300' },
  { value: 'high', label: 'Haute', selectedClass: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' },
  { value: 'urgent', label: 'Urgente', selectedClass: 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' }
]

/* Computed */
const visibleFAQs = computed(() => {
  let filtered = [...faqs.value]

  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query) ||
      faq.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Filtre par catégorie
  if (selectedCategory.value) {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  // Limite d'affichage
  if (!showAllFAQs.value) {
    filtered = filtered.slice(0, 5)
  }

  return filtered
})

/* Actions */
const toggleFAQ = (id: number) => {
  const index = openFAQs.value.indexOf(id)
  if (index > -1) {
    openFAQs.value.splice(index, 1)
  } else {
    openFAQs.value.push(id)
  }
}

const selectCategory = (categoryId: string) => {
  selectedCategory.value = selectedCategory.value === categoryId ? '' : categoryId
}

const openTicketModal = () => {
  showTicketModal.value = true
}

const submitTicket = () => {
  if (!ticketForm.value.subject || !ticketForm.value.description) return

  // Simuler l'envoi du ticket
  console.log('Ticket submitted:', ticketForm.value)
  
  // Réinitialiser le formulaire
  ticketForm.value = {
    subject: '',
    category: '',
    description: '',
    priority: 'medium'
  }
  
  showTicketModal.value = false
  alert('Votre ticket a été envoyé avec succès. Notre équipe vous répondra dans les plus brefs délais.')
}

const updateStats = () => {
  stats.value = {
    totalFAQs: faqs.value.length,
    solvedArticles: faqs.value.filter(faq => faq.views > 300).length,
    avgResponseTime: 2.5,
    openTickets: 12
  }
}

/* Cycle de vie */
onMounted(() => {
  updateStats()
  
  // Ouvrir les 2 premières FAQ par défaut
  openFAQs.value = [1, 2]
})
</script>

<style scoped>
/* Styles spécifiques */
.bg-gray-750 {
  background-color: #2d3748;
}

.hover\:bg-gray-750:hover {
  background-color: #2d3748;
}

/* Animation pour l'ouverture des FAQ */
.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Styles pour les transitions */
.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}
</style>