<!-- eslint-disable max-len -->
<template>
  <div class="place">
    <header class="place__header">
      <span class="place__service">Metro de Valparaíso</span>
      <h1 class="place__name">Estación Viña del Mar</h1>
      <a href="#" class="place__map-link">
        <icon-location-pin />
        Abrir en mapa
      </a>
      <text-to-speech :text-audio="'Estación Viña del Mar' + ' en ' + 'Metro de Valparaíso'" />
    </header>
    <main class="place__tasks">
      <p class="place__tasks-description">
        <span>Selecciona lo que necesites hacer en este lugar</span>
        <text-to-speech :text-audio="'Selecciona lo que necesites hacer en este lugar'" />
      </p>
      <task-block v-for="task in tasks"
        v-bind:key="task.id" v-bind:task="task"/>
    </main>
    <aside class="actions actions--place">
      <div class="actions__header">
        <text-to-speech :text-audio="'¿No encuentras lo que estabas buscando?. Agrega otra cosa que puedas hacer en este lugar'" />
        <p class="actions__title">¿No encuentras lo que estabas buscando?</p>
        <p class="actions__description">Agrega otra cosa que puedas hacer en este lugar</p>
      </div>
      <router-link to="/tareas/nueva" class="btn btn--primary btn--large btn--block" tag="button">
        &plus; Agregar una tarea nueva
      </router-link>
    </aside>
    <footer class="place__footer">
      <router-link :to="'/evaluacion/5'" class="place__evaluation">
        <div class="place__evaluation-title">Excelente</div>
        <div class="place__evaluation-grade place__evaluation-grade--lg" v-bind:data-grade="5">5</div>
        <p class="place__evaluation-description">Nivel de accesibilidad de la Estación Viña del Mar</p>
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
              enabled: true,
            },
            {
              type: 'written',
              enabled: true,
            },
            {
              type: 'aural',
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
              enabled: false,
            },
            {
              type: 'written',
              enabled: false,
            },
            {
              type: 'aural',
              enabled: true,
            },
          ],
        },
      ],
    };
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
    text-decoration: none;
    color: #fff;
  }
  .place__evaluation-title {
    @include rfs($font-size-18);
    font-weight: bold;
    line-height: calc( 25/18 );
    text-transform: uppercase;
    .place__evaluation & {
      margin-bottom: var(--spacer-xs);
      @media screen and ( min-width: 640px ) {
        margin-bottom: var(--spacer-sm);
      }
      @media screen and ( min-width: 1280px ) {
        margin-bottom: var(--spacer);
      }
    }
  }
  .place__evaluation-grade--lg {
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
    max-width: 15rem;
    margin: var(--spacer-xs) auto var(--spacer-lg);
    font-weight: 600;
    line-height: calc( 19/14 );
    @media screen and ( min-width: 640px ) {
      margin-top: var(--spacer-sm);
      margin-bottom: var(--spacer-xl);
    }
    @media screen and ( min-width: 1280px ) {
      margin-top: var(--spacer);
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
