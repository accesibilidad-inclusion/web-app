<script setup lang="ts">
defineProps<{
  selected: string
}>()
defineEmits(['reply'])
</script>

<template>
  <div class="custom-control custom-control--text">
    <textarea
      placeholder="Escribe aquí tu respuesta"
      :value="selected"
      @change="$emit('reply', ($event.target as HTMLInputElement).value)" >
    </textarea>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

</style>
