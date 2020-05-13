<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <!-- eslint-disable-next-line max-len -->
      <h2 class="onboarding__title">Fecha de nacimiento <text-to-speech :text-audio="'Fecha de nacimiento'" /></h2>
      <!-- eslint-disable-next-line max-len -->
      <form>
        <div class="form-group">
          <label for="day">Día</label>
          <!-- eslint-disable-next-line max-len -->
          <form-select :id="'day'" :options="days" :optionDefault="'Selecciona el día'" v-model="dayBirth" @input="dayChange"></form-select>
        </div>
        <div class="form-group">
          <label for="month">Mes</label>
          <!-- eslint-disable-next-line max-len -->
          <form-select :id="'month'" :options="months" :optionDefault="'Selecciona el mes'" v-model="monthBirth" @input="monthChange"></form-select>
        </div>
        <div class="form-group">
          <label for="ano">Año</label>
          <!-- eslint-disable-next-line max-len -->
          <form-select :id="'year'" :options="years" :optionDefault="'Selecciona el año'" v-model="yearBirth" @input="yearChange"></form-select>
        </div>
      </form>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'sex'" :disabled="true"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';
import FormSelect from '@/components/FormSelect.vue';

export default {
  name: 'Registration',
  components: {
    TextToSpeech,
    BackButton,
    OnboardingNext,
    FormSelect,
  },
  data() {
    return {
      title: 'Fecha de nacimiento',
      dayBirth: this.$store.state.user.dayBirth,
      monthBirth: this.$store.state.user.monthBirth,
      yearBirth: this.$store.state.user.yearBirth,
    };
  },
  computed: {
    days() {
      return this.arrayInts(1, 31);
    },
    months() {
      return [
        { value: '01', text: 'Enero' },
        { value: '02', text: 'Febrero' },
        { value: '03', text: 'Marzo' },
        { value: '04', text: 'Abril' },
        { value: '05', text: 'Mayo' },
        { value: '06', text: 'Junio' },
        { value: '07', text: 'Julio' },
        { value: '08', text: 'Agosto' },
        { value: '09', text: 'Septiembre' },
        { value: '10', text: 'Octubre' },
        { value: '11', text: 'Noviembre' },
        { value: '12', text: 'Diciembre' },
      ];
    },
    years() {
      const end = new Date().getFullYear();
      return this.arrayInts(1930, end).reverse();
    },
    birthday() {
      if (this.yearBirth !== '' && this.monthBirth !== '' && this.dayBirth !== '') {
        // eslint-disable-next-line prefer-template
        return this.yearBirth + '-' + this.monthBirth + '-' + this.dayBirth;
      }
      return '';
    },
    canContinue() {
      return this.dayBirth !== null && this.dayBirth !== null && this.yearBirth !== null;
    },
    textAudio() {
      // eslint-disable-next-line prefer-template
      // eslint-disable-next-line no-useless-concat
      return `${this.title}\n\n\n\n` + 'Día' + '\n\n\n\n' + 'Mes' + '\n\n\n\n' + 'Año';
    },
  },
  methods: {
    dayChange(value) {
      this.$store.commit('dayBirth', value);
      this.$store.commit('birthday', this.birthday);
    },
    monthChange(value) {
      this.$store.commit('monthBirth', value);
      this.$store.commit('birthday', this.birthday);
    },
    yearChange(value) {
      this.$store.commit('yearBirth', value);
      this.$store.commit('birthday', this.birthday);
    },
    pad(num, size) {
      let s = `${num}`;
      while (s.length < size) s = `0${s}`;
      return s;
    },
    arrayInts(start, end) {
      const array = [];
      // eslint-disable-next-line no-plusplus
      for (let i = start; i <= end; i++) {
        array.push({ value: this.pad(i, 2), text: i });
      }
      return array;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
label {
  @include rfs(.3125rem, margin-bottom);
  display: block;
}
.form-group {
  @include rfs(1.25rem, margin-bottom);
}
</style>
