<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Pasos agregados y una mano indicando el botón listo" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Ten en cuenta
        <text-to-speech :text-audio="'Ten en cuenta\n\n\n\n\n\n'
          + 'Una tarea no puede tener menos de 3 pasos, ni más de 9 pasos.\n\n\n\n\n\n'
          + 'Cuando ya los hayas escrito todos, presionas el botón “Listo”.'" />
      </h2>
      <p>Una tarea no puede tener <strong>menos de 3 pasos</strong>, ni <strong>más de 9 pasos.</strong></p>
      <p>Cuando ya los hayas escrito todos, <strong>presionas el botón “Listo”.</strong></p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nueva-tarea/intro4/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-10-ten-en-cuenta.svg?inline';

export default {
  name: 'NewTaskIntro3',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
