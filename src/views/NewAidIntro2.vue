<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--inside">
    <div class="container">
      <page-image alt="Persona siguiendo indicaciones de un pictograma" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Un pictograma está compuesto por 3 elementos
        <text-to-speech :text-audio="
          'Un pictograma está compuesto por 3 elementos\n\n\n\n\n'
          + '1\n\nEl espacio\n\n\n\n\n'
          + '2\n\nLa persona\n\n\n\n\n'
          + '3\n\nLos objetos\n\n\n\n\n'
        " />
      </h2>
      <ol class="onboarding__list">
        <li class="onboarding__list-item">El espacio</li>
        <li class="onboarding__list-item">La persona</li>
        <li class="onboarding__list-item">Los objetos</li>
      </ol>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nuevo-apoyo/como-se-construye/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-9-composicion-pictograma.svg?inline';

export default {
  name: 'NewAidIntro2',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/rfs.scss';
.onboarding__list {
  margin-bottom: var(--spacer);
  line-height: 1.5;
  list-style: none;
  counter-reset: list-item;
}
.onboarding__list-item {
  counter-increment: list-item;
  margin-bottom: var(--spacer-sm);
  padding-left: var(--spacer);
  position: relative;
  @media screen and ( min-width: 640px ) {
    padding-left: calc(var(--spacer) + var(--spacer-xs));
  }
  @media screen and ( min-width: 1288px ) {
    padding-left: calc(var(--spacer) + var(--spacer-xs));
  }
  &:before {
    content: counter(list-item) ". ";
    color: var(--color-brand-darkest);
    font-weight: bold;
    position: absolute;
    left: 0;
  }
}
</style>
