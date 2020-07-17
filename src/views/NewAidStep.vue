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
    <form class="new-aid__form">
      <header class="new-aid__form__header">
        <h2 class="new-aid__form__title">Selecciona los elementos para armar este paso</h2>
        <text-to-speech :text-audio="
          'Selecciona los elementos para armar este paso:\n\n\n\n\n'
          + 'Espacio, Objeto y Persona'
          " />
      </header>
      <pictogram-select
        v-bind:title="'Espacio'"
        v-bind:pictos="landmarks"
        v-bind:value="state.layers.landmark.img"
        v-on:change="handleLayerChange($event, 'landmark')"
      ></pictogram-select>
      <pictogram-select
        v-bind:title="'Objeto'"
        v-bind:pictos="contexts"
        v-bind:value="state.layers.context.img"
        v-on:change="handleLayerChange($event, 'context')"
      ></pictogram-select>
      <pictogram-select
        v-bind:title="'Persona'"
        v-bind:pictos="subjects"
        v-bind:value="state.layers.subject.img"
        v-on:change="handleLayerChange($event, 'subject')"
      ></pictogram-select>
    </form>
    <div class="new-aid__actions">
      <button
        type="button"
        v-bind:class="'btn btn--large btn--block' + ( state.canPreview ? ' btn--ghost-primary' : ' btn--ghost-neutral' )"
        @click="showPreview"
      >
        Previsualizar
      </button>
      <button
        type="button"
        v-bind:class="'btn btn--large btn--block' + ( state.canConfirm ? ' btn--primary' : ' btn--ghost-neutral' )"
        @click="savePictogram"
      >
        Confirmar
      </button>
    </div>
    <modal
      name="new-aid-preview"
      :adaptive="true"
      height="auto"
    >
      <div class="vm--modal-wrapper">
        <div class="pictogram-preview">
          <header class="pictogram-preview__header">
            <h1 class="pictogram-preview__title entries-list__title">{{ step.legend }}</h1>
            <text-to-speech :text-audio="step.legend" />
            <ul class="layers-status">
              <li class="layers-status__item">
                <icon-check-rounded v-bind:class="state.layers.landmark.img ? '--checked' : ''"></icon-check-rounded>
                Espacio
              </li>
              <li class="layers-status__item">
                <icon-check-rounded v-bind:class="state.layers.context.img ? '--checked' : ''"></icon-check-rounded>
                Objeto
              </li>
              <li class="layers-status__item">
                <icon-check-rounded v-bind:class="state.layers.subject.img ? '--checked' : ''"></icon-check-rounded>
                Persona
              </li>
            </ul>
          </header>
          <pictogram v-bind:layers="state.layers"></pictogram>
          <footer class="pictogram-preview__footer">
            <button type="button" class="pictogram-preview__close" @click="hidePreview">Cerrar</button>
          </footer>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import Pictos from 'pictos/public/es/manifest.json';
import PictogramSelect from '@/components/PictogramSelect.vue';
import Pictogram from '@/components/Pictogram.vue';
import IconCheckRounded from '../../public/img/app-icons/check-rounded.svg?inline';

export default {
  name: 'NewAidStep',
  components: {
    TextToSpeech,
    PictogramSelect,
    Pictogram,
    IconCheckRounded,
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
      this.$data.state.layers[type].img = event;
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
    showPreview() {
      this.$modal.show('new-aid-preview');
    },
    hidePreview() {
      this.$modal.hide('new-aid-preview');
    },
    savePictogram() {
      console.log(state.layers);
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
  @media screen and ( min-width: 640px ) {
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
.new-aid__form {
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
.new-aid__form__header {
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
.new-aid__form__title {
  @include rfs($font-size-16);
  font-weight: bold;
  line-height: 1.375;
}
.new-aid__actions {
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

.pictogram-preview {
  height: 100%;
}
.pictogram-preview__header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: var(--spacer);
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
}
.pictogram-preview__title {
  @include rfs($font-size-18);
  grid-column: 1/2;
  margin-bottom: var(--spacer-sm);
  line-height: 1.3;
  @media screen and ( min-width: 640px ) {
    margin-bottom: .75rem;
  }
}
.pictogram-preview__header .tts {
  position: relative;
  align-self: flex-start;
  grid-column: 2/3;
  grid-row: 1/2;
  top: .5rem;
  @media screen and ( min-width: 640px ) {
    top: .75rem;
  }
}
.layers-status {
  display: flex;
  grid-column: 1/3;
  list-style: none;
  svg {
    position: relative;
    width: $font-size-14;
    height: $font-size-14;
    top: 2px;
    border-radius: 50%;
    border: 1px solid var(--color-brand-darkest);
    path {
      fill: var(--color-background);
    }
    &.--checked {
      border: 1px solid var(--color-highlight);
      box-shadow: inset 0 0 0 2px var(--color-highlight);
      path {
        fill: var(--color-highlight);
      }
    }
    @media screen and ( min-width: 640px ) {
      width: $font-size-16;
      height: $font-size-16;
    }
  }
}
.layers-status__item {
  @include rfs($font-size-14);
  width: 100%;
  @media screen and ( min-width: 640px ) {
    @include rfs($font-size-16);
  }
}
.pictogram-preview .pictogram {
  width: 100%;
  background-color: var(--color-illustration-bg);
  border-top: 1px solid var(--color-neutral-light);
  border-bottom: 1px solid var(--color-neutral-light);
}
.pictogram-preview__footer {
  padding: var(--spacer);
  text-align: center;
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
}
.pictogram-preview__close {
  @include rfs($font-size-16);
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  color: var(--color-text);
  background: none;
  border: none;
}
</style>
