<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useFetch} from '@vueuse/core'

import PresentialPlaceIcon from '@/assets/img/app-icons/support/lugar.svg?component'
import InternetPlaceIcon from '@/assets/img/app-icons/support/lugares-internet.svg?component'
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
        <template v-slot:icon>
          <CategoryIcon v-bind:category="category.slug"></CategoryIcon>
        </template>
      </BlockHeader>
      <main class="category__items category__items--services">
        <template v-for="service in services" :key="service.id">
          <a
            class="category__item category__item--service service-block entry-block"
            tag="article"
            @click="setService(service)">
            <h2 class="service-block__name entry-block__name">{{ service.name }}</h2>
            <text-to-speech :text-audio="`${service.name}`" />
            <span class="category__meta">
              <span class="category__meta-data" v-if="service.count_presential > 0"
                ><PresentialPlaceIcon></PresentialPlaceIcon> {{ service.count_presential }} lugares
                presenciales
              </span>
              <span class="category__meta-data" v-if="service.count_online > 0"
                ><InternetPlaceIcon></InternetPlaceIcon> {{ service.count_online }} lugares en
                internet
              </span>
            </span>
          </a>
        </template>
      </main>
      <aside class="actions actions--category">
        <text-to-speech :text-audio="$t('servicesByCategory.cantFind')" />
        <p class="actions__title">
          {{ $t('servicesByCategory.cantFind') }}
        </p>
        <router-link
          :to="appNav.onboarding.venue ? '/nuevo-lugar/intro' : '/nuevo-lugar'"
          class="btn btn--primary btn--large btn--block">
          {{ $t('servicesByCategory.addNew') }}
        </router-link>
      </aside>
    </template>
  </div>
</template>

<style>
#app-wrap {
  background: var(--color--skyblue);
}
</style>

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
.category__item {
  cursor: pointer;
  display: grid;
  border: 1px solid var(--color--blue);
  background: var(--color--white);
  padding: var(--spacer--400) var(--spacer--500);
  position: relative;
  border-radius: var(--spacer--500);
  margin-top: var(--spacer--300);
  grid-template-columns: 1fr auto;
  grid-template-areas: 'title tts' 'meta meta';
  gap: var(--spacer--300);
  &:hover {
    cursor: pointer;
    background: var(--color-brand-lightest);
  }
}
.service-block__name {
  font-size: var(--font-size--500);
  line-height: 1.25;
  color: var(--color--blue-dark);
  grid-area: title;
}
.category__meta {
  grid-area: meta;
  line-height: 1.2;
  font-size: var(--font-size--400);
  display: flex;
  flex-flow: column;
  gap: var(--spacer--200);
}
.category__meta,
.category__meta-data {
  color: var(--color--blue-gray);
  font-weight: 600;
}
.tts {
  grid-area: tts;
}
.category__meta-data {
  display: block;
  display: flex;
  align-items: flex-end;
  gap: var(--spacer--200);
}
// .category__meta-data :deep(svg) {
//   // position: relative;
//   // top: 2px;
// }
.category__meta-data :deep(path) {
  fill: var(--color--blue-gray);
}
// .entry-block__name {
//   @include rfs($font-size-16);
//   line-height: 1.375;
// }
// .service-block__icon {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 1.25rem;
//   height: 1.25rem;
//   line-height: 1;
//   text-align: center;
//   border-radius: 50%;
//   background: var(--color-brand-darkest);
//   svg {
//     width: 0.7rem;
//     height: 0.7rem;
//     path {
//       fill: #fff;
//     }
//   }
// }
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
