import httpFetch from '../helper/httpFetch';
const rencana = {
  namespaced: true,
  state: {
    rencana: [],
  },
  mutations: {
    setData: (state, value) => (state.rencana = value),
    addData: (state, objDta) => {
      console.log(`Isi data ${JSON.stringify(objData)}`);
      state.rencana.unshift(objDta);
    },
  },
  actions: {
    ambilData({ commit }) {
      return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/rencana';
        const HTTP = new httpFetch(url, 'GET');
        HTTP.executeGet()
          .then((response) => {
            commit('setData', response);
            resolve(response);
          })
          .catch((response) => console.log(`Error : ${response}`));
      });
    },
    post({ dispatch }, objData) {
      const datanya = JSON.stringify(objData);
      fetch('http://localhost:3000/rencana', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData.data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          dispatch('ambilData');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    update({ dispatch }, objData) {
      const datanya = JSON.stringify(objData);
      fetch('http://localhost:3000/rencana/' + objData.data.id, {
        method: 'PUT', // or 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData.data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          dispatch('ambilData');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    delete({ dispatch }, objData) {
      console.log(`ini adalah obj yang samapai di vuex ${objData.data.id}`);
      fetch('http://localhost:3000/rencana/' + objData.data.id, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          dispatch('ambilData');
        })
        .catch((error) => {
          console.error('Error:', error);
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
