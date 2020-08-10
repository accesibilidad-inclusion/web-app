<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <header class="onboarding__navbar">
    </header>
    <div class="container">
      <template>
        <text-to-speech :text-audio="'Has terminado el primer paso'" />
        <icon-completed-step />
        <h2 class="onboarding__title">Has terminado el primer paso</h2>
        <footer class="onboarding__footer">
          <button class="btn btn--large btn--block btn--light">
            Crear siguiente paso
          </button>
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import IconCompletedStep from '../../public/img/app-icons/completed-step.svg?inline';

export default {
  name: 'NewAidStepConfirmation',
  components: {
    IconCompletedStep,
  },
};
</script>

<style lang="scss" scoped>
.onboarding ::v-deep .onboarding__title {
  justify-content: center;
  align-items: center;
  max-width: 15rem;
  margin-top: var(--spacer);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: uppercase;
}
svg {
  display: block;
  width: 3rem;
  height: 3rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  path {
    fill: var(--color-highlight);
  }
}
</style>
