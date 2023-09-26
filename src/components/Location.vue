<template>
  <div class="your-location">
    <div class="your-location__content">
      <icon-location-pin />
      <span v-if="$store.state.location.name">{{ $store.state.location.name }}</span>
      <span v-else>Tu ubicación actual</span>
    </div>
    <a
      class="btn your-location__change"
      @click="changeLocation()"
    >Cambiar</a>
  </div>
</template>

<script>
import IconLocationPin from '../../public/img/app-icons/location-pin.svg?inline';

export default {
  components: {
    IconLocationPin,
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    changeLocation() {
      this.$store.dispatch('setRedirectTo', '/home').then(() => {
        this.$router.push('/tu-ubicacion');
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/rfs.scss";
.your-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: calc(var(--spacer-lg) / 3);
  border-radius: 5px;
  background-color: var(--color-illustration-bg);
  margin-bottom: var(--spacer);
  color: #1a4571;
  .your-location__change {
    @include rfs($font-size-14);
    font-weight: 700;
    color: var(--color-brand-dark);
    padding: calc(var(--spacer-lg) / 3);
  }
  .your-location__content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--spacer-sm);
    padding-right: var(--spacer-sm);
    border-right: 1px solid var(--color-brand-lighter);
    span {
      @include rfs($font-size-14);
    }
    svg {
      width: 11px;
      height: 15px;
      @media screen and (min-width: 640px) {
        width: var(--spacer);
        height: var(--spacer);
      }
      path {
        fill: var(--color-brand-dark);
      }
    }
  }
}
</style>
