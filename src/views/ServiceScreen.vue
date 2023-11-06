<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import TextToSpeech from '@/components/TextToSpeech.vue'
import IconFormalities from '@/assets/img/app-icons/formalities.svg?component'
import IconHealth from '@/assets/img/app-icons/health.svg?component'
import IconTransport from '@/assets/img/app-icons/transport.svg?component'
import IconLeisure from '@/assets/img/app-icons/leisure.svg?component'
import { useAppDataStore } from '@/stores/app-data.js'
import { useAppNavStore } from '@/stores/app-nav.js'
import { Category } from '@/model/category'
import { Service } from '@/model/service'
import { PresentialVenue } from '@/model/presential_venue.js'
import { OnlineVenue } from '@/model/online_venue.js'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()

const category = ref<Category>()
const service = ref<Service>()
const venues_presential = ref<Array<PresentialVenue>>([])
const venues_online = ref<Array<OnlineVenue>>([])
const loading = ref(true)

const setVenue = (venue: PresentialVenue | OnlineVenue) => {
  router.push(`/${route.params.categorySlug}/${route.params.serviceSlug}/${venue.slug}`)
}

onBeforeMount(() => {
  if (appData.location) {
    fetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/services/nearVenues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: parseFloat(appData.location.lat),
        lng: parseFloat(appData.location.lng),
        category: route.params.categorySlug,
        service: route.params.serviceSlug
      })
    })
      .then(async (response) => {
        const data = await response.json()
        venues_presential.value = data.venues.map((v: PresentialVenue) => new PresentialVenue(v))
        venues_online.value = data.venues_online.map((v: OnlineVenue) => new OnlineVenue(v))
        category.value = data.category
        service.value = data.service
        appNav.selected.category = data.category
        appNav.selected.service = data.service
        document.title = `Lugares de ${data.service.name} | Pictos`
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
  <div class="service">
    <template v-if="loading">
      <clip-loader
        :loading="loading"
        :color="'#CAE0FF'"
        :size="'3rem'"
        class="mt-auto mb-auto"
      ></clip-loader>
    </template>
    <template v-else-if="category && service">
      <header class="service__header entries-list__header">
        <icon-transport v-if="category.slug == 'transporte'" class="service__icon" />
        <icon-health v-if="category.slug == 'salud'" class="service__icon" />
        <icon-leisure v-if="category.slug == 'ocio'" class="service__icon" />
        <icon-formalities v-if="category.slug == 'tramites'" class="service__icon" />
        <h1 class="service__title entries-list__title">{{ service.name }}</h1>
        <p class="service__description entries-list__description">Lugares del servicio</p>
        <text-to-speech
          :text-audio="service.name + '.\n\n\n\n\n Lugares del servicio.'"
        ></text-to-speech>
      </header>
      <main class="service__items service__items venues">
        <template v-if="venues_online.length">
          <div>Lugares en internet</div>
          <template v-for="venue_online in venues_online" :key="venue_online.id">
            <a class="venue-block entry-block" tag="article" @click="setVenue(venue_online)">
              <text-to-speech :text-audio="venue_online.name" />
              <h2 class="venue-block__name entry-block__name">{{ venue_online.name }}</h2>
              <!-- <p class="venue-block__distance">{{ venue_online.url }}</p> -->
              <p class="venue-block__distance">http://www.ejemplo.cl</p>
              <div
                v-if="venue_online.evaluation && venue_online.show_evaluation"
                class="venue-block__evaluation"
              >
                <span
                  class="venue-grade venue-block__evaluation-grade"
                  :data-grade="venue_online.evaluation.score"
                >
                  {{ venue_online.evaluation.score }}
                </span>
                <span class="venue-block__evaluation-description">
                  {{ venue_online.evaluation.calification }}
                </span>
              </div>
            </a>
          </template>
        </template>
        <template v-if="venues_presential.length">
          <div>Lugares presenciales</div>
          <template v-for="venue in venues_presential" :key="venue.id">
            <a class="venue-block entry-block" tag="article" @click="setVenue(venue)">
              <text-to-speech
                :text-audio="
                  venue.name +
                  ': a' +
                  venue.distanceToText().replace('.', ' punto ') +
                  ' de distancia.'
                "
              />
              <h2 class="venue-block__name entry-block__name">{{ venue.name }}</h2>
              <p class="venue-block__distance">a {{ venue.distanceToText() }} de distancia</p>
              <div v-if="venue.evaluation && venue.show_evaluation" class="venue-block__evaluation">
                <span
                  class="venue-grade venue-block__evaluation-grade"
                  :data-grade="venue.evaluation.score"
                >
                  {{ venue.evaluation.score }}
                </span>
                <span class="venue-block__evaluation-description">
                  {{ venue.evaluation.calification }}
                </span>
              </div>
            </a>
          </template>
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
          :to="
            appNav.onboarding.venue
              ? '/nuevo-lugar/intro/' + service.id
              : '/nuevo-lugar/' + service.id
          "
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
.service {
  display: flex;
  flex-flow: column nowrap;
}
.service__header .tts {
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
.service__icon {
  width: 1rem;
  height: 1rem;
}
.service__items {
  flex-grow: 1;
}
.venue-block {
  cursor: pointer;
  .tts {
    grid-column: 3/4;
    grid-row: 1/3;
  }
}
.venue-block__name {
  grid-column: 1/3;
  grid-row: 1/2;
}
.venue-block__distance {
  @include rfs($font-size-12);
  grid-column: 1/3;
  grid-row: 2/3;
  line-height: 1.33333;
  color: var(--color-neutral);
}
.venue-block__evaluation {
  @include rfs($font-size-12);
  grid-column: 1/4;
  margin-top: var(--spacer-sm);
  line-height: 1.33333;
  text-transform: uppercase;
  color: var(--color-text);
}
.venue__evaluation-grade {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  border-radius: 50%;
  &[data-grade='5'] {
    background: var(--color-grade-5);
  }
  &[data-grade='4'] {
    background: var(--color-grade-4);
  }
  &[data-grade='3'] {
    background: var(--color-grade-3);
  }
  &[data-grade='2'] {
    background: var(--color-grade-2);
  }
  &[data-grade='1'] {
    background: var(--color-grade-1);
  }
  &[data-grade='0'] {
    background: var(--color-grade-0);
  }
}
.venue-block__evaluation-grade {
  display: inline-block;
  width: 1.1875rem;
  height: 1.1875rem;
  margin-right: 0.15rem;
  line-height: 1.1875rem;
  color: var(--color-brand-darker);
}
</style>
