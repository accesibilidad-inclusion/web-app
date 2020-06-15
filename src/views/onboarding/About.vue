<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <img src="@/assets/photos/onboarding-welcome.jpg" class="onboarding__welcome-image">
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

export default {
  name: 'About',
  components: {
    OnboardingNext,
    TextToSpeech,
  },
};
</script>
