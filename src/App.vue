<template>
  <div id="app">
    <app-nav v-on:comeback="backEvaluation"></app-nav>
    <transition name="slide">
      <router-view ref="view"/>
    </transition>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue';

export default {
  name: 'App',
  components: {
    AppNav,
  },
  beforeCreate() {
    this.$store.commit('initializeStore');
    // const speech = new SpeechSynthesisUtterance('');
    // speech.pitch = 0;
    // speech.rate = 100;
    // speech.lang = 'es-005';
    // window.speechSynthesis.speak(speech);
  },
  methods: {
    backEvaluation() {
      this.$refs.view.comeback();
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
</style>
