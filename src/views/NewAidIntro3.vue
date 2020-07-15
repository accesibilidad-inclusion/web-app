<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <page-image alt="Seleccionando capas para un pictograma" class="onboarding__welcome-image"></page-image>
      <p>
        Debes seleccionar <strong>los 3 elementos</strong> que arman tu pictograma.
        <text-to-speech :text-audio="
        'Debes seleccionar los 3 elementos que arman tu pictograma.\n\n\n\n\n'
          + 'Luego puedes revisar si funciona presionando “Previsualizar”.\n\n\n\n\n'
          + 'Si te parece que está bien, guárdalo presionando “Confirmar”.'
        " />
      </p>
      <p>Luego puedes revisar si funciona presionando <strong>“Previsualizar”</strong>.</p>
      <p>Si te parece que está <strong>bien</strong>, guárdalo presionando <strong>“Confirmar”</strong>.</p>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
        </ol>
        <OnboardingNext :linkTo="'/nuevo-apoyo/notificacion/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-9-seleccion-de-capas.svg?inline';

export default {
  name: 'NewAidIntro3',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
<style lang="scss">
