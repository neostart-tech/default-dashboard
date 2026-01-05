<!-- app.vue -->
<template>
  <div>
    <!-- Navigation simple -->
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto">
        <NuxtLink to="/" class="text-white mr-4">Accueil</NuxtLink>
        <NuxtLink to="/dashboard" class="text-white">Dashboard</NuxtLink>
      </div>
    </nav>
    
    <!-- Contenu principal -->
    <main>
      <NuxtPage />
    </main>
  </div>
</template>