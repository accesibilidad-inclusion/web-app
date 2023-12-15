<script setup lang="ts">
defineProps<{
  selected: string
}>()
defineEmits(['reply'])
</script>

<template>
  <div class="custom-control custom-control--text">
    <input
      type="text"
      placeholder="Escribe aquí tu respuesta"
      class="custom-control__answer"
      :value="selected"
      @change="$emit('reply', ($event.target as HTMLInputElement).value)" />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.custom-control__answer {
  width: 100%;
  padding: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  border-radius: var(--spacer--500);
  min-height: 180px;
}
</style>
