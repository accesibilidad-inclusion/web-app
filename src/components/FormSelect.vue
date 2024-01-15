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
  @include rfs($font-size-16);
  font-family: var(--font-family);
  font-weight: 600;
  width: 100%;
  padding: var(--spacer--500);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--500);
  color: var(--color--blue-dark);
  background-color: var(--color--white);
  &::placeholder {
    color: var(--color--blue-light);
    font-style: italic;
  }
  &:focus-visible {
    outline: var(--color--blue-dark) solid 1px;
  }
  appearance: none;

  &:valid {
    font-style: normal;
  }
  &:required:invalid {
    color: var(--color--blue-light);
    font-style: italic;
  }
  option {
    font-style: normal;
    color: var(--color--blue-dark);
  }
}
.form-group select:focus + label {
  display: none;
}
</style>
