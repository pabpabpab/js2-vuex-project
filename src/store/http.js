export default {
  state: {
    httpError: null,
  },
  getters: {
    httpError: (state) => state.httpError,
  },
  mutations: {
    setHttpError: (state, error) => {
      state.httpError = error;
    },
  },
  actions: {
    getJson(context, url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          context.commit('setHttpError', error);
        });
    },
    postJson(context, payload) {
      const { url, data } = payload;
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((result) => result.json())
        .catch((error) => {
          context.commit('setHttpError', error);
        });
    },
    putJson(context, payload) {
      const { url, data } = payload;
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((result) => result.json())
        .catch((error) => {
          context.commit('setHttpError', error);
        });
    },
    deleteJson(context, url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((result) => result.json())
        .catch((error) => {
          context.commit('setHttpError', error);
        });
    },
  },
};
