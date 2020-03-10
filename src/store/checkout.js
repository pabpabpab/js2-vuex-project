export default {
  state: {
    checkoutUrl: '/api/checkout',
  },
  actions: {
    // ===================================uploadUserData=========================================
    uploadUserData({ dispatch, state }, userData) {
      dispatch('postJson', {
        url: state.checkoutUrl,
        data: userData,
      })
        .then((data) => {
          if (data.result === 1) {
            console.log(`отправлено ${JSON.stringify(userData, null, 4)}`);
          }
        });
    },
    // ===================================downloadUserData=======================================
    downloadUserData({ dispatch, state }) {
      dispatch('getJson', state.checkoutUrl)
        .then((data) => {
          alert(`получено ${JSON.stringify(data, null, 4)}`);
        });
    },
  },
};
