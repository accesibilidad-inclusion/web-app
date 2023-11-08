<script setup lang="ts">
import type { Image } from '@/model/image';

const props = defineProps<{
  layers: Array<Image>
}>()

const images = props.layers.filter( (l: any) => l.layout !== 4 );
images.sort((a: any, b: any) => b.layout - a.layout);

</script>

<template>
  <div class="pictogram">
    <template v-for="layer in images" :key="layer.id">
      <img v-bind:src="`${layer.path}${layer.filename}`"
        class="pictogram__layer"
      >
    </template>
  </div>
</template>

<style lang="scss">
  .pictogram {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
    max-height: 41vh;
    min-height: 13rem;
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        height: 100%;
        max-height: 41vh;
        min-height: 13rem;
      }
    }
  }
  .pictogram__layer {
    position: relative;
    grid-column: 1/1;
    grid-row: 1/1;
    width: 100%;
    height: 100%;
    min-height: 13rem;
    max-height: 41vh;
    // Hack Safari
    @media not all and (min-resolution:.001dpcm) {
      @supports (-webkit-appearance:none) {
        height: 100%;
        width: 100%;
        max-height: 41vh;
        min-height: 13rem;
      }
    }
  }
  .pictogram__layer--subject {
    z-index: 3;
  }
  .pictogram__layer--context {
    z-index: 2;
  }
  .pictogram__layer--landmark {
    z-index: 1;
  }
</style>
