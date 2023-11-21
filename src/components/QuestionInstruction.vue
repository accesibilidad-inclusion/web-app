<script setup lang="ts">
import {computed, defineAsyncComponent} from 'vue'

const props = defineProps<{
  text: string
  icon: string
}>()

const iconSvg = computed(() => {
  return defineAsyncComponent(
    () => import('../assets/img/app-icons/instructions/' + props.icon + '.svg?component')
  )
})
</script>

<template>
  <div>
    <div>
      <component :is="iconSvg"></component>
    </div>
    <div>
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss"></style>
