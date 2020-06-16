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
    gender: null,
  },
  evaluations: [
    {
      grade: 1,
      title: 'Pésimo',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 2,
      title: 'Malo',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 3,
      title: 'Regular',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 4,
      title: 'Bueno',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 5,
      title: 'Excelente',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {
  },
  modules: {
  },
});
