<template>
  <div class="place">
    <template v-if="loading">
      <clip-loader
        :loading="loading"
        :color="'#CAE0FF'"
        :size="'3rem'"
        class="mt-auto mb-auto"
      />
    </template>
    <template v-else>
      <main class="place__tasks">
        <p class="place__tasks-description">
          <span>Creemos que estas tareas pueden ser útiles</span>
          <text-to-speech :text-audio="'Creemos que estas tareas pueden ser útiles'" />
        </p>
        <task-block
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        />
      </main>
    </template>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock.vue';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  components: {
    TaskBlock,
    TextToSpeech,
    ClipLoader,
  },
  data() {
    return {
      tasks: [],
      loading: false,
    };
  },
  beforeMount() {
    this.$http.get(`${process.env.VUE_APP_API_DOMAIN}api/tasks/recommended`).then((response) => {
      this.tasks = response.data;
      this.loading = false;
    }).catch((err) => {
      if (err.response.status === 404) {
        this.$router.push('/');
      }
    });
  },
};
</script>

<style lang="scss">
  @import '@/assets/scss/rfs.scss';
  .place__tasks {
    padding: var(--spacer) var(--spacer) var(--spacer-lg);
    @media screen and ( min-width: 640px ) {
      padding-left: var(--spacer-lg);
      padding-right: var(--spacer-lg);
    }
    @media screen and ( min-width: 1280px ) {
      padding-left: var(--spacer-xl);
      padding-right: var(--spacer-xl);
    }
  }
  .place__tasks-description {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: var(--spacer);
    align-items: flex-start;
    .tts {
      position: relative;
      top: var(--spacer-xs);
    }
  }
</style>
