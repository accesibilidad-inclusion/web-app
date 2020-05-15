<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <header class="onboarding__navbar">
    </header>
    <div class="container">
      <h2 class="onboarding__title">Gracias por tu información</h2>
      <footer class="onboarding__footer">
        <button v-on:click="goHome()" class="btn btn--large btn--block btn--light">Empezar a usar PICTOS</button>
      </footer>
    </div>
  </div>
</template>

<script>
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

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.onboarding ::v-deep .onboarding__title {
  justify-content: center;
  align-items: center;
  max-width: 15rem;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

</style>
