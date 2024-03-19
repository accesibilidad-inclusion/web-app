<script setup lang="ts">
import QuestionInstruction from '@/components/QuestionInstruction.vue'
</script>

<template>
  <main class="page">
    <QuestionInstruction text="Espera un momento<br/>¡Tu ayuda está en camino!" icon="reloj" />
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
