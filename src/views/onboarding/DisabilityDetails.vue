<!-- eslint-disable max-len -->
<template>
  <div class="onboarding">
    <header class="onboarding__navbar">
      <back-button></back-button>
    </header>
    <div class="container">
      <h2 class="onboarding__title">¿Qué tipo de discapacidad tienes? <text-to-speech :text-audio="'¿Qué tipo de discapacidad tienes?'" /></h2>
      <div class="custom-control custom-control--checkbox">
        <input type="checkbox" name="disabilities" id="intelectual" value="intelectual" class="custom-control__input"
          v-model="disabilities" @change="disabilitiesChange" :checked="disabilities.includes('intelectual')">
        <label for="intelectual" class="custom-control__label">Intelectual</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input type="checkbox" name="disabilities" id="fisica" value="fisica" class="custom-control__input"
          v-model="disabilities" @change="disabilitiesChange" :checked="disabilities.includes('fisica')">
        <label for="fisica" class="custom-control__label">Física</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input type="checkbox" name="disabilities" id="visual" value="visual" class="custom-control__input"
          v-model="disabilities" @change="disabilitiesChange" :checked="disabilities.includes('visual')">
        <label for="visual" class="custom-control__label">Visual</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input type="checkbox" name="disabilities" id="auditiva" value="auditiva" class="custom-control__input"
          v-model="disabilities" @change="disabilitiesChange" :checked="disabilities.includes('auditiva')">
        <label for="auditiva" class="custom-control__label">Auditiva</label>
      </div>
      <div class="custom-control custom-control--checkbox">
        <input type="checkbox" name="disabilities" id="otra" value="otra" class="custom-control__input"
          v-model="disabilities" @change="disabilitiesChange" :checked="disabilities.includes('otra')">
        <label for="otra" class="custom-control__label">Otra</label>
      </div>
      <footer class="onboarding__footer">
        <onboarding-next :linkTo="'/onboarding/complete'" :isDisabled="!canContinue"></onboarding-next>
      </footer>
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import OnboardingNext from '@/components/OnboardingNext.vue';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'Disability',
  components: {
    BackButton,
    OnboardingNext,
    TextToSpeech,
  },
  data() {
    return {
      disabilities: this.$store.state.user.disabilities,
    };
  },
  methods: {
    disabilitiesChange(event) {
      this.$store.commit('disabilities', event.target.value);
    },
  },
  computed: {
    canContinue() {
      return this.disabilities.length > 0;
    },
  },
};
</script>
