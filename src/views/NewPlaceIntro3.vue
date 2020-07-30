<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Flechas indicando botón listo" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Muy fácil
        <text-to-speech :text-audio="'Muy fácil\n\n\n\n\n\n'
          + 'Para guardar el lugar que elegiste, presiona “Listo”.'" />
      </h2>
      <p>Para guardar el lugar que elegiste, presiona “Listo”.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
        </ol>
        <OnboardingNext :linkTo="'/nuevo-lugar/intro/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-11-muy-facil.svg?inline';

export default {
  name: 'NewPlaceIntro3',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
