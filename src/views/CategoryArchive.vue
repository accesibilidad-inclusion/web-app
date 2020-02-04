<template>
  <div class="category">
    <header class="category__header">
      <span class="category__icon"></span>
      <h1 class="category__title">Transporte</h1>
      <p class="category__description">Revisa los servicios disponibles que están cerca de
        tí. <text-to-speech /></p>
    </header>
    <main class="category__items category__items--services">
      <template v-for="service in services" v-bind:service="service">
        <router-link class="category__item category__item--service service-block" tag="article"
          v-bind:key="service.id" v-bind:to="'/servicios/' + service.id">
          <span class="service-block__icon">
            {{ service.service_types[0] }}
          </span>
          <h2 class="service-block__name">{{ service.name }}</h2>
          <text-to-speech />
        </router-link>
      </template>
    </main>
    <!-- Visualmente es 'footer', pero semánticamente es 'aside' -->
    <aside class="actions actions--category">
      <p class="actions__title">¿No encuentras el lugar que estás buscando? <text-to-speech /></p>
      <router-link to="/lugares/nuevo" class="btn btn--primary btn--large btn--block" tag="button">
        &plus; Agregar un lugar nuevo
      </router-link>
    </aside>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'categoryArchive',
  components: {
    TextToSpeech,
  },
  data() {
    return {
      services: [
        // objetos de tipo "servicio"
        {
          id: 1,
          name: 'Metro de Valparaíso',
          service_types: ['transporte'],
        },
        {
          id: 2,
          name: 'Terminal de Buses Rodoviario',
          service_types: ['transporte'],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import 'rfs/scss';
  .category {
    display: flex;
    flex-flow: column nowrap;
  }
  .category__header {
    padding: var( --spacer );
    background: var( --color-brand-lightest );
    text-align: center;
    border-bottom: 1px solid var( --color-brand-light );
  }
  .category__title {
    color: var( --color-brand-darkest );
    @include rfs( 18px );
    line-height: 1.38888;
    margin: calc( var( --spacer ) / 4 );
  }
  .category__description {
    text-align: left;
  }
  .category__items {
    flex-grow: 1;
  }
  .service-block {
    padding: var( --spacer );
    border-bottom: 1px solid var( --color-brand-light );
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: auto 1fr auto;
    gap: 0 calc( var( --spacer ) / 2 );
    transition: all .15s linear;
    color: var( --color-brand-darkest );
    &:hover {
      cursor: pointer;
      background: var( --color-brand-darkest );
      color: var( --color-brand-lightest );
    }
  }
  .service-block__name {
    @include rfs( 18px );
    line-height: 1.22222;
  }
  .service-block__icon {
    text-indent: -9999em;
    overflow: hidden;
    display: inline-block;
    width: var( --spacer );
    height: var( --spacer );
    border-radius: var( --spacer );
    background: var( --color-brand-darkest );
  }
</style>
