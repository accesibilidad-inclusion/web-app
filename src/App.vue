<template>
  <div id="app">
    <app-nav v-on:comeback="backEvaluation"></app-nav>
    <transition name="slide">
      <router-view ref="view"/>
    </transition>
    <div v-if="deferredPrompt" class="notification-install">
      <p>
        Te recomendamos instalar esta aplicacion para una mejor experiencia
      </p>
      <button class="btn btn--ghost">Cancelar</button>
      <button class="install-button btn btn--ghost" @click="promptInstall">Instalar</button>
    </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue';
import { VuePwaInstallMixin } from 'vue-pwa-install';

export default {
  name: 'App',
  components: {
    AppNav,
  },
  data() {
    return {
      deferredPrompt: null,
    };
  },
  created() {
    this.$on('canInstall', (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt:
      event.preventDefault();

      // Stash the event so it can be triggered later:
      this.deferredPrompt = event;
    });
  },
  methods: {
    backEvaluation() {
      this.$refs.view.comeback();
    },
    promptInstall() {
      // Show the prompt:
      this.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt:
      this.deferredPrompt.userChoice.then((choiceResult) => {
        // if (choiceResult.outcome === 'accepted') {
        //   console.log('User accepted the install prompt');
        // } else {
        //   console.log('User dismissed the install prompt');
        // }

        this.deferredPrompt = null;
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
@import '@/assets/scss/global.scss';

// Esta es una manera de ver la responsividad del diseño.
// Se puede plantear también desde un contenedor interno
// a la manera del .container de bootstrap, para permitir
// que los bloques de color se prolonguen hasta el borde
// de la pantalla, sin modificar la diagramación trabajada.
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--color-background);
  overflow-x: hidden;
  @media screen and ( min-width: 640px ) {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and ( min-width: 1280px ) {
    max-width: 750px;
  }
}
// Transition: Slide
.slide-enter-active {
  transition: all .5s ease;
}
.slide-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
.notification-install {
  display: flex;
  position: relative;
  justify-content: space-between;
  bottom: 0px;
  width: 100%;
  height: 70px;
  padding: 10px;
  background: var(--color-brand-dark);
  border-radius: 7px 7px 0px 0px;
  button {
    margin-left: 5px ;
  }
  p {
    margin: 10px;
    color: #fff;
    font-size: 14px;
    align-self: center;
  }
}
</style>
