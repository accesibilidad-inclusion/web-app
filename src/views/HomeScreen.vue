<script setup lang="ts">
import LocationSelector from '@/components/LocationSelector.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import MainSearch from '@/components/MainSearch.vue'
import RecommendedVenues from '@/components/RecommendedVenues.vue'
</script>

<template>
  <main>
    <LocationSelector />
    <CategoriesList />
    <MainSearch />
    <RecommendedVenues />
  </main>
</template>
