<template>
  <div class="home">
    <MainSearch />
    <section class="main-categories">
      <div class="tts-target">
        <h2 class="main-categories__title">¿Buscas un lugar específico?</h2>
        <p class="main-categories__description">
          Selecciona un tipo de lugar
          <text-to-speech />
          </p>
      </div>
      <ul class="main-categories__list">
        <router-link to="categoria/tramites" tag="li" class="is-clickable">
          Trámites
        </router-link>
        <router-link to="categoria/salud" tag="li" class="is-clickable">
          Salud
        </router-link>
        <router-link to="categoria/transporte" tag="li" class="is-clickable">
          Transporte
        </router-link>
        <router-link to="categoria/ocio" tag="li" class="is-clickable">
          Ocio
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import MainSearch from '@/components/MainSearch.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'home',
  components: {
    MainSearch,
    TextToSpeech,
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
    }
  }
</style>
