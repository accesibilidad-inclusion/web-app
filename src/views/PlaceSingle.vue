<!-- eslint-disable max-len -->
<template>
  <div class="place">
    <header class="place__header">
      <router-link :to="'/servicios/' + service.id" class="place__service">{{ service.name }}</router-link>
      <h1 class="place__name">{{ place.name }}</h1>
      <a :href="place.mapLink" class="place__map-link" target="_blank" v-if="place.mapLink">
        <icon-location-pin />
        Abrir en mapa
      </a>
      <text-to-speech :text-audio="`${place.name}, en ${service.name}`" />
    </header>
    <template v-if="tasks.length">
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
        <router-link to="/nueva-tarea/intro" class="btn btn--primary btn--large btn--block" tag="button">
          &plus; Agregar una tarea nueva
        </router-link>
      </aside>
      <footer class="place__footer">
        <router-link :to="'/evaluacion/' + evaluation.grade" class="place__evaluation">
          <text-to-speech :text-audio="`Nivel de accesibilidad de ${place.name}: ${evaluation.grade}, ${evaluation.title}`" />
          <div class="place__evaluation-title">{{ evaluation.title }}</div>
          <div class="place__evaluation-grade place__evaluation-grade--lg" v-bind:data-grade="evaluation.grade">
            <span v-if="evaluation.grade">{{ evaluation.grade }}</span>
            <span v-else>!</span>
          </div>
          <p class="place__evaluation-description">Nivel de accesibilidad de {{ place.name }}</p>
          <p class="place__evaluation-question">¿Qué significa esto?</p>
        </router-link>
        <div class="place__evaluation-actions">
          <router-link tag="button" to="/evaluacion-lugar/intro" class="btn btn--ghost btn--large btn--block">
            Evaluar este lugar
          </router-link>
        </div>
      </footer>
    </template>
    <template v-else>
      <main class="place__tasks">
        <p class="place__tasks-description">
          <icon-no-information />
          <span>Este lugar no tiene información</span>
        </p>
      </main>
      <aside class="actions actions--place">
        <div class="actions__header">
          <text-to-speech :text-audio="'Ayudanos a mejorar'" />
          <p class="actions__title">Ayudanos a mejorar</p>
        </div>
        <router-link to="/tareas/nueva" class="btn btn--primary btn--large btn--block" tag="button">
          &plus; Agregar tareas a este lugar
        </router-link>
      </aside>
    </template>
  </div>
</template>

<script>
import Service from '@/models/Service';
import Venue from '@/models/Venue';
import TaskBlock from '@/components/TaskBlock.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconLocationPin from '../../public/img/app-icons/location-pin.svg?inline';
import IconNoInformation from '../../public/img/app-icons/no-information.svg?inline';

export default {
  name: 'placeSingle',
  components: {
    TaskBlock,
    TextToSpeech,
    IconLocationPin,
    IconNoInformation,
  },
  beforeMount() {
    this.service.set(this.$store.state.selected.service);
    this.place = new Venue(this.$store.state.selected.venue);
    this.tasks = this.place.tasks;
  },
  data() {
    return {
      service: new Service(this.$store.state.selected.service),
      place: new Venue(this.$store.state.selected.venue),
      tasks: [],
    };
  },
  computed: {
    evaluation() {
      const score = this.place.evaluation ? this.place.evaluation.score : 0;
      return this.$store.state.evaluations.find(evaluation => evaluation.grade === score);
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
    display: inline-block;
    padding: var(--spacer-sm);
    text-decoration: none;
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
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
    top: calc( var(--spacer) + ( var(--spacer) / 2 ) );
    right: var(--spacer);
    z-index: 10;
    @media screen and ( min-width: 640px ) {
      top: calc( var(--spacer-lg) + ( var(--spacer) / 2 ) );
      right: calc( var(--spacer-xl) * 1.35 );
    }
    @media screen and ( min-width: 1280px ) {
      right: calc( var(--spacer-xl) * 1.75 );
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
    grid-column: 1/3;
    grid-row: 1/2;
    font-weight: bold;
    line-height: calc( 25/18 );
    text-transform: uppercase;
  }
  .place__evaluation-grade--lg {
    grid-column: 1/3;
    grid-row: 2/3;
    width: 3.125rem;
    height: 3.125rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 2rem;
    line-height: 3.125rem;
    color: var(--color-brand-darker);
    @media screen and ( min-width: 640px ) {
      width: 3.5rem;
      height: 3.5rem;
      font-size: 2.5rem;
    }
  }
  .place__evaluation-description {
    @include rfs($font-size-14);
    grid-column: 1/3;
    grid-row: 3/4;
    max-width: 15rem;
    margin-left: auto;
    margin-right: auto;
    font-weight: 600;
    line-height: calc( 19/14 );
  }
  .place__evaluation-question {
    @include rfs($font-size-16);
    padding: calc(var(--spacer) + var(--spacer-sm));
    font-weight: 600;
    line-height: 1.33333;
    color: var(--color-background);
    display: block;
    text-decoration: underline;
  }
  .btn--large {
    display: block;
  }
</style>
