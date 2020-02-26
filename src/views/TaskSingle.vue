<template>
  <div class="task__single">
    <header class="task__header entries-list__header">
      <h1 class="task__title entries-list__title">{{ task.title }}</h1>
      <p class="entries-list__description task__description">
        <router-link :to="{ name: 'place-single', params: { 'placeId': task.place_id } }">
          {{ task.place }}</router-link>
        en
        <router-link :to="{ name: 'service-single', params: { 'serviceId': task.service_id } }">
          {{ task.service }}
        </router-link>
      </p>
      <text-to-speech />
    </header>
    <main class="task__main">
      <ol class="task__steps">
        <li v-for="step in task.steps" v-bind:step="step" v-bind:key="step.id"
          v-bind:class="'task-step'+ ( step.order === state.active_step ?
          ' task-step--active' : '')">
          <figure class="task-step__figure">
            <div class="step-canvas">
              <template v-for="layer in step.layers">
                <img src="~pictos/src/2-landmarks/turnstile.svg" v-bind:key="layer.id"
                  v-bind:class="'task-step__layer task-step__layer--'+layer.order">
              </template>
            </div>
            <figcaption class="task-step__legend">
              <img src="~pictos/src/actions/handle-card.svg" class="task-step__action-icon">
              {{ step.legend }}
            </figcaption>
          </figure>
        </li>
      </ol>
      <div class="task__nav">
        <button v-bind:class="'btn btn--large btn--primary'
          + ( state.active_step > 0 ? '' : ' btn--hidden' )
          " @click="rewindStep">
          Anterior
        </button>
        <button v-bind:class="'btn btn--large btn--primary'
          + ( state.active_step + 1 < task.steps.length ? '' : ' btn--hidden' )"
          @click="advanceStep">
          Siguiente
        </button>
        <ol class="task__steps-indicator">
          <li v-for="step in task.steps" v-bind:step="step" v-bind:key="step.id"
            v-bind:class="state.active_step >= step.order ?
              'task__step-indicator--active' : 'task__step-indicator'">
            {{ step.order }}
          </li>
        </ol>
      </div>
      <button class="task__step-feedback">
        Reportar un problema con este paso
      </button>
    </main>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'taskSingle',
  components: {
    TextToSpeech,
  },
  methods: {
    advanceStep() {
      // eslint-disable-next-line no-plusplus
      this.$data.state.active_step++;
    },
    rewindStep() {
      // eslint-disable-next-line no-plusplus
      this.$data.state.active_step--;
    },
  },
  data() {
    return {
      state: {
        active_step: 0,
      },
      task: {
        id: 1,
        title: 'Viajar de un punto a otro',
        place: 'Estación Metro Miramar',
        place_id: 1,
        service: 'Metro de Valparaíso',
        service_id: 1,
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
        steps: [
          {
            id: 1,
            order: 0,
            legend: 'Pasa tu tarjeta por el sensor del torniquete',
            action: {
              img: 'actions/handle-card.svg',
            },
            layers: {
              subject: {
                order: 1,
                img: '1-subject/handle.svg',
                flip: true,
                position: {
                  // corresponde a un porcentaje de desplazamiento en el eje dado
                  x: 50,
                },
              },
              landmarks: {
                id: 2,
                order: 2,
                img: '2-landmarks/turnstile.svg',
                flip: false,
                position: {
                  x: 0,
                },
              },
              context: {
                id: 3,
                order: 3,
                img: '',
                flip: false,
                position: {
                  x: 0,
                },
              },
            },
          },
          {
            id: 2,
            order: 1,
            legend: 'Baja al andén correspondiente',
            action: {
              img: 'actions/go-left.svg',
            },
            layers: {
              subject: {
                order: 1,
                img: '1-subject/handle.svg',
                flip: true,
                position: {
                  // corresponde a un porcentaje de desplazamiento en el eje dado
                  x: 50,
                },
              },
              landmarks: {
                id: 2,
                order: 2,
                img: '2-landmarks/turnstile.svg',
                flip: false,
                position: {
                  x: 0,
                },
              },
              context: {
                id: 3,
                order: 3,
                img: '',
                flip: false,
                position: {
                  x: 0,
                },
              },
            },
          },
          {
            id: 3,
            order: 2,
            legend: 'Espera el metro detrás de la línea',
            action: {
              img: 'actions/stop.svg',
            },
            layers: {
              subject: {
                order: 1,
                img: '1-subject/handle.svg',
                flip: true,
                position: {
                  // corresponde a un porcentaje de desplazamiento en el eje dado
                  x: 50,
                },
              },
              landmarks: {
                id: 2,
                order: 2,
                img: '2-landmarks/turnstile.svg',
                flip: false,
                position: {
                  x: 0,
                },
              },
              context: {
                id: 3,
                order: 3,
                img: '',
                flip: false,
                position: {
                  x: 0,
                },
              },
            },
          },
        ],
      },
      embedded: {
        'pictos:place': [
          {
            id: 1,
            name: 'Estación Metro Miramar',
          },
        ],
        'pictos:service': [
          {
            id: 1,
            name: 'Metro de Valparaíso',
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
  @import "rfs/scss";
  .task__single {
    display: flex;
    flex-flow: column nowrap;
    overflow-x: hidden;
  }
  .task__header {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background: var( --color-background );
  }
  .task__title {
    grid-column: 1/2;
    margin-top: 0;
  }
  .task__description {
    @include rfs( 14px );
    line-height: 1.35;
    grid-column: 1/3;
    grid-row: 2/3;
  }
  .tts {
    .task__header & {
      grid-column: 2/3;
      grid-row: 1/2;
    }
  }
  .task__main {
    display: flex;
    flex-grow: 1;
    flex-flow: column nowrap;
    position: relative;
  }
  .task__steps {
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    position: relative;
  }
  .task-step__figure {
    flex-grow: 1;
    display: grid;
    grid-template-rows: auto 1fr;
  }
  .step-canvas {
    position: relative;
    min-height: 75vw;
    background: var( --color-brand-lightest );
  }
  .task-step {
    opacity: 0;
    transform: translateX( 100% );
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    transition: opacity .25s linear, transform .25s ease-in;
  }
  .task-step--active {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    opacity: 1;
    transform: translateX( 0% );
    transition: opacity .25s linear, transform .25s .15s ease-out;
  }
  .task-step__layer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .task-step__layer--1 {
    z-index: 1;
    left: 0%;
  }
  .task-step__layer--2 {
    z-index: 2;
    left: 10%;
  }
  .task-step__layer--3 {
    z-index: 3;
    left: 20%;
  }
  .task-step__legend {
    display: grid;
    padding: var( --spacer );
    grid-template-columns: calc( var( --spacer ) * 2.5 ) auto;
    gap: calc( var( --spacer ) / 2 );
    @include rfs( 16px );
    line-height: calc( 22/16 );
    font-weight: bold;
    align-items: center;
  }
  .task__nav {
    display: grid;
    gap: 0 calc( var( --spacer ) / 2 );
    grid-template-columns: 1fr 1fr;
    padding: var( --spacer ) var( --spacer ) 0;
    border-top: 1px solid var( --color-brand-lighter );
  }
  .task__steps-indicator {
    margin: calc( var( --spacer ) * .75 ) 0;
    text-align: center;
    grid-column: 1/3;
    li {
      list-style: none;
      display: inline-block;
      width: calc( var( --spacer ) * .35 );
      height: calc( var( --spacer ) * .35 );
      line-height: calc( var( --spacer ) * .35 );;
      background: #e1e1e1;
      text-indent: -9999em;
      border-radius: var( --spacer );
      margin: 0 calc( var( --spacer ) * .125 );
    }
  }
  li.task__step-indicator--active {
    background: var( --color-brand );
  }
  .task__step-feedback {
    order: 4;
  }
  .task__step-feedback {
    margin: auto calc( var( --spacer ) / 2 ) 0;
    background: var( --color-brand-lighter );
    border-top-left-radius: var( --border-radius );
    border-top-right-radius: var( --border-radius );
    padding: calc( var( --spacer ) / 2 ) var( --spacer );
    border: 0;
    font-family: inherit;
    @include rfs( 12px );
  }
</style>
