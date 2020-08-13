<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <h2 class="onboarding__title">
        Agrega un lugar nuevo
        <text-to-speech :text-audio="'Agrega un lugar nuevo'" />
      </h2>
      <div v-if="place">
      {{ place.name }}
      </div>
      <div v-if="!search_again" @click="search_again = true">Buscar nuevamente</div>
      <template v-else>
        <div class="custom-control custom-control--text">
          <input type="text" @keyup="searchPlaces" v-model="search_text" placeholder="Ejemplo: Terminal de buses" class="custom-control__answer" />
        </div>
        <div v-for="place in places" v-bind:key="place.place_id" @click="setPlace(place)">
          {{ place.name }}
        </div>
      </template>
      <div id="map"></div>
      <footer class="onboarding__footer">
        <button class="btn btn--large btn--block btn--primary" :disabled="!this.place" @click="next">Listo</button>
      </footer>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'NewPlace',
  components: {
    TextToSpeech,
  },
  data() {
    return {
      search_text: '',
      places: [],
      place: null,
      search_again: true,
    };
  },
  methods: {
    searchPlaces() {
      const currentPosition = new google.maps.LatLng(-33.023452, -71.553656);
      const map = new google.maps.Map(document.getElementById('map'), {
        center: currentPosition,
        zoom: 15,
      });
      const request = {
        location: currentPosition,
        radius: '5000',
        query: this.search_text,
      };

      const service = new google.maps.places.PlacesService(map);
      service.textSearch(request, (result) => {
        this.places = result;
      });
    },
    setPlace(place) {
      this.place = place;
      this.search_again = false;
      this.search_text = '';
      this.places = [];
    },
    next() {
      this.$router.push({
        name: 'new-place-complete',
        params: { place: this.place },
      });
    },
  },
};
</script>
