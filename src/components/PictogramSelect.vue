<!-- eslint-disable max-len -->
<template>
  <div class="pictogram-select">
    <h3 class="pictogram-select__title">{{ title }}</h3>
    <carousel
      :per-page-custom="[[320, 2], [480, 2.5], [640, 3], [750, 3.5]]"
      :pagination-enabled="false"
      :resistance-coef="1"
      class="pictogram-select__list"
    >
      <slide
        class="pictogram-select__item"
        v-for="picto in pictos"
        v-bind:key="picto.path"
        v-bind:data-name="picto.path"
        data-index="0"
      >
        <div class="pictogram-wrapper">
          <label
            class="pictogram-button"
            v-bind:class="[ value === picto.path ? 'pictogram-button--active' : '' ]"
          >
            <img v-bind:src="`/pictos/src/${picto.path}`" class="pictogram-button__image">
            <span class="pictogram-button__name">{{ picto.label }}</span>
            <input
              type="radio"
              v-bind:value="picto.path"
              v-on:change="$emit('change', $event.target.value)"
            >
          </label>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  props: {
    pictos: {
      type: Array,
    },
    title: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/rfs.scss';

.pictogram-select {
  margin-bottom: var(--spacer);
}
.pictogram-select__title {
  @include rfs($font-size-14);
  margin-bottom: var(--spacer-sm);
  color: var(--color-brand-darkest);
}
.pictogram-wrapper {
  height: 100%;
  padding-left: .4rem;
  padding-right: .4rem;
}
.pictogram-button {
  @include rfs($font-size-14);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: .75rem;
  font-weight: bold;
  background-color: var(--color-background);
  border: none;
  border-radius: var(--border-radius);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, .1);
  transition: var(--transition-base);
  &:hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, .1), 0 0 2px var(--color-highlight);
  }
  &.pictogram-button--active {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, .1), 0 0 0 2px var(--color-highlight);
  }
}
.pictogram-button__image {
  display: block;
  width: 100%;
  margin-bottom: var(--spacer-sm);
  box-shadow: inset 0 0 0 1px var(--color-neutral-light);
}
.pictogram-button__name {
  display: flex;
  height: 100%;
  align-items: center;
  align-self: center;
  line-height: 1.25;
  text-align: center;
  overflow: hidden;
}
.VueCarousel-wrapper {
  margin-left: calc(var(--spacer-sm) * -1);
  padding-bottom: 10px;
  overflow: unset;
}
</style>