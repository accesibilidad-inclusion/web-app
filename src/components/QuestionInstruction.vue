<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue'

const props = defineProps<{
  text: string
  icon: string
}>()

const iconSvg = computed(() => {
  return defineAsyncComponent(
    () => import(`../assets/img/app-icons/instructions/${props.icon}.svg?component`)
  )
})
</script>

<template>
  <div class="instruction">
    <span class="instruction__icon">
      <component :is="iconSvg"></component>
    </span>
    <div v-html="text" class="instruction__title"></div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.instruction {
  background-color: var(--color--skyblue);
  border-radius: var(--border-radius-md);
  flex-grow: 1;
  padding: var(--spacer--500);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer--500);
  height: 100%;
  .theme-online & {
    background-color: var(--color--yellow);
  }
}
.instruction__icon {
  background: var(--color--yellow);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  display: grid;
  align-items: center;
  justify-content: center;
  .theme-online & {
    background-color: var(--color--yellow-light);
  }
}
.instruction__title {
  @include rfs($font-size-18);
  font-weight: 700;
  text-align: center;
}
</style>
