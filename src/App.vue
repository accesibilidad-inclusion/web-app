<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import AppNav from './components/AppNav.vue'
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import {ref} from 'vue'

const route = useRoute()

const view = ref(null)

const backEvaluation = () => {
  // view.value.comeback()
}
</script>

<template>
  <div id="app-wrap">
    <AppNav v-if="!route.meta.hideNav" v-on:comeback="backEvaluation" />
    <RouterView v-slot="{Component}" ref="view">
      <Transition name="slide-fade">
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <SpinnerLoader />
          </template>
        </Suspense>
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
@import '@/assets/scss/global.scss';

#app-wrap {
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
    max-height: 100svh;
    aspect-ratio: 320/568;
  }
}
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
