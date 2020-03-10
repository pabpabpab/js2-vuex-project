export default {
  setCartItems: (state, data) => {
    state.cartItems.splice(0, state.cartItems.length);
    for (let i = 0; i < data.length; i += 1) {
      state.cartItems.push(data[i]);
    }
  },
  clearCart: (state) => {
    state.cartItems.splice(0, state.cartItems.length);
  },
  pushItemIntoCartItems: (state, product) => {
    state.cartItems.push(product);
  },
  removeFromCartItems: (state, product) => {
    const index = state.cartItems.indexOf(product);
    state.cartItems.splice(index, 1);
  },
  setProductQuantity: (state, payload) => {
    const { product, newQuantity } = payload;
    const index = state.cartItems.indexOf(product);
    product.quantity = newQuantity;
    state.cartItems.splice(index, 1, product);
  },
};
