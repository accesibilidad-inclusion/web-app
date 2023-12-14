<script setup lang="ts">
defineProps<{
  options: Array<{id: number; name: string}>
  selected: string
}>()
defineEmits(['reply'])
</script>

<template>
  <div class="options-group">
    <div v-for="option in options" :key="option.id" class="custom-control custom-control--radio">
      <input
        :id="'opt' + option.id"
        type="radio"
        name="gender"
        :value="option.name"
        class="custom-control__input"
        @change="$emit('reply', option.name)"
        :checked="option.name === selected" />
      <label :for="'opt' + option.id" class="custom-control__label">{{ option.name }}</label>
    </div>
  </div>
</template>

<style lang="scss">
.options-group {
  display: grid;
  gap: var(--spacer--300)
}
</style>
