<template>
  <div class="app-nav" id="nav">
    <router-link to="/home">
      <logo-pictos class="app-nav__logo" />
    </router-link>
    <button class="app-nav__toggle">
      Menú <icon-menu class="app-nav__toggle-icon" />
    </button>
  </div>
</template>

<script lang="ts">
import LogoPictos from '../../public/img/app-icons/logo-pictos.svg?inline';
import IconMenu from '../../public/img/app-icons/drag.svg?inline';

export default {
  name: 'navigation',
  components: {
    LogoPictos,
    IconMenu,
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  .app-nav {
    position: sticky;
    display: grid;
    grid-template-columns: auto 1fr auto;
    top: 0;
    padding: var(--spacer-sm) var(--spacer);
    background: var(--color-brand-lighter);
    z-index: var(--z-index-navbar);
  }
  .app-nav__toggle {
    @include rfs($font-size-14);
    grid-column: 3/4;
    background: none;
    border: 0;
  }
  .app-nav__logo {
    width: 55px;
    height: 11px;
  }
  .app-nav__toggle-icon {
    width: 17px;
    height: 13px;
  }
</style>
