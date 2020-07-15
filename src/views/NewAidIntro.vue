<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <page-image alt="Una persona viendo un pictograma" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¡Gracias por ayudarnos a armar pictogramas!
        <text-to-speech :text-audio="'¡Gracias por ayudarnos a armar pictogramas!\n\n\n\n\n\n'
          + 'Los pictogramas son muy importantes para que las personas puedan usar los servicios sin problemas.\n\n\n\n\n'" />
      </h2>
      <p>Los pictogramas son muy importantes para que las personas puedan <strong>usar los servicios sin problemas.</strong></p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nuevo-apoyo/como-funciona/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-9-gracias-por-ayudar.svg?inline';

export default {
  name: 'NewAidIntro',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/rfs.scss';
//paginador
.onboarding__steps {
  margin-top: var(--spacer-xs);
  margin-bottom: var(--spacer);
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
li.onboarding__step-indicator--active {
  background: var(--color-brand-darker);
}
</style>
