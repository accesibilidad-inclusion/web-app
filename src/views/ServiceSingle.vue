<!-- eslint-disable max-len -->
<template>
  <div class="service">
    <header class="service__header entries-list__header">
      <icon-transport class="service__icon" />
      <h1 class="service__title entries-list__title">Metro de Valparaíso</h1>
      <p class="service__description entries-list__description">Selecciona un lugar para ver lo que puedes hacer en este servicio.</p>
      <text-to-speech :text-audio="'Metro de Valparaíso.\n\n Selecciona un lugar para ver lo que puedes hacer en este servicio.'"></text-to-speech>
    </header>
    <main class="service__items service__items places">
      <template v-for="place in places" v-bind:place="place">
        <router-link class="place-block entry-block" tag="article" v-bind:key="place.id" v-bind:to="'/lugares/' + place.id">
          <text-to-speech :text-audio="`${place.name}: a ${place.distance} metros de distancia. ${place.evaluation.description}`" />
          <h2 class="place-block__name entry-block__name">{{ place.name }}</h2>
          <!-- @todo: método para transformar distancia desde metros a distancia "amigable" -->
          <p class="place-block__distance">a {{ place.distance }} metros de distancia</p>
          <div class="place-block__evaluation">
            <span class="place__evaluation-grade place-block__evaluation-grade" v-bind:data-grade="place.evaluation.grade">
              {{ place.evaluation.grade }}
            </span>
            <span class="place-block__evaluation-description">
              {{ place.evaluation.description }}
            </span>
          </div>
        </router-link>
      </template>
    </main>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconTransport from '../../public/img/app-icons/transport.svg?inline';

export default {
  name: 'serviceSingle',
  components: {
    TextToSpeech,
    IconTransport,
  },
  data() {
    return {
      places: [
        // objetos de tipo "lugar"
        {
          id: 1,
          name: 'Estación Viña del Mar',
          distance: 200,
          evaluation: {
            grade: 5,
            description: 'Excelente accesibilidad',
          },
        },
        {
          id: 2,
          name: 'Estación Hospital',
          distance: 230,
          evaluation: {
            grade: 4,
            description: 'Buena accesibilidad',
          },
        },
        {
          id: 3,
          name: 'Estación Miramar',
          distance: 350,
          evaluation: {
            grade: 1,
            description: 'Pésima accesibilidad',
          },
        },
        {
          id: 4,
          name: 'Estación Chorrillos',
          distance: 2024,
          evaluation: {
            grade: 1,
            description: 'Pésima accesibilidad',
          },
        },
      ],
    };
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
    margin-bottom: var(--spacer-sm);
    line-height: 1.33333;
    color: var(--color-neutral);
  }
  .place-block__evaluation {
    @include rfs($font-size-12);
    grid-column: 1/4;
    margin-top: var(--sapcer-sm);
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
  }
  .place-block__evaluation-grade {
    display: inline-block;
    width: 1.1875rem;
    height: 1.1875rem;
    margin-right: .15rem;
    line-height: 1.1875rem;
    color: var(--color-text);
  }
</style>
