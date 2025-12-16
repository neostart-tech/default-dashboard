<template>
  <DashboardLayout>
    <!-- Header / Breadcrumb -->
    <section class="mb-8">
      <nav aria-label="Breadcrumb" class="mb-2">
        <ol class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <li class="font-medium text-gray-900 dark:text-white">
            Tableau de bord
          </li>
        </ol>
      </nav>

      <div class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Tableau de bord
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Bienvenue, Neo Start Tech. Voici un aperçu global de l’activité du système.
        </p>
      </div>
    </section>

    <!-- Contenu principal -->
    <section class="space-y-8">

      <!-- Tableau des utilisateurs -->
      <DataTable
        title="Utilisateurs récents"
        description="Derniers comptes utilisateurs enregistrés sur la plateforme"
        :columns="userColumns"
        :data="recentUsers"
        :add-button="{ to: '/users/add', label: 'Ajouter un utilisateur' }"
        @edit="editUser"
        @delete="deleteUser"
      />

    </section>
  </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '~/components/layout/DashboardLayout.vue'
import DataTable from '~/components/ui/DataTable.vue'

/* Colonnes du tableau */
const userColumns = [
  { key: 'name', label: 'Nom' },
  { key: 'email', label: 'Adresse email' },
  { key: 'role', label: 'Rôle' },
  { key: 'status', label: 'Statut' },
  { key: 'createdAt', label: 'Date de création' }
]

/* Données (mock – à remplacer par API) */
const recentUsers = [
  {
    id: 1,
    name: 'Neo',
    email: 'neo@example.com',
    role: 'Administrateur',
    status: 'Actif',
    createdAt: '15/01/2024'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Utilisateur',
    status: 'Actif',
    createdAt: '14/01/2024'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Éditeur',
    status: 'Inactif',
    createdAt: '10/01/2024'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Utilisateur',
    status: 'Actif',
    createdAt: '08/01/2024'
  }
]

/* Actions */
const editUser = (user: any) => {
  console.log('Édition utilisateur :', user)
}

const deleteUser = (user: any) => {
  if (confirm(`Confirmer la suppression de ${user.name} ?`)) {
    console.log('Suppression utilisateur :', user)
  }
}
</script>
