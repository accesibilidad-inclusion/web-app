<script setup lang="ts">
import {useAppNavStore} from '@/stores/app-nav'
import {ref} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import IconMenu from '@/assets/img/app-icons/drag.svg?component'
import IconClose from '@/assets/img/app-icons/error.svg?component'
import LogoPictos from '@/assets/img/app-icons/logo-pictos-color.svg?component'

const router = useRouter()
const route = useRoute()
const appNav = useAppNavStore()

const dark = ref<boolean>(false)
const shown_modal = ref<boolean>(false)
const closed_modal = ref<boolean>(false)

const openMenu = () => {
  shown_modal.value = true
  closed_modal.value = false
}

const closeMenu = () => {
  closed_modal.value = true
}

const tutorials = () => {
  appNav.redirectTo = route.fullPath
  appNav.cleanTutorials()
  router.push('/bienvenida')
  closeMenu()
}
</script>

<template>
  <div id="nav" class="app-nav" :class="{'app-nav--dark': dark}">
    <back-button v-if="$route.name !== 'home'" @comeback="$emit('comeback')"></back-button>
    <router-link to="/inicio" class="app-nav__logo-wrapper">
      <logo-pictos class="app-nav__logo" />
    </router-link>
    <button class="app-nav__toggle" @click="openMenu">
      Menú <icon-menu class="app-nav__toggle-icon" />
    </button>
    <div
      :class="
        'modal' + (shown_modal ? ' modal--fade' : '') + (closed_modal ? ' modal--fade-out' : '')
      ">
      <div class="modal__backdrop">
        <div class="app-menu">
          <div class="app-menu__wrapper">
            <header class="app-menu__header">
              <h3 class="app-menu__title">Menú</h3>
              <button class="app-menu__toggle" aria-label="Menu" @click="closeMenu">
                <icon-close class="app-menu__toggle-icon"></icon-close>
              </button>
            </header>
            <nav class="app-menu__body">
              <ul class="app-menu__items">
                <li>
                  <a href="javascript:void(0)" @click="closeMenu">Inicio</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="closeMenu">Acerca de</a>
                </li>
                <!--<li>
                  <router-link to="/" @click.native="closeMenu">Opciones de Accesibilidad</router-link>
                </li>-->
                <li>
                  <a href="javascript:void(0)" @click="closeMenu">Colabora con nosotros</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="tutorials">Reactivar tutoriales</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';
.app-nav {
  position: sticky;
  display: flex;
  justify-content: space-between;
  top: 0;
  padding: var(--spacer-sm) var(--spacer);
  background: transparent;
  z-index: var(--z-index-navbar);
  align-items: center;
  @media screen and (min-width: 640px) {
    padding-top: var(--spacer);
    padding-bottom: var(--spacer);
    padding-right: var(--spacer-lg);
    padding-left: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    padding-right: var(--spacer-xl);
    padding-left: var(--spacer-xl);
  }
  &.app-nav--dark {
    transition: var(--transition-nav-dark);
    color: var(--color-background);
    background-color: var(--color-brand-darkest);
  }
}
.app-nav > .router-link-active:not(:first-child) {
  margin-left: var(--spacer);
  text-align: left;
  @media screen and (min-width: 640px) {
    margin-left: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
    margin-left: var(--spacer-xl);
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
  // position: absolute;
  // right: 0;
  // text-align: center;
  width: 86px;
  margin: 0;
}
.app-nav__logo {
  width: 75px;
  height: 15px;
  .app-nav--dark & path {
    transition: var(--transition-nav-dark);
    fill: var(--color-background);
  }
  @media screen and (min-width: 640px) {
    width: 86px;
    height: 17px;
  }
}
.app-nav__toggle-icon {
  width: 17px;
  height: 12px;
  margin-left: 0.2rem;
  @media screen and (min-width: 640px) {
    width: 24px;
    height: 17px;
  }
  .app-nav--dark & path {
    transition: fill 0.3s ease 0.2s;
    fill: var(--color-background);
  }
}
.app-menu {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media screen and (min-width: 640px) {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 1288px) {
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
  @media screen and (min-width: 640px) {
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
  top: 0.1rem;
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
