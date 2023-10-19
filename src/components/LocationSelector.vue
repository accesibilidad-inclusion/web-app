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
  <div class="your-location location-selector">
    <div class="your-location__content">
      <IconLocationPin />
      <span v-if="appData.location?.name">{{ appData.location.name }}</span>
      <span v-else>Tu ubicación actual</span>
    </div>
    <a class="btn your-location__change" @click="changeLocation()">Cambiar</a>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.your-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc(var(--spacer-lg) / 3);
  border-radius: var( --spacer--500 );
  background-color: var( --color--skyblue-light );
  margin: var( --spacer--500 ) var( --spacer--400 );
  color: var( --color--blue );
  .your-location__change {
    @include rfs($font-size-14);
    font-weight: 600;
    color: var(--color--blue);
    padding: var( --spacer--200 ) var( --spacer--400 );
  }
  .your-location__content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--spacer-sm);
    padding-right: var(--spacer-sm);
    border-right: 1px solid var(--color--blue);
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
      :deep(path) {
        fill: var( --color--blue ) !important;
      }
    }
  }
}
</style>
