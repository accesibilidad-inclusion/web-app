<template>
  <button class="tts" @click.prevent="speak" type="button">
    <span class="sr-only">Leer texto</span>
    <icon-audio />
  </button>
</template>

<script>
import {
  Component, Prop, Vue, Ref,
} from 'vue-property-decorator';
import IconAudio from '../../public/img/app-icons/audio.svg?inline';

export default {
  props: ['textAudio'],
  components: {
    IconAudio,
  },
  created() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.text = new SpeechSynthesisUtterance();
      this.voices = window.speechSynthesis.getVoices();
      this.text.lang = 'es-MX';
      this.text.pitch = 1;
      this.text.rate = 1;
      this.text.voice = this.voices.find(voice => voice.name === 'Paulina');
    };
  },
  data() {
    return {
      text: new SpeechSynthesisUtterance(),
      voices: window.speechSynthesis.getVoices(),
    };
  },
  methods: {
    speak() {
      this.text.text = this.textAudio;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(this.text);
    },
  },
};
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
