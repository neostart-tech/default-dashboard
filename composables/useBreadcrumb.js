import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useBreadcrumb = () => {
  const route = useRoute()
  const breadcrumbs = ref([])
  
  const updateBreadcrumbs = () => {
    const crumbs = []
    const pathArray = route.path.split('/').filter(x => x)
    
    pathArray.reduce((prev, curr, index) => {
      const path = `${prev}/${curr}`
      const breadcrumb = {
        title: formatTitle(curr),
        path: path,
        disabled: index === pathArray.length - 1
      }
      crumbs.push(breadcrumb)
      return path
    }, '')
    
    // Ajouter la page d'accueil
    crumbs.unshift({
      title: 'Accueil',
      path: '/',
      disabled: route.path === '/'
    })
    
    breadcrumbs.value = crumbs
  }
  
  const formatTitle = (str) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Mettre à jour les breadcrumbs quand la route change
  watch(() => route.path, updateBreadcrumbs, { immediate: true })
  
  return { breadcrumbs }
}