<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <div class="container onboarding__background-image">
      <template>
        <text-to-speech :text-audio="'Gracias por tu aporte\n\n\n\n\n\n'
          + 'Estas ayudando al mundo a ser un lugar más accesible\n\n\n\n\n\n'
          + 'Volver\n\n\n\n\n\n'
          + '¿Quieres que te avisemos cuando publiquemos tu aporte?'" />
        <h2 class="onboarding__title-complete">Gracias por<br> tu aporte</h2>
        <p class="onboarding__description-complete">Estas ayudando al mundo a ser un lugar más accesible</p>
        <router-link to="/lugares/:placeId/" class="onboarding__back">Volver a la Estación del Mar</router-link>
        <footer class="onboarding__footer">
          <p class="onboarding__footer-description-complete">¿Quieres que te avisemos cuando publiquemos tu aporte?</p>
          <button class="btn btn--large btn--block btn--ghost" @click="openEmail">
            Sí, avísame
          </button>
          <form class="onboarding__form" v-bind:class="'complete' + ( state.shown_modal ? ' complete--fade' : '' ) + ( state.closed_modal ? ' complete--fade-out' : '' )">
            <input class="onboarding__email" type="email" placeholder="Escribe tu mail aquí">
            <button type="submit" class="btn btn--large btn--ghost" @click="closeEmail">Enviar</button>
          </form>
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'NewAidComplete',
  components: {
    TextToSpeech,
  },
  data() {
    return {
      state: {
        shown_modal: false,
        closed_modal: null,
      },
    };
  },
  methods: {
    openEmail() {
      this.$data.state.shown_modal = true;
      this.$data.state.closed_modal = false;
    },
    closeEmail() {
      this.$data.state.closed_modal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.onboarding ::v-deep .onboarding__title-complete {
  margin-top: var(--spacer);
  text-transform: uppercase;
}
.onboarding__background-image {
  background-image: url('../../public/img/illustrations/background.svg');
  background-size: cover;
  background-repeat: no-repeat;
  .tts {
    text-align: right;
  }
  .tts ::v-deep path {
    fill: var(--color-brand-light);
  }
}
.onboarding__description-complete {
  @include rfs($font-size-16);
  font-weight: bold;
  color: var(--color-background);
  max-width: 15rem;
  margin-top: var(--spacer);
}
.onboarding__back {
  color: var(--color-highlight);
}
.onboarding__footer-description-complete {
  @include rfs($font-size-16);
  font-weight: bold;
}
.onboarding__form {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer-sm);
}
.onboarding__email {
  @include rfs($font-size-14);
  padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);
  border: 2px solid var(--color-background);
  border-radius: var(--border-radius);
  &::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var(--font-family);
  }
}
.complete {
  position: absolute;
  top: 100%;
  overflow: hidden;
  transition: top .35s ease;
}
.complete--fade {
  transition: var(--transition-base);
  position: relative;
  overflow: initial;
  top: initial;
  animation: quickScaleUp 0s .5s linear forwards;
}
.complete--fade-out {
  animation: quickScaleDown 0s .5s linear forwards;
}
</style>
