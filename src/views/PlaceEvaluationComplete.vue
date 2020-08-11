<!-- eslint-disable max-len -->
<template>
  <div class="onboarding onboarding--dark">
    <header class="onboarding__navbar">
    </header>
    <div class="container">
      <template v-if="submitting">
        <clip-loader :loading="submitting" :color="'#fff'" :size="'1rem'" class="mt-auto mb-auto"></clip-loader>
      </template>
      <template v-else>
        <h2 class="onboarding__title">Gracias por tu aporte</h2>
        <p>Estás ayudando al mundo a ser un lugar más accesible</p>
        <router-link :to="'/lugares/' + $store.state.selected.venue.id">
          Volver a {{ $store.state.selected.venue.name }}
        </router-link>
        <footer class="onboarding__footer">
        </footer>
      </template>
    </div>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

export default {
  name: 'PlaceEvaluationComplete',
  components: {
    ClipLoader,
  },
  data() {
    return {
      submitting: true,
    };
  },
  beforeMount() {
    if (!this.$route.params.answers) {
      this.$router.push(`/lugares/${this.$store.state.selected.venue.id}`);
    } else {
      this.$http.post(`${process.env.VUE_APP_API_DOMAIN}api/evaluations/store`, {
        answers: this.$route.params.answers,
        user: this.$store.state.user,
        venue: this.$store.state.selected.venue,
      }).then((result) => {
        this.submitting = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
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
