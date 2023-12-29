<script setup lang="ts">
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav'
import {Loader} from '@googlemaps/js-api-loader'
import {ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {refDebounced, useEventBus, useFetch} from '@vueuse/core'
import IconLike from '@/assets/img/app-icons/instructions/like.svg?component'

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
const listener = () => {
  router.push(
    appNav.selected.service
      ? '/' + appNav.selected.category?.slug + '/' + appNav.selected.service?.slug
      : '/' + appNav.selected.category?.slug
  )
}
bus.on(listener)

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
        <div v-if="!searchAgain" class="page__search-again" @click="searchAgain = true">
          <icon-search />Buscar nuevamente
        </div>
        <template v-else>
          <div class="custom-control custom-control--text main-search__group">
            <input
              v-model="searchText"
              type="text"
              placeholder="Ejemplo: Terminal de buses"
              class="main-search__input custom-control" />
            <button type="submit" class="main-search__button">
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
          <h2 class="thanks-message__title">
            Gracias por tu aporte
          </h2>
          <p class="thanks-message__description">
            Estás ayudando al mundo a ser un lugar más accesible
          </p>
          <router-link :to="'/home'" class="btn btn--as-link"> Volver </router-link>         
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
                class="btn btn--large btn--primary btn--block btn--filled--skyblue"
                @click="show_subscription_form = true">
                Sí, avísame
              </button>
            </template>
            <template v-else>
              <form class="subscription-form" @submit="submitSubscription">
                <input
                  v-model="subscription_email"
                  type="email"
                  class="subscription-form__control"
                  placeholder="Escribe tu email aquí" />
                <button
                  type="submit"
                  class="btn btn--ghost subscription-form__submit"
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
            </template>
          </template>
        </footer>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

//search-result

.page__title {
  @include rfs($font-size--800);
}
.page__place-name {
  @include rfs($font-size--400);
  color: var(--color-brand-darkest);
  font-weight: bold;
  border: 2px solid var(--color-brand-light);
  border-radius: var(--border-radius);
  box-shadow: 0px 1px 5px rgba(148, 148, 148, 0.25);
  transition: var(--transition-base);
  padding: var(--spacer-sm) var(--spacer);
  margin-bottom: var(--spacer-sm);
  & + .main-search__group {
    margin-top: var(--spacer-sm);
  }
}
.page__search-again {
  @include rfs($font-size-16);
  color: var(--color-brand-darkest);
  font-weight: 600;
  padding: var(--spacer-sm) 0;
  cursor: pointer;
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: var(--spacer-sm);
    path {
      fill: var(--color-brand);
    }
  }
}
.main-search__input {
  font-size: var(--font-size--500);
  width: 100%;
  padding: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  border-radius: var(--spacer--500);
}

.main-search__button {
  top: var(--spacer);
}

.main-search__group {
  transition: var(--transition-base);
  &.active {
    border: 1px solid var(--color-brand);
    border-radius: var(--border-radius);
    .main-search__input {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-top: none;
      border-right: none;
      border-left: none;
      border-color: var(--color-brand);
    }
  }
}
.search-result__item {
  margin: var(--spacer-sm);
  padding: var(--spacer-sm) 0;
  p {
    @include rfs($font-size-16);
    color: var(--color-brand-darkest);
    font-weight: 600;
  }
  & + .search-result__item {
    border-top: 1px solid var(--color-brand-light);
  }
}

.onboarding ::v-deep .onboarding__title {
  @include rfs($font-size-21);
  margin-top: auto;
  text-transform: uppercase;
}
.onboarding__description {
  @include rfs($font-size-16);
  font-weight: bold;
  line-height: calc(22 / 16);
  color: var(--color-background);
}
.onboarding__link {
  @include rfs($font-size-16);
  font-weight: bold;
  color: var(--color-highlight);
}
.subscription-form {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer-sm);
}
.subscription-form__description {
  margin-bottom: var(--spacer);
  color: var(--color-highlight);
}
.subscription-form__control {
  @include rfs($font-size-14);
  padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
  border: 2px solid var(--color-background);
  border-radius: var(--border-radius);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var(--font-family);
  }
}
.subscription-form__submit {
  @include rfs($font-size-14);
  display: flex;
  align-items: center;
  justify-content: center;
  .v-spinner {
    margin-left: var(--spacer-sm);
  }
}
</style>
