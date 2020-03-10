import state from './cart_js/cart_state';
import getters from './cart_js/cart_getters';
import mutations from './cart_js/cart_mutations';
import actions from './cart_js/cart_actions';
/* eslint no-shadow: ["error", { "allow": ["state", "getters", "mutations", "actions"] }] */
export default {
  state,
  getters,
  mutations,
  actions,
};
