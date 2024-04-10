<script setup lang="ts">
import QuestionInstruction from '@/components/QuestionInstruction.vue'

const search = () => {
  window.parent.postMessage('SEARCH', '*')
}
</script>

<template>
  <main class="page">
    <QuestionInstruction
      text="Revisa las ayudas disponibles"
      icon="internet"
      button
      @btn-action="search" />
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: stretch;
  grid-row: 2/-1;
  padding: 4rem 1rem 2rem 1rem;
}
</style>
