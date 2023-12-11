<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useFetch} from '@vueuse/core'

import PresentialPlaceIcon from '@/assets/img/app-icons/support/lugar.svg?component'
import InternetPlaceIcon from '@/assets/img/app-icons/support/lugares-internet.svg?component'
import ItemClickable from '@/components/ItemClickable.vue'
import BlockHeader from '@/components/BlockHeader.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import CategoryIcon from '@/components/CategoryIcon.vue'
import {Category} from '@/model/category'
import {Service} from '@/model/service'
import {useAppDataStore} from '@/stores/app-data.js'
import {useAppNavStore} from '@/stores/app-nav.js'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()
const category = ref<Category>()
const services = ref<Array<Service>>([])

const setService = (service: Service) => {
  router.push(`/${route.params.categorySlug}/${service.slug}`)
}

const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/categories/nearServices`)
  .post({
    ...appData.location.getCoordinates(),
    category: route.params.categorySlug
  })
  .json()

services.value = data.value.services.map((s: Service) => new Service(s))
category.value = new Category(data.value.category)
appNav.selected.category = data.value.category
document.title = `Servicios de ${data.value.category.name} | Pictos`
</script>

<template>
  <div class="category entries-list">
    <template v-if="category">
      <BlockHeader
        :title="category.name"
        :description="$t('servicesByCategory.servicesNear')"
        location>
        <template #icon>
          <CategoryIcon v-bind:category="category.slug"></CategoryIcon>
        </template>
      </BlockHeader>
      <main class="category__items category__items--services">
        <template v-for="service in services" :key="service.id">
          <ItemClickable :title="service.name" @click="setService(service)">
            <template #meta>
              <div v-if="service.count_presential > 0">
                <PresentialPlaceIcon /> {{ service.count_presential }} lugares presenciales
              </div>
              <div v-if="service.count_online > 0">
                <InternetPlaceIcon /> {{ service.count_online }} lugares en internet
              </div>
            </template>
          </ItemClickable>
        </template>
      </main>
      <aside class="actions actions--category">
        <text-to-speech :text-audio="$t('servicesByCategory.cantFind')" />
        <p class="actions__title">
          {{ $t('servicesByCategory.cantFind') }}
        </p>
        <router-link to="/sugerir-lugar" class="btn btn--primary btn--large btn--block">
          {{ $t('servicesByCategory.addNew') }}
        </router-link>
      </aside>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.category {
  display: flex;
  flex-flow: column nowrap;
}
.category__items {
  flex-grow: 1;
}
// .entry-block {
// display: grid;
// grid-template-columns: auto 1fr auto;
// align-items: center;
// justify-content: flex-start;
// gap: 0 var(--spacer-sm);
// padding: var(--spacer);
// color: var(--color-brand-darkest);
// border-bottom: 1px solid var(--color-brand-light);
// transition: all 0.15s linear;

// @media screen and (min-width: 640px) {
//   padding: 1.75rem var(--spacer-lg);
// }
// @media screen and (min-width: 1280px) {
//   padding-left: var(--spacer-xl);
//   padding-right: var(--spacer-xl);
// }
// }
.category__items {
  margin: calc(var(--spacer--700) * 0.5) var(--spacer--400);
}
.actions--category {
  display: flex;
  flex-flow: column;
  gap: var(--spacer--300);
  text-align: center;
  .btn {
    margin: var(--spacer--200) 0 var(--spacer--500);
  }
}
.actions--category .actions__title {
  margin: 0;
}
</style>
