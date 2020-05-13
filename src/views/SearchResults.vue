<!-- eslint-disable max-len -->
<template>
  <div class="search-results">
    <header class="search-results__description">
      <h1 class="search-results__title">Buscaste:
        <span class="search-results__query">“{{ $route.query.s }}”</span>
      </h1>
      <p class="search-results__help">
        Los resultados aparecen de más cerca a más lejos de ti
        <text-to-speech :text-audio="'Los resultados aparecen de más cerca a más lejos de ti'" />
      </p>
    </header>
    <main class="search-results__hits">
      <h2 class="search-results__hits__title">Ir de un punto a otro</h2>
      <task-block v-for="task in tasks"
        v-bind:key="task.id" v-bind:task="task" v-bind:title="task.place">
      </task-block>
    </main>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';
import TaskBlock from '@/components/TaskBlock.vue';

export default {
  name: 'searchResults',
  components: {
    TextToSpeech,
    TaskBlock,
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Ir de un punto a otro',
          place: 'Estación Metro Miramar',
          service: 'Metro de Valparaíso',
          aids: [
            {
              type: 'graphic',
              enabled: true,
            },
            {
              type: 'written',
              enabled: true,
            },
            {
              type: 'aural',
              enabled: true,
            },
          ],
        },
        {
          id: 2,
          title: 'Ir de un punto a otro',
          place: 'Terminal de buses de Viña del Mar',
          service: 'Terminal de buses Rodoviario',
          aids: [
            {
              type: 'graphic',
              enabled: false,
            },
            {
              type: 'written',
              enabled: true,
            },
            {
              type: 'aural',
              enabled: false,
            },
          ],
        },
        {
          id: 3,
          title: 'Ir de un punto a otro',
          place: 'Estación Viña del Mar',
          service: 'Metro de Valparaíso',
          aids: [
            {
              type: 'graphic',
              enabled: true,
            },
            {
              type: 'written',
              enabled: false,
            },
            {
              type: 'aural',
              enabled: true,
            },
          ],
        },
        {
          id: 4,
          title: 'Ir de un punto a otro',
          place: 'Estación Hospital',
          service: 'Metro de Valparaíso',
          aids: [
            {
              type: 'graphic',
              enabled: false,
            },
            {
              type: 'written',
              enabled: true,
            },
            {
              type: 'aural',
              enabled: true,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  .search-results__description {
    margin-bottom: var(--spacer);
    padding: var(--spacer-sm) var(--spacer) var(--spacer);
    background: var(--color-brand-lighter);
    @media screen and ( min-width: 640px ) {
      margin-bottom: var(--spacer-lg);
      padding: var(--spacer) var(--spacer-lg) var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .search-results__title,
  .search-results__hits__title {
    @include rfs($font-size-18);
    margin-bottom: var(--spacer-sm);
    line-height: var(--subtitle-line-height);
  }
  .search-results__query {
    font-weight: normal;
  }
  .search-results__help {
    @include rfs($font-size-14);
    .tts {
      position: relative;
      top: 3px;
    }
  }
  .search-results__hits {
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
</style>
