import Vue from 'vue';
import Vuex from 'vuex';
import http from './http';
import products from './products';
import singleProduct from './singleProduct';
import cart from './cart';
import checkout from './checkout';
import feedback from './feedback';
import message from './message';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    imgPath: 'http://localhost:8080/img/',
  },
  getters: {
    imgPath: (state) => state.imgPath,
  },
  modules: {
    http,
    products,
    singleProduct,
    cart,
    checkout,
    feedback,
    message,
  },
});
