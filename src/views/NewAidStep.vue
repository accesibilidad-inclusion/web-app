<!-- eslint-disable max-len -->
<template>
  <div class="new-aid">
    <header class="new-aid__header entries-list__header">
      <span class="new-aid__description">Paso {{ step.id }} de {{ task.steps.length }}:</span>
      <h1 class="new-aid__title entries-list__title">{{ step.legend }}</h1>
      <text-to-speech :text-audio="
        `Paso ${ step.id } de ${ task.steps.length }:\n\n\n\n\n`
        + `${ step.legend }`
        " />
    </header>
    <form class="pictogram-form">
      <header class="pictogram-form__header">
        <h2 class="pictogram-form__title">Selecciona los elementos para armar este paso</h2>
        <text-to-speech :text-audio="
          'Selecciona los elementos para armar este paso:\n\n\n\n\n'
          + 'Espacio, Objeto y Persona'
          " />
      </header>
      <pictogram-select
        v-bind:title="'Espacio'"
        v-bind:pictos="landmarks"
        v-model="state.layers.landmark.img"
        @change="handleLayerChange($event, 'landmark')"
      ></pictogram-select>
      <pictogram-select
        v-bind:title="'Objeto'"
        v-bind:pictos="contexts"
        @change="handleLayerChange($event, 'context')"
      ></pictogram-select>
      <pictogram-select
        v-bind:title="'Persona'"
        v-bind:pictos="subjects"
        @change="handleLayerChange($event, 'subject')"
      ></pictogram-select>
    </form>
    <div class="pictogram-actions">
      <button v-bind:class="'btn btn--large btn--block' + ( state.canPreview ? ' btn--primary' : ' btn--ghost-neutral' )">
        Previsualizar
      </button>
      <button v-bind:class="'btn btn--large btn--block' + ( state.canConfirm ? ' btn--primary' : ' btn--ghost-neutral' )">
        Confirmar
      </button>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import Pictos from 'pictos/public/es/manifest.json';
import PictogramSelect from '@/components/PictogramSelect.vue';

export default {
  name: 'NewAidStep',
  components: {
    TextToSpeech,
    PictogramSelect,
  },
  data() {
    return {
      state: {
        layers: {
          subject: {
            img: '',
          },
          landmark: {
            img: '',
          },
          context: {
            img: '',
          },
        },
        canPreview: false,
        canConfirm: false,
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
          },
          {
            id: 2,
            order: 1,
            legend: 'Baja al andén correspondiente',
          },
          {
            id: 3,
            order: 2,
            legend: 'Espera el metro detrás de la línea',
          },
        ],
      },
    };
  },
  computed: {
    step() {
      return this.$data.task.steps
        .find(step => step.id === parseInt(this.$route.params.stepId, 10));
    },
    subjects() {
      return Pictos.properties.pictos.filter(picto => picto.layer === 1);
    },
    landmarks() {
      return Pictos.properties.pictos.filter(picto => picto.layer === 2);
    },
    contexts() {
      return Pictos.properties.pictos.filter(picto => picto.layer === 3);
    },
  },
  methods: {
    handleLayerChange(event, type) {
      this.$data.state.layers[type] = event;
      this.checkActions();
    },
    checkActions() {
      this.$data.state.canPreview = (
        this.$data.state.layers.landmark.img !== ''
        || this.$data.state.layers.context.img !== ''
        || this.$data.state.layers.subject.img !== ''
      );
      this.$data.state.canConfirm = (
        this.$data.state.layers.landmark.img !== ''
        && this.$data.state.layers.context.img !== ''
        && this.$data.state.layers.subject.img !== ''
      );
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.new-aid {
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  height: calc(100vh - 42px);
  @media screen and ( min-width: 650px ) {
    height: calc(100vh - 66px);
  }
}
.new-aid__header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  text-align: left;
  color: var(--color-background);
  background-color: var(--color-brand-darkest);
}
.new-aid__title {
  grid-column: 1/2;
  margin-bottom: 0;
  color: var(--color-highlight);
}
.new-aid__description {
  @include rfs($font-size-12);
  grid-column: 1/2;
  grid-row: 1/2;
  margin-bottom: var(--spacer-xs);
  line-height: 1.35;
}
.new-aid__header .tts {
  align-self: flex-start;
  grid-column: 2/3;
  grid-row: 1/2;
  path {
    fill: var(--color-background);
  }
}
.pictogram-form {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  padding: var(--spacer);
  background: var(--color-brand-lightest);
  overflow-x: hidden;
  overflow-y: scroll;
  // Hack Safari
  @media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-appearance:none) {
      height: 100%;
    }
  }
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
  @media screen and ( min-width: 1280px ) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.pictogram-form__header {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
  align-items: flex-start;
  margin-bottom: var(--spacer);
  .tts {
    position: relative;
    top: var(--spacer-xs);
  }
}
.pictogram-form__title {
  @include rfs($font-size-16);
  padding-right: var(--spacer-xl);
  font-weight: bold;
  line-height: 1.375;
}
.pictogram-actions {
  display: flex;
  flex-grow: 1;
  gap: .75rem;
  padding: var(--spacer);
  background: var(--color-brand-lightest);
  @media screen and ( min-width: 640px ) {
    padding-left: var(--spacer-lg);
    padding-right: var(--spacer-lg);
  }
  @media screen and ( min-width: 1280px ) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
</style>
