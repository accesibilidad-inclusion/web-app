<!-- eslint-disable max-len -->
<template>
  <div class="new-aid new-aid--fullheight">
    <header class="new-aid__header entries-list__header">
      <span class="new-aid__description">Paso {{ step.id }} de {{ task.steps.length }}:</span>
      <h1 class="new-aid__title entries-list__title">{{ step.label }}</h1>
      <text-to-speech :text-audio="
        `Paso ${ step.id } de ${ task.steps.length }:\n\n\n\n\n`
        + `${ step.label }`
        " />
    </header>
    <form class="new-aid__main">
      <header class="new-aid__main__header">
        <h2 class="new-aid__main__title">Selecciona los elementos para armar este paso</h2>
        <text-to-speech :text-audio="
          'Selecciona los elementos para armar este paso:\n\n\n\n\n'
          + 'Espacio, Objeto y Persona'
          " />
      </header>
      <pictogram-select
        v-bind:title="'Espacio'"
        v-bind:pictos="landmarks"
        v-bind:value="state.layers.find( l => l.layout == 2 ) ? state.layers.find( l => l.layout == 2 ).id : null"
        v-on:change="handleLayerChange($event, 2)"
      ></pictogram-select>
      <pictogram-select
        v-bind:title="'Objeto'"
        v-bind:pictos="contexts"
        v-bind:value="state.layers.find( l => l.layout == 3 ) ? state.layers.find( l => l.layout == 3 ).id : null"
        v-on:change="handleLayerChange($event, 3)"
      ></pictogram-select>
      <pictogram-select
        v-bind:title="'Persona'"
        v-bind:pictos="subjects"
        v-bind:value="state.layers.find( l => l.layout == 1 ) ? state.layers.find( l => l.layout == 1 ).id : null"
        v-on:change="handleLayerChange($event, 1)"
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
            <h1 class="pictogram-preview__title entries-list__title">{{ step.label }}</h1>
            <text-to-speech :text-audio="step.label" />
            <ul class="layers-status">
              <li class="layers-status__item">
                <icon-check-rounded v-bind:class="state.layers.find( l => l.layout == 2 ) ? '--checked' : ''"></icon-check-rounded>
                Espacio
              </li>
              <li class="layers-status__item">
                <icon-check-rounded v-bind:class="state.layers.find( l => l.layout == 3 ) ? '--checked' : ''"></icon-check-rounded>
                Objeto
              </li>
              <li class="layers-status__item">
                <icon-check-rounded v-bind:class="state.layers.find( l => l.layout == 1 ) ? '--checked' : ''"></icon-check-rounded>
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
import Service from '@/models/Service';
import Venue from '@/models/Venue';
import Task from '@/models/Task';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PictogramSelect from '@/components/PictogramSelect.vue';
import Pictogram from '@/components/Pictogram.vue';
import IconCheckRounded from '../../public/img/app-icons/check-rounded.svg?inline';
import store from '../store';

export default {
  name: 'NewAidStep',
  components: {
    TextToSpeech,
    PictogramSelect,
    Pictogram,
    IconCheckRounded,
  },
  beforeMount() {
    this.getState();
  },
  beforeUpdate() {
    this.getState();
  },
  data() {
    return {
      state: {
        layers: [],
        canPreview: false,
        canConfirm: false,
      },
      service: new Service(this.$store.state.selected.service),
      venue: new Venue(this.$store.state.selected.venue),
      task: new Task(this.$store.state.selected.task),
    };
  },
  computed: {
    step() {
      return this.task.steps.find(step => step.id === parseInt(this.$route.params.stepId, 10));
    },
    subjects() {
      return this.$store.state.pictos.filter(picto => picto.layout === 1);
    },
    landmarks() {
      return this.$store.state.pictos.filter(picto => picto.layout === 2);
    },
    contexts() {
      return this.$store.state.pictos.filter(picto => picto.layout === 3);
    },
  },
  methods: {
    getState() {
      if (this.$store.state.proposalPictos.length > 0) {
        let proposalStep = null;
        this.$store.state.proposalPictos.forEach((p) => {
          if (p.step.id === parseInt(this.$route.params.stepId, 10)) {
            proposalStep = p;
          }
        });
        if (proposalStep !== null) {
          this.state.layers = proposalStep.layers;
          this.state.canPreview = true;
          this.state.canConfirm = true;
        }
      }
    },
    handleLayerChange(event, type) {
      if (this.state.layers.findIndex(l => l.layout === type) !== -1) {
        this.state.layers.splice(this.state.layers.findIndex(l => l.layout === type), 1);
      }
      if (event !== null) {
        this.state.layers.push(this.$store.state.pictos.find(picto => picto.id === event));
      }
      this.checkActions();
    },
    checkActions() {
      this.state.canPreview = (
        this.state.layers.length > 0
      );
      this.state.canConfirm = (
        this.state.layers.length === 3
      );
    },
    showPreview() {
      this.$modal.show('new-aid-preview');
    },
    hidePreview() {
      this.$modal.hide('new-aid-preview');
    },
    savePictogram() {
      let proposalIndex = null;
      const proposal = this.$store.state.proposalPictos;
      proposal.forEach((p, index) => {
        if (p.step.id === parseInt(this.$route.params.stepId, 10)) {
          proposalIndex = index;
        }
      });
      if (proposalIndex !== null) {
        proposal[proposalIndex].layers = this.state.layers;
      } else {
        proposal.push({
          step: this.task.steps[parseInt(this.$route.params.stepId, 10) - 1],
          layers: this.state.layers,
        });
      }
      this.$store.commit('setProposalPictos', proposal);
      this.state.layers = [];
      this.checkActions();
      this.$forceUpdate();
      if (this.task.steps.length === parseInt(this.$route.params.stepId, 10)) {
        this.$router.push({
          name: 'new-aid-summary',
        });
      } else {
        this.$router.push({ name: 'new-aid-step', params: { stepId: parseInt(this.$route.params.stepId, 10) + 1 } });
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    // Antes de salir, se deben reestablecer los valores de this.state.layers
    // Sino, se puede trabajar directamente sobre el objeto this.task.steps[:stepId].layers
    // O bien, usar el store
    next();
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.new-aid {
  display: flex;
  flex-flow: column nowrap;
}
.new-aid--fullheight {
  overflow: hidden;
  height: calc(100vh - ( #{$font-size-16} * 1.13 + var(--spacer-sm) * 2 ) );
  @media screen and ( min-width: 640px ) {
    height: calc(100vh - ( #{$font-size-16} * 1.33 + var(--spacer) * 2 ) );
  }
  @media screen and ( min-width: 1280px ) {
    height: calc(100vh - ( #{$font-size-16} * 1.4 + var(--spacer) * 2 ) );
  }

  .new-aid__main {
    overflow-x: hidden;
    overflow-y: scroll;
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        height: 100%;
      }
    }
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
.new-aid__main {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  padding: var(--spacer);
  background: var(--color-brand-lightest);
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
  @media screen and ( min-width: 1280px ) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.new-aid__main__header {
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
.new-aid__main__title {
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
