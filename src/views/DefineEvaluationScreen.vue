<script setup lang="ts">
import {useAppNavStore} from '@/stores/app-nav.js'
import {useRouter} from 'vue-router'
import {useEventBus} from '@vueuse/core'

const appNav = useAppNavStore()
const router = useRouter()

const bus = useEventBus('close')
const listener = () => {
  router.push(
    '/' +
      appNav.selected.category?.slug +
      '/' +
      appNav.selected.service?.slug +
      '/' +
      appNav.selected.venue?.slug
  )
}
bus.on(listener)
</script>

<template>
  <main class="page"></main>
</template>

<style lang="scss" scoped></style>
