<template>
  <div>
    <component :is="data.image" />
    <div class="container">
      <h2 class="onboarding__title">
        {{ data.title }}
        <text-to-speech :text-audio="data.title + '.\n\n\n\n\n\n' + data.body.replace( /(<([^>]+)>)/ig, '')"/>
      </h2>
      <p v-html="data.body"></p>
    </div>
  </div>
</template>

<script>
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'OnboardingStep',
  components: {
    TextToSpeech,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>
