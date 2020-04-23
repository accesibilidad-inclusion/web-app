<template>
  <div class="home">
    <MainSearch />
    <section class="main-categories">
      <div class="tts-target">
        <h2 class="main-categories__title">{{ title }}</h2>
        <p class="main-categories__description">
          {{ description }}
          <text-to-speech v-bind:textAudio="textAudio" />
        </p>
      </div>
      <ul class="main-categories__list">
        <li>
          <router-link to="categoria/tramites">
            <IconFormalities />
            Trámites
          </router-link>
        </li>
        <li>
          <router-link to="categoria/salud">
            <IconHealth />
            Salud
          </router-link>
        </li>
        <li>
          <router-link to="categoria/transporte">
            <IconTransport />
            Transporte
          </router-link>
        </li>
        <li>
          <router-link to="categoria/ocio">
            <IconLeisure />
            Ocio
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import MainSearch from '@/components/MainSearch.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconFormalities from '../../public/img/app-icons/formalities.svg';
import IconHealth from '../../public/img/app-icons/health.svg';
import IconTransport from '../../public/img/app-icons/transport.svg';
import IconLeisure from '../../public/img/app-icons/leisure.svg';

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
  data() {
    return {
      title: '¿Buscas un lugar específico?\n\n',
      description: 'Selecciona un tipo de lugar',
    };
  },
  computed: {
    textAudio() {
      return this.title + this.description;
    },
  },
};
</script>

<style lang="scss">
  @import 'rfs/scss';
  .home {
    padding-left: var(--spacer);
    padding-right: var(--spacer);
  }
  .main-categories__title {
    @include rfs( 18px );
    line-height: calc( 25 / 18 );
    margin-bottom: var(--spacer--xs);
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
