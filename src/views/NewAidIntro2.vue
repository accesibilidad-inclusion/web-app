<template>
  <div class="onboarding--inside">
    <div class="container">
      <page-image alt="Persona siguiendo indicaciones de un pictograma" class="onboarding__welcome-image"></page-image>
      <h2 class="onboarding__title">
        Un pictograma está compuesto por 3 elementos
        <text-to-speech :text-audio="
          'Un pictograma está compuesto por 3 elementos\n\n\n\n\n'
          + '1\n\nEl espacio\n\n\n\n\n'
          + '2\n\nLa persona\n\n\n\n\n'
          + '3\n\nLos objetos\n\n\n\n\n'
        " />
      </h2>
      <ol class="onboarding__list">
        <li class="onboarding__list-item">El espacio</li>
        <li class="onboarding__list-item">La persona</li>
        <li class="onboarding__list-item">Los objetos</li>
      </ol>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li></li>
          <li></li>
        </ol>
        <OnboardingNext :link-to="'/nuevo-apoyo/como-se-construye/'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import PageImage from '../../public/img/illustrations/epica-9-composicion-pictograma.svg?inline';

export default {
  name: 'NewAidIntro2',
  components: {
    OnboardingNext,
    TextToSpeech,
    PageImage,
  },
};
</script>
