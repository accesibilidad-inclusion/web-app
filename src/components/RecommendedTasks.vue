<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { Task } from '@/types/task'
import TaskBlock from '@/components/TaskBlock.vue'
import TextToSpeech from '@/components/TextToSpeech.vue'

const loading = ref<boolean>(true)
const tasks = ref<Array<Task>>([])

onBeforeMount(async () => {
  await fetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/tasks/recommended`)
    .then(async (response) => {
      const data = await response.json()
      tasks.value = data
      loading.value = false
    })
    .catch((error) => {
      return error
    })
})
</script>

<template>
  <div class="place">
    <main class="place__tasks">
      <p class="place__tasks-description">
        <span>Creemos que estas tareas pueden ser útiles</span>
        <TextToSpeech :text-audio="'Creemos que estas tareas pueden ser útiles'" />
      </p>
      <TaskBlock v-for="task in tasks" :key="task.id" :task="task" />
    </main>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/rfs.scss';
.place__tasks {
  padding: var(--spacer) var(--spacer) var(--spacer-lg);
  @media screen and (min-width: 640px) {
    padding-left: var(--spacer-lg);
    padding-right: var(--spacer-lg);
  }
  @media screen and (min-width: 1280px) {
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
