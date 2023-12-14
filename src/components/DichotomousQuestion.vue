<script setup lang="ts">
defineProps<{
  selected: string
}>()
defineEmits(['reply'])
</script>

<template>
  <div class="options-group">
    <div class="custom-control custom-control--radio">
      <input
        id="dicotomico_si"
        type="radio"
        name="dicotomico"
        value="Si"
        class="custom-control__input"
        :checked="'Si' === selected"
        @change="$emit('reply', 'Si')" />
      <label for="dicotomico_si" class="custom-control__label">Si</label>
    </div>
    <div class="custom-control custom-control--radio">
      <input
        id="dicotomico_no"
        type="radio"
        name="dicotomico"
        value="No"
        class="custom-control__input"
        :checked="'No' === selected"
        @change="$emit('reply', 'No')" />
      <label for="dicotomico_no" class="custom-control__label">No</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.options-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacer--400);
}
.custom-control__label {
  font-size: var(--font-size--800);
  font-weight: 800;
  justify-content: center;
  padding: var(--spacer--500) var(--spacer--300);
}
</style>
