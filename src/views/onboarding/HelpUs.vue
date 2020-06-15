<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <img src="@/assets/photos/onboarding-welcome.jpg" class="onboarding__welcome-image">
      <h2 class="onboarding__title">
        ¡Tú nos puedes ayudar!
        <text-to-speech :text-audio="
          '¡Tú nos puedes ayudar!\n\n\n'
          + 'Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.'
        " />
      </h2>
      <p>Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.</p>
      <footer class="onboarding__footer">
        <OnboardingNext :linkTo="'/onboarding/permissions'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'HelpUs',
  components: {
    OnboardingNext,
    TextToSpeech,
  },
};
</script>
