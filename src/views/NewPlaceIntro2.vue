<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Mano indicando el campo de búsqueda de lugar" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Escribe el nombre del lugar
        <text-to-speech :text-audio="'Escribe el nombre del lugar\n\n\n\n\n\n'
          + 'PICTOS te mostrará los lugares similares a lo que buscaste.'" />
      </h2>
      <p>PICTOS te mostrará los lugares similares a lo que buscaste.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nuevo-lugar/intro3/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-11-escribe-el-nombre-del-lugar.svg?inline';

export default {
  name: 'NewPlaceIntro2',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
