import Vue from 'vue';
import Vuex from 'vuex';
import rencana from './rencana';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    rencana: rencana,
  },
});
