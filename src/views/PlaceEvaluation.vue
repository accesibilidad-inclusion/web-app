<!-- eslint-disable max-len -->
<template>
  <div class="evaluation">
    <header class="evaluation__header">
      <span class="evaluation__service">{{ place.service }}</span>
      <h1 class="evaluation__place">{{ place.name }}</h1>
      <text-to-speech :text-audio="`${place.name}, en ${place.service}`" />
    </header>
    <div class="evaluation__summary">
      <div class="place__evaluation-grade place__evaluation-grade--lg" v-bind:data-grade="evaluation.grade">
        {{ evaluation.grade }}
      </div>
      <p class="evaluation__text">Nivel de accesibilidad</p>
      <h2 class="place__evaluation-title">{{ evaluation.title }}</h2>
    </div>
    <div class="evaluation__body">
      <h3 class="evaluation__explanation">¿Qué significa esto?</h3>
      <p class="evaluation__longdesc">{{ evaluation.longdesc }}</p>
      <text-to-speech :text-audio="`¿Qué significa esto?.\n\n${evaluation.longdesc}`" />
    </div>
    <div class="actions">
      <button class="btn btn--large btn--block btn--primary">Evaluar este lugar</button>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'placeEvaluation',
  components: {
    TextToSpeech,
  },
  data() {
    return {
      place: {
        name: 'Estación Viña del Mar',
        service: 'Metro de Valparaíso',
      },
    };
  },
  computed: {
    evaluation() {
      return this.$store.state.evaluations
        // eslint-disable-next-line radix
        .find(evaluation => evaluation.grade === parseInt(this.$route.params.grade, 10));
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .evaluation__header {
    position: relative;
    padding: var(--spacer);
    text-align: center;
    line-height: calc( 22 / 16 );
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .evaluation__service {
    @include rfs($font-size-12);
    margin-bottom: var(--spacer-sm);
  }
  .evaluation__place {
    @include rfs($font-size-21);
  }
  .evaluation__header .tts {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
    @media screen and ( min-width: 640px ) {
      top: var(--spacer-lg);
      right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      right: var(--spacer-xl);
    }
  }

  .evaluation__summary {
    margin-bottom: var(--spacer-sm);
    padding: var(--spacer);
    text-align: center;
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding: var(--spacer-xl);
    }
  }
  .place__evaluation-grade {
    .evaluation__summary & {
      margin-bottom: var(--spacer-sm);
    }
  }
  .evaluation__text {
    @include rfs($font-size-14);
    line-height: calc( 19/14 );
  }
  .evaluation__body {
    position: relative;
    padding: var(--spacer);
    line-height: calc( 22 / 16 );
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .evaluation__explanation {
    @include rfs($font-size-16);
    margin-bottom: var(--spacer);
  }
  .evaluation__longdesc {
    @include rfs($font-size-14);
    line-height: 1.45;
  }
  .evaluation__body .tts {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
    @media screen and ( min-width: 640px ) {
      top: var(--spacer-lg);
      right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      right: var(--spacer-xl);
    }
  }
</style>
