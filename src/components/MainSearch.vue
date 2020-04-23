<template>
  <form class="main-search" @submit.prevent="doSearch">
    <label class="main-search__label" for="s">
      ¿Qué necesitas hacer?
      <text-to-speech :textAudio="'¿Qué necesitas hacer?'" />
    </label>
    <!-- eslint-disable-next-line max-len -->
    <input class="main-search__input" type="search" name="s" id="s" placeholder="Ejemplo: Viajar en metro">
  </form>
</template>

<script lang="js">
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  components: {
    TextToSpeech,
  },
  methods: {
    doSearch() {
      // redirigir a ruta de búsqueda con query
      this.$router.push({
        path: 'buscar',
        query: {
          s: 'lorem ipsum',
        },
      });
    },
  },
};
</script>

<style lang="scss">
  @import 'rfs/scss';
  .main-search {
    background: var(--color-brand-lighter);
    margin-left: calc( var(--spacer) * -1 );
    margin-right: calc( var(--spacer) * -1 );
    margin-bottom: var(--spacer-lg);
    padding: var(--spacer) var(--spacer) var(--spacer-xl);
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 30px;
    }
    &::before {
      width: 100%;
      left: 0;
      background: #fff;
      z-index: 1;
    }
    &::after {
      left: calc( var(--spacer) * -1 );
      right: calc( var(--spacer) * -1 );
      background: var(--color-brand-lighter);
      border-radius: 50% 50% 50% 50% / 0% 0% 100% 100%;
      z-index: 10;
    }
  }
  .main-search__input {
    @include rfs( 14px );
    width: 100%;
    border: 2px solid var(--color-background);
    border-radius: var(--border-radius);
    padding: var(--spacer-sm);
    margin-top: var(--spacer);
  }
  .main-search__input::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var(--font-family);
  }
  .main-search__label {
    @include rfs( 18px );
    line-height: calc( 25 / 18 );
    font-weight: bold;
    margin-bottom: var(--spacer);
  }
</style>
