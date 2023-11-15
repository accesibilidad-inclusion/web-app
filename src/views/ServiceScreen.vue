<script setup lang="ts">
import {ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useFetch} from '@vueuse/core'

import IconFormalities from '@/assets/img/app-icons/formalities.svg?component'
import IconHealth from '@/assets/img/app-icons/health.svg?component'
import IconTransport from '@/assets/img/app-icons/transport.svg?component'
import IconLeisure from '@/assets/img/app-icons/leisure.svg?component'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {Category} from '@/model/category'
import {Service} from '@/model/service'
import {PresentialVenue} from '@/model/presential_venue.js'
import {OnlineVenue} from '@/model/online_venue.js'
import {useAppDataStore} from '@/stores/app-data.js'
import {useAppNavStore} from '@/stores/app-nav.js'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()

const category = ref<Category>()
const service = ref<Service>()
const venues_presential = ref<Array<PresentialVenue>>([])
const venues_online = ref<Array<OnlineVenue>>([])

const setVenue = (venue: PresentialVenue | OnlineVenue) => {
  router.push(`/${route.params.categorySlug}/${route.params.serviceSlug}/${venue.slug}`)
}

const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/services/nearVenues`)
  .post({
    ...appData.location.getCoordinates(),
    category: route.params.categorySlug,
    service: route.params.serviceSlug
  })
  .json()

venues_presential.value = data.value.venues.map((v: PresentialVenue) => new PresentialVenue(v))
venues_online.value = data.value.venues_online.map((v: OnlineVenue) => new OnlineVenue(v))
category.value = data.value.category
service.value = data.value.service
appNav.selected.category = data.value.category
appNav.selected.service = data.value.service
document.title = `Lugares de ${data.value.service.name} | Pictos`
</script>

<template>
  <div class="service">
    <template v-if="category && service">
      <header class="service__header entries-list__header">
        <span class="service-icon">
        <icon-transport v-if="category.slug == 'transporte'" class="service__icon" />
        <icon-health v-if="category.slug == 'salud'" class="service__icon" />
        <icon-leisure v-if="category.slug == 'ocio'" class="service__icon" />
        <icon-formalities v-if="category.slug == 'tramites'" class="service__icon" />
        </span>
        <h1 class="service__title entries-list__title">{{ service.name }}</h1>
        <p class="service__description entries-list__description">Lugares del servicio</p>
        <text-to-speech
          :text-audio="service.name + '.\n\n\n\n\n Lugares del servicio.'"></text-to-speech>
      </header>
      <main class="service__items service__items venues">
        <template v-if="venues_online.length">
          <div>Lugares en internet</div>
          <template v-for="venue_online in venues_online" :key="venue_online.id">
            <a class="venue-block entry-block" tag="article" @click="setVenue(venue_online)">
              <text-to-speech :text-audio="venue_online.name" />
              <h2 class="venue-block__name entry-block__name">{{ venue_online.name }}</h2>
              <p class="venue-block__distance">{{ venue_online.url }}</p>
              <div
                v-if="venue_online.evaluation && venue_online.show_evaluation"
                class="venue-block__evaluation">
                <span
                  class="venue-grade venue-block__evaluation-grade"
                  :data-grade="venue_online.evaluation.score">
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
            <a class="venue-block entry-block card" tag="article" @click="setVenue(venue)">
              <text-to-speech
                :text-audio="
                  venue.name +
                  ': a' +
                  venue.distanceToText().replace('.', ' punto ') +
                  ' de distancia.'
                " />
              <h2 class="venue-block__name entry-block__name card__name">{{ venue.name }}</h2>
              <p class="venue-block__distance card__distance">a {{ venue.distanceToText() }} de distancia</p>
              <div v-if="venue.evaluation && venue.show_evaluation" class="venue-block__evaluation">
                <span
                  class="venue-grade venue-block__evaluation-grade"
                  :data-grade="venue.evaluation.score">
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
            :text-audio="'¿No encuentras el lugar que estás buscando? Agregar un lugar nuevo'" />
        </p>
        <router-link
          :to="
            appNav.onboarding.venue
              ? '/nuevo-lugar/intro/' + service.id
              : '/nuevo-lugar/' + service.id
          "
          class="btn btn--primary btn--large btn--block">
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
  padding: var(--spacer--700) var(--spacer--400) var(--spacer--500);
}
.service__header {
  padding: var(--spacer--500) var(--spacer--400);
  background: var(--color-brand-lighter);
  border-radius: var(--spacer--500);
  color: var(--color--blue-dark);
  display: grid;
  grid-template-areas: 'icon name' 'icon description';
  grid-template-columns: 55px auto;
  grid-template-rows: auto 1fr;
  gap: var(--spacer--200) var(--spacer--300);
  position: relative;
}
.service-icon {
  background: var(--color--yellow);
  border: 1px solid var(--color--blue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-area: icon;
}
.service__title {
  grid-area: name;
  display: block;
  font-size: var(--font-size--700);
  font-weight: 700;
}
.service__description {
  grid-area: description;
  font-size: var(--font-size--400);
  font-weight: 600;
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
