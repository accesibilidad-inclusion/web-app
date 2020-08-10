<template>
  <div class="splash">
    <header class="splash__app">
      <LogoPictos class="splash__logo" />
    </header>
    <div class="splash__tagline">
      <p>Servicio de navegación y evaluación para la accesibilidad cognitiva</p>
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
    </div>
  </div>
</template>

<script>
// Se utilzan spinners desde https://github.com/greyby/vue-spinner
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import LogoPictos from '../../public/img/app-icons/logo-pictos-light.svg?inline';

// Acá se debe hacer la consulta inicial y configurar la aplicación
export default {
  name: 'Splash',
  components: {
    ClipLoader,
    LogoPictos,
  },
  data() {
    return {
      showOnboarding: null,
      loading: true,
      color: '#fff',
      size: '20px',
    };
  },
  mounted() {
    if (!this.$store.state.user.id) {
      setTimeout(() => {
        this.showOnboarding = true;
        this.$router.push('/onboarding/');
      }, 2000);
    } else {
      this.$store.dispatch('loadQuestions');
      this.$store.dispatch('loadData').then(() => {
        this.showOnboarding = true;
        this.$router.push('/home');
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.splash {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-brand-darkest);
  z-index: 100000;
}

.splash__app {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 48vh;
}

.splash__logo {
  width: 40vw;
  height: auto;
  min-width: 250px;
  max-width: 300px;
}

.splash__tagline {
  @include rfs( $font-size-16 );
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 52vh;
  padding: 5vh 10vw 0;
  font-weight: 600;
  line-height: calc(26/18);
  color: #fff;
  text-align: center;
  background-color: var(--color-brand-darkest);

  p {
    max-width: 400px;
  }
}

.v-spinner {
  margin-top: auto;
  margin-bottom: auto;
}

</style>
