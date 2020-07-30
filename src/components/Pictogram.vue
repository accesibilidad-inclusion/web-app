<template>
  <div class="pictogram">
    <template v-for="layer in layers">
      <img v-bind:src="`${layer.path}${layer.filename}`"
        v-bind:key="layer.id"
        class="pictogram__layer"
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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }
  .pictogram__layer {
    position: relative;
    grid-column: 1/1;
    grid-row: 1/1;
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
