<template>
  <div class="onboarding">
    <div class="container">
      <page-image alt="Persona comprendiendo los pasos de como funciona" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¿Cómo funciona?
        <text-to-speech :text-audio="
          '¿Cómo funciona?\n\n\n'
          + 'Pictos te explica paso a paso qué puedes hacer en cada lugar, a través de pictogramas.'
        " />
      </h2>
      <p>Pictos te explica paso a paso <strong>qué puedes hacer</strong> en cada lugar, <strong>a través</strong> de <strong>pictogramas.</strong></p>
      <footer class="onboarding__footer">
        <OnboardingNext :linkTo="'/onboarding/help-us'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../../public/img/illustrations/onboarding-como-funciona.svg?inline';

export default {
  name: 'HowItWorks',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
