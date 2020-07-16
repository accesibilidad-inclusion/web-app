import Vue2TouchEvents from 'vue2-touch-events';
import VModal from 'vue-js-modal';

import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents);
Vue.use(VModal);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
