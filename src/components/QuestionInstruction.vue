<script setup lang="ts">
defineProps<{
  text: string
  icon: string
}>()
</script>

<template>
  <div>
    {{ icon }}
    {{ text }}
  </div>
</template>

<style lang="scss"></style>
