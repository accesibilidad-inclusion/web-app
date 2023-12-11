<script setup lang="ts">
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav'
import {Loader} from '@googlemaps/js-api-loader'
import {ref, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {refDebounced} from '@vueuse/core'

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

const next = () => {
  /* this.$router.push({
    name: 'new-place-complete',
    params: {place: this.place, service_id: this.$route.params.service_id}
  }) */
}

watch(searchDebounced, () => (searchText.value.trim() !== '' ? searchPlaces() : {}))
</script>

<template>
  <div class="page">
    <div class="container">
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
            class="main-search__input" />
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

//search-result
.page__place-name {
  @include rfs($font-size-16);
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
  border: 1px solid var(--color-neutral-light);
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
</style>
