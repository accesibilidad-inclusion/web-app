<script setup lang="ts">
import {ref} from 'vue'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import {useEventBus} from '@vueuse/core'
import IconMenu from '@/assets/img/app-icons/support/menu.svg?component'
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
  appNav.redirectTo = route.fullPath
  router.push('/colabora-con-nosotros')
  closeMenu()
}

const toAbout = () => {
  appNav.redirectTo = route.fullPath
  router.push('/acerca-de')
  closeMenu()
}

const tutorials = () => {
  appNav.redirectTo = route.fullPath
  appNav.cleanTutorials()
  router.push('/bienvenida')
  closeMenu()
}

const install = () => {
  appNav.redirectTo = route.fullPath
  router.push('/instala-pictos')
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
                <li>
                  <a href="javascript:void(0)" @click="install">Instala PICTOS en tu dispositivo</a>
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
  display: flex;
  justify-content: space-between;
  top: 0;
  padding: var(--spacer--400) var(--spacer--400);
  background: transparent;
  z-index: var(--z-index-navbar);
  align-items: center;
  @media screen and (min-width: 640px) {
    padding: var(--spacer--500) var(--spacer--400);
  }
}
.app-nav__presential {
  // background: var(--color--skyblue);
}
.app-nav__online {
  // background: var(--color--yellow-light);
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
  display: flex;
  align-items: center;
  gap: var(--spacer--300);
}
.app-nav__toggle-back {
  @include rfs($font-size-16);
  cursor: pointer;
  font-weight: 600;
  background: none;
  border: 0;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: var(--spacer--200);
  svg {
    margin-left: 0;
    height: 12px;
    width: auto;
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
  height: auto;
  @media screen and (min-width: 640px) {
    width: 22px;
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
  margin-bottom: var(--spacer--600);
  padding-top: var(--spacer--500);
  padding-bottom: var(--spacer--500);
  padding-left: var(--spacer--300);
  border-bottom: 1px solid var(--color--skyblue-light);
  @media screen and (min-width: 640px) {
    padding-top: var(--spacer--500);
    padding-bottom: var(--spacer--500);
  }
}
.app-menu__title {
  @include rfs($font-size-16);
  font-weight: 800;
  color: var(--color--blue-dark);
}
.app-menu__items {
  padding-left: var(--spacer--300);
  padding-right: var(--spacer--300);
  list-style: none;
  li {
    margin-top: var(--spacer--300);
    margin-bottom: var(--spacer--300);
  }
  a {
    @include rfs($font-size-16);
    display: block;
    padding-top: var(--spacer--400);
    padding-bottom: var(--spacer--400);
    text-decoration: none;
    color: var(--color--blue-dark);
    font-weight: 600;
    &:hover {
      color: var(--color--blue);
      text-decoration: underline;
    }
    &.router-link-exact-active {
      font-weight: 700;
      color: var(--color--blue);
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
  width: 17px;
  height: 17px;
  &:deep(path) {
    fill: var(--color--blue-gray);
  }
}
</style>
