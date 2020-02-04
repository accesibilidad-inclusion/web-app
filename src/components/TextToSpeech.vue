<template>
  <button class="tts" @click.prevent="speak" type="button">
    Leer texto
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextToSpeech extends Vue {
  @Prop() private greeting!: string;

  speak = () => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance('hola que tal. quizas esta es la voz en español, ¿qué dices tú?');
    // utterThis.voice = synth.getVoices[62];
    synth.speak(utterThis);
    return `Hello ${this.greeting}`;
  }

  data = () => ({
    publicPath: process.env.BASE_URL,
  })
}
</script>

<style lang="scss">
  .tts {
    background: transparent url('/img/app-icons/text-to-speech.svg') center no-repeat;
    border: 0;
    text-indent: -9999em;
    overflow: hidden;
    display: inline-block;
    width: 14px;
    height: 14px;
    box-sizing: content-box;
    cursor: pointer;
    &:hover {
      opacity: .9;
    }
  }
</style>
