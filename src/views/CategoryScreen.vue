<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useFetch} from '@vueuse/core'

import PresentialPlaceIcon from '@/assets/img/app-icons/support/lugar.svg?component'
import InternetPlaceIcon from '@/assets/img/app-icons/support/lugares-internet.svg?component'
import LocationSelector from '@/components/LocationSelector.vue'
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
      <header class="category__header entries-list__header">
        <CategoryIcon class="category__icon" v-bind:category="category.slug"></CategoryIcon>
        <h1 class="category__title entries-list__title">{{ category.name }}</h1>
        <p class="category__description entries-list__description">
          {{ $t('servicesByCategory.servicesNear') }}
        </p>
        <LocationSelector :dense="true" />
        <text-to-speech
          :text-audio="category.name + '.\n\n ' + $t('servicesByCategory.servicesNear')" />
      </header>
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
.category__icon {
  position: absolute;
}
.entries-list__header {
  position: relative;
  padding: var(--spacer);
  text-align: center;
  background-color: var(--color-brand-lighter);
  @media screen and (min-width: 640px) {
    padding: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.entries-list__title {
  font-size: var(--font-size--700);
  margin-bottom: var(--spacer--200);
  line-height: calc(25 / 18);
  color: var(--color-brand-darkest);
}
.category__header {
  border-radius: var(--spacer--500);
  background: var(--color--carolinablue);
  margin: var(--spacer--700) var(--spacer--400) 0;
  position: relative;
  padding-top: var(--spacer--600);
  font-weight: 600;
}
.category__description {
  font-size: var(--font-size--400);
  color: var(--color--blue-dark);
  margin: var(--spacer--200) 0;
}
.category__header :deep(.your-location) {
  margin: 0;
  background: transparent;
  padding: 0;
  justify-content: center;
  .your-location__content {
    width: auto;
    color: var(--color--blue-dark);
    gap: var(--spacer--200);
  }
  svg {
    position: relative;
    top: 1px;
    path {
      fill: var(--color--blue-dark) !important;
    }
  }

  .your-location__change {
    padding: var(--spacer--200);
    color: var(--color--blue);
  }
}
.category__icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.category__header .tts {
  position: absolute;
  top: var(--spacer);
  right: var(--spacer);
  @media screen and (min-width: 640px) {
    right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    right: var(--spacer-xl);
  }
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
