<script setup lang="ts">
import {RouterView} from 'vue-router'
import AppNav from './components/AppNav.vue'
import LoadingLayer from '@/components/LoadingLayer.vue'
import {useAppNavStore} from './stores/app-nav'
import {useAppDataStore} from '@/stores/app-data'
import {useI18n} from 'vue-i18n'
import {nextTick} from 'vue'
import router from '@/router'
const { t, locale } = useI18n({ useScope: 'global' })

const appNav = useAppNavStore()
const appData = useAppDataStore()

locale.value = appData.country?.language ?? 'es'

router.afterEach((to) => {
  if (to.meta !== undefined && to.meta.title) {
    const {title} = to.meta
    nextTick(() => {
      document.title = t(title) + ' | Pictos'
    })
  }
})
</script>

<template>
  <div id="app-wrap" :class="`theme-${appNav.theme}`">
    <AppNav />
    <RouterView v-slot="{Component}" :key="$route.fullPath">
      <Transition name="slide-fade">
        <Suspense timeout="0">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <LoadingLayer />
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
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow-x: hidden;
  @media screen and (min-width: 540px) {
    max-width: 540px;
    margin-left: auto;
    margin-right: auto;
  }
  // @media screen and (min-width: 1280px) {
  //   max-height: 100svh;
  //   aspect-ratio: 320/568;
  // }
}

#app-wrap.theme-presential {
  background: var(--color--skyblue-light);
  position: relative;
}
#app-wrap.theme-online {
  background: var(--color--yellow-light);
  position: relative;
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
