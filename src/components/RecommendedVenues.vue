<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useFetch} from '@vueuse/core'

import ItemClickable from '@/components/ItemClickable.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import {PresentialVenue} from '@/model/presential_venue'
import {useAppDataStore} from '@/stores/app-data'

const appData = useAppDataStore()
const router = useRouter()

const venues = ref<Array<PresentialVenue>>([])

const setVenue = (venue: PresentialVenue) => {
  router.push(`/${venue.category.slug}/${venue.service.slug}/${venue.slug}`)
}

const {data} = await useFetch(
  `${import.meta.env.VITE_APP_API_DOMAIN}api/presential_venues/recommended`
)
  .post(appData.location.getCoordinates())
  .json()

venues.value = data.value.map((t: PresentialVenue) => new PresentialVenue(t))
</script>

<template>
  <div class="place">
    <main class="place__tasks">
      <p class="place__tasks-description">
        <span>Lugares con ayudas cerca de tu ubicación</span>
        <TextToSpeech :text-audio="'Lugares con ayudas cerca de tu ubicación'" />
      </p>
      <div v-for="venue in venues" :key="venue.id">
        <ItemClickable :title="venue.name" @click="setVenue(venue)">
          <template #meta>
            <div>a {{ venue.distanceToText() }} de distancia</div>
            <div>Pertenece a: {{ venue.service.name }}</div>
          </template>
        </ItemClickable>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.place__tasks {
  background-color: var(--color--yellow);
  padding: calc(var(--spacer--400) * 3) var(--spacer--400);
  @media screen and (min-width: 540px) {
    padding-left: var(--spacer--500);
    padding-right: var(--spacer--500);
  }
}
.place__tasks-description {
  @include rfs($font-size-18);
  font-weight: 700;
  text-align: center;
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacer--200);
  align-items: center;
  margin-bottom: var(--font-size--700);
  .tts {
    position: relative;
    top: var(--spacer-xs);
  }
}
</style>
