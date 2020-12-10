<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <IconPermissions class="onboarding__permissions-image" />
      <p class="text-center">Necesitamos que nos permitas acceder a la cámara de tu dispositivo para que puedas tomar fotos durante la evaluación</p>
      <footer class="onboarding__footer">
        <OnboardingNext :linkTo="$store.state.user.id ? '/evaluacion-lugar' : '/personal-information/registration'" />
      </footer>
    </div>
  </div>
</template>

<script>
import OnboardingNext from '@/components/OnboardingNext.vue';
import IconPermissions from '../../public/img/app-icons/camera-permissions.svg?inline';

export default {
  name: 'PlaceEvaluationIntro4',
  components: {
    OnboardingNext,
    IconPermissions,
  },
};
</script>
<style lang="scss">
  .onboarding__permissions-image {
    display: block;
    width: 40vw;
    height: auto;
    min-width: 110px;
    max-width: 200px;
    margin: auto auto var(--spacer-lg);
  }

  .text-center {
    width: 70vw;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
