<template>
  <div class="onboarding--inside">
    <div class="container">
      <p class="onboarding__text-audio">
        <strong>Para realizar la evaluación debes seguir la siguiente norma de puntuación:</strong>
        <text-to-speech :text-audio="'Para realizar la evaluación debes seguir la siguiente norma de puntuación:\n\n\n\n\n\n'
          + '5\n\nExcelente: No necesita mejoras.\n\n\n\n\n'
          + '4\n\nBueno: Necesita pocas mejoras.\n\n\n\n\n'
          + '3\n\nRegular: Ni bueno Ni malo.\n\n\n\n\n'
          + '2\n\nMalo: Necesita muchas mejoras.\n\n\n\n\n'
          + '1\n\nPésimo: Tiene que mejorar todo.\n\n\n\n\n'" />
      </p>
      <ul class="onboarding__evaluation">
        <li>
          <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="5">5</span>
          <span class="place-block__evaluation-description"><strong>Excelente:</strong> No necesita mejoras.</span>
        </li>
        <li>
          <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="4">4</span>
          <span class="place-block__evaluation-description"><strong>Bueno:</strong> Necesita pocas mejoras.</span>
        </li>
        <li>
          <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="3">3</span>
          <span class="place-block__evaluation-description"><strong>Regular:</strong> Ni bueno Ni malo.</span>
        </li>
        <li>
          <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="2">2</span>
          <span class="place-block__evaluation-description"><strong>Malo:</strong> Necesita muchas mejoras.</span>
        </li>
        <li>
          <span class="place__evaluation-grade place-block__evaluation-grade place__evaluation-grade--lg" data-grade="1">1</span>
          <span class="place-block__evaluation-description"><strong>Pésimo:</strong> Tiene que mejorar todo.</span>
        </li>
      </ul>
      <footer class="onboarding__footer">
        <ol class="onboarding__steps">
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
          <li class="onboarding__step-indicator--active"></li>
        </ol>
        <OnboardingNext :link-to="'/evaluacion-lugar/intro4'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'PlaceEvaluationIntro3',
  components: {
    OnboardingNext,
    TextToSpeech,
  },
};
</script>
<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .onboarding__evaluation {
    list-style: none;
    li {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
    }
    .place__evaluation-grade--lg {
      margin: 0;
      width: 2.8rem;
      height: 2.8rem;
      font-size: 1.5rem;
      display: inherit;
    }
    .place-block__evaluation-description {
      @include rfs($font-size-16);
      margin-left: var(--spacer-sm);
    }
  }
</style>
