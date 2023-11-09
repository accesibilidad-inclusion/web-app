<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import TextToSpeech from '@/components/TextToSpeech.vue'
import { PresentialVenue } from '@/model/presential_venue';
import { useAppDataStore } from '@/stores/app-data';
import { useRouter } from 'vue-router';

const appData = useAppDataStore()
const router = useRouter()

const loading = ref<boolean>(true)
const venues = ref<Array<PresentialVenue>>([])

const setVenue = (venue: PresentialVenue) => {
  router.push(`/${venue.category.slug}/${venue.service.slug}/${venue.slug}`)
}

onBeforeMount(async () => {
  if (appData.location) {
    await fetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/presential_venues/recommended`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lat: parseFloat(appData.location.lat),
          lng: parseFloat(appData.location.lng)
        })
      })
      .then(async (response) => {
        const data = await response.json()
        venues.value = data.map( (t: PresentialVenue) =>  new PresentialVenue(t))
        loading.value = false
      })
      .catch((error) => {
        return error
      })
  }
})
</script>

<template>
  <div class="place">
    <main class="place__tasks">
      <p class="place__tasks-description">
        <span>Lugares con ayudas cerca de tu ubicación</span>
        <TextToSpeech :text-audio="'Lugares con ayudas cerca de tu ubicación'" />
      </p>
      <div v-for="venue in venues" :key="venue.id">
        <a @click="setVenue(venue)">
          <div>{{ venue.name }}</div>
          <div>a {{ venue.distanceToText() }} de distancia</div>
          <div>Pertenece a: {{ venue.service.name }}</div>
        </a>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.place__tasks {
  padding: var(--spacer) var(--spacer) var(--spacer-lg);
  @media screen and (min-width: 640px) {
    padding-left: var(--spacer-lg);
    padding-right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.place__tasks-description {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
  align-items: flex-start;
  .tts {
    position: relative;
    top: var(--spacer-xs);
  }
}
</style>
