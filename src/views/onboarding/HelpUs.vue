<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <page-image alt="Grupo de personas abrazándose" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        ¡Tú nos puedes ayudar!
        <text-to-speech :text-audio="
          '¡Tú nos puedes ayudar!\n\n\n'
          + 'Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.'
        " />
      </h2>
      <p>Queremos entregar a la comunidad las herramientas para apoyarnos entre todos.</p>
      <footer class="onboarding__footer">
        <button @click="tutorialComplete()" class="btn btn--large btn--block btn--primary">
          Emprezar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../../public/img/illustrations/onboarding-tu-puedes-ayudar.svg?inline';

export default {
  name: 'HelpUs',
  components: {
    TextToSpeech,
    PageImage,
  },
  methods: {
    tutorialComplete() {
      this.$store.commit('tutorialComplete');
      this.$router.push('/');
    },
  },
};
</script>
