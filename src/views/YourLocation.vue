<!-- eslint-disable max-len -->
<template>
  <div>
    <div v-if="!showCommune" class="your-location location-container">
      <template v-if="activatedGps">
        <div class="activate-location">
          <h2 class="activate-location__title">Estamos utilizando <span class="font-weight-medium">tu ubicacion GPS</span></h2>
          <button @click="$router.push('/home')" class="btn btn--large btn--block btn--primary">
            Continuar
          </button>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--as-link">
            Seleccionando una comuna
          </button>
        </div>
      </template>
      <template v-else-if="permissionDenied">
        <div class="activate-location">
          <h2 class="activate-location__title">No podemos acceder a <span class="font-weight-medium">tu ubicacion GPS</span></h2>
          <p>Asegurate de activar los permisos y</p>
          <button @click="permissionDenied = false" class="btn btn--large btn--block btn--as-link">
            Volver a intentarlo
          </button>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
            Seleccionando una comuna
          </button>
        </div>
      </template>
      <template v-else-if="communeSelected">
        <div class="activate-location">
          <h2 class="activate-location__title">Actualmente estás ubicado en <span class="font-weight-medium">{{ $store.state.location.name }}</span></h2>
          <p class="activate-location__description">Puedes cambiar tu ubicación de dos formas:</p>
          <button @click="activateGps()" class="btn btn--large btn--block btn--primary">
            Activar GPS
          </button>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
            Seleccionando una comuna
          </button>
        </div>
      </template>
      <template v-else>
        <div class="activate-location">
          <h2 class="activate-location__title">Tu ubicación</h2>
          <p class="activate-location__description"><span class="font-weight-medium">Activa el GPS</span> o <span class="font-weight-medium">ingresa una comuna</span> manualmente
            para ver los servicios disponibles cerca tuyo.</p>
          <button @click="activateGps()" class="btn btn--large btn--block btn--primary">
            Activar GPS
          </button>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
            Seleccionando una comuna
          </button>
          </div>
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
              <h2 class="place-block__name entry-block__name">{{ region.name }}</h2>
              <chevron-up v-if="query.trim() !== '' || expandRegions.includes(region.id)"/>
              <chevron-down v-else/>
            </a>
            <template v-if="query.trim() !== '' || expandRegions.includes(region.id)">
              <template v-for="comm in region.communes">
                <div v-bind:key="comm.id" v-if="comm.name.toLowerCase().includes(query.toLowerCase())" v-bind:class="{ 'selected-commune' : commune && commune.id === comm.id }">
                  <a class="place-block entry-block" tag="article" @click="setCommune(comm)">
                    <text-to-speech :text-audio="comm.name" />
                    {{ comm.name }}
                  </a>
                </div>
              </template>
            </template>
          </div>
        </template>
        <template v-if="!$store.state.regions.filter( r => r.communes.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).length).length">
          <div>
            <h2>No se han encontrado comunas con ese nombre</h2>
            <p>Prueba escribiendo otras palabras o buscando por las regiones disponibles</p>
          </div>
        </template>
      </main>
      <footer class="footer-communes">
        <button class="btn btn--large btn--block btn--as-link" @click="cancelCommune()">
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
import TextToSpeech from '@/components/TextToSpeech.vue';
import IconSearch from '../../public/img/app-icons/search.svg?inline';
import ChevronDown from '../../public/img/app-icons/chevron-down.svg?inline';
import ChevronUp from '../../public/img/app-icons/chevron-up.svg?inline';

export default {
  name: 'YourLocation',
  components: {
    IconSearch,
    ChevronDown,
    ChevronUp,
    TextToSpeech,
  },
  data() {
    return {
      showCommune: false,
      query: '',
      expandRegions: [],
      commune: null,
      permissionDenied: false,
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
      this.permissionDenied = true;
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
  border-radius: 0;
  div {
    display: initial;
    width: auto;
    gap: initial;
  }
}
.location-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  background-color: var(--color-brand-darkest);
  max-width: 750px;
  padding: 0 var(--spacer);
  z-index: 100000;
  @media screen and ( min-width: 640px ) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.activate-location {
  background-color: var(--color-background);
  border-radius: var(--border-radius-lg);
  padding: calc(var(--spacer-lg) / 1.5) var(--spacer);
  @media screen and ( min-width: 640px ) {
        max-width: 450px;
  }
  .btn--primary {
    @include rfs($font-size-16);
    @media screen and ( min-width: 640px ) {
      @include rfs($font-size-14);
    }
    & + .btn--primary {
      margin-top: calc(var(--spacer-lg) / 3);
    }
  }
  .btn--as-link {
    color: var(--color-text);
    margin: 0
  }
}
.activate-location__title {
  @include rfs($font-size-18);
  color: var(--color-brand-darkest);
  margin-bottom: var(--spacer-sm);
  @media screen and ( min-width: 640px ) {
    @include rfs($font-size-16);
  }
  & + .btn {
    margin-top: calc(var(--spacer-lg) / 1.5);
  }
}
.activate-location__description {
  @include rfs($font-size-16);
  color: var(--color-text);
  margin-bottom: calc(var(--spacer-lg) / 1.5);
  @media screen and ( min-width: 640px ) {
    @include rfs($font-size-14);
  }
  .font-weight-medium {
    font-weight: 600;
  }
}

.selected-commune {
  background-color: #F1F7FF;
}

.footer-communes {
  position: fixed;
  width:100%;
  bottom: 0;
  margin: 0 auto;
  padding: var(--spacer);
  display: flex;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 100000;
  background-color: var(--color-background);
  @media screen and ( min-width: 640px ) {
    max-width: 640px;
  }
  @media screen and ( min-width: 1280px ) {
    max-width: 750px;
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
  .btn--as-link {
    color: var(--color-text);
    margin: 0;
  }
  .btn--primary {
    &:disabled {
      pointer-events: none;
      background: transparent;
      border: 1px solid var(--color-neutral-lighter);
      color: var(--color-neutral-lighter);
    }
  }
}
.place-block {
  svg {
    width: 1rem;
    height: 1rem;
    path {
      fill: #004079;

    }
  }
}


</style>
