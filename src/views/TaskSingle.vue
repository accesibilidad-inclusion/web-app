<!-- eslint-disable max-len -->
<!-- eslint-disable global-require -->
<!-- eslint-disable import/no-dynamic-require -->
<template>
  <div class="task__single">
    <header class="task__header entries-list__header">
      <p class="entries-list__description task__description">
        <router-link :to="{ name: 'place-single', params: { 'placeId': task.place_id } }">{{ task.place }}</router-link>
        en
        <router-link :to="{ name: 'service-single', params: { 'serviceId': task.service_id } }">{{ task.service }}</router-link>
      </p>
      <h1 class="task__title entries-list__title">{{ task.title }}</h1>
      <text-to-speech :text-audio="audioTaskHeader" />
    </header>
    <main class="task__main">
      <ol class="task__steps"
        v-touch:swipe.left="advanceStep"
        v-touch:swipe.right="rewindStep"
      >
        <li v-for="step in task.steps"
          v-bind:step="step"
          v-bind:key="step.id"
          v-bind:class="'task-step'+ ( step.order === state.active_step ?
          ' task-step--active' : '')"
        >
          <figure class="task-step__figure">
            <div class="step-canvas">
              <template v-for="(layer, type) in step.layers">
                <img v-bind:src="`/pictos/src/${layer.img}`"
                  v-bind:key="layer.id"
                  v-bind:class="'task-step__layer task-step__layer--'+type"
                >
              </template>
            </div>
            <figcaption class="task-step__legend">{{ step.legend }}</figcaption>
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
    </main>
    <button class="task__step-feedback">
      Reportar un problema con este paso
    </button>
  </div>
</template>

<script lang="ts">
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
    // getIcon(img) {
    //   // eslint-disable-next-line global-require, import/no-dynamic-require
    //   return require(`../src/assets/pictos/src/${img}`);
    // },
  },
  data() {
    return {
      state: {
        active_step: 0,
      },
      task: {
        id: 1,
        title: 'Viajar de un punto a otro',
        place: 'Estación Viña del Mar',
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
            layers: {
              subject: {
                img: '1-subject/handle.svg',
              },
              landmark: {
                img: '2-landmarks/turnstile.svg',
              },
              context: {
                img: '3-context/sign--center.svg',
              },
            },
          },
          {
            id: 2,
            order: 1,
            legend: 'Baja al andén correspondiente',
            layers: {
              subject: {
                img: '1-subject/go-down.svg',
              },
              landmark: {
                img: '2-landmarks/exit.svg',
              },
              context: {
                img: '3-context/seat.svg',
              },
            },
          },
          {
            id: 3,
            order: 2,
            legend: 'Espera el metro detrás de la línea',
            layers: {
              subject: {
                img: '1-subject/wait-side.svg',
              },
              landmark: {
                img: '2-landmarks/metro--front.svg',
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
  computed: {
    audioTaskHeader() {
      return `${this.task.title}. ${this.task.place}, en ${this.task.service}`;
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  .task__single {
    display: flex;
    flex-flow: column nowrap;
    overflow-x: hidden;
  }
  .task__header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    text-align: left;
    background: var(--color-background);
  }
  .task__title {
    grid-column: 1/2;
    margin-bottom: 0;
  }
  .task__description {
    @include rfs($font-size-12);
    grid-column: 1/2;
    grid-row: 1/2;
    margin-bottom: var(--spacer-xs);
    line-height: 1.35;
  }
  .tts {
    .task__header & {
      align-self: flex-start;
      grid-column: 2/3;
      grid-row: 1/2;
      path {
        fill: var(--color-brand);
      }
    }
  }
  .task__main {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
  }
  .task__steps {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    background: var(--color-brand-lightest);
  }
  .task-step__figure {
    display: grid;
    grid-template-rows: auto 1fr;
    flex-grow: 1;
    border-top: 1px solid var(--color-brand-light);
    border-bottom: 1px solid var(--color-brand-light);
  }
  .step-canvas {
    position: relative;
    width: 100%;
    background: var(--color-brand-lightest);
    height: 77vw;
    min-height: 13rem;
    max-height: 40vh;
  }
  .task-step {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX( 100% );
    transition: opacity .25s .25s ease-out, transform 0 0;
    list-style: none;
    opacity: 0;
  }
  .task-step--active {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    transform: translateX( 0% );
    transition: opacity .25s ease-in, transform 0 .5s;
    opacity: 1;
  }
  .task-step__layer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .task-step__layer--subject {
    z-index: 3;
  }
  .task-step__layer--context {
    z-index: 2;
  }
  .task-step__layer--landmark {
    z-index: 1;
  }
  .task-step__legend {
    @include rfs($font-size-16);
    display: flex;
    align-items: center;
    padding: calc( var(--spacer) * .75 ) var(--spacer);
    line-height: calc( 22/16 );
    font-weight: bold;
    background: var(--color-background);
    @media screen and ( min-width: 640px ) {
      padding: calc( var(--spacer-lg) * .75 ) var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .task__nav {
    display: grid;
    gap: 0 var(--spacer-sm);
    grid-template-columns: 1fr 1fr;
    padding: var(--spacer) var(--spacer) var(--spacer-lg);
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer-lg) var(--spacer-lg) calc( var(--spacer-lg) + 1.5rem );
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .task__steps-indicator {
    margin-top: var(--spacer-xs);
    margin-bottom: var(--spacer-xs);
    text-align: center;
    grid-column: 1/3;
    li {
      display: inline-block;
      width: calc( var(--spacer) * .35 );
      height: calc( var(--spacer) * .35 );
      margin: 0 calc( var(--spacer) * .125 );
      list-style: none;
      text-indent: -9999em;
      line-height: calc( var(--spacer) * .35 );
      background: #e1e1e1;
      border-radius: var(--spacer);
    }
  }
  li.task__step-indicator--active {
    background: var(--color-brand);
  }
  .task__step-feedback {
    order: 4;
  }
  .task__step-feedback {
    @include rfs($font-size-12);
    cursor: pointer;
    position: fixed;
    display: block;
    width: calc(100% - ( var(--spacer) * 2 ) );
    max-width: calc(640px - ( var(--spacer) * 2 ) );
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    padding: calc( var(--spacer) * .65 );
    background: var( --color-brand-lighter );
    border-top-left-radius: var( --border-radius );
    border-top-right-radius: var( --border-radius );
    border: 0;
    font-family: inherit;
    @media screen and ( min-width: 1280px ) {
      max-width: calc(750px - ( var(--spacer-lg) * 2 ) );
    }
  }
</style>
