<script setup lang="ts">
import type { Onboarding } from '@/types/onboarding'
import TextToSpeech from '@/components/TextToSpeech.vue'

defineProps<{
  data: Onboarding
}>()
</script>

<template>
  <div>
    <component :is="data.image" />
    <div class="container">
      <h2 class="onboarding__title">
        {{ data.title }}
        <TextToSpeech
          :text-audio="data.title + '.\n\n\n\n\n\n' + data.body.replace(/(<([^>]+)>)/gi, '')"
        />
      </h2>
      <p v-html="data.body"></p>
    </div>
  </div>
</template>
