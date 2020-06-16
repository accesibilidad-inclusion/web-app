<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <page-image alt="Persona revisando las funcionalidades de la aplicación" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¿Para qué sirve?
        <text-to-speech :text-audio="
          '¿Para qué sirve?\n\n\n'
          + 'Pictos te ayudará a realizar tareas en distintos servicios, mostrándote una lista de todas las cosas que puedes hacer en cada lugar'
        " />
      </h2>
      <p>Pictos te ayudará <strong>a realizar tareas</strong> en distintos servicios, mostrándote una lista de todas las <strong>cosas que puedes hacer</strong> en cada lugar.</p>
      <footer class="onboarding__footer">
        <OnboardingNext :linkTo="'/onboarding/how-it-works'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../../public/img/illustrations/onboarding-para-que-sirve.svg?inline';

export default {
  name: 'About',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
