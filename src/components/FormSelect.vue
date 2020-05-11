<template>
  <select
    :class="classes"
    :id="id"
    v-model="selectedOption"
    @input="event => { $emit('input', event.target.value) }"
    required
  >
    <option v-if="optionDefault" value="" disabled selected="selected">{{ optionDefault }}</option>
    <!-- eslint-disable-next-line max-len -->
    <option v-for="item in options" v-bind:key="item.value" :value="item.value">{{ item.text }}</option>
  </select>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    id: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    optionDefault: {
      type: String,
    },
    value: null,
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  computed: {
    classes() {
      return ['custom-select', (this.selectedOption !== '' ? 'custom-select--filled' : '')].join(' ');
    },
  },
  mounted() {
    this.selectedOption = this.value;
  },
  watch: {
    value(newValue) {
      this.selectedOption = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';

.custom-select {
  @include rfs($font-size-14);
  display: inline-block;
  width: 100%;
  padding: .5rem 1.75rem .5rem .75rem;
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  vertical-align: middle;
  color: var(--color-neutral-light);
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px;
  background-color: #fff;
  border: 1px solid var(--color-neutral-light);
  border-radius: .25rem;
  appearance: none;
  &:valid {
    font-style: normal;
    color: var(--color-neutral);
  }
}
</style>
