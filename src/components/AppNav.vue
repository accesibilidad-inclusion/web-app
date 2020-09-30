<!-- eslint-disable max-len -->
<template>
  <div class="app-nav" v-bind:class="{ 'app-nav--dark': state.dark }" id="nav">
    <back-button v-if="$route.name !== 'home'" v-on:comeback="$emit('comeback')"></back-button>
    <router-link to="/home" class="app-nav__logo-wrapper">
      <logo-pictos class="app-nav__logo" />
    </router-link>
    <button class="app-nav__toggle" @click="openMenu">
      Menú <icon-menu class="app-nav__toggle-icon" />
    </button>
    <div v-bind:class="'modal' + ( state.shown_modal ? ' modal--fade' : '' ) + ( state.closed_modal ? ' modal--fade-out' : '' )">
      <div class="modal__backdrop">
        <div class="app-menu">
          <div class="app-menu__wrapper">
            <header class="app-menu__header">
              <h3 class="app-menu__title">Menú</h3>
              <button class="app-menu__toggle" @click="closeMenu">
                <icon-close class="app-menu__toggle-icon"></icon-close>
              </button>
            </header>
            <nav class="app-menu__body">
              <ul class="app-menu__items">
                <li>
                  <router-link to="/" @click.native="closeMenu">Inicio</router-link>
                </li>
                <li>
                  <router-link to="/acerca-de" @click.native="closeMenu">Acerca de</router-link>
                </li>
                <!--<li>
                  <router-link to="/" @click.native="closeMenu">Opciones de Accesibilidad</router-link>
                </li>-->
                <li>
                  <router-link to="/colabora-con-nosotros" @click.native="closeMenu">Colabora con nosotros</router-link>
                </li>
                <li>
                  <router-link to="/onboarding" @click.native="closeMenu">Reactivar tutoriales</router-link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import LogoPictos from '../../public/img/app-icons/logo-pictos.svg?inline';
import IconMenu from '../../public/img/app-icons/drag.svg?inline';
import IconClose from '../../public/img/app-icons/error.svg?inline';

export default {
  name: 'navigation',
  components: {
    LogoPictos,
    IconMenu,
    IconClose,
    BackButton,
  },
  data() {
    return {
      state: {
        dark: false,
        shown_modal: false,
        closed_modal: null,
      },
    };
  },
  methods: {
    openMenu() {
      this.$data.state.shown_modal = true;
      this.$data.state.closed_modal = false;
    },
    closeMenu() {
      this.$data.state.closed_modal = true;
    },
    isDark() {
      this.$data.state.dark = this.$route.path.indexOf('nuevo-apoyo') !== -1
        || this.$route.path.indexOf('lugares') !== -1
        || this.$route.path.indexOf('evaluacion-lugar') !== -1;
    },
  },
  watch: {
    $route() {
      this.isDark();
    },
  },
  mounted() {
    this.isDark();
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.app-nav {
  position: sticky;
  display: flex;
  justify-content: space-between;
  top: 0;
  padding: var(--spacer-sm) var(--spacer);
  background: var(--color-brand-lighter);
  z-index: var(--z-index-navbar);
  align-items: center;
  @media screen and ( min-width: 640px ) {
    padding-top: var(--spacer);
    padding-bottom: var(--spacer);
  }
  &.app-nav--dark {
    transition: var(--transition-nav-dark);
    color: var(--color-background);
    background-color: var(--color-brand-darkest);
  }
}
.app-nav__toggle {
  @include rfs($font-size-16);
  cursor: pointer;
  font-weight: 600;
  background: none;
  border: 0;
  margin-left: auto;
  .app-nav--dark & {
    transition: var(--transition-nav-dark);
    color: var(--color-background);
  }
}
.app-nav--dark .btn-prev {
  transition: var(--transition-nav-dark);
  color: var(--color-background);
  svg path {
    transition: var(--transition-nav-dark);
    fill: var(--color-background);
  }
}
.app-nav__logo-wrapper {
  position: absolute;
  right: 0;
  left: 0;
  text-align: center;
  width: 86px;
  margin: 0 auto;
}
.app-nav__logo {
  width: 55px;
  height: 11px;
  .app-nav--dark & path {
    transition: var(--transition-nav-dark);
    fill: var(--color-background);
  }
  @media screen and ( min-width: 640px ) {
    width: 86px;
    height: 17px;
  }
}
.app-nav__toggle-icon {
  width: 17px;
  height: 12px;
  margin-left: .2rem;
  @media screen and ( min-width: 640px ) {
    width: 24px;
    height: 17px;
  }
  .app-nav--dark & path {
    transition: fill .3s ease .2s;
    fill: var(--color-background);
  }
}
.app-menu {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media screen and ( min-width: 640px ) {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and ( min-width: 1288px ) {
    max-width: 750px;
  }
}
.app-menu__wrapper {
  position: relative;
  width: calc(100% - 10vw);
  height: 100vh;
  margin-left: 10vw;
  padding-left: var(--spacer);
  padding-right: var(--spacer);
  transition: var(--transition-base);
  transform: translateX(100%);
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  .modal--fade & {
    transform: translateX(0);
  }
  .modal--fade-out & {
    transform: translateX(100%);
  }
}
.app-menu__header {
  display: flex;
  margin-bottom: var(--spacer-lg);
  padding-top: var(--spacer-sm);
  padding-left: var(--spacer-sm);
  padding-bottom: var(--spacer-sm);
  border-bottom: 1px solid var(--color-brand-lighter);
  @media screen and ( min-width: 640px ) {
    padding-top: var(--spacer);
    padding-bottom: var(--spacer);
  }
}
.app-menu__title {
  @include rfs($font-size-16);
  font-weight: 600;
  color: var(--color-text);
}
.app-menu__items {
  padding-left: var(--spacer-sm);
  padding-right: var(--spacer-sm);
  list-style: none;
  li {
    margin-top: var(--spacer-sm);
    margin-bottom: var(--spacer-sm);
  }
  a {
    display: block;
    padding-top: var(--spacer-sm);
    padding-bottom: var(--spacer-sm);
    text-decoration: none;
    color: var(--color-text);
    &:hover {
      color: var(--color-brand);
      text-decoration: underline;
    }
    &.router-link-exact-active {
      font-weight: 700;
      color: var(--color-brand);
    }
  }
}
.app-menu__toggle {
  cursor: pointer;
  position: relative;
  justify-self: flex-end;
  margin-left: auto;
  top: .1rem;
  background: none;
  border: 0;
}
.app-menu__toggle-icon {
  width: 15px;
  height: 15px;
  path {
    fill: var(--color-neutral);
  }
}
</style>
