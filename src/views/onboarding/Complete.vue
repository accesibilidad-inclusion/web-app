<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <header class="onboarding__navbar">
    </header>
    <div class="container">
      <h2 class="onboarding__title">Gracias por tu información</h2>
      <footer class="onboarding__footer">
        <button v-on:click="goHome()" class="btn btn--large btn--block">Empezar a usar PICTOS</button>
        <!--<router-link :to="'/home'" class="btn btn--large btn--block">Empezar a usar PICTOS</router-link>-->

      </footer>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Disability',
  methods: {
    goHome() {
      localStorage.onboarding = true;
      this.$router.push('/home');
    },
  },
};
</script>

<style></style>
