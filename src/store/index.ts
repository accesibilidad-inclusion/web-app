import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
  selected: {
    category: null,
    service: null,
    venue: null,
    task: null,
  },
  data: [],
  evaluations: [
    {
      grade: 0,
      title: 'Sin evaluaciones',
      desc: '',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 1,
      title: 'Pésimo',
      desc: 'El servicio evaluado tiene que mejorar todo',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 2,
      title: 'Malo',
      desc: 'El servicio evaluado necesita muchas mejoras',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 3,
      title: 'Regular',
      desc: 'El servicio evaluado no es ni bueno ni malo',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 4,
      title: 'Bueno',
      desc: 'El servicio evaluado necesita pocas mejoras',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      grade: 5,
      title: 'Excelente',
      desc: 'El servicio evaluado no necesita mejoras',
      longdesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
        + ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
        + ' ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
  categories: [],
  questions: [],
  pictos: [],
  proposalPictos: [],
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {
    init({ commit }) {
      return new Promise((resolve) => {
        axios({
          url: `${process.env.VUE_APP_API_DOMAIN}api/init`,
          method: 'GET',
        }).then((response) => {
          localStorage.setItem('categories', JSON.stringify(response.data.categories));
          localStorage.setItem('questions', JSON.stringify(response.data.questions));
          localStorage.setItem('pictos', JSON.stringify(response.data.images));
          commit('setCategories', response.data.categories);
          commit('setQuestions', response.data.questions);
          commit('setPictos', response.data.images);
          resolve();
        });
      });
    },
    setSelectedItem({ commit }, payload) {
      return new Promise((resolve) => {
        commit('setSelectedItem', payload);
        resolve();
      });
    },
    setUserId({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('setUserId', payload);
        resolve();
      });
    },
  },
  modules: {
  },
});
