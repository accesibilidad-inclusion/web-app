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
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const output = typeof this.textAudio === 'undefined' ? 'Añade la propiedad textAudio' : this.textAudio;
    const utterThis = new SpeechSynthesisUtterance(output);
    for (let i:number = 0; i < voices.length; i += 1) {
      if (voices[i].name === 'Paulina') {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 1;
    utterThis.rate = 0.9;
    synth.speak(utterThis);
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
