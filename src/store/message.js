export default {
  state: {
    message: '',
  },
  getters: {
    message: (state) => state.message,
  },
  mutations: {
    setMessage: (state, message) => {
      state.message = message;
    },
  },
};
