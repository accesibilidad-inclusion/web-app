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
  selected: {
    category: null,
    service: null,
    venue: null ,
    task: null 
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
  questions: [],
  pictos: []
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
    loadQuestions( { commit } ){
      return new Promise( ( resolve, reject ) => {
        axios( {
            url: process.env.VUE_APP_API_DOMAIN + 'api/questions',
            method: 'GET',
        } ).then( response => {
            localStorage.setItem('questions', JSON.stringify(response.data))
            commit('setQuestions', response.data)
            resolve()
        })
      })
    },
    loadPictos( { commit } ){
      return new Promise( ( resolve, reject ) => {
        axios( {
            url: process.env.VUE_APP_API_DOMAIN + 'api/images',
            method: 'GET',
        } ).then( response => {
            localStorage.setItem('pictos', JSON.stringify(response.data))
            commit('setPictos', response.data)
            resolve()
        })
      })
    },
    setSelectedItem( { commit }, payload ){
      return new Promise( ( resolve, reject ) => {
          commit('setSelectedItem', payload)
          resolve()
      })
    },
    setUserId( { commit }, payload ){
      return new Promise( ( resolve, reject ) => {
          commit('setUserId', payload)
          resolve()
      })
    }
  },
  modules: {
  },
});
