<template>
  <div class="service">
    <header class="service__header entries-list__header">
      <span class="service__icon"></span>
      <h1 class="service__title entries-list__title">Metro de Valparaíso</h1>
      <p class="service__description entries-list__description">Selecciona un lugar para ver lo que
         puedes hacer ahí.</p>
    </header>
    <main class="service__items service__items places">
      <template v-for="place in places" v-bind:place="place">
        <router-link class="place-block entry-block" tag="article"
          v-bind:key="place.id" v-bind:to="'/lugares/' + place.id">
          <text-to-speech />
          <h2 class="place-block__name entry-block__name">{{ place.name }}</h2>
          <!-- @todo: método para transformar distancia desde metros a distancia "amigable" -->
          <p class="place-block__distance">a {{ place.distance }} metros de distancia</p>
          <div class="place-block__evaluation">
            <span class="place__evaluation-grade place-block__evaluation-grade"
              v-bind:data-grade="place.evaluation.grade">
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

export default {
  name: 'serviceSingle',
  components: {
    TextToSpeech,
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
  @import 'rfs/scss';
  .service {
    display: flex;
    flex-flow: column nowrap;
  }
  // .service__header {
  //   background-image: repeating-radial-gradient( #d8e8ff,
  //     #d8e8ff 2px, #f1f7ff 2px, #f1f7ff 6px );
  //   background-repeat: repeat;
  //   background-size: 6px 6px;
  //   background-position: center center;
  //   background-color: #f1f7ff;
  // }
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
    grid-column: 1/3;
    grid-row: 2/3;
    @include rfs( 12px );
    line-height: 1.33333;
    color: var( --color-neutral );
    .place-block:hover & {
      color: var( --color-brand-lighter );
    }
  }
  .place-block__evaluation {
    grid-column: 1/4;
    @include rfs( 12px );
    line-height: 1.33333;
    color: var( --color-text );
    margin-top: calc( var( --spacer ) / 2 );
    text-transform: uppercase;
    .place-block:hover & {
      color: var( --color-background );
    }
  }
  .place__evaluation-grade {
    text-align: center;
    font-weight: bold;
    border-radius: 50%;
    &[data-grade="5"] {
      background: #AAF886;
    }
    &[data-grade="4"],
    &[data-grade="3"] {
      background: #E3E85C;
    }
    &[data-grade="2"],
    &[data-grade="1"] {
      background: #FF8684;
    }
  }
  .place-block__evaluation-grade {
    display: inline-block;
    width: 1.1875rem;
    height: 1.1875rem;
    line-height: 1.1875rem;
    margin-right: .15rem;
    color: var( --color-text );
  }
</style>
