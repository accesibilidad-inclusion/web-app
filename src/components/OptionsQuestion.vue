<script setup lang="ts">
defineProps<{
  options: Array<{id: number; name: string}>
}>()
defineEmits(['reply'])
</script>

<template>
  <div>
    <div v-for="option in options" :key="option.id" class="custom-control custom-control--radio">
      <input
        :id="'opt' + option.id"
        type="radio"
        name="gender"
        :value="option.name"
        class="custom-control__input"
        @change="$emit('reply', option)" />
      <label :for="'opt' + option.id" class="custom-control__label">{{ option.name }}</label>
    </div>
  </div>
</template>

<style lang="scss"></style>
