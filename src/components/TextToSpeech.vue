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
  // created() {
  //   window.speechSynthesis.onvoiceschanged = () => {
  //     this.text = new SpeechSynthesisUtterance();
  //     this.voices = window.speechSynthesis.getVoices();
  //     this.text.lang = 'es-MX';
  //     this.text.pitch = 1;
  //     this.text.rate = 1;
  //     this.text.localService = true;
  //     this.text.voice = this.voices.find(voice => voice.name === 'Paulina');
  //   };
  // },
  mounted() {
    this.voiceList = this.synth.getVoices();
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices();
    };
  },
  data() {
    return {
      synth: window.speechSynthesis,
      voiceList: [],
      greetingSpeech: new window.SpeechSynthesisUtterance(),
    };
  },
  methods: {
    speak() {
      this.greetingSpeech.text = this.textAudio;
      this.greetingSpeech.lang = 'es-MX';
      this.greetingSpeech.pitch = 1;
      this.greetingSpeech.rate = 1;
      this.greetingSpeech.localService = true;
      this.greetingSpeech.voice = this.voiceList.find(voice => voice.lang === 'es-MX');
      this.synth.cancel();
      this.synth.speak(this.greetingSpeech);
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
