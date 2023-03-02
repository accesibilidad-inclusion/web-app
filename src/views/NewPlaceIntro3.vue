<!-- eslint-disable max-len -->
<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Flechas indicando botón listo" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Muy fácil
        <text-to-speech :text-audio="'Muy fácil\n\n\n\n\n\n'
          + 'Para guardar el lugar que elegiste, presiona “Listo”.'" />
      </h2>
      <p>Para guardar el lugar que elegiste, presiona “Listo”.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
        </ol>
        <button @click="next()" class="btn btn--large btn--block btn--primary">
          Siguiente
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-11-muy-facil.svg?inline';

export default {
  name: 'NewPlaceIntro3',
  components: {
    TextToSpeech,
    PageImage,
  },
  methods: {
    next() {
      this.$store.commit('tutorialPlace');
      this.$router.push(`/nuevo-lugar/${this.$route.params.service_id ? this.$route.params.service_id : ''}`);
    },
  },
};
</script>
