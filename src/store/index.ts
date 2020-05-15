import Vue from 'vue';
import Vuex from 'vuex';

const mutations = require('./mutations');

Vue.use(Vuex);

const state = {
  user: {
    id: null,
    disability: null,
    disabilities: [],
    dayBirth: '',
    monthBirth: '',
    yearBirth: '',
    birthday: '',
    sex: null,
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {
  },
  modules: {
  },
});
