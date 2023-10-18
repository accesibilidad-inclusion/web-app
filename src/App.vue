<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppNav from './components/AppNav.vue'
import { ref } from 'vue'

const route = useRoute()

const view = ref(null)

const backEvaluation = () => {
  // view.value.comeback()
}
</script>

<template>
  <div id="app">
    <AppNav v-if="!route.meta.hideNav" v-on:comeback="backEvaluation" />
    <RouterView ref="view" />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
@import '@/assets/scss/global.scss';

#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--color-background);
  overflow-x: hidden;
  @media screen and (min-width: 640px) {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 1280px) {
    max-width: 750px;
  }
}
// Transition: Slide
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
