export default {
  // ==========================================url корзины========================================
  getCartUrl: (state) => state.getCartUrl,
  // ========================================корзина==============================================
  cartItems: (state) => state.cartItems,
  // ===================================всего объектов в корзине===================================
  cartItemsLength: (state) => state.cartItems.length,
  // ===================================totalPrice=================================================
  /* eslint max-len: ["error", { "code": 150 }] */
  totalPrice: (state) => state.cartItems.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0),
  // ======всего вещей в корзине (для иконки корзиныв верху страниц, красный кружок с цифрой)======
  goodsQuantity: (state) => state.cartItems.reduce((goodsQuantity, product) => goodsQuantity + (+product.quantity), 0),
  // =================================кол-во товара в корзине======================================
  getProductQuantity: (state) => (product) => {
    const find = state.cartItems.find((el) => el.id_product === product.id_product);
    if (!find) return 0;
    return find.quantity;
  },
  // =======================subTotal price для товара на странице корзины==========================
  calcSubtotalPrice: (state) => (item) => {
    const find = state.cartItems.find((el) => el.id_product === item.id_product);
    if (!find) return 0;
    return find.quantity * find.price;
  },
};
