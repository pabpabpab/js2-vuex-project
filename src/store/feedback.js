export default {
  state: {
    feedbackUrl: '/api/feedback-list/',
    // начальное значение массива отзывов, для наглядности
    feedbackList: [
      {
        id: 1, text: '', name: '', img: 'bin_burhan.png', city: '',
      },
    ],
    currentIndex: 0,
    activeCss: 'gratitudes_switcher_link gratitudes_switcher_link_active',
    inactiveCss: 'gratitudes_switcher_link',
  },
  getters: {
    feedbackUrl: (state) => state.feedbackUrl,
    feedbackList: (state) => state.feedbackList,
    feedbackListLength: (state) => state.feedbackList.length,
    currentIndex: (state) => state.currentIndex,
  },
  mutations: {
    resetLinksCss: (state) => {
      for (let i = 0; i < state.feedbackList.length; i += 1) {
        state.feedbackList[i].link_css = state.inactiveCss;
      }
    },
    setCurrentIndex: (state, index) => {
      state.currentIndex = index;
    },
    activateCurrentCss: (state, index) => {
      state.feedbackList[index].link_css = state.activeCss;
    },
    clearFeedbackList: (state) => {
      state.feedbackList.splice(0, state.feedbackList.length);
    },
    // заполнить массив отзывами, и еще добавить css
    setFeedbackList: (state, data) => {
      for (let i = 0; i < data.length; i += 1) {
        state.feedbackList.push({ ...data[i], ...{ link_css: 'gratitudes_switcher_link' } });
      }
    },
  },
  actions: {
    getFeedback({ commit }, index) {
      commit('resetLinksCss');
      commit('setCurrentIndex', index);
      commit('activateCurrentCss', index);
    },
    initFeedbackList({ dispatch, commit, getters }) {
      commit('clearFeedbackList');
      dispatch('getJson', getters.feedbackUrl).then((data) => {
        commit('setFeedbackList', data);
        dispatch('getFeedback', 0);
      });
    },
  },
};
