<!-- eslint-disable max-len -->
<template>
  <form class="main-search" @submit.prevent="doSearch">
    <label class="main-search__label" for="s">
      <span>¿Qué necesitas hacer?</span>
      <text-to-speech :text-audio="'¿Qué necesitas hacer?'" />
    </label>
    <div class="main-search__group">
      <input class="main-search__input" type="search" v-model="query" id="s" placeholder="Ejemplo: Viajar en metro">
      <button type="submit" class="main-search__button">
        <icon-search />
      </button>
    </div>
  </form>
</template>

<script lang="js">
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconSearch from '../../public/img/app-icons/search.svg?inline';

export default {
  components: {
    TextToSpeech,
    IconSearch,
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    doSearch() {
      if (this.query === '') {
        return;
      }
      this.$router.push({
        path: 'buscar',
        query: {
          s: this.query,
        },
      });
    },
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  .main-search {
    position: relative;
    margin-left: calc( var(--spacer) * -1 );
    margin-right: calc( var(--spacer) * -1 );
    margin-bottom: var(--spacer-lg);
    padding: var(--spacer) var(--spacer) var(--spacer-xl);
    background: var(--color-brand-lighter);
    @media screen and ( min-width: 640px ) {
      margin-left: calc( var(--spacer-lg) * -1);
      margin-right: calc( var(--spacer-lg) * -1);
      padding: var(--spacer-lg) var(--spacer-lg) var(--spacer-xl);
    }
    @media screen and ( min-width: 1280px ) {
      margin-left: calc( var(--spacer-xl) * -1);
      margin-right: calc( var(--spacer-xl) * -1);
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
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
  .main-search__group {
    position: relative;
  }
  .main-search__input {
    @include rfs($font-size-14);
    width: 100%;
    padding: var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) var(--spacer-sm);
    border: 2px solid var(--color-background);
    border-radius: var(--border-radius);
    &::placeholder {
      color: #848484;
      opacity: 1;
      font-style: italic;
      font-family: var(--font-family);
    }
  }
  .main-search__button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: var(--spacer-sm);
    margin-top: -.625rem;
    background: none;
    border: none;
    z-index: 10;
    svg {
      width: 1.25rem;
      height: 1.25rem;
      path {
        fill: var(--color-brand);
      }
    }
  }
  .main-search__label {
    @include rfs($font-size-18);
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--spacer);
    margin-bottom: var(--spacer);
    line-height: calc( 25 / 18 );
    font-weight: bold;
  }
</style>
