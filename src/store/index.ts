import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

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
    gender: null
  },
  selected: JSON.parse(localStorage.getItem('selected')) || {
    category: null,
    service: null,
    venue: null 
  },
  data: JSON.parse(localStorage.getItem('data')) || {},
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
    loadData( { commit } ){
      return new Promise( ( resolve, reject ) => {
        navigator.geolocation.getCurrentPosition(position => {
          axios( {
              url: process.env.VUE_APP_API_DOMAIN + 'api/categories/load',
              method: 'POST',
              data: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
          } ).then( response => {
              localStorage.setItem('data', JSON.stringify(response.data))
              commit('setData', response.data)
              resolve()
          })
        })
      })
    },
    setSelectedItem( { commit }, payload ){
      return new Promise( ( resolve, reject ) => {
          commit('setSelectedItem', payload)
          resolve()
      })
    }
  },
  modules: {
  },
});
