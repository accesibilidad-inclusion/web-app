<script setup lang="ts">
import TextToSpeech from '@/components/TextToSpeech.vue'
import CategoryIcon from '@/components/CategoryIcon.vue'
import LocationSelector from '@/components/LocationSelector.vue'
import type {Service} from '@/types/service'

import {onBeforeMount, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useAppDataStore} from '@/stores/app-data.js'
import {useAppNavStore} from '@/stores/app-nav.js'
import type {Category} from '@/types/category'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()

const category = ref<Category>()
const services = ref<Array<Service>>([])
const loading = ref(true)

const setService = (service: Service) => {
  router.push(`/${route.params.categorySlug}/${service.slug}`)
}

onBeforeMount(() => {
  if (appData.location) {
    fetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/categories/nearServices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: parseFloat(appData.location.lat),
        lng: parseFloat(appData.location.lng),
        category: route.params.categorySlug
      })
    })
      .then(async (response) => {
        const data = await response.json()
        services.value = data.services
        category.value = data.category
        appNav.selected.category = data.category
        document.title = `Servicios de ${data.category.name} | Pictos`
        loading.value = false
      })
      .catch((err) => {
        if (err.response.status === 404) {
          router.push('/')
        }
      })
  } else {
    router.push('/')
  }
})
</script>

<template>
  <div class="category entries-list">
    <template v-if="loading">
      <clip-loader
        :loading="loading"
        :color="'#CAE0FF'"
        :size="'3rem'"
        class="mt-auto mb-auto"></clip-loader>
    </template>
    <template v-else-if="category">
      <header class="category__header entries-list__header">
        <CategoryIcon class="category__icon" v-bind:category="category.slug"></CategoryIcon>
        <h1 class="category__title entries-list__title">{{ category.name }}</h1>
        <p class="category__description entries-list__description">Servicios cercanos a</p>
        <LocationSelector></LocationSelector>
        <text-to-speech
          :text-audio="
            category.name + '.\n\n Revisa los servicios disponibles que están cerca de tí'
          " />
      </header>
      <main class="category__items category__items--services">
        <template v-for="service in services" :key="service.id">
          <a
            class="category__item category__item--service service-block entry-block"
            tag="article"
            @click="setService(service)">
            <span class="service-block__icon">
              <span class="sr-only">{{ $route.params.categorySlug }}</span>
              <icon-transport class="category__icon" v-if="category.slug == 'transporte'" />
              <icon-health class="category__icon" v-if="category.slug == 'salud'" />
              <icon-leisure class="category__icon" v-if="category.slug == 'ocio'" />
              <icon-formalities class="category__icon" v-if="category.slug == 'tramites'" />
            </span>
            <h2 class="service-block__name entry-block__name">{{ service.name }}</h2>
            <text-to-speech :text-audio="`${service.name}`" />
          </a>
        </template>
      </main>
      <aside class="actions actions--category">
        <p class="actions__title">
          ¿No encuentras el lugar que estás buscando?
          <text-to-speech
            :text-audio="'¿No encuentras el lugar que estás buscando? Agregar un lugar nuevo'" />
        </p>
        <router-link
          :to="appNav.onboarding.venue ? '/nuevo-lugar/intro' : '/nuevo-lugar'"
          class="btn btn--primary btn--large btn--block">
          &plus; Agregar un lugar nuevo
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
.entry-block {
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: flex-start;
  gap: 0 var(--spacer-sm);
  padding: var(--spacer);
  color: var(--color-brand-darkest);
  border-bottom: 1px solid var(--color-brand-light);
  transition: all 0.15s linear;
  &:hover {
    cursor: pointer;
    background: var(--color-brand-lightest);
  }
  @media screen and (min-width: 640px) {
    padding: 1.75rem var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.entry-block__name {
  @include rfs($font-size-16);
  line-height: 1.375;
}
.service-block__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  line-height: 1;
  text-align: center;
  border-radius: 50%;
  background: var(--color-brand-darkest);
  svg {
    width: 0.7rem;
    height: 0.7rem;
    path {
      fill: #fff;
    }
  }
}
.actions--category .actions__title {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
}
</style>
