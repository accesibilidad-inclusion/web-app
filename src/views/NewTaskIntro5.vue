<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona indicando querer recibir aviso ingresando email" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Avísame
        <text-to-speech :text-audio="'Avísame\n\n\n\n\n\n'
          + 'Si quieres que te avisen cuando aparezca tu aporte, puede pinchar el botón “Sí, avísame”\n\n\n\n\n\n'
          + 'Luego escribes tu correo electrónico.'" />
      </h2>
      <p>Si quieres que te avisen cuando aparezca tu aporte, puede pinchar el botón <strong>“Sí, avísame”</strong></p>
      <p>Luego <strong>escribes tu correo electrónico.</strong></p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
        </ol>
        <OnboardingNext :linkTo="'/nueva-tarea/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-10-avisame.svg?inline';

export default {
  name: 'NewTaskIntro5',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
