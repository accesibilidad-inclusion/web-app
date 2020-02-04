<template>
  <form class="main-search" @submit.prevent="doSearch">
    <label class="main-search__label" for="s">¿Qué necesitas hacer? <text-to-speech /></label>
    <input class="main-search__input" type="search" name="s" id="s"
      placeholder="Ejemplo: Viajar en metro">
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
    background: var( --color-brand-lighter );
    margin-left: calc( var( --spacer ) * -1 );
    margin-right: calc( var( --spacer ) * -1 );
    margin-bottom: calc( var( --spacer ) * 1.5 );
    padding: var( --spacer ) var( --spacer ) calc( var( --spacer ) * 3 );
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
    }
    &::before {
      z-index: 1;
      background: #fff;
      height: var( --spacer );
    }
    &::after {
      z-index: 10;
      background: var( --color-brand-lighter );
      border-radius: 50%;
      height: calc( var( --spacer ) * 2 );
    }
  }
  .main-search__input {
    width: 100%;
    border: 2px solid var( --color-background );
    border-radius: var( --border-radius );
    padding: calc( var( --spacer ) / 2 );
    margin-top: var( --spacer );
  }
  .main-search__input::placeholder {
    color: #848484;
    opacity: 1;
    font-style: italic;
    font-family: var( --font-family );
  }
  .main-search__label {
    @include rfs( 18px );
    line-height: calc( 25 / 18 );
    font-weight: bold;
    margin-bottom: var( --spacer );
  }
</style>
