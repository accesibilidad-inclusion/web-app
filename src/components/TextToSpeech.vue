<template>
  <button class="tts" @click.prevent="speak" type="button">
    <span class="sr-only">Leer texto</span>
    <icon-audio />
  </button>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Ref,
} from 'vue-property-decorator';

import IconAudio from '../../public/img/app-icons/audio.svg?inline';

@Component({
  components: {
    IconAudio,
  },
})
export default class TextToSpeech extends Vue {
  @Prop() public textAudio: string | undefined;

  speak = () => {
    const phrase = typeof this.textAudio === 'undefined'
      ? 'Añade la propiedad textAudio' : this.textAudio;
    const speech = new SpeechSynthesisUtterance(phrase);
    const voices = window.speechSynthesis.getVoices();
    // eslint-disable-next-line prefer-destructuring
    speech.voice = voices.filter(voice => voice.name === 'Paulina')[0];
    speech.lang = 'es-MX';
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }

  data = () => ({
    publicPath: process.env.BASE_URL,
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.tts {
  cursor: pointer;
  display: inline-block;
  background-color: transparent;
  border: 0;
  box-sizing: content-box;
}

.tts ::v-deep svg {
  @include rfs(1rem, width);
  @include rfs(1rem, height);
}
.tts ::v-deep path {
  fill: var(--color-brand);
}
</style>
