<script setup lang="ts">
import LocationSelector from '@/components/LocationSelector.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import MainSearch from '@/components/MainSearch.vue'
import RecommendedTasks from '@/components/RecommendedTasks.vue'
</script>

<template>
  <main>
    <LocationSelector />
    <CategoriesList />
    <MainSearch />
    <RecommendedTasks />
  </main>
</template>
