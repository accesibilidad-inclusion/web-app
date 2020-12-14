<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <div class="container">
      <IconPermissions class="onboarding__permissions-image" />
      <p class="text-center">Necesitamos que nos permitas acceder a la cámara de tu dispositivo para que puedas tomar fotos durante la evaluación</p>
      <footer class="onboarding__footer">
        <button @click="next()" class="btn btn--large btn--block btn--primary">
          Siguiente
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import IconPermissions from '../../public/img/app-icons/camera-permissions.svg?inline';

export default {
  name: 'PlaceEvaluationIntro4',
  components: {
    IconPermissions,
  },
  methods: {
    next() {
      this.$store.commit('tutorialEvaluation');
      if (!this.$store.state.user.id) {
        this.$router.push('/personal-information/registration');
      } else {
        this.$router.push('/evaluacion-lugar');
      }
    },
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
