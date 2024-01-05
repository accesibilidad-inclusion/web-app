<script setup lang="ts">
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav'
import {Loader} from '@googlemaps/js-api-loader'
import {ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {refDebounced, useEventBus, useFetch} from '@vueuse/core'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'
import IconSearch from '@/assets/img/app-icons/support/buscar.svg?component'

const router = useRouter()
const route = useRoute()

const appData = useAppDataStore()
const appNav = useAppNavStore()

if (appNav.onboarding.suggestVenue) {
  appNav.redirectTo = route.fullPath
  router.push('/aprende-a-sugerir-lugares')
}

const loader = new Loader({
  apiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
  version: 'beta'
})

const {Place} = await loader.importLibrary('places')

const searchText = ref('')
const searchDebounced = refDebounced(searchText, 350)
const venues = ref<google.maps.places.Place[] | null>(null)
const venue = ref<google.maps.places.Place | null>(null)
const searchAgain = ref(true)
const submitted = ref(false)
const subscription_submitted = ref(false)
const show_subscription_form = ref(false)
const submitting_subscription = ref(false)
const id = ref(null)
const subscription_email = ref('')

const currentPosition = new google.maps.LatLng(
  appData.location.getCoordinates().lat,
  appData.location.getCoordinates().lng
)

const circle = new google.maps.Circle({radius: 5000, center: currentPosition})
const bounds = circle.getBounds()
const restrictions = bounds ? {locationRestriction: bounds} : {locationBias: currentPosition}

const searchPlaces = async () => {
  const request: google.maps.places.SearchByTextRequest = {
    fields: ['id', 'displayName', 'location'],
    textQuery: searchText.value,
    ...restrictions
  }
  const {places} = await Place.searchByText(request)
  venues.value = places
}

const setVenue = (place: google.maps.places.Place) => {
  venue.value = place
  searchAgain.value = false
  searchText.value = ''
  venues.value = null
}

const next = async () => {
  const {data} = await useFetch(
    `${import.meta.env.VITE_APP_API_DOMAIN}api/presential_venues/store_by_user`
  )
    .post({
      name: venue.value?.displayName,
      service_id: route.params.service_id === '' ? null : route.params.service_id,
      lat: venue.value?.location?.lat(),
      lng: venue.value?.location?.lng()
    })
    .json()
  submitted.value = true
  id.value = data.value.id
}

const submitSubscription = async (event: Event) => {
  event.preventDefault()
  submitting_subscription.value = true
  await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/presential_venues/addNotification`)
    .post({
      id: id.value,
      email: subscription_email.value
    })
    .json()
  subscription_submitted.value = true
  submitting_subscription.value = false
}

const bus = useEventBus('close')
const close = () => {
  router.push(
    appNav.selected.service
      ? '/' + appNav.selected.category?.slug + '/' + appNav.selected.service?.slug
      : '/' + appNav.selected.category?.slug
  )
}
bus.on(close)

watch(searchDebounced, () => (searchText.value.trim() !== '' ? searchPlaces() : {}))
</script>

<template>
  <div class="page">
    <div class="container">
      <template v-if="!submitted">
        <h2 class="page__title">
          Busca un lugar para agregarlo a Pictos
          <text-to-speech :text-audio="'Busca un lugar para agregarlo a Pictos'" />
        </h2>
        <div v-if="venue" class="page__place-name">
          {{ venue.displayName }}
        </div>
        <div
          v-if="!searchAgain"
          class="btn btn--large btn--primary btn--filled--skyblue-light btn--icon"
          @click="searchAgain = true">
          <icon-search /> Buscar nuevamente
        </div>
        <template v-else>
          <div class="custom-control custom-control--search">
            <input v-model="searchText" type="text" placeholder="Ejemplo: Terminal de buses" />
            <button type="submit">
              <icon-search />
            </button>
            <div
              v-for="venue in venues"
              :key="venue.id"
              class="search-result__item"
              @click="setVenue(venue)">
              <p>{{ venue.displayName }}</p>
            </div>
          </div>
        </template>
        <div id="map"></div>
        <footer class="onboarding__footer">
          <button class="btn btn--large btn--block btn--primary" :disabled="!venue" @click="next">
            Listo
          </button>
        </footer>
      </template>
      <template v-else>
        <div class="thanks-message">
          <span class="thanks-message__icon">
            <icon-like></icon-like>
          </span>
          <h2 class="thanks-message__title">Gracias por tu aporte</h2>
          <p class="thanks-message__description">
            Estás ayudando al mundo a ser un lugar más accesible
          </p>
          <button
            class="btn btn--primary btn--block btn--large btn--filled--skyblue"
            @click="close">
            Volver
          </button>
        </div>
        <footer class="thanks-message-footer">
          <template v-if="subscription_submitted">
            <p class="thanks-message__description">
              Muchas gracias, te avisaremos cuando tu aporte sea aprobado.
            </p>
          </template>
          <template v-else>
            <p class="thanks-message__description">
              ¿Quieres que te avisemos cuando publiquemos tu aporte?
            </p>
            <template v-if="!show_subscription_form">
              <button
                type="button"
                class="btn btn--large btn--block btn--primary"
                @click="show_subscription_form = true">
                Sí, avísame
              </button>
            </template>
            <template v-else>
              <div class="thanks-message__form">
                <form class="subscription-form custom-control" @submit="submitSubscription">
                  <input
                    v-model="subscription_email"
                    type="email"
                    class="thanks-message__email"
                    placeholder="Escribe tu email aquí" />
                  <button
                    type="submit"
                    class="btn btn--large btn--primary btn--icon"
                    :disabled="submitting_subscription">
                    Enviar
                    <template v-if="submitting_subscription">
                      <clip-loader
                        :loading="submitting_subscription"
                        :color="'#fff'"
                        :size="'1rem'"></clip-loader>
                    </template>
                  </button>
                </form>
              </div>
            </template>
          </template>
        </footer>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.page__place-name {
  margin-bottom: var(--spacer--400);
  border: 1px solid transparent;
  background-color: var(--color--skyblue-light);
  border-radius: var(--spacer--500);
  box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
  transition: var(--transition-base);
  padding: var(--spacer--400) var(--spacer--400);
  font-weight: 700;
  position: relative;
  & + .main-search__group {
    margin-top: var(--spacer--400);
  }
}
.search-result__item {
  margin: 0 var(--spacer--200);
  padding: var(--spacer--400) var(--spacer--200);
  p {
    font-size: var(--font-size--600);
    line-height: 1.25;
    color: var(--color--blue-dark);
    font-weight: 600;
  }
  & + .search-result__item {
    border-top: 1px solid var(--color--carolinablue);
  }
}
.onboarding__footer {
  margin-top: auto;
}
</style>
