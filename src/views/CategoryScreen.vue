<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import LocationSelector from '@/components/LocationSelector.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconFormalities from '@/assets/img/app-icons/formalities.svg?component'
import IconHealth from '@/assets/img/app-icons/health.svg?component'
import IconTransport from '@/assets/img/app-icons/transport.svg?component'
import IconLeisure from '@/assets/img/app-icons/leisure.svg?component'
import { Service } from '@/model/service'
import { Category } from '@/model/category'
import { useAppDataStore } from '@/stores/app-data.js'
import { useAppNavStore } from '@/stores/app-nav.js'

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
        services.value = data.services.map((s: Service) => new Service(s))
        category.value = new Category(data.category)
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
        class="mt-auto mb-auto"
      ></clip-loader>
    </template>
    <template v-else-if="category">
      <header class="category__header entries-list__header">
        <IconTransport class="category__icon" v-if="category.slug == 'transporte'" />
        <IconHealth class="category__icon" v-if="category.slug == 'salud'" />
        <IconLeisure class="category__icon" v-if="category.slug == 'ocio'" />
        <IconFormalities class="category__icon" v-if="category.slug == 'tramites'" />
        <h1 class="category__title entries-list__title">{{ category.name }}</h1>
        <p class="category__description entries-list__description">
          Servicios cercanos a
          <LocationSelector :dense="true" />
        </p>
        <text-to-speech
          :text-audio="
            category.name + '.\n\n Servicios cercanos a ' + appData.location?.name ?? 'tu ubicación actual'
          "
        />
      </header>
      <main class="category__items category__items--services">
        <template v-for="service in services" :key="service.id">
          <a
            class="category__item category__item--service service-block entry-block"
            tag="article"
            @click="setService(service)"
          >
            <h2 class="service-block__name entry-block__name">{{ service.name }}</h2>
            <div v-if="service.count_presential > 0">{{ service.count_presential }} lugar<span v-if="service.count_presential > 1">es</span> presencial<span v-if="service.count_presential > 1">es</span></div>
            <div v-if="service.count_online > 0">{{ service.count_online }} lugar<span v-if="service.count_online > 1">es</span> en internet</div>
            <text-to-speech :text-audio="`${service.name}`" />
          </a>
        </template>
      </main>
      <aside class="actions actions--category">
        <p class="actions__title">
          ¿No encuentras el lugar que estás buscando?
          <text-to-speech
            :text-audio="'¿No encuentras el lugar que estás buscando? Agregar un lugar nuevo'"
          />
        </p>
        <router-link
          :to="appNav.onboarding.venue ? '/nuevo-lugar/intro' : '/nuevo-lugar'"
          class="btn btn--primary btn--large btn--block"
        >
          &plus; Agregar un lugar nuevo
        </router-link>
      </aside>
    </template>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.category {
  display: flex;
  flex-flow: column nowrap;
}
.category__icon {
  width: 2.1875rem;
  height: 2.1875rem;
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
  @include rfs($font-size-18);
  margin-bottom: var(--spacer-sm);
  line-height: calc(25 / 18);
  color: var(--color-brand-darkest);
}
.entries-list__description {
  @media screen and (max-width: 639px) {
    text-align: left;
  }
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
