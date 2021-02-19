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
        const HTTP = new httpFetch('GET');
        HTTP.eksekusi()
          .then((response) => {
            commit('setData', response);
            resolve(response);
          })
          .catch((response) => console.log(`Gagal ambil data : ${response}`));
      });
    },
    post({ dispatch }, objData) {
      return new Promise((resolve, reject) => {
        const HTTP = new httpFetch('POST');
        HTTP.objData = objData;
        HTTP.eksekusi()
          .then((response) => {
            dispatch('ambilData');
            resolve(`Sukses input data ${response}`);
          })
          .catch((error) => reject(` Gagal input data ${error}`));
      });
    },
    update({ dispatch }, objData) {
      return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/rencana/' + objData.data.id;
        const HTTP = new httpFetch('PUT', url);
        HTTP.objData = objData;
        HTTP.eksekusi()
          .then((response) => {
            dispatch('ambilData');
            resolve(response);
          })
          .catch((error) => {
            reject(` Gagal update data ${error}`);
          });
      });
    },
    delete({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/rencana/' + id.id;
        const HTTP = new httpFetch('DELETE', url);
        HTTP.eksekusi()
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
