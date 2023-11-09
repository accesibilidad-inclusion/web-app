<script setup lang="ts">
import IconFormalities from '@/assets/img/app-icons/categories/tramites.svg?component'
import IconHealth from '@/assets/img/app-icons/categories/salud.svg?component'
import IconTransport from '@/assets/img/app-icons/categories/transporte.svg?component'
import IconLeisure from '@/assets/img/app-icons/categories/ocio.svg?component'

defineProps({
  category: String
})
</script>

<template>
  <span class="category-icon">
    <IconTransport class="category__icon" v-if="category == 'transporte'" />
    <IconHealth class="category__icon" v-if="category == 'salud'" />
    <IconLeisure class="category__icon" v-if="category == 'ocio'" />
    <IconFormalities class="category__icon" v-if="category == 'tramites'" />
  </span>
</template>

<style lang="scss" scoped>
.category-icon {
  background: var(--color--yellow);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
