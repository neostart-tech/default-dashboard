import { ref, computed } from 'vue'

export function useDashboard() {
  // Données du dashboard
  const dashboardData = ref({
    stats: {
      users: 0,
      revenue: 0,
      conversion: 0,
      tickets: 0
    },
    activities: [],
    recentData: []
  })

  // Charger les données
  const loadDashboardData = async () => {
    // Simulation de chargement
    dashboardData.value = {
      stats: {
        users: 1254,
        revenue: 24580,
        conversion: 68.2,
        tickets: 42
      },
      activities: [
        {
          id: '1',
          title: 'Nouvel utilisateur',
          description: 'Inscription réussie',
          time: '5 min',
          type: 'success'
        }
      ],
      recentData: []
    }
  }

  // Formater les statistiques pour les cartes
  const formattedStats = computed(() => [
    {
      id: 'users',
      title: 'Utilisateurs totaux',
      value: dashboardData.value.stats.users.toLocaleString(),
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a4 4 0 110 5.392M9 21h6',
      iconBg: 'bg-blue-500',
      trend: { direction: 'up', value: '+12.5%', period: 'depuis hier' }
    },
    {
      id: 'revenue',
      title: 'Revenu mensuel',
      value: `$${dashboardData.value.stats.revenue.toLocaleString()}`,
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-green-500',
      trend: { direction: 'up', value: '+8.3%', period: 'ce mois' }
    },
    {
      id: 'conversion',
      title: 'Taux de conversion',
      value: `${dashboardData.value.stats.conversion}%`,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-purple-500',
      progress: { value: dashboardData.value.stats.conversion, label: 'Objectif: 75%' }
    },
    {
      id: 'tickets',
      title: 'Tickets ouverts',
      value: dashboardData.value.stats.tickets,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z',
      iconBg: 'bg-amber-500',
      trend: { direction: 'down', value: '-15%', period: 'cette semaine' }
    }
  ])

  return {
    dashboardData,
    formattedStats,
    loadDashboardData
  }
}