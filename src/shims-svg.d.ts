// Este archivo proporciona la definición de tipo necesaria para que Typescript
// pueda saber como manejar los archivos SVG
// https://github.com/visualfanatic/vue-svg-loader/blob/master/docs/faq.md#how-to-use-this-loader-with-typescript

declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';

  const content: VueConstructor<Vue>;
  export default content;
}
