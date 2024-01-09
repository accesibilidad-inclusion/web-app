<script setup lang="ts">
import IconSearch from '@/assets/img/app-icons/search.svg?component'

defineProps({
  type: {
    type: String,
    default: null
  },
  modelValue: {
    type: String,
    default: ''
  }
})
defineEmits(['search', 'update:modelValue'])
</script>

<template>
  <div class="input-search__group">
    <input
      id="s"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="input-search__input"
      type="text"
      placeholder="Ejemplo: Viajar en metro" />
    <icon-search class="input-search__icon" @click="$emit('search')" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.input-search__group {
  position: relative;
  margin: var(--spacer--500) 0;
}
.input-search__input {
  @include rfs($font-size-16);
  width: 100%;
  padding: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  border-radius: var(--spacer--500);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: inherit;
  }
}
.input-search__icon {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: var(--spacer--500);
  background: none;
  border: none;
  z-index: 9;
  width: var(--font-size--500);
  height: var(--font-size--500);
  transform: translateY(-50%);
  path {
    fill: var(--color--blue);
  }
}
@media screen and (max-width: 640px) {
  input[type='email'],
  input[type='search'],
  input[type='text'],
  select:focus,
  textarea {
    font-size: 16px;
  }
}
</style>
