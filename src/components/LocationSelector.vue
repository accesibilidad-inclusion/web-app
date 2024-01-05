<script setup lang="ts">
import {useAppDataStore} from '@/stores/app-data.js'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useRoute, useRouter} from 'vue-router'
import IconLocationPin from '@/assets/img/app-icons/support/lugar.svg?component'

const appData = useAppDataStore()
const appNav = useAppNavStore()
const router = useRouter()
const route = useRoute()

defineProps<{
  dense?: Boolean
}>()

const changeLocation = () => {
  appNav.redirectTo = route.fullPath
  router.push('/tu-ubicacion')
}
</script>

<template>
  <div class="your-location location-selector" :class="{dense: dense}">
    <div class="your-location__content">
      <IconLocationPin />
      <span v-if="!appData.location.isGpsActivated()">{{ appData.location.commune?.name }}</span>
      <span v-else>{{ $t('locationSelector.name') }}</span>
    </div>
    <a class="btn your-location__change" @click="changeLocation()">{{
      $t('locationSelector.change')
    }}</a>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.your-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 var(--spacer--400);
  border-radius: var(--spacer--500);
  background-color: var(--color--skyblue-light);
  margin: var(--spacer--500) var(--spacer--400) 0;
  color: var(--color--blue);
  right: var(--spacer--400);
  @media screen and (min-width: 640px) {
    margin: var(--spacer--500) var(--spacer--500) 0;
  }
  .your-location__change {
    @include rfs($font-size-14);
    font-weight: 600;
    color: var(--color--blue);
    padding: var(--spacer--400) var(--spacer--400);
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
      font-weight: 600;
    }
    svg {
      width: 10px;
      height: 16px;
      margin-top: 3px;
      :deep(path) {
        fill: var(--color--blue) !important;
      }
    }
  }
}
</style>
