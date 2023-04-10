<template>
  <button class="tts" @click.stop="speak" type="button">
    <span class="sr-only">Leer texto</span>
    <icon-audio v-if="!playing" />
    <icon-stop class="stop-img" v-if="playing" />
  </button>
</template>

<script>
import {
  Component, Prop, Vue, Ref,
} from 'vue-property-decorator';
import IconAudio from '../../public/img/app-icons/audio.svg?inline';
import IconStop from '../../public/img/app-icons/stop-circle.svg?inline';

export default {
  props: ['textAudio'],
  components: {
    IconAudio,
    IconStop,
  },
  mounted() {
    this.voiceList = this.synth.getVoices();
    this.synth.onvoiceschanged = () => {
      this.voiceList = this.synth.getVoices();
    };

    this.utterance.lang = 'es-MX';
    this.utterance.pitch = 1;
    this.utterance.rate = 1;
    this.utterance.localService = true;
    this.utterance.voice = this.voiceList.find(voice => voice.lang === 'es-MX' || voice.lang === 'spa-MEX');

    this.utterance.onstart = (event) => {
      this.playing = true;
    };
    this.utterance.onend = (event) => {
      this.playing = false;
    };
  },
  data() {
    return {
      playing: false,
      synth: window.speechSynthesis,
      voiceList: [],
      utterance: new SpeechSynthesisUtterance(),
    };
  },
  methods: {
    speak() {
      if (this.playing) {
        this.playing = false;
        this.synth.cancel();
      } else {
        this.utterance.text = this.textAudio;
        this.synth.speak(this.utterance);
      }
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

.tts ::v-deep .stop-img {
  animation: pulse 1s linear infinite;
}
.tts ::v-deep path {
  fill: var(--color-brand);
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
