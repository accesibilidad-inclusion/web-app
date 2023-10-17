<template>
  <div class="onboarding">
    <div class="container">
      <page-image alt="Persona sonriendo" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Cuéntanos un poco de ti
        <text-to-speech :text-audio="
          'Cuéntanos un poco de ti.\n\n\n'
          + 'Registra tu fecha de nacimiento, sexo y si tienes algún tipo de discapacidad.\n\n\n'
          + 'Toda la información será estrictamente confidencial.'
        " />
      </h2>
      <p>Registra tu <strong>fecha</strong> de <strong>nacimiento</strong>, <strong>sexo</strong> y si tienes algún <strong>tipo de discapacidad</strong>.</p>
      <p>Toda la información será <strong>estrictamente confidencial</strong>.</p>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'/personal-information/birthday'"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import TextToSpeech from '@/components/TextToSpeech.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';
//  import PageImage from '../../../public/img/illustrations/onboarding-cuentanos-de-ti.svg?inline';

export default {
  name: 'Registration',
  components: {
    TextToSpeech,
    OnboardingNext,
    // PageImage,
  },
};
</script>
