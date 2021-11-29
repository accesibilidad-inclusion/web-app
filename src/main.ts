import Vue2TouchEvents from 'vue2-touch-events';
import VModal from 'vue-js-modal';

import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents);
Vue.use(VModal);
Vue.prototype.$http = Axios;

Vue.filter('capitalize', (value: string) => {
  if (!value) return '';
  const v = value.toString();
  return v.charAt(0).toUpperCase() + v.slice(1);
});

Vue.filter('distance', (value: number) => {
  if (value > 999) {
    return `${Math.round((value / 1000) * 10) / 10} kilometros`;
  }
  return `${value} metros`;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
