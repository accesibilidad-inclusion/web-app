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
  <div class="input-search__group custom-control">
    <input
      id="s"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="input-search__input"
      type="text"
      :placeholder="type === 'presential' ? 'Ejemplo: Viajar en metro' : 'Ejemplo: Bloqueo de cédula'" />
      <span class="input-search__icon">
        <icon-search @click="$emit('search')" />
      </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.input-search__group {
  margin: var(--spacer--400) 0;
}
.input-search__input {
  position: relative;
}
.input-search__icon {
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--spacer--500);
  svg {
    width: 16px;
    height: 16px;
    &:deep(path) {
      fill: var(--color--blue);
    }
  }
}
</style>
