<!-- eslint-disable max-len -->
<template>
  <div class="page">
    <div class="container">
      <h2 class="page__title">
        Busca un lugar para agregarlo a Pictos
        <text-to-speech :text-audio="'Busca un lugar para agregarlo a Pictos'" />
      </h2>
      <div v-if="place" class="page__place-name">
      {{ place.name }}
      </div>
      <div v-if="!search_again" @click="search_again = true" class="page__search-again"><icon-search />Buscar nuevamente</div>
      <template v-else>
        <div class="custom-control custom-control--text main-search__group">
          <input type="text" @keyup="searchPlaces" v-model="search_text" placeholder="Ejemplo: Terminal de buses" class="main-search__input" />
          <button type="submit" class="main-search__button">
            <icon-search />
          </button>
          <div v-for="place in places" v-bind:key="place.place_id" @click="setPlace(place)" class="search-result__item">
            <p>{{ place.name }}</p>
          </div>
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
import IconSearch from '../../public/img/app-icons/search.svg?inline';

export default {
  name: 'NewPlace',
  components: {
    TextToSpeech,
    IconSearch,
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
        params: { place: this.place, service_id: this.$route.params.service_id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

  //search-result
  .page__place-name {
    @include rfs($font-size-16);
    color: var(--color-brand-darkest);
    font-weight: bold;
    border: 2px solid var(--color-brand-light);
    border-radius: var( --border-radius );
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
    top: var(--spacer)
  }

  .main-search__group {
    transition: var(--transition-base);
    &.active {
      border: 1px solid var(--color-brand);
      border-radius: var( --border-radius );
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
