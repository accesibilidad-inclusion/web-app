<!-- eslint-disable max-len -->
<template>
  <div>
    <div v-if="!showCommune" class="your-location location-container">
      <template v-if="activatedGps">
        <div class="activate-location activate-location--gps">
          <icon-location-pin class="activate-location__icon" />
          <h2 class="activate-location__title">Estamos utilizando <strong>tu ubicacion GPS</strong></h2>
          <button @click="$router.push('/home')" class="btn btn--large btn--block btn--primary">
            Continuar
          </button>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--as-link">
            Seleccionar una comuna
          </button>
        </div>
      </template>
      <template v-else-if="permissionDenied">
        <div class="activate-location">
          <h2 class="activate-location__title">No podemos acceder a <span class="font-weight-medium">tu ubicacion GPS</span></h2>
          <p class="activate-location__description">Activa los permisos de ubicación en tu dispositivo</p>
          <button @click="permissionDenied = false" class="btn btn--large btn--block btn--primary">
            Volver a intentarlo
          </button>
          <span class="activate-location__or">ó</span>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
            Seleccionar una comuna
          </button>
        </div>
      </template>
      <template v-else-if="communeSelected">
        <div class="activate-location activate-location--gps">
          <icon-location-pin class="activate-location__icon" />
          <h2 class="activate-location__title">Actualmente estás ubicado en <strong>{{ $store.state.location.name }}</strong></h2>
          <p class="activate-location__description">Puedes cambiar tu ubicación de dos formas:</p>
          <button @click="activateGps()" class="btn btn--large btn--block btn--primary">
            Activando tu GPS
          </button>
          <span class="activate-location__or">ó</span>
          <button @click="selectCommune()" class="btn btn--large btn--block btn--primary">
            Seleccionando una comuna
          </button>
        </div>
        <a href="#" @click="$router.push('/home')" class="close-app">Volver al menú principal</a>
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
            Selecciona una comuna
          </button>
          </div>
          <a href="https://pictos.cl" class="close-app">Visita nuestro sitio web</a>
      </template>
    </div>
    <div v-else class="select-commune">
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
          <div v-bind:key="region.id" v-if="region.communes.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).length" v-bind:class="query.trim() !== '' || expandRegions.includes(region.id) ? 'place-active' : ''">
            <a class="place-block entry-block name-place" tag="article" @click="toggle(region.id)">
              <h2 class="place-block__name entry-block__name">{{ region.name }}</h2>
              <chevron-up v-if="query.trim() !== '' || expandRegions.includes(region.id)"/>
              <chevron-down v-else/>
            </a>
            <template v-if="query.trim() !== '' || expandRegions.includes(region.id)">
              <template v-for="comm in region.communes">
                <div v-bind:key="comm.id" v-if="comm.name.toLowerCase().includes(query.toLowerCase())" v-bind:class="{ 'selected-commune' : commune && commune.id === comm.id }">
                  <a class="place-block entry-block name-commune" tag="article" @click="setCommune(comm)">
                    <text-to-speech :text-audio="comm.name" />
                    {{ comm.name }}
                  </a>
                </div>
              </template>
            </template>
          </div>
        </template>
        <template v-if="!$store.state.regions.filter( r => r.communes.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).length).length">
          <div class="no-results-commune">
            <icon-no-results class="no-results-commune__icon" />
            <h2 class="no-results-commune__title">No se han encontrado comunas con ese nombre</h2>
            <p class="no-results-commune__description">Prueba escribiendo <strong>otras palabras</strong> o buscando por las <strong>regiones</strong> disponibles</p>
          </div>
        </template>
      </main>
      <footer class="footer-communes">
        <button class="btn btn--large btn--block btn--as-link" @click="cancelCommune()">
          Cancelar
        </button>
        <button class="btn btn--large btn--block btn--primary" :disabled="!commune" @click="confirmCommune()">
          Listo
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
import IconLocationPin from '../../public/img/app-icons/location-pin.svg?inline';
import IconNoResults from '../../public/img/app-icons/no-results.svg?inline';

export default {
  name: 'YourLocation',
  components: {
    IconSearch,
    ChevronDown,
    ChevronUp,
    TextToSpeech,
    IconLocationPin,
    IconNoResults,
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
  padding: 0 calc(var(--spacer-lg) / 3);
  z-index: 100000;
  @media screen and ( min-width: 640px ) {
    padding-left: var(--spacer-xl);
    padding-right: var(--spacer-xl);
  }
}
.activate-location {
  background-color: var(--color-background);
  border-radius: var(--border-radius-lg);
  padding: calc(var(--spacer-lg) / 1.5) calc(var(--spacer-lg) / 3);
  @media screen and ( min-width: 640px ) {
    max-width: 450px;
    padding-left: var(--spacer);
    padding-right: var(--spacer);
  }
  .btn--primary {
    @include rfs($font-size-16);
    background-color: var(--color-brand-darkest);
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
.activate-location__icon {
  width: 25px;
  height: 34px;
  display: block;
  margin: 0 auto calc(var(--spacer-lg) / 3);
  path {
    fill: var(--color-brand-lighter);
  }
}
.activate-location--gps {
  .activate-location__title {
    text-align: center;
    font-weight: 600;
    margin-bottom: calc(var(--spacer-lg) / 1.5);
  }
  .activate-location__description {
    margin-bottom: calc(var(--spacer-lg) / 3);
  }
}
.activate-location__or {
  @include rfs($font-size-14);
  display: block;
  padding: calc(var(--spacer-sm) * 1.5);
  text-align: center;
}
//elige una comuna
.select-commune {
  position: relative;
  z-index: 1050;
  margin-top: -39px;
  @media screen and ( min-width: 640px ) {
    margin-top: -63px;
  }
  @media screen and ( min-width: 1280px ) {
    margin-top: -68px;
  }
  .service__header {
    padding-top: calc(var(--spacer-lg) + var(--spacer-xs));
     @media screen and ( min-width: 640px ) {
      padding-top: calc(var(--spacer-xl) + var(--spacer-xs));
    }
    @media screen and ( min-width: 1280px ) {
      padding-top: calc(var(--spacer-xl) + var(--spacer-xs));
    }
    .entries-list__title {
      text-align: left;
      margin-bottom: calc(var(--spacer-lg) / 3);
    }
  }
}
.footer-communes {
  position: fixed;
  width:100%;
  bottom: 0;
  margin: 0 auto;
  padding: calc(var(--spacer-lg) / 3) var(--spacer);
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
  .btn {
    @include rfs($font-size-14);
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
.service__items.places {
  & > div {
    padding-bottom: var(--spacer);
    border-bottom: 1px solid #A0B6CB;
  }
  .entry-block {
    font-weight: 700;
    background-color: var(--color-background);
    transition: all .3s linear;
    padding-bottom: calc(var(--spacer) / 2);
  }
  .name-place {
    border: none;
    svg {
      width: 12px;
      height: 7px;
      @media screen and( min-width: 640px ) {
        width: 1rem;
        height: 1rem;
      }
      path {
        fill: var(--color-brand-dark);
        transition: all .15s linear;
      }
    }
  }
  .name-commune {
    @include rfs($font-size-14);
    position: relative;
    border-bottom: none;
    padding: calc(var(--spacer-lg) / 3) calc(var(--spacer-xl) / 2);
    @media screen and( min-width: 640px ) {
      padding-left: calc(var(--spacer-lg) + 10px);
      padding-right: calc(var(--spacer-lg) + 10px);
    }
    @media screen and ( min-width: 1280px ) {
      @include rfs($font-size-15);
      padding-left: calc(var(--spacer-xl) + 10px);
      padding-right: calc(var(--spacer-xl) + 10px);
    }
    &::before {
      content: '';
      border-bottom: 1px solid rgba(160, 182, 203, 0.3);
      position: absolute;
      bottom: 0;
      right: calc(var(--spacer-lg) / 2);
      left: calc(var(--spacer-lg) / 2);
      @media screen and( min-width: 640px ) {
        right: var(--spacer-lg);
        left: var(--spacer-lg);
      }
      @media screen and ( min-width: 1280px ) {
        right: var(--spacer-xl);
        left: var(--spacer-xl);
      }
    }
  }
}
.place-active {
  .name-place {
    border-bottom: none;
    background-color: var(--color-background);
    padding-bottom: calc(var(--spacer) / 2);
  }
  .selected-commune {
    border-bottom: none;
    .name-commune {
      transition: all .15s linear;
      background-color: var(--color-brand-lightest);
      &::before {
        content: none;
      }
    }
  }
  div:last-child {
    .name-commune::before {
      content: none;
    }
  }
}
//sin resultados
.no-results-commune {
  margin: auto calc(var(--spacer-lg) / 1.5);
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: center;
  align-items: center;
  @media screen and ( min-width: 640px ) {
    max-width: 560px;
    margin: 0 auto;
  }
  @media screen and ( min-width: 1280px ) {
    max-width: 630px;
  }
}
.no-results-commune__icon {
  width: var(--spacer-lg);
  height: var(--spacer-lg);
  margin: calc(var(--spacer-lg) / 3) auto;
  display: block;
}
.no-results-commune__title {
  @include rfs($font-size-18);
  color: var(--color-brand);
  margin-bottom: var(--spacer-sm);
  text-transform: uppercase;
  font-weight: 800;
  text-align: center;
}
.no-results-commune__description {
  @include rfs($font-size-14);
  text-align: center;
}
.close-app {
  @include rfs($font-size-14);
  color: var(--color-background);
  font-weight: 600;
  position: absolute;
  bottom: var(--spacer-sm);
  right: 0;
  left: 0;
  text-align: center;
  padding: var(--spacer);
}
</style>
