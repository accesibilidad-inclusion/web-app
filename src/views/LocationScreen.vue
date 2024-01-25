<script setup lang="ts">
import {ref} from 'vue'

import {Location} from '@/model/location'
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav.js'
import {useRouter} from 'vue-router'
import type {Commune} from '@/types/commune'
import TextToSpeech from '@/components/TextToSpeech.vue'
import IconSearch from '@/assets/img/app-icons/search.svg?component'

import {Loader} from '@googlemaps/js-api-loader'
import {useFetch} from '@vueuse/core'

let geocoder: google.maps.Geocoder

const loader = new Loader({
  apiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
  version: 'beta'
})

loader.importLibrary('geocoding').then(() => {
  geocoder = new google.maps.Geocoder()
})

const appData = useAppDataStore()
const appNav = useAppNavStore()
const router = useRouter()

const showCommune = ref(false)
const query = ref('')
const expandRegions = ref<Array<number>>([])
const commune = ref<Commune | null>(null)
const permissionDenied = ref(false)

const activateGps = () => {
  navigator.geolocation.getCurrentPosition(checkPosition, errorGps)
}

const checkPosition = (position: any) => {
  geocoder
    //.geocode({location: {lat: -34.602706, lng: -70.979868}})
    .geocode({location: {lat: position.coords.latitude, lng: position.coords.longitude}})
    .then(async (response) => {
      if (response.results.length) {
        const address = response.results[0].address_components
        const commune = address.find((a) => a.types.includes('administrative_area_level_3'))
        // const region = address.find((a) => a.types.includes('administrative_area_level_1'))

        const {data} = await useFetch(
          `${import.meta.env.VITE_APP_API_DOMAIN}api/getCommuneByGoogleName/${commune?.long_name}`
        )
          .get()
          .json()

        appData.location = new Location({
          gpsLat: position.coords.latitude.toString(),
          gpsLng: position.coords.longitude.toString(),
          commune: Object.keys(data.value).length ? data.value : null
        })
      }
    })
    .catch((e) => console.error('Geocoder failed due to: ' + e))
}

const errorGps = () => {
  permissionDenied.value = true
}

const selectCommune = () => {
  showCommune.value = true
}

const setCommune = (c: Commune) => {
  if (commune.value && commune.value?.id === c.id) {
    commune.value = null
  } else {
    commune.value = c
  }
}

const cancelCommune = () => {
  showCommune.value = false
  commune.value = null
  expandRegions.value = []
  query.value = ''
}

const confirmCommune = () => {
  appData.location = new Location({
    gpsLat: '',
    gpsLng: '',
    commune: commune.value
  })
  redirect()
}

const redirect = () => {
  router.push(appNav.redirectTo).catch(() => {})
  appNav.redirectTo = '/inicio'
}

const toggle = (id: number) => {
  if (expandRegions.value.includes(id)) {
    expandRegions.value.splice(expandRegions.value.indexOf(id), 1)
  } else {
    expandRegions.value.push(id)
  }
}
</script>

<template>
  <div>
    <div v-if="!showCommune" class="your-location location-container">
      <template v-if="appData.location.isGpsActivated()">
        <div class="activate-location activate-location--gps">
          <icon-location-pin class="activate-location__icon" />
          <h2 class="activate-location__title" v-html="$t('yourLocation.gpsTitle')"></h2>
          <button class="btn btn--large btn--block btn--primary" @click="redirect()">
            {{ $t('yourLocation.continue') }}
          </button>
          <button class="btn btn--large btn--block btn--as-link" @click="selectCommune()">
            {{ $t('yourLocation.selectACommune') }}
          </button>
        </div>
      </template>
      <template v-else-if="permissionDenied">
        <div class="activate-location">
          <h2
            class="activate-location__title"
            v-html="$t('yourLocation.permissionDeniedTitle')"></h2>
          <p class="activate-location__description">
            {{ $t('yourLocation.activatePermissions') }}
          </p>
          <button class="btn btn--large btn--block btn--primary" @click="permissionDenied = false">
            {{ $t('yourLocation.tryAgain') }}
          </button>
          <span class="activate-location__or">{{ $t('yourLocation.or') }}</span>
          <button class="btn btn--large btn--block btn--primary" @click="selectCommune()">
            {{ $t('yourLocation.selectACommune') }}
          </button>
        </div>
      </template>
      <template v-else-if="appData.location.isCommuneSelected()">
        <div class="activate-location activate-location--gps">
          <icon-location-pin class="activate-location__icon" />
          <h2
            class="activate-location__title"
            v-html="
              $t('yourLocation.communeSelectedTitle', {communeName: appData.location.commune?.name})
            "></h2>
          <p class="activate-location__description">
            {{ $t('yourLocation.changeLocation') }}
          </p>
          <button class="btn btn--large btn--block btn--primary" @click="activateGps()">
            {{ $t('yourLocation.activateGps') }}
          </button>
          <span class="activate-location__or">{{ $t('yourLocation.or') }}</span>
          <button class="btn btn--large btn--block btn--primary" @click="selectCommune()">
            {{ $t('yourLocation.selectingACommune') }}
          </button>
        </div>
        <a href="#" class="close-app" @click="router.push('/inicio').catch(() => {})">{{
          $t('yourLocation.backToMain')
        }}</a>
      </template>
      <template v-else>
        <div class="activate-location">
          <h2 class="activate-location__title">Tu ubicación</h2>
          <p class="activate-location__description">
            <span class="font-weight-medium">Activa el GPS</span> o
            <span class="font-weight-medium">ingresa una comuna</span> manualmente para ver los
            servicios disponibles cerca tuyo.
          </p>
          <button class="btn btn--large btn--block btn--primary" @click="activateGps()">
            Activar GPS
          </button>
          <button class="btn btn--large btn--block btn--primary" @click="selectCommune()">
            Selecciona una comuna
          </button>
        </div>
        <a href="https://pictos.cl" class="close-app">Visita nuestro sitio web</a>
      </template>
    </div>
    <div v-else class="select-commune">
      <header class="commune-header">
        <h1 class="commune-header__title">Elige o busca una comuna</h1>
        <TextToSpeech :text-audio="'Elige o busca una comuna.'" />
        <div class="main-search__group">
          <input
            v-model="query"
            class="main-search__input"
            type="search"
            placeholder="Ejemplo: Viña del mar" />
          <icon-search class="main-search__icon" />
        </div>
      </header>
      <main class="places">
        <template v-for="region in appData.regions">
          <div
            v-if="
              region.communes.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
                .length
            "
            :key="region.id"
            :class="query.trim() !== '' || expandRegions.includes(region.id) ? 'place-active' : ''">
            <a class="place" tag="article" @click="toggle(region.id)">
              <h2 class="place__name">{{ region.name }}</h2>
              <chevron-up v-if="query.trim() !== '' || expandRegions.includes(region.id)" />
              <chevron-down v-else />
            </a>
            <template v-if="query.trim() !== '' || expandRegions.includes(region.id)">
              <template v-for="comm in region.communes">
                <div
                  v-if="comm.name.toLowerCase().includes(query.toLowerCase())"
                  :key="comm.id"
                  :class="{'selected-commune': commune && commune.id === comm.id}">
                  <a class="name-commune" tag="article" @click="setCommune(comm)">
                    <TextToSpeech :text-audio="comm.name" />
                    {{ comm.name }}
                  </a>
                </div>
              </template>
            </template>
          </div>
        </template>
        <template
          v-if="
            !appData.regions.filter(
              (r) =>
                r.communes.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).length
            ).length
          ">
          <div class="no-results-commune">
            <text-to-speech
              :text-audio="'No se han encontrado comunas con ese nombre. Prueba escribiendo otras palabras o buscando por las regiones disponibles'" />
            <div class="no-results-commune__icon">
              <span>!</span>
            </div>
            <h2 class="no-results-commune__title">No se han encontrado comunas con ese nombre</h2>
            <p class="no-results-commune__description">
              Prueba escribiendo <strong>otras palabras</strong> o buscando por las
              <strong>regiones</strong> disponibles
            </p>
          </div>
        </template>
      </main>
      <footer class="footer-communes">
        <button class="btn btn--large btn--block btn--as-link" @click="cancelCommune()">
          Cancelar
        </button>
        <button
          class="btn btn--large btn--block btn--primary"
          :disabled="!commune"
          @click="confirmCommune()">
          Listo
        </button>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.your-location {
  border-radius: var(--spacer--500);
  div {
    display: initial;
    width: auto;
    gap: initial;
  }
}
.location-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  background-color: var(--color--blue-dark);
  max-width: 560px;
  padding: 0 calc(var(--spacer-lg) / 3);
  z-index: 100000;
  border-radius: 0;
  @media screen and (min-width: 560px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.activate-location {
  background-color: var(--color--white);
  border-radius: var(--border-radius-lg);
  padding: calc(var(--spacer-lg) / 1.5) calc(var(--spacer-lg) / 3);
  @media screen and (min-width: 640px) {
    max-width: 450px;
    padding-left: var(--spacer);
    padding-right: var(--spacer);
  }
  .btn--primary {
    @include rfs($font-size-16);
    background-color: var(--color--blue-dark);
    @media screen and (min-width: 640px) {
      @include rfs($font-size-14);
    }
    & + .btn--primary {
      margin-top: calc(var(--spacer-lg) / 3);
    }
  }
  .btn--as-link {
    color: var(--color-text);
    margin: 0;
  }
}
.activate-location__title {
  @include rfs($font-size-18);
  color: var(--color--blue-dark);
  margin-bottom: var(--spacer-sm);
  @media screen and (min-width: 640px) {
    @include rfs($font-size-16);
  }
  & + .btn {
    margin-top: calc(var(--spacer-lg) / 1.5);
  }
}
.activate-location__description {
  @include rfs($font-size-16);
  color: var(--color-text);
  margin-bottom: calc(var(--spacer-lg) / 1.5);
  @media screen and (min-width: 640px) {
    @include rfs($font-size-14);
  }
  .font-weight-medium {
    font-weight: 600;
  }
}
.activate-location__icon {
  width: 25px;
  height: 34px;
  display: block;
  margin: 0 auto calc(var(--spacer-lg) / 3);
  path {
    fill: var(--color-brand-lighter);
  }
}
.activate-location--gps {
  .activate-location__title {
    text-align: center;
    font-weight: 600;
    margin-bottom: calc(var(--spacer-lg) / 1.5);
  }
  .activate-location__description {
    margin-bottom: calc(var(--spacer-lg) / 3);
  }
}
.activate-location__or {
  @include rfs($font-size-14);
  display: block;
  padding: calc(var(--spacer-sm) * 1.5);
  text-align: center;
}
//elige una comuna
.select-commune {
  position: relative;
  z-index: 1050;
  background: var(--color--skyblue);
  display: flex;
  flex-flow: column nowrap;
  padding: var(--spacer--400) var(--spacer--400) var(--spacer--500);
  .commune-header {
    border-radius: var(--spacer--500);
    background: var(--color--carolinablue);
    padding: var(--spacer--500) var(--spacer--400) var(--spacer--400);
    position: relative;
    @media screen and (min-width: 640px) {
      padding: var(--spacer--600) var(--spacer--500) var(--spacer--500);
    }
    .commune-header__title {
      text-align: left;
      margin-bottom: var(--spacer--300);
      @include rfs($font-size-21);
      color: var(--color--blue-dark);
      font-weight: 700;
    }
    .tts {
      position: absolute;
      top: var(--spacer--500);
      right: var(--spacer--400);
      @media screen and (min-width: 640px) {
        top: var(--spacer--600);
        right: var(--spacer--500);
      }
    }
  }
}

.main-search {
  position: relative;
  padding: calc(var(--spacer--400) * 3) var(--spacer--400);
  background: var(--color--blue);
  color: var(--color--white);
}
.service__title {
  display: flex;
  flex-flow: column-reverse;
  gap: var(--spacer--300);
  > span {
    font-weight: 700;
    @include rfs($font-size-18);
    margin: 0 0 calc(var(--spacer--700) * 0.5);
    display: block;
    text-align: center;
  }
  .tts {
    svg path {
      fill: var(--color--white);
    }
  }
}

.main-search__group {
  position: relative;
}
.main-search__input {
  @include rfs($font-size-16);
  width: 100%;
  padding: var(--spacer--500);
  border: 1px solid var(--color--blue-dark);
  border-radius: var(--spacer--500);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: inherit;
  }
}
.main-search__icon {
  position: absolute;
  top: 50%;
  right: var(--spacer--500);
  background: none;
  border: none;
  z-index: 9;
  width: var(--font-size--500);
  height: var(--font-size--500);
  transform: translateY(-50%);
  path {
    fill: var(--color--blue);
  }
}
.main-search__button {
  width: 100%;
  border: 1px solid var(--color--skyblue-light);
  border-radius: var(--spacer--700);
  color: var(--color--skyblue-light);
  background: transparent;
  padding: var(--spacer--400);
  font-weight: 700;
}
@media screen and (max-width: 640px) {
  input[type='email'],
  input[type='search'],
  input[type='text'],
  select:focus,
  textarea {
    font-size: 16px;
  }
}

.tts :deep(path) {
  fill: var(--color--white);
}

// Footer
.footer-communes {
  position: fixed;
  width: 100%;
  right: 0;
  left: 0;
  bottom: 0;
  max-width: 640px;
  margin: 0 auto;
  padding: calc(var(--spacer-lg) / 3) var(--spacer);
  display: flex;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 100000;
  background-color: var(--color--white);
  @media screen and (min-width: 1280px) {
    max-width: 545px;
  }
}

// Main
.places {
  flex-grow: 1;
  margin-bottom: 80px;
  & > div {
    border: 1px solid var(--color--blue);
    background: var(--color--white);
    position: relative;
    border-radius: var(--spacer--500);
    margin-top: var(--spacer--300);
    padding: var(--spacer--400) 0;
  }
  .place {
    display: block;
    cursor: pointer;
    transition: all 0.3s linear;
    padding: var(--spacer--200) var(--spacer--400);
  }
  .place__name {
    @include rfs($font-size-18);
    line-height: 1.25;
    color: var(--color--blue-dark);
    border-radius: var(--spacer--500);
  }
  .name-commune {
    cursor: pointer;
    @include rfs($font-size-18);
    line-height: 1.25;
    color: var(--color--blue-dark);
    font-weight: 600;
    display: block;
    padding: calc(var(--spacer--200) * 1.5) 0;
    padding: var(--spacer--300) var(--spacer--400);
    position: relative;
    &::before {
      content: '';
      border-bottom: 1px solid rgba(160, 182, 203, 0.3);
      position: absolute;
      bottom: 0;
      right: var(--spacer--400);
      left: var(--spacer--400);
    }
  }
}
.service__items.places {
  margin: var(--spacer--500) var(--spacer--400);
  & > div {
    padding-bottom: var(--spacer);
    border-bottom: 1px solid #a0b6cb;
  }
  .entry-block {
    font-weight: 700;
    background-color: var(--color--white);
    transition: all 0.3s linear;
    padding-bottom: calc(var(--spacer) / 2);
  }
  .name-place {
    border: none;
    svg {
      width: 12px;
      height: 7px;
      @media screen and (min-width: 640px) {
        width: 1rem;
        height: 1rem;
      }
      path {
        fill: var(--color--blue-dark);
        transition: all 0.15s linear;
      }
    }
  }
  .name-commune {
    @include rfs($font-size-14);
    position: relative;
    border-bottom: none;
    padding: calc(var(--spacer-lg) / 3) calc(var(--spacer-xl) / 2);
    @media screen and (min-width: 640px) {
      padding-left: calc(var(--spacer-lg) + 10px);
      padding-right: calc(var(--spacer-lg) + 10px);
    }
    @media screen and (min-width: 1280px) {
      @include rfs($font-size-16);
      padding-left: calc(var(--spacer-xl) + 10px);
      padding-right: calc(var(--spacer-xl) + 10px);
    }
    &::before {
      content: '';
      border-bottom: 1px solid rgba(160, 182, 203, 0.3);
      position: absolute;
      bottom: 0;
      right: calc(var(--spacer-lg) / 2);
      left: calc(var(--spacer-lg) / 2);
      @media screen and (min-width: 640px) {
        right: var(--spacer-lg);
        left: var(--spacer-lg);
      }
      @media screen and (min-width: 1280px) {
        right: var(--spacer-xl);
        left: var(--spacer-xl);
      }
    }
  }
}
.place-active {
  .place {
    padding-bottom: var(--spacer--300);
  }
  .selected-commune {
    border-bottom: none;
    .name-commune {
      transition: all 0.15s linear;
      background-color: var(--color--skyblue);
      &::before {
        content: none;
      }
    }
  }
  div:last-child {
    .name-commune::before {
      content: none;
    }
  }
}
//sin resultados
.places > div.no-results-commune {
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color--skyblue-light);
  padding: var(--spacer--700) var(--spacer--500) var(--spacer--600);
  flex-grow: 1;
  gap: var(--spacer--400);
}
.no-results-commune__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color--skyblue);
  border-radius: var(--spacer--300);
  width: 55px;
  height: 55px;
  span {
    font-size: 2.5rem;
    color: var(--color--blue-dark);
    font-weight: 700;
  }
}
.no-results-commune__title {
  @include rfs($font-size-21);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 800;
}
.no-results-commune__description {
  @include rfs($font-size-16);
  color: var(--color--blue-dark);
  text-align: center;
  font-weight: 600;
  margin-bottom: var(--spacer-xl);
}
.close-app {
  @include rfs($font-size-14);
  color: var(--color--white);
  font-weight: 600;
  position: absolute;
  bottom: var(--spacer-sm);
  right: 0;
  left: 0;
  text-align: center;
  padding: var(--spacer);
}
</style>
