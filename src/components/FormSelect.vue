<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{
  id: string
  options: Array<{value: any; text: any}>
  optionDefault: string
  modelValue: string | null
}>()
defineEmits(['update:modelValue'])

const classes = computed(() => {
  return ['custom-select', props.modelValue !== '' ? 'custom-select--filled' : ''].join(' ')
})
</script>

<template>
  <select
    :class="classes"
    :id="id"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    required>
    <option v-if="optionDefault" value="" disabled selected>{{ optionDefault }}</option>
    <option v-for="item in options" v-bind:key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.custom-select {
  @include rfs($font-size-14);
  display: inline-block;
  width: 100%;
  padding: 0.5rem 1.75rem 0.5rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  vertical-align: middle;
  color: var(--color-neutral);
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  background-color: #fff;
  border: 1px solid var(--color-neutral-light);
  border-radius: 0.25rem;
  appearance: none;
  &:valid {
    font-style: normal;
  }
  &:required:invalid {
    font-style: italic;
    color: var(--color-neutral-light);
  }
  option {
    font-style: normal;
    color: var(--color-neutral);
  }
}
</style>
