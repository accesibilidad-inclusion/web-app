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
import LogoPictos from '../../public/img/app-icons/logo-pictos.svg?inline';

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
    if (localStorage.onboarding === undefined) {
      setTimeout(() => {
        this.showOnboarding = true;
        this.$router.push('/onboarding/welcome');
      }, 2000);
    } else {
      setTimeout(() => {
        this.showOnboarding = true;
        this.$router.push('/home');
      }, 2000);
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
  background-color: #fff;
  z-index: 100000;
}

.splash__app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
}

.splash__logo {
  width: 40vw;
  height: auto;
  min-width: 200px;
  max-width: 300px;
}

.splash__tagline {
  @include rfs( $font-size-18 );
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50vh;
  padding: 10vh 15vw 0;
  font-weight: 600;
  line-height: calc(26/18);
  color: #fff;
  text-align: center;
  background-color: var(--color-brand-darkest);

  p {
    max-width: 500px;
  }
}

.v-spinner {
  margin-top: auto;
  margin-bottom: auto;
}

</style>
