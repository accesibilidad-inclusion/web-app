<script setup lang="ts">
import LocationSelector from '@/components/LocationSelector.vue'
import CategoriesList from '@/components/CategoriesList.vue'
import MainSearch from '@/components/MainSearch.vue'
import RecommendedVenues from '@/components/RecommendedVenues.vue'
</script>

<template>
  <main class="main-site">
    <LocationSelector />
    <CategoriesList />
    <MainSearch />
    <RecommendedVenues />
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.main-site {
  background-color: var(--color--skyblue);
  padding-top: 50px;
  @media screen and (min-width: 540px) {
    padding-top: 62px;
  }
}
</style>