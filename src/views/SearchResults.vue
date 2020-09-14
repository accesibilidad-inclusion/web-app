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
      <template v-if="loading">
        <clip-loader :loading="loading" :color="'#CAE0FF'" :size="'3rem'" class="mt-auto mb-auto"></clip-loader>
      </template>
      <template v-else>
        <template v-if="!tasks.length">
        </template>
        <template v-else>
          <task-block v-for="task in tasks"
            v-bind:key="task.id" v-bind:task="task" v-bind:title="task.place">
          </task-block>
        </template>
      </template>
    </main>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import TaskBlock from '@/components/TaskBlock.vue';

export default {
  name: 'searchResults',
  components: {
    ClipLoader,
    TextToSpeech,
    TaskBlock,
  },
  data() {
    return {
      tasks: [],
      loading: true,
    };
  },
  beforeMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/tasks/search`, {
        query: this.$route.query.s,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }).then((result) => {
        this.tasks = result.data;
        this.loading = false;
      });
    });
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
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
