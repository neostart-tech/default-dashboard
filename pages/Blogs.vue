<template>
  <DashboardLayout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestion des Blogs</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Créez et gérez vos articles de blog</p>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un article..."
                class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                @input="searchBlogs"
              >
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select
              v-model="categoryFilter"
              @change="applyFilters"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              <option v-for="category in blogsStore.categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>

          <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouvel article
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div v-for="stat in blogsStore.formattedStats" :key="stat.label" 
               class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
          </div>
        </div>

        <!-- Blogs Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div v-if="blogsStore.loading" class="p-8 text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Chargement des articles...</p>
          </div>

          <div v-else-if="blogsStore.error" class="p-8 text-center">
            <div class="text-red-500 mb-2">❌</div>
            <p class="text-gray-700 dark:text-gray-300">{{ blogsStore.error }}</p>
            <button @click="loadBlogs" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Réessayer
            </button>
          </div>

          <div v-else>
            <div v-if="blogsStore.blogs.length === 0" class="p-8 text-center">
              <div class="text-gray-400 mb-4">📝</div>
              <p class="text-gray-600 dark:text-gray-400">Aucun article trouvé</p>
              <button @click="openCreateModal" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Créer votre premier article
              </button>
            </div>
            
            <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Article
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Catégorie
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Statut
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Vues
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="blog in blogsStore.blogs" :key="blog.id">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <img
                          :src="blog.image || '/placeholder-image.jpg'"
                          :alt="blog.title"
                          class="h-10 w-10 rounded-lg object-cover"
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                          {{ blog.title }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                          {{ blog.excerpt }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      {{ blog.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <span
                      :class="[
                        'px-3 py-1 text-xs font-medium rounded-full',
                        blog.status === 'published' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      ]"
                    >
                      {{ blog.status === 'published' ? 'Publié' : 'Brouillon' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {{ blog.views }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {{ formatDate(blog.created_at) }}
                  </td>
                  <td class="px-6 py-4 text-sm font-medium">
                    <div class="flex items-center space-x-3">
                      <button
                        @click="editBlog(blog)"
                        class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        @click="togglePublish(blog)"
                        class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <button
                        @click="deleteBlog(blog.id)"
                        class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal de création/édition -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {{ editingBlog ? 'Modifier l\'article' : 'Nouvel article' }}
                </h2>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form @submit.prevent="saveBlog" class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre *
                    </label>
                    <input
                      v-model="form.title"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie *
                    </label>
                    <select
                      v-model="form.category"
                      required
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option v-for="category in blogsStore.categories" :key="category" :value="category">
                        {{ category }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image principale
                  </label>
                  <div class="mt-1 flex items-center space-x-4">
                    <div v-if="form.image" class="relative">
                      <img
                        :src="form.image"
                        alt="Preview"
                        class="h-32 w-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        @click="form.image = ''"
                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        @change="handleImageUpload"
                        class="hidden"
                        ref="fileInput"
                      />
                      <button
                        type="button"
                        @click="$refs.fileInput.click()"
                        class="px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400"
                      >
                        <svg class="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Télécharger une image</span>
                      </button>
                      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        PNG, JPG, GIF jusqu'à 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Extrait
                  </label>
                  <textarea
                    v-model="form.excerpt"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Courte description de l'article..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contenu *
                  </label>
                  <textarea
                    v-model="form.content"
                    rows="10"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    placeholder="Rédigez votre article ici..."
                  />
                </div>

                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Auteur
                    </label>
                    <input
                      v-model="form.author"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mots-clés (séparés par des virgules)
                    </label>
                    <input
                      v-model="form.tags"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ex: technologie, business, marketing"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div class="flex items-center space-x-4">
                    <label class="flex items-center">
                      <input
                        v-model="form.status"
                        type="checkbox"
                        true-value="published"
                        false-value="draft"
                        class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Publier immédiatement
                      </span>
                    </label>
                  </div>

                  <div class="flex items-center space-x-4">
                    <button
                      type="button"
                      @click="closeModal"
                      class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {{ editingBlog ? 'Mettre à jour' : 'Créer l\'article' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/components/layout/DashboardLayout.vue'
import { useBlogsStore } from '#imports'

const blogsStore = useBlogsStore()

// Filtres
const searchQuery = ref('')
const categoryFilter = ref('')

// Form
const form = reactive({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: '',
  author: '',
  tags: '',
  status: 'draft'
})

const showModal = ref(false)
const editingBlog = ref<any>(null)

onMounted(async () => {
  await loadBlogs()
  await blogsStore.fetchCategories()
})

const loadBlogs = async () => {
  const filters = {
    search: searchQuery.value,
    category: categoryFilter.value
  }
  await blogsStore.fetchBlogs(filters)
}

const searchBlogs = debounce(() => {
  loadBlogs()
}, 500)

const applyFilters = () => {
  loadBlogs()
}

const openCreateModal = () => {
  form.title = ''
  form.excerpt = ''
  form.content = ''
  form.category = ''
  form.image = ''
  form.author = ''
  form.tags = ''
  form.status = 'draft'
  editingBlog.value = null
  showModal.value = true
}

const editBlog = (blog: any) => {
  form.title = blog.title
  form.excerpt = blog.excerpt
  form.content = blog.content
  form.category = blog.category
  form.image = blog.image
  form.author = blog.author
  form.tags = Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags
  form.status = blog.status
  editingBlog.value = blog
  showModal.value = true
}

const saveBlog = async () => {
  // Validation simple
  if (!form.title.trim()) {
    alert('Le titre est requis')
    return
  }
  
  if (!form.content.trim()) {
    alert('Le contenu est requis')
    return
  }
  
  if (!form.category) {
    alert('La catégorie est requise')
    return
  }

  const blogData = {
    title: form.title,
    excerpt: form.excerpt,
    content: form.content,
    category: form.category,
    image: form.image,
    author: form.author,
    tags: form.tags,
    status: form.status
  }

  if (editingBlog.value) {
    // Mettre à jour
    const result = await blogsStore.updateBlog(editingBlog.value.id, blogData)
    if (result.success) {
      closeModal()
      await loadBlogs()
    } else {
      alert(result.message || 'Erreur lors de la mise à jour')
    }
  } else {
    // Créer
    const result = await blogsStore.createBlog(blogData)
    if (result.success) {
      closeModal()
      await loadBlogs()
    } else {
      alert(result.message || 'Erreur lors de la création')
    }
  }
}

const togglePublish = async (blog: any) => {
  const result = await blogsStore.togglePublish(blog.id)
  if (result.success) {
    await loadBlogs()
  } else {
    alert(result.message || 'Erreur lors du changement de statut')
  }
}

const deleteBlog = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
    const result = await blogsStore.deleteBlog(id)
    if (result.success) {
      await loadBlogs()
    } else {
      alert(result.message || 'Erreur lors de la suppression')
    }
  }
}

const closeModal = () => {
  showModal.value = false
  editingBlog.value = null
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

// Fonction pour gérer l'upload d'image
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    
    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux (max 5MB)')
      return
    }
    
    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Format de fichier non supporté. Utilisez JPG, PNG, GIF ou WebP.')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      form.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
</script>