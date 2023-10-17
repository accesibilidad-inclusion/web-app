<!-- eslint-disable max-len -->
<template>
  <form class="main-search" @submit.prevent="doSearch">
    <div class="your-location">
      <div class="your-location__content">
        <icon-location-pin />
        <span v-if="$store.state.location.name">{{ $store.state.location.name }}</span>
        <span v-else>Tu ubicación actual</span>
      </div>
      <a @click="changeLocation()" class="btn your-location__change">Cambiar</a>
    </div>
    <label class="main-search__label" for="s">
      <span>¿Qué necesitas hacer?</span>
      <text-to-speech :text-audio="'¿Qué necesitas hacer?'" />
    </label>
    <div class="main-search__group">
      <input
        class="main-search__input"
        type="search"
        v-model="query"
        id="s"
        placeholder="Ejemplo: Viajar en metro"
      />
      <button type="submit" class="main-search__button">
        <icon-search />
      </button>
    </div>
  </form>
</template>

<script lang="js">
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconSearch from '../../public/img/app-icons/search.svg?inline';
import IconLocationPin from '../../public/img/app-icons/location-pin.svg?inline';

export default {
  components: {
    TextToSpeech,
    IconSearch,
    IconLocationPin,
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
    changeLocation() {
      this.$store.dispatch('setRedirectTo', '/home').then(() => {
        this.$router.push('/tu-ubicacion');
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/rfs.scss";
.main-search {
  position: relative;
  margin-left: calc(var(--spacer) * -1);
  margin-right: calc(var(--spacer) * -1);
  margin-bottom: var(--spacer-lg);
  padding: calc(var(--spacer) / 2) var(--spacer) var(--spacer-xl);
  background: var(--color-brand-lighter);
  @media screen and (min-width: 640px) {
    margin-left: calc(var(--spacer-lg) * -1);
    margin-right: calc(var(--spacer-lg) * -1);
    padding: calc(var(--spacer-lg) / 2) var(--spacer-lg) var(--spacer-xl);
  }
  @media screen and (min-width: 1280px) {
    margin-left: calc(var(--spacer-xl) * -1);
    margin-right: calc(var(--spacer-xl) * -1);
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
  &::before,
  &::after {
    content: "";
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
    left: calc(var(--spacer) * -1);
    right: calc(var(--spacer) * -1);
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
  padding: var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) calc(var(--spacer-lg) / 3);
  border: none;
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
  top: 55%;
  right: calc(var(--spacer-lg) / 3);
  margin-top: -0.625rem;
  background: none;
  border: none;
  z-index: 10;
  width: 1rem;
  height: 1rem;
  svg {
    width: 1rem;
    height: 1rem;
    path {
      fill: var(--color-brand);
      opacity: 0.7;
    }
  }
}
.main-search__label {
  @include rfs($font-size-18);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: var(--spacer);
  margin-bottom: var(--spacer);
  line-height: calc(25 / 18);
  font-weight: bold;
}
.your-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc(var(--spacer-lg) / 3);
  border-radius: 5px;
  background-color: var(--color-illustration-bg);
  margin-bottom: var(--spacer);
  color: #1a4571;
  .your-location__change {
    @include rfs($font-size-14);
    font-weight: 700;
    color: var(--color-brand-dark);
    padding: calc(var(--spacer-lg) / 3);
  }
  .your-location__content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--spacer-sm);
    padding-right: var(--spacer-sm);
    border-right: 1px solid var(--color-brand-lighter);
    span {
      @include rfs($font-size-14);
    }
    svg {
      width: 11px;
      height: 15px;
      @media screen and (min-width: 640px) {
        width: var(--spacer);
        height: var(--spacer);
      }
      path {
        fill: var(--color-brand-dark);
      }
    }
  }
}
</style>
