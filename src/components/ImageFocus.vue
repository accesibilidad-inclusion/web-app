<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps<{
  image: string
  thumbnails: any
  focusSize: number | null
  focusX: number | null
  focusY: number | null
}>()

const cssVars = computed(() => {
  return props.focusSize && props.focusX && props.focusY
    ? {
        '--size-clip': props.focusSize + '%',
        '--x-position': props.focusX + '%',
        '--y-position': props.focusY + '%'
      }
    : {}
})

const apiDomain = import.meta.env.VITE_APP_API_DOMAIN
</script>

<template>
  <div class="container-img-preview">
    <img
      id="imgPreview"
      class="img-preview"
      :src="image"
      alt=""
      :srcset="`${apiDomain + thumbnails.small} 480w, ${apiDomain + thumbnails.medium} 640w`"
      :style="focusSize && focusX && focusY ? 'opacity:0.5' : ''" />
    <img
      id="imgPreviewFocus"
      :style="cssVars"
      class="img-preview-focus"
      :src="image"
      :srcset="`${apiDomain + thumbnails.small} 480w, ${apiDomain + thumbnails.medium} 640w`"
      alt="" />
  </div>
</template>

<style lang="scss" scoped>
.img-preview-focus {
  position: absolute;
  -webkit-clip-path: circle(var(--size-clip) at var(--x-position) var(--y-position));
  clip-path: circle(var(--size-clip) at var(--x-position) var(--y-position));
  left: 0;
  width: 100%;
}
.img-preview {
  height: 100%;
  width: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}
.container-img-preview {
  background-color: black;
  overflow: hidden;
  position: relative;
  border-top-right-radius: var(--spacer--500);
  border-top-left-radius: var(--spacer--500);
}
</style>
