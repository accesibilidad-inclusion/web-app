<template>
  <div id="app">
    <app-nav></app-nav>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
import AppNav from '@/components/AppNav.vue';

export default {
  name: 'app',
  components: {
    AppNav,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';
@import '@/assets/scss/custom-control.scss';

:root {
  --font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  // Spacers
  --spacer-xl: 3.75rem;
  --spacer-lg: 2.5rem;
  --spacer: 1.25rem;
  --spacer-sm: .51rem;
  --spacer-xs: .25rem;

  // Border radius
  --border-radius: 5px;

  // Colors
  --color-text: #1d1d1b;
  --color-background: #fff;
  --color-neutral: #727272;
  --color-neutral-light: #b7b7b7;
  --color-neutral-lighter: #d0d0d0;
  --color-neutral-lightest: #eee;
  --color-brand-darkest: #041c42;
  --color-brand-darker: #1d3355;
  --color-brand-dark: #004079;
  --color-brand: #5b7fa1;
  --color-brand-light: #a1c9ff;
  --color-brand-lighter: #cae0ff;
  --color-brand-lightest: #f1f7ff;
  --color-highlight: #f6c254;
  --color-score-bg: #ff8684;
  --color-score-text: #2a8600;
  --color-score-bg: #aaf886;
  --color-grade-1: #ff8684;
  --color-grade-2: #ff9b59;
  --color-grade-3: #ffe723;
  --color-grade-4: #e3e85c;
  --color-grade-5: #aaf886;
  --cyan-blue-lighter: #d8e8ff;
  --cyan-blue-lightest: #ecf4ff;
  --blue-medium-light: #8dAdf1;

  // Font sizes and Line height
  --subtitle-font-size: 18px;
  --subtitle-line-height: calc(25/18);

  // Transitions
  --transition-base: all .3s ease-out;

  // z-index
  --z-index-navbar: 1010;
  --z-index-modal: 1020;

  // Modal
  --modal-backdrop-bg: rgb(4, 28, 66);
}
// no es el reset más elegante, pero en este caso sirve perfecto
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: #{$rfs-rem-value}px;
  line-height: 1.357;
  overflow-x: hidden;
  box-sizing: border-box;
  // @media screen and ( max-width: 768px ) {
  //   font-size: 15px;
  // }
}
*, *:before, *:after {
  box-sizing: inherit;
}
button, label, input, select, progress, meter {
  font-family: inherit;
}
input, button {
  -webkit-appearance: none;
}
body {
  min-height: 100vh;
  font-family: var(--font-family);
  background-color: var(--color-brand-lightest);
  color: var(--color-text);
  overflow-x: hidden;
}
a {
  color: var( --color-brand );
}
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
// Buttons
.btn {
  @include rfs($font-size-12);
  display: inline-block;
  padding: .9rem var(--spacer);
  font-family: var(--font-family);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: var(--transition-base);
  border-radius: var(--border-radius);
  border: none;
  .v-spinner {
    margin-left: var(--spacer);
  }
  &:hover {
    cursor: pointer;
  }
}
.btn--large {
  @include rfs($font-size-14);
  padding-left: var(--spacer);
  padding-right: var(--spacer);
}
.btn--primary {
  background: var(--color-brand-darkest);
  color: var(--color-background);
  &:hover {
    background: var(--color-brand-darker);
  }
}
.btn--light {
  background-color: var(--color-brand-light);
  &:hover {
    background-color: var(--color-brand-lighter);
  }
}
.btn--ghost {
  background: transparent;
  border: 1px solid var(--color-background);
  color: var(--color-background);
}
.btn--block {
  display: block;
  width: 100%;
  // margin: calc( var(--spacer-sm) ) auto;
}
.btn--hidden {
  opacity: 0;
  visibility: hidden;
}
.btn--loading {
  text-indent: -1rem;
  .v-spinner {
    position: absolute;
    display: inline-block !important;
    margin-top: .15rem;
    animation: buttonSpinnerShow .35s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
  }
}
.btn--as-link {
  @include rfs($font-size-14);
  text-decoration: underline;
  background: transparent;
  border: none;
}
// Modal
.modal {
  position: fixed;
  display: table;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  overflow: hidden;
  outline: 0;
  z-index: var(--z-index-modal);
  &.modal--fade {
    transform: scale(1);
    .modal__backdrop {
      background-color: rgba( 4, 28, 66, 0);
      animation: modalFadeIn .35s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
    }
    &.modal--fade-out {
      animation: quickScaleDown 0s .5s linear forwards;
      .modal__backdrop {
        animation: modalFadeOut .35s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      }
    }
  }
}
.modal__backdrop {
  display: table-cell;
  background-color: rgba( 4, 28, 66, .75);
  @media screen and ( min-width: 640px ) {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and ( min-width: 1280px ) {
    max-width: 750px;
  }
}

// Animations
@keyframes modalFadeIn {
  0% {
    background: rgba( 4, 28, 66, 0);
  }
  100% {
    background: rgba( 4, 28, 66, .75);
  }
}
@keyframes modalFadeOut {
  0% {
    background: rgba( 4, 28, 66, .75);
  }
  100% {
    background: rgba( 4, 28, 66, 0);
  }
}
@keyframes quickScaleDown {
  0% {
    transform: scale(1);
  }
  99.9% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes buttonSpinnerShow {
  0% {
    margin-left: -1rem;
  }
  100% {
    margin-left: 1.5rem;
  }
}

// Actions
.actions {
  padding: var(--spacer);
  @media screen and ( min-width: 640px ) {
    padding: var(--spacer-lg);
  }
  @media screen and ( min-width: 1280px ) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.actions__title {
  @include rfs($font-size-14);
  margin-bottom: calc( var(--spacer) * .75 );
  font-weight: bold;
  line-height: 1.35714;
  @media screen and ( min-width: 640px ) {
    margin-bottom: var(--spacer);
  }
}
.actions__description {
  @include rfs($font-size-14);
  margin-bottom: calc( var(--spacer) * .75 );
  @media screen and ( min-width: 640px ) {
    margin-bottom: var(--spacer);
  }
}
.text-center {
  text-align: center;
}
// Backgrounds
.bg-white {
  background-color: #fff;
}
.bg-light {
  background-color: var(--color-brand-light);
}
.bg-lighter {
  background-color: var(--color-brand-lighter);
}
.bg-lightest {
  background-color: var(--color-brand-lightest);
}
.bg-darkest {
  background-color: var(--color-brand-darkest);
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
// Margins
.mb-1 {
  margin-bottom: var(--spacer-xs);
}
.mb-2 {
  margin-bottom: var(--spacer-sm);
}
.mb-3 {
  margin-bottom: var(--spacer);
}
.mb-4 {
  margin-bottom: var(--spacer-lg);
}
.mb-5 {
  margin-bottom: var(--spacer-xl);
}
// Screen readers
.sr-only {
  display: none;
}
</style>
