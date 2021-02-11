import httpFetch from '../helper/httpFetch';
const rencana = {
  namespaced: true,
  state: {
    rencana: [],
  },
  mutations: {
    setData: (state, value) => (state.rencana = value),
    addData: (state, objDta) => {
      state.rencana.unshift(objDta);
    },
  },
  actions: {
    ambilData({ commit }) {
      return new Promise((resolve, reject) => {
        const HTTP = new httpFetch();
        HTTP.executeGet()
          .then((response) => {
            commit('setData', response);
            resolve(response);
          })
          .catch((response) => console.log(`Error : ${response}`));
      });
    },
    post({ dispatch }, objData) {
      return new Promise((resolve, reject) => {
        const HTTP = new httpFetch();
        HTTP.executePost(objData)
          .then((response) => {
            dispatch('ambilData');
            resolve(`Sukses input data ${response}`);
          })
          .then((error) => reject(error));
      });
    },
    update({ dispatch }, objData) {
      return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/rencana/' + objData.data.id;
        const HTTP = new httpFetch(url, 'PUT');
        HTTP.executePut(objData.data)
          .then((response) => {
            dispatch('ambilData');
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    delete({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/rencana/' + id.id;
        const HTTP = new httpFetch(url, 'DELETE');
        HTTP.executeDelete()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getTodoById: (state) => (id) => {
      const intId = parseInt(JSON.stringify(id));
      const objData = state.rencana.find((rencana) => rencana.id === intId);
      return objData;
    },
    getTodo: (state) => {
      return state.rencana;
    },
  },
};
export default rencana;
