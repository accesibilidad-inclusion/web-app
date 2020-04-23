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
        <router-link to="categoria/tramites" tag="li" class="is-clickable">
          <IconFormalities />
          Trámites
        </router-link>
        <router-link to="categoria/salud" tag="li" class="is-clickable">
          <IconHealth />
          Salud
        </router-link>
        <router-link to="categoria/transporte" tag="li" class="is-clickable">
          <IconTransport />
          Transporte
        </router-link>
        <router-link to="categoria/ocio" tag="li" class="is-clickable">
          <IconLeisure />
          Ocio
        </router-link>
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
    padding-left: var( --spacer );
    padding-right: var( --spacer );
  }
  .main-categories__title {
    @include rfs( 18px );
    line-height: calc( 25 / 18 );
    margin-bottom: calc( var( --spacer ) * .25 );
  }
  .main-categories__list {
    display: grid;
    gap: var( --spacer );
    grid-template-columns: 1fr 1fr;
    margin-top: var( --spacer );
    > li {
      background: var( --color-brand );
      color: var( --color-background );
      text-align: center;
      list-style: none;
      font-weight: bold;
      border-radius: 5px;
      padding: 15px;
      svg {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: .5rem;
      }
      svg path {
        fill: #fff;
      }
    }
  }
</style>
