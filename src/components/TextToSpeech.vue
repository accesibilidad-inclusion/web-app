<script setup lang="ts">
import {onMounted, ref} from 'vue'
import IconAudio from '@/assets/img/app-icons/audio.svg?component'
import IconStop from '@/assets/img/app-icons/stop-circle.svg?component'

const props = defineProps<{
  textAudio: string
}>()

const playing = ref(false)
const voiceList = ref<Array<SpeechSynthesisVoice>>([])
const synth = window.speechSynthesis
const utterance = new SpeechSynthesisUtterance()

const speak = () => {
  if (playing.value) {
    playing.value = false
    synth.cancel()
  } else {
    utterance.text = props.textAudio
    synth.speak(utterance)
  }
}

onMounted(() => {
  voiceList.value = synth.getVoices()
  synth.onvoiceschanged = () => {
    voiceList.value = synth.getVoices()
  }

  utterance.lang = 'es-MX'
  utterance.pitch = 1
  utterance.rate = 1
  utterance.voice =
    voiceList.value.find((voice) => voice.lang === 'es-MX' || voice.lang === 'spa-MEX') || null

  utterance.onstart = () => {
    playing.value = true
  }
  utterance.onend = () => {
    playing.value = false
  }
})
</script>

<template>
  <button
    class="tts"
    @click.stop="speak"
    type="button"
    v-bind:aria-label="$t('textToSpeech.listen')">
    <span class="sr-only">{{ $t('textToSpeech.read') }}</span>
    <IconAudio v-if="!playing" />
    <IconStop class="stop-img" v-if="playing" />
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.tts {
  cursor: pointer;
  display: inline-block;
  background-color: transparent;
  border: 0;
  box-sizing: content-box;
}

.tts :deep(svg) {
  width: 0.875rem;
  height: 0.875rem;
}

.tts :deep(.stop-img) {
  animation: pulse 1s linear infinite;
}
.tts :deep(path) {
  fill: var(--color--blue);
}

@keyframes pulse {
  0% {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
</style>
