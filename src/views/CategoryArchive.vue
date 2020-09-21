<!-- eslint-disable max-len -->
<template>
  <div class="category entries-list">
    <header class="category__header entries-list__header">
      <icon-transport class="category__icon" v-if="category.slug == 'transporte'" />
      <icon-health class="category__icon" v-if="category.slug == 'salud'" />
      <icon-leisure class="category__icon" v-if="category.slug == 'ocio'" />
      <icon-formalities class="category__icon" v-if="category.slug == 'tramites'" />
      <h1 class="category__title entries-list__title">{{ category.name }}</h1>
      <p class="category__description entries-list__description">Revisa los servicios disponibles que están cerca de tí.</p>
      <text-to-speech :text-audio="'Transporte.\n\n Revisa los servicios disponibles que están cerca de tí'" />
    </header>
    <main class="category__items category__items--services">
      <template v-for="service in services" v-bind:service="service">
        <router-link class="category__item category__item--service service-block entry-block" tag="article" v-bind:key="service.id" v-bind:to="'/servicios/' + service.id">
          <span class="service-block__icon">
            <span class="sr-only">{{ $route.params.categorySlug }}</span>
            <icon-transport class="category__icon" v-if="category.slug == 'transporte'" />
            <icon-health class="category__icon" v-if="category.slug == 'salud'" />
            <icon-leisure class="category__icon" v-if="category.slug == 'ocio'" />
            <icon-formalities class="category__icon" v-if="category.slug == 'tramites'" />
          </span>
          <h2 class="service-block__name entry-block__name">{{ service.name }}</h2>
          <text-to-speech :text-audio="`${service.name}`" />
        </router-link>
      </template>
    </main>
    <!-- Visualmente es 'footer', pero semánticamente es 'aside' -->
    <aside class="actions actions--category">
      <p class="actions__title">
        ¿No encuentras el lugar que estás buscando?
        <text-to-speech :text-audio="'¿No encuentras el lugar que estás buscando? Agregar un lugar nuevo'" />
      </p>
      <router-link to="/nuevo-lugar/intro" class="btn btn--primary btn--large btn--block" tag="button">
        &plus; Agregar un lugar nuevo
      </router-link>
    </aside>
  </div>
</template>

<script>
import Category from '@/models/Category';
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconFormalities from '../../public/img/app-icons/formalities.svg?inline';
import IconHealth from '../../public/img/app-icons/health.svg?inline';
import IconTransport from '../../public/img/app-icons/transport.svg?inline';
import IconLeisure from '../../public/img/app-icons/leisure.svg?inline';

export default {
  name: 'categoryArchive',
  components: {
    TextToSpeech,
    IconTransport,
    IconHealth,
    IconFormalities,
    IconLeisure,
  },
  beforeMount() {
    this.$store.dispatch('setSelectedItem', {
      object: 'category',
      item: this.$store.state.data
        .find(d => d.slug === this.$route.params.categorySlug),
    }).then(() => {
      this.category.set(this.$store.state.selected.category);
      this.services = this.category.near_services;
    });
  },
  data() {
    return {
      category: new Category(),
      services: [],
    };
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .category {
    display: flex;
    flex-flow: column nowrap;
  }
  .category__icon {
    width: 2.1875rem;
    height: 2.1875rem;
  }
  .entries-list__header {
    position: relative;
    padding: var(--spacer);
    text-align: center;
    background-color: var(--color-brand-lighter);
    @media screen and ( min-width: 640px ) {
      padding: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .entries-list__title {
    @include rfs($font-size-18);
    margin-bottom: var(--spacer-sm);
    line-height: calc( 25/18 );
    color: var( --color-brand-darkest );
  }
  .entries-list__description {
    @media screen and ( max-width: 639px ) {
      text-align: left;
    }
  }
  .category__header .tts {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
  }
  .category__items {
    flex-grow: 1;
  }
  .entry-block {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-content: flex-start;
    gap: 0 var(--spacer-sm);
    padding: var(--spacer);
    color: var(--color-brand-darkest);
    border-bottom: 1px solid var(--color-brand-light);
    transition: all .15s linear;
    &:hover {
      cursor: pointer;
      background: var(--color-brand-lightest);
    }
    @media screen and( min-width: 640px ) {
      padding: 1.75rem var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .entry-block__name {
    @include rfs($font-size-16);
    line-height: 1.375;
  }
  .service-block__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    line-height: 1;
    text-align: center;
    border-radius: 50%;
    background: var(--color-brand-darkest);
    svg {
      width: .7rem;
      height: .7rem;
      path {
        fill: #fff;
      }
    }
  }
  .actions--category .actions__title {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--spacer);
  }
</style>
