<!-- eslint-disable max-len -->
<template>
  <div class="service">
    <template v-if="loading">
      <clip-loader :loading="loading" :color="'#CAE0FF'" :size="'3rem'" class="mt-auto mb-auto"></clip-loader>
    </template>
    <template v-else>
      <header class="service__header entries-list__header">
        <icon-transport class="service__icon" v-if="category.slug == 'transporte'" />
        <icon-health class="service__icon" v-if="category.slug == 'salud'" />
        <icon-leisure class="service__icon" v-if="category.slug == 'ocio'" />
        <icon-formalities class="service__icon" v-if="category.slug == 'tramites'" />
        <h1 class="service__title entries-list__title">{{ service.name }}</h1>
        <p class="service__description entries-list__description">Selecciona un lugar para ver lo que puedes hacer en este servicio.</p>
        <text-to-speech :text-audio="service.name + '.\n\n\n\n\n Selecciona un lugar para ver lo que puedes hacer en este servicio.'"></text-to-speech>
      </header>
      <main class="service__items service__items places">
        <template v-for="place in places" v-bind:place="place">
          <a class="place-block entry-block" tag="article" v-bind:key="place.id" @click="setPlace(place)">
            <text-to-speech :text-audio="place.name + ': a' + $options.filters.distance(place.distance).replace('.', ' punto ') + ' de distancia.'" />
            <h2 class="place-block__name entry-block__name">{{ place.name }}</h2>
            <!-- @todo: método para transformar distancia desde metros a distancia "amigable" -->
            <p class="place-block__distance">a {{ place.distance | distance }} de distancia</p>
            <div class="place-block__evaluation" v-if="place.evaluation">
              <span class="place__evaluation-grade place-block__evaluation-grade" v-bind:data-grade="place.evaluation.score">
                {{ place.evaluation.score }}
              </span>
              <span class="place-block__evaluation-description">
                {{ place.evaluation.calification }}
              </span>
            </div>
          </a>
        </template>
      </main>
    </template>
  </div>
</template>

<script>
import Category from '@/models/Category';
import Service from '@/models/Service';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconFormalities from '../../public/img/app-icons/formalities.svg?inline';
import IconHealth from '../../public/img/app-icons/health.svg?inline';
import IconTransport from '../../public/img/app-icons/transport.svg?inline';
import IconLeisure from '../../public/img/app-icons/leisure.svg?inline';

export default {
  name: 'serviceSingle',
  components: {
    ClipLoader,
    TextToSpeech,
    IconTransport,
    IconHealth,
    IconFormalities,
    IconLeisure,
  },
  beforeMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/services/nearVenues`, {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        category: this.$route.params.categorySlug,
        service: this.$route.params.serviceSlug,
      }).then((response) => {
        this.places = response.data.venues;
        this.category.set(response.data.category);
        this.service.set(response.data.service);
        this.$store.dispatch('setSelectedItem', {
          object: 'category',
          item: response.data.category,
        });
        this.$store.dispatch('setSelectedItem', {
          object: 'service',
          item: response.data.service,
        });
        this.loading = false;
      }).catch((err) => {
        if (err.response.status === 404) {
          this.$router.push('/');
        }
      });
    });
  },
  data() {
    return {
      category: new Category(),
      service: new Service(),
      places: [],
      loading: true,
    };
  },
  methods: {
    setPlace(place) {
      this.$router.push(`/${this.$route.params.categorySlug}/${this.$route.params.serviceSlug}/${place.slug}`);
    },
  },
};
</script>

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
  }
  .service__icon {
    width: 1rem;
    height: 1rem;
  }
  .service__items {
    flex-grow: 1;
  }
  .place-block {
    cursor: pointer;
    .tts {
      grid-column: 3/4;
      grid-row: 1/3;
    }
  }
  .place-block__name {
    grid-column: 1/3;
    grid-row: 1/2;
  }
  .place-block__distance {
    @include rfs($font-size-12);
    grid-column: 1/3;
    grid-row: 2/3;
    line-height: 1.33333;
    color: var(--color-neutral);
  }
  .place-block__evaluation {
    @include rfs($font-size-12);
    grid-column: 1/4;
    margin-top: var(--spacer-sm);
    line-height: 1.33333;
    text-transform: uppercase;
    color: var(--color-text);
  }
  .place__evaluation-grade {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-align: center;
    border-radius: 50%;
    &[data-grade="5"] {
      background: var(--color-grade-5);
    }
    &[data-grade="4"] {
      background: var(--color-grade-4);
    }
    &[data-grade="3"] {
      background: var(--color-grade-3);
    }
    &[data-grade="2"] {
      background: var(--color-grade-2);
    }
    &[data-grade="1"] {
      background: var(--color-grade-1);
    }
    &[data-grade="0"] {
      background: var(--color-grade-0);
    }
  }
  .place-block__evaluation-grade {
    display: inline-block;
    width: 1.1875rem;
    height: 1.1875rem;
    margin-right: .15rem;
    line-height: 1.1875rem;
    color: var(--color-brand-darker);
  }
</style>
