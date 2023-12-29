<script setup lang="ts">
import {ref} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import {useEventBus} from '@vueuse/core'
import IconMenu from '@/assets/img/app-icons/drag.svg?component'
import IconClose from '@/assets/img/app-icons/error.svg?component'
import IconChevronLeft from '@/assets/img/app-icons/chevron-left.svg?component'
import LogoPictos from '@/assets/img/app-icons/logo-pictos-color.svg?component'
import {useAppNavStore} from '@/stores/app-nav'

const router = useRouter()
const route = useRoute()
const appNav = useAppNavStore()
const busBack = useEventBus('back')
const busClose = useEventBus('close')

const shown_modal = ref<boolean>(false)
const closed_modal = ref<boolean>(false)

const openMenu = () => {
  shown_modal.value = true
  closed_modal.value = false
}

const closeMenu = () => {
  closed_modal.value = true
}

const toHome = () => {
  router.push('/inicio')
  closeMenu()
}

const toColaborateWithUs = () => {
  router.push('/colabora-con-nosotros')
  closeMenu()
}

const toAbout = () => {
  router.push('/acerca-de')
  closeMenu()
}

const tutorials = () => {
  appNav.redirectTo = route.fullPath
  appNav.cleanTutorials()
  router.push('/bienvenida')
  closeMenu()
}

const close = () => {
  busClose.emit()
}

const back = () => {
  busBack.emit()
}
</script>

<template>
  <div id="nav" class="app-nav" :class="`app-nav__${appNav.theme}`">
    <button v-if="route.meta.navbar?.back" class="app-nav__toggle-back" @click="back">
      <IconChevronLeft class="app-nav__toggle-icon" /> Volver
    </button>
    <router-link v-if="route.meta.navbar?.logo" to="/inicio" class="app-nav__logo-wrapper">
      <logo-pictos class="app-nav__logo" />
    </router-link>
    <button v-if="route.meta.navbar?.menu" class="app-nav__toggle" @click="openMenu">
      Menú <icon-menu class="app-nav__toggle-icon" />
    </button>
    <button v-if="route.meta.navbar?.close" class="app-nav__toggle" @click="close">Cerrar</button>
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
                  <a href="javascript:void(0)" @click="toHome">Inicio</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="toAbout">Acerca de</a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="toColaborateWithUs">Colabora con nosotros</a>
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
  padding: var(--spacer--400) var(--spacer--400);
  background: transparent;
  z-index: var(--z-index-navbar);
  align-items: center;
  @media screen and (min-width: 640px) {
    padding: var(--spacer--500) var(--spacer--500);
  }
}
.app-nav__presential {
  background: var(--color--skyblue);
}
.app-nav__online {
  background: var(--color--yellow-light);
}
.app-nav > .router-link-active:not(:first-child) {
  text-align: left;
}
.app-nav__toggle {
  @include rfs($font-size-16);
  cursor: pointer;
  font-weight: 600;
  background: none;
  border: 0;
  margin-left: auto;
}
.app-nav__toggle-back {
  @include rfs($font-size-16);
  cursor: pointer;
  font-weight: 600;
  background: none;
  border: 0;
  margin-right: auto;
  svg {
    margin-left: 0;
    height: 10px;
    width: 6px;
  }
}
.app-nav__logo-wrapper {
  width: 75px;
  height: 15px;
  width: 86px;
  margin: 0;
}
.app-nav__logo {
  width: 75px;
  height: 15px;
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
