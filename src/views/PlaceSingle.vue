<!-- eslint-disable max-len -->
<template>
  <div class="place">
    <header class="place__header">
      <span class="place__service">{{ place.service }}</span>
      <h1 class="place__name">{{ place.name }}</h1>
      <a href="#" class="place__map-link">
        <icon-location-pin />
        Abrir en mapa
      </a>
      <text-to-speech :text-audio="`${place.name}, en ${place.service}`" />
    </header>
    <main class="place__tasks">
      <p class="place__tasks-description">
        <span>Selecciona lo que necesites hacer en este lugar</span>
        <text-to-speech :text-audio="'Selecciona lo que necesites hacer en este lugar'" />
      </p>
      <task-block v-for="task in tasks" v-bind:key="task.id" v-bind:task="task"/>
    </main>
    <aside class="actions actions--place">
      <div class="actions__header">
        <text-to-speech :text-audio="'¿No encuentras lo que estabas buscando?. Agrega otra cosa que puedas hacer en este lugar. Agregar una tarea nueva'" />
        <p class="actions__title">¿No encuentras lo que estabas buscando?</p>
        <p class="actions__description">Agrega otra cosa que puedas hacer en este lugar</p>
      </div>
      <router-link to="/tareas/nueva" class="btn btn--primary btn--large btn--block" tag="button">
        &plus; Agregar una tarea nueva
      </router-link>
    </aside>
    <footer class="place__footer">
      <router-link :to="'/evaluacion/5'" class="place__evaluation">
        <text-to-speech :text-audio="`Nivel de accesibilidad de ${place.name}: ${evaluation.grade}, ${evaluation.title}`" />
        <div class="place__evaluation-title">{{ evaluation.title }}</div>
        <div class="place__evaluation-grade place__evaluation-grade--lg" v-bind:data-grade="evaluation.grade">{{ evaluation.grade }}</div>
        <p class="place__evaluation-description">Nivel de accesibilidad de {{ place.name }}</p>
      </router-link>
      <div class="place__evaluation-actions">
        <p class="place__evaluation-actions-title">¿Quieres colaborar con nosotros?</p>
        <router-link tag="button" to="/lugar/1/evaluar" class="btn btn--ghost btn--large btn--block">
          Evaluar este lugar
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconLocationPin from '../../public/img/app-icons/location-pin.svg?inline';

export default {
  name: 'placeSingle',
  components: {
    TaskBlock,
    TextToSpeech,
    IconLocationPin,
  },
  data() {
    return {
      place: {
        name: 'Estación Viña del Mar',
        service: 'Metro de Valparaíso',
        evaluation: 5,
      },
      tasks: [
        // objetos de tipo "tarea"
        {
          id: 1,
          title: 'Viajar de un punto a otro',
          place: 'Estación Metro Miramar',
          service: 'Metro de Valparaíso',
          aids: [
            {
              type: 'graphic',
              name: 'Gráfico',
              enabled: true,
            },
            {
              type: 'written',
              name: 'Escrito',
              enabled: true,
            },
            {
              type: 'aural',
              name: 'Auditivo',
              enabled: true,
            },
          ],
        },
        {
          id: 2,
          title: 'Ir de un punto a otro',
          place: 'Terminal de buses de Viña del Mar',
          service: 'Terminal de buses Rodoviario',
          aids: [
            {
              type: 'graphic',
              name: 'Gráfico',
              enabled: false,
            },
            {
              type: 'written',
              name: 'Escrito',
              enabled: false,
            },
            {
              type: 'aural',
              name: 'Auditivo',
              enabled: true,
            },
          ],
        },
      ],
    };
  },
  computed: {
    evaluation() {
      return this.$store.state.evaluations
        .find(evaluation => evaluation.grade === this.place.evaluation);
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .place__header {
    position: relative;
    margin-bottom: var(--spacer);
    padding: var(--spacer);
    text-align: center;
    line-height: calc( 22 / 16 );
    color: var(--color-background);
    background: var(--color-brand-darkest);
    @media screen and ( min-width: 640px ) {
      margin-left: calc( var(--spacer-lg) * -1);
      margin-right: calc( var(--spacer-lg) * -1);
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 30px;
    }
    &::before {
      width: 100%;
      left: 0;
      background: #fff;
      z-index: 1;
    }
    &::after {
      left: calc( var(--spacer) * -1 );
      right: calc( var(--spacer) * -1 );
      background: var(--color-brand-darkest);
      border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
      z-index: 2;
    }
  }
  .place__service {
    @include rfs($font-size-12);
    display: block;
    margin-bottom: var(--spacer-xs);
  }
  .place__name {
    @include rfs($font-size-18);
    margin-bottom: var(--spacer-sm);
    font-weight: bold;
    line-height: calc( 25 / 18 );
  }
  .place__map-link {
    @include rfs($font-size-12);
    position: relative;
    font-weight: bold;
    color: var(--color-background);
    z-index: 10;
    svg {
      position: relative;
      width: .85rem;
      height: 1rem;
      top: 3px;
      path {
        fill: #fff;
      }
    }
  }
  .place__header .tts {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
    z-index: 10;
    @media screen and ( min-width: 640px ) {
      top: var(--spacer-lg);
      right: calc( var(--spacer-xl) * 1.5 );
    }
    @media screen and ( min-width: 1280px ) {
      right: calc( var(--spacer-xl) * 2 );
    }
    svg path {
      fill: #fff;
    }
  }
  .place__tasks {
    padding: var(--spacer) var(--spacer) var(--spacer-lg);
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
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
  .actions--place {
    margin-bottom: var(--spacer-lg);
    padding-top: var(--spacer-lg);
    padding-bottom: var(--spacer-lg);
    background-color: var(--color-brand-lighter);
    @media screen and ( min-width: 640px ) {
      padding-top: calc( var(--spacer-lg) * 1.25 );
      padding-bottom: calc( var(--spacer-lg) * 1.25 );
    }

    .actions__header {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      grid-gap: var(--spacer-sm);
      .tts {
        grid-column: 2/3;
      }
    }
    .actions__title {
      margin-bottom: 0;
      grid-column: 1/2;
      grid-row: 1/2;
    }
    .actions__description {
      grid-column: 1/2;
      grid-row: 2/3;
    }
  }
  .place__footer {
    position: relative;
    padding: var(--spacer-lg) var(--spacer);
    text-align: center;
    color: var(--color-background );
    background: var(--color-brand-darkest);
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding: var(--spacer-xl);
    }
  }
  .place__evaluation {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto auto;
    row-gap: var(--spacer-sm);
    text-decoration: none;
    color: #fff;
    @media screen and ( min-width: 1280px ) {
      row-gap: var(--spacer);
    }
  }
  .place__footer .tts {
    grid-column: 2/3;
    grid-row: 1/2;
    // position: absolute;
    // top: calc( var(--spacer-lg) * 1.125 );
    // right: var(--spacer);
    // @media screen and ( min-width: 640px ) {
    //   top: calc( var(--spacer-lg) * 1.25 );
    //   right: var(--spacer-lg);
    // }
    // @media screen and ( min-width: 1280px ) {
    //   top: calc( var(--spacer-xl) * 1.25 );
    //   right: var(--spacer-xl);
    // }
    path {
      fill: #fff;
    }
  }
  .place__evaluation-title {
    @include rfs($font-size-18);
    grid-column: 1/2;
    grid-row: 1/2;
    font-weight: bold;
    line-height: calc( 25/18 );
    text-transform: uppercase;
  }
  .place__evaluation-grade--lg {
    grid-column: 1/2;
    grid-row: 2/3;
    width: 3.125rem;
    height: 3.125rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 2rem;
    line-height: 3.125rem;
    color: var(--color-text);
    @media screen and ( min-width: 640px ) {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 2.5rem;
    }
  }
  .place__evaluation-description {
    @include rfs($font-size-14);
    grid-column: 1/2;
    grid-row: 3/4;
    max-width: 15rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: var(--spacer-lg);
    font-weight: 600;
    line-height: calc( 19/14 );
    @media screen and ( min-width: 640px ) {
      margin-bottom: var(--spacer-xl);
    }
  }
  .place__evaluation-actions-title {
    @include rfs($font-size-16);
    margin-bottom: var(--spacer-sm);
    font-weight: bold;
    line-height: 1.33333;
    @media screen and ( min-width: 640px ) {
      margin-bottom: var(--spacer);
    }
  }
  .btn--large {
    display: block;
  }
</style>
