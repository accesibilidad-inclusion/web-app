<template>
  <div class="pictogram">
    <template v-for="(layer, type) in layers">
      <img v-bind:src="`/pictos/src/${layer.img}`"
        v-if="layer.img"
        v-bind:key="layer.id"
        v-bind:class="'pictogram__layer pictogram__layer--' + type"
      >
    </template>
  </div>
</template>

<script>
export default {
  props: ['layers'],
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
  .pictogram {
    position: relative;
    height: 100%;
  }
  .pictogram__layer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
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
