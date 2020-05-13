<template>
  <div id="app">
    <div class="app-nav" id="nav">
      <router-link to="/home"><svg width="55" height="19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.333 8.185c0 1.116-.33 1.98-.991 2.59-.656.607-1.59.91-2.803.91H3.78V15h-2.7V5.006h3.46c1.261 0 2.21.276 2.843.827.633.551.95 1.335.95 2.352zM3.78 9.483h.492c.406 0 .727-.114.964-.341.242-.228.363-.543.363-.944 0-.674-.374-1.011-1.121-1.011H3.78v2.296zM9.926 15V5.006h2.714V15H9.926zm9.33-7.923c-.642 0-1.143.264-1.503.793-.36.524-.54 1.249-.54 2.174 0 1.923.731 2.885 2.194 2.885.442 0 .87-.062 1.285-.185.415-.123.832-.271 1.251-.444v2.283c-.834.37-1.777.554-2.83.554-1.508 0-2.666-.438-3.472-1.313-.803-.875-1.204-2.14-1.204-3.794 0-1.034.194-1.943.582-2.727A4.187 4.187 0 0116.7 5.498c.734-.424 1.595-.636 2.584-.636 1.08 0 2.113.235 3.097.704l-.827 2.126a9.3 9.3 0 00-1.108-.437 3.87 3.87 0 00-1.19-.178zM28.309 15h-2.7V7.214h-2.441V5.006h7.574v2.208h-2.433V15zM53.615 11.965c0 .62-.157 1.171-.471 1.654-.315.479-.768.852-1.36 1.121-.593.265-1.288.397-2.086.397-.665 0-1.223-.046-1.675-.137a6.353 6.353 0 01-1.408-.492v-2.406c.515.264 1.05.471 1.607.622a6.07 6.07 0 001.53.218c.402 0 .696-.068.883-.205a.65.65 0 00.28-.54.564.564 0 00-.116-.355 1.22 1.22 0 00-.362-.315c-.164-.104-.607-.319-1.327-.642-.651-.296-1.141-.584-1.47-.862a2.697 2.697 0 01-.724-.957c-.155-.36-.232-.786-.232-1.278 0-.92.335-1.638 1.005-2.153.67-.515 1.59-.773 2.761-.773 1.035 0 2.09.24 3.165.718l-.827 2.085c-.934-.428-1.74-.643-2.42-.643-.35 0-.606.062-.766.185a.558.558 0 00-.239.458c0 .196.1.371.301.526.205.155.757.438 1.654.848.862.387 1.459.804 1.791 1.251.338.442.506 1 .506 1.675z" fill="#1D1D1B"/><path d="M38.548 15.767v-2.824h1.92c-.414 1.512-1.117 2.597-1.92 2.824zM35.85 7.436h2.073v2.128h-2.31c.017-.752.1-1.47.236-2.128zM40.855 9.564h-2.307V7.436h2.07c.136.658.218 1.376.236 2.128zM40.618 12.318h-2.07V10.19h2.306c-.018.752-.1 1.47-.236 2.128zM40.468 6.81h-1.92V3.987c.804.227 1.506 1.312 1.92 2.823zM35.204 12.318h-2.722A6.205 6.205 0 0132 10.19h2.986c.017.752.092 1.468.218 2.128zM37.923 3.987V6.81H36c.415-1.51 1.118-2.595 1.923-2.823zM41.48 10.19h2.986c-.038.751-.2 1.47-.482 2.128h-2.721c.126-.66.2-1.376.217-2.128zM37.007 16.001a6.266 6.266 0 01-4.211-3.058h2.547c.352 1.39.94 2.476 1.664 3.058zM41.125 12.943h2.546a6.263 6.263 0 01-4.207 3.058c.723-.583 1.309-1.669 1.66-3.058zM35.343 6.81h-2.548a6.266 6.266 0 014.213-3.059c-.724.582-1.312 1.668-1.665 3.059zM35.612 10.19h2.31v2.128H35.85a12.011 12.011 0 01-.237-2.128zM34.986 9.564H32c.037-.751.2-1.47.481-2.128h2.723c-.126.66-.2 1.376-.218 2.128zM37.923 12.943v2.823c-.805-.227-1.508-1.312-1.924-2.823h1.924zM43.339 9.535c.008.01.018.018.026.029H41.48a12.904 12.904 0 00-.217-2.128h.676c.547.91 1.115 1.71 1.4 2.1zM41.125 6.81c-.351-1.387-.936-2.472-1.657-3.055.378.075.746.187 1.102.33.027.74.47 1.754 1.008 2.725h-.453z" fill="#0099B4"/><path d="M44.097 9.294a.313.313 0 01-.253-.128c-.273-.373-2.653-3.663-2.653-5.152a2.908 2.908 0 012.906-2.907A2.908 2.908 0 0147 4.014c0 1.489-2.38 4.78-2.653 5.152a.311.311 0 01-.25.128zm1.343-5.28c0-.742-.603-1.344-1.344-1.344-.74 0-1.343.602-1.343 1.344a1.344 1.344 0 002.687 0z" fill="#1D1D1B"/></svg></router-link>
      <button class="app-nav__toggle">
        Menú <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" fill="none"><path fill="#000" paint-order="markers stroke fill" d="M0 0h17v2H0zM0 5.5h17v2H0zM0 11h17v2H0z"/></svg>
      </button>
    </div>
    <transition name="slide">
      <router-view/>
    </transition>
  </div>
</template>

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
.app-nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  padding: var(--spacer-sm) var(--spacer);
  background: var(--color-brand-lighter);
  position: sticky;
  top: 0;
  z-index: 99999;
}
.app-nav__toggle {
  background: none;
  grid-column: 3/4;
  border: 0;
  @include rfs(14px);
  svg {
    position: relative;
    top: 1px;
  }
}
.btn {
  @include rfs($font-size-12);
  display: inline-block;
  padding: .9rem var(--spacer);
  font-family: var(--font-family);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all .35s linear;
  border-radius: var(--border-radius);
  border: none;
  &:hover {
    cursor: pointer;
  }
}
.btn--large {
  @include rfs($font-size-14);
  padding-left: var(--spacer-lg);
  padding-right: var(--spacer-lg);
}
.btn--primary {
  background: var(--color-brand-darkest);
  color: var(--color-background);
  &:hover {
    background: var(--color-brand-darker);
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
  margin-bottom: var(--spacer-sm);
  font-weight: bold;
  line-height: 1.35714;
  @media screen and ( min-width: 640px ) {
    margin-bottom: var(--spacer);
  }
}
.actions__description {
  @include rfs($font-size-14);
  margin-bottom: var(--spacer-sm);
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
