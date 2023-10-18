<script setup lang="ts">
import { useAppDataStore } from '@/stores/app-data.js'
import { useAppNavStore } from '@/stores/app-nav.js'
import { useRoute, useRouter } from 'vue-router'
import IconLocationPin from '@/assets/img/app-icons/location-pin.svg?component'

const appData = useAppDataStore()
const appNav = useAppNavStore()
const router = useRouter()
const route = useRoute()

const changeLocation = () => {
  appNav.redirectTo = route.fullPath
  router.push('/tu-ubicacion')
}
</script>

<template>
  <div class="your-location">
    <div class="your-location__content">
      <IconLocationPin />
      <span v-if="appData.location?.name">{{ appData.location.name }}</span>
      <span v-else>Tu ubicación actual</span>
    </div>
    <a class="btn your-location__change" @click="changeLocation()">Cambiar</a>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.your-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc(var(--spacer-lg) / 3);
  border-radius: 5px;
  background-color: var(--color-illustration-bg);
  margin-bottom: var(--spacer);
  color: #1a4571;
  .your-location__change {
    @include rfs($font-size-14);
    font-weight: 700;
    color: var(--color-brand-dark);
    padding: calc(var(--spacer-lg) / 3);
  }
  .your-location__content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--spacer-sm);
    padding-right: var(--spacer-sm);
    border-right: 1px solid var(--color-brand-lighter);
    span {
      @include rfs($font-size-14);
    }
    svg {
      width: 11px;
      height: 15px;
      @media screen and (min-width: 640px) {
        width: var(--spacer);
        height: var(--spacer);
      }
      path {
        fill: var(--color-brand-dark);
      }
    }
  }
}
</style>
