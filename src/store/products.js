import state from './products_js/products_state';
import getters from './products_js/products_getters';
import mutations from './products_js/products_mutations';
import actions from './products_js/products_actions';
/* eslint no-shadow: ["error", { "allow": ["state", "getters", "mutations", "actions"] }] */
export default {
  state,
  getters,
  mutations,
  actions,
};
