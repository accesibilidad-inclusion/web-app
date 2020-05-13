<!-- eslint-disable max-len -->
<template>
  <div class="home">
    <MainSearch />
    <section class="main-categories container">
      <div class="tts-target">
        <h2 class="main-categories__title">¿Buscas un lugar específico?</h2>
        <p class="main-categories__description">
          Selecciona un tipo de lugar
          <text-to-speech :text-audio="'¿Buscas un lugar específico?\n\nSelecciona un tipo de lugar'" />
        </p>
      </div>
      <ul class="main-categories__list">
        <li>
          <router-link to="categoria/tramites">
            <icon-formalities />
            Trámites
          </router-link>
        </li>
        <li>
          <router-link to="categoria/salud">
            <icon-health />
            Salud
          </router-link>
        </li>
        <li>
          <router-link to="categoria/transporte">
            <icon-transport />
            Transporte
          </router-link>
        </li>
        <li>
          <router-link to="categoria/ocio">
            <icon-leisure />
            Ocio
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import MainSearch from '@/components/MainSearch.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconFormalities from '../../public/img/app-icons/formalities.svg?inline';
import IconHealth from '../../public/img/app-icons/health.svg?inline';
import IconTransport from '../../public/img/app-icons/transport.svg?inline';
import IconLeisure from '../../public/img/app-icons/leisure.svg?inline';

export default {
  name: 'home',
  components: {
    MainSearch,
    TextToSpeech,
    IconFormalities,
    IconHealth,
    IconTransport,
    IconLeisure,
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  .home {
    padding-left: var(--spacer);
    padding-right: var(--spacer);
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .main-categories__title {
    @include rfs($font-size-18);
    line-height: var(--subtitle-line-height);
    margin-bottom: var(--spacer-xs);
  }
  .main-categories__description {
    @include rfs($font-size-14);
  }
  .tts path {
    fill: var(--color-brand-darkest);
  }
  .main-categories__list {
    display: grid;
    gap: var(--spacer);
    grid-template-columns: 1fr 1fr;
    margin-top: var(--spacer);
    margin-bottom: var(--spacer-lg);
    > li {
      list-style: none;
      > a {
        @include rfs($font-size-14);
        display: block;
        padding: var(--spacer);
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        background-color: var(--color-brand-darkest);
        color: var(--color-background);
        border-radius: var(--border-radius);
      }
      svg {
        display: block;
        width: 1.75rem;
        height: 1.75rem;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: var(--spacer-sm);
      }
      svg path {
        fill: #fff;
      }
    }
  }
</style>
