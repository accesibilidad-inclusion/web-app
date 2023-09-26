<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Resumen de pasos y una mano indicando el botón confirmar" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Recuerda revisar
        <text-to-speech :text-audio="'Recuerda revisar\n\n\n\n\n\n'
          + 'Debes revisar que están bien, pensando en cómo los harías tú.\n\n\n\n\n\n'
          + 'Si están bien, haz click en “Confirmar”.'" />
      </h2>
      <p>Debes revisar que están bien, pensando en <strong>cómo los harías tú.</strong></p>
      <p>Si están bien, haz <strong>click en “Confirmar”.</strong></p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/nueva-tarea/intro5/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-10-recuerda-revisar.svg?inline';

export default {
  name: 'NewTaskIntro4',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
