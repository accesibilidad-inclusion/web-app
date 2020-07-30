<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona mirando un icono de lugar" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Sugerir lugar
        <text-to-speech :text-audio="'Sugerir lugar\n\n\n\n\n\n'
          + '¿Quieres que agreguemos un nuevo servicio?\n\n\n\n\n\n'
          + 'Acá te explico cómo hacerlo.'" />
      </h2>
      <p>¿Quieres que agreguemos un nuevo servicio? </p>
      <p>Acá te explico cómo hacerlo.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nuevo-lugar/intro2/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-11-sugerir-lugar.svg?inline';

export default {
  name: 'NewPlaceIntro',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
