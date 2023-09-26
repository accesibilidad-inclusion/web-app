<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Un edificio en un lugar" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¡Hola!
        <text-to-speech :text-audio="'¡Hola!\n\n\n\n\n\n'
          + 'Acá te explicamos cómo debes hacer la evaluación de un lugar con PICTOS. A continuación, encontrarás los pasos que debes seguir.'" />
      </h2>
      <p>Acá te explicamos cómo debes hacer la evaluación de un lugar con PICTOS. A continuación, encontrarás los pasos que debes seguir.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/evaluacion-lugar/intro2'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-5-hola.svg?inline';

export default {
  name: 'PlaceEvaluationIntro',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
