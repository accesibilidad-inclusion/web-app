<template>
  <div class="search-results">
    <header class="search-results__description">
      <h1 class="search-results__title">Buscaste:
        <span class="search-results__query">Ir de un lugar a otro</span>
      </h1>
      <p class="search-results__help">Los resultados aparecen de más cerca a más lejos de ti</p>
    </header>
    <main class="search-results__hits">
      <h2>Ir de un lugar a otro</h2>
      <task-block v-for="task in tasks"
        v-bind:key="task.id" v-bind:task="task" v-bind:title="task.place">
      </task-block>
    </main>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock.vue';

export default {
  name: 'searchResults',
  components: {
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
              enabled: false,
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
  .search-results__hits {
    padding: var( --spacer );
  }
</style>
