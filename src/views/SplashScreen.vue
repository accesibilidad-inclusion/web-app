<script setup lang="ts">
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useRouter} from 'vue-router'
import LogoPictos from '@/assets/img/app-icons/logo-pictos-light.svg?component'
import SpinnerLoader from '@/components/SpinnerLoader.vue'

const appData = useAppDataStore()
const appNav = useAppNavStore()
const router = useRouter()

if (appData.initialized) {
  setTimeout(() => {
    router.push(appNav.redirectTo).catch(() => {})
  }, 1200)
} else {
  appData.initiation().then(() => {
    router.push(appNav.redirectTo).catch(() => {})
  })
}
</script>

<template>
  <div class="splash">
    <header class="splash__app">
      <LogoPictos class="splash__logo" />
    </header>
    <div class="splash__tagline">
      <p>Servicio de navegación y evaluación para la accesibilidad cognitiva</p>
      <SpinnerLoader class="splash__spinner" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.splash {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color--blue-dark);
  z-index: 100000;
}

.splash__app {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 48vh;
}

.splash__logo {
  width: 40vw;
  height: auto;
  min-width: 250px;
  max-width: 300px;
}

.splash__tagline {
  @include rfs($font-size-16);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 52vh;
  padding: 5vh 10vw 0;
  font-weight: 600;
  line-height: calc(26 / 18);
  color: #fff;
  text-align: center;
  background-color: var(--color--blue-dark);

  p {
    max-width: 400px;
  }
}
.splash__spinner {
  margin-top: 20px;
}
</style>
