<template>
  <div class="service">
    <header class="service__header">
      <span class="service__icon"></span>
      <h1 class="service__title">Metro de Valparaíso</h1>
      <p class="service__description">Selecciona un lugar para ver lo que puedes hacer ahí.</p>
    </header>
    <main class="service__items service__items places">
      <template v-for="place in places" v-bind:place="place">
        <router-link class="place-block" tag="article"
          v-bind:key="place.id" v-bind:to="'/lugares/' + place.id">
          <h2 class="place-block__name">{{ place.name }}</h2>
          <!-- @todo: método para transformar distancia desde metros a distancia "amigable" -->
          <p class="place-block__distance">a {{ place.distance }} metros de distancia</p>
          <div class="place-block__evaluation">
            <span class="place-block__evaluation-grade">
              {{ place.evaluation.grade }}
            </span>
            <span class="place-block__evaluation-description">
              {{ place.evaluation.description }}
            </span>
          </div>
        </router-link>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  name: 'serviceSingle',
  data() {
    return {
      places: [
        // objetos de tipo "lugar"
        {
          id: 1,
          name: 'Estación Viña del Mar',
          distance: 200,
          evaluation: {
            grade: 5,
            description: 'Excelente accesibilidad',
          },
        },
        {
          id: 2,
          name: 'Estación Hospital',
          distance: 230,
          evaluation: {
            grade: 4,
            description: 'Buena accesibilidad',
          },
        },
        {
          id: 3,
          name: 'Estación Miramar',
          distance: 350,
          evaluation: {
            grade: 1,
            description: 'Pésima accesibilidad',
          },
        },
        {
          id: 4,
          name: 'Estación Chorrillos',
          distance: 2024,
          evaluation: {
            grade: 1,
            description: 'Pésima accesibilidad',
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss">

</style>
