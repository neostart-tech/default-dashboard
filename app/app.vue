<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '~/composables/useDarkMode'

const darkMode = useDarkMode()

onMounted(() => {
  darkMode.init()
})
</script>