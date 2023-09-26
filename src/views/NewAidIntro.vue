<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Una persona viendo un pictograma" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¡Gracias por ayudarnos a armar pictogramas!
        <text-to-speech :text-audio="'¡Gracias por ayudarnos a armar pictogramas!\n\n\n\n\n\n'
          + 'Los pictogramas son muy importantes para que las personas puedan usar los servicios sin problemas.\n\n\n\n\n'" />
      </h2>
      <p>Los pictogramas son muy importantes para que las personas puedan <strong>usar los servicios sin problemas.</strong></p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/nuevo-apoyo/como-funciona/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-9-gracias-por-ayudar.svg?inline';

export default {
  name: 'NewAidIntro',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
