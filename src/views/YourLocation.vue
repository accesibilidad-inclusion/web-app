<!-- eslint-disable max-len -->
<template>
  <div>
    <div v-if="!showCommune" class="your-location location-container">
      <template v-if="activatedGps">
        <h2>Estamos utilizando tu ubicacion GPS</h2>
        <button @click="$router.push('/home')" class="btn btn--large btn--block btn--primary">
          Continuar
        </button>
        <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
          Seleccionando una comuna
        </button>
      </template>
      <template v-else-if="communeSelected">
        <h2>Actualmente estás ubicado en {{ $store.state.location.name }}</h2>
        <p>Puedes cambiar tu ubicación de dos formas:</p>
        <button @click="activateGps()" class="btn btn--large btn--block btn--primary">
          Activar GPS
        </button>
        <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
          Seleccionando una comuna
        </button>
      </template>
      <template v-else>
        <h2>Tu ubicación</h2>
        <p>Activa el GPS o ingresa una comuna manualmente
          para ver los servicios disponibles cerca tuyo.</p>
        <button @click="activateGps()" class="btn btn--large btn--block btn--primary">
          Activar GPS
        </button>
        <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
          Seleccionando una comuna
        </button>
      </template>
    </div>
    <div v-else>
      <header class="service__header entries-list__header">
        <h1 class="service__title entries-list__title">Elige o busca una comuna</h1>
        <text-to-speech :text-audio="'Elige o busca una comuna.'"></text-to-speech>
        <div class="main-search__group">
          <input class="main-search__input" type="search"
          v-model="query" placeholder="Ejemplo: Viña del mar">
          <button type="button" class="main-search__button">
            <icon-search />
          </button>
        </div>
      </header>
      <main class="service__items service__items places">
        <template v-for="region in $store.state.regions">
          <div v-bind:key="region.id" v-if="region.communes.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).length">
            <a class="place-block entry-block" tag="article" @click="toggle(region.id)">
              <text-to-speech :text-audio="region.name" />
              <h2 class="place-block__name entry-block__name">{{ region.name }}</h2>
            </a>
            <template v-if="query.trim() !== '' || expandRegions.includes(region.id)">
              <template v-for="comm in region.communes">
                <div v-bind:key="comm.id" v-if="comm.name.toLowerCase().includes(query.toLowerCase())" v-bind:class="{ 'selected-commune' : commune && commune.id === comm.id }">
                  <a class="place-block entry-block" tag="article" @click="setCommune(comm)">
                    {{ comm.name }}
                  </a>
                </div>
              </template>
            </template>
          </div>
        </template>
      </main>
      <footer class="footer-communes">
        <button class="btn btn--large btn--block btn--primary" @click="cancelCommune()">
          Cancelar
        </button>
        <button class="btn btn--large btn--block btn--primary" :disabled="!commune" @click="confirmCommune()">
          Confirmar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import IconSearch from '../../public/img/app-icons/search.svg?inline';
import TextToSpeech from '@/components/TextToSpeech.vue';

export default {
  name: 'YourLocation',
  components: {
    IconSearch,
    TextToSpeech,
  },
  data() {
    return {
      showCommune: false,
      query: '',
      expandRegions: [],
      commune: null,
      activatedGps: this.$store.state.location && !this.$store.state.location.id,
      communeSelected: this.$store.state.location && this.$store.state.location.id,
    };
  },
  methods: {
    activateGps() {
      navigator.geolocation.getCurrentPosition(this.checkPosition, this.errorGps);
    },
    checkPosition(position) {
      this.$store.dispatch('setLocation', {
        lat: position.coords.latitude.toString(),
        lng: position.coords.longitude.toString(),
      }).then(() => { this.activatedGps = true; });
    },
    errorGps(error) {
      console.log(error);
    },
    selectCommune() {
      this.showCommune = true;
    },
    setCommune(c) {
      if (this.commune && this.commune.id === c.id) {
        this.commune = null;
      } else {
        this.commune = c;
      }
    },
    cancelCommune() {
      this.showCommune = false;
      this.commune = null;
      this.expandRegions = [];
      this.query = '';
    },
    confirmCommune() {
      this.$store.dispatch('setLocation', this.commune).then(() => this.$router.push('/home'));
    },
    toggle(id) {
      if (this.expandRegions.includes(id)) {
        this.expandRegions.splice(this.expandRegions.indexOf(id), 1);
      } else {
        this.expandRegions.push(id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rfs.scss';

.your-location {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-brand-darkest);
  z-index: 100000;
}

.location-container {
  @include rfs( $font-size-16 );
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 52vh;
  padding: 5vh 10vw 0;
  font-weight: 600;
  line-height: calc(26/18);
  color: #fff;
  text-align: center;
  background-color: var(--color-brand-darkest);

  p {
    max-width: 400px;
  }
}

.selected-commune {
  background-color: #F1F7FF;
}

.footer-communes {
  position: fixed;
  width:100%;
  bottom: 0;
}

</style>
