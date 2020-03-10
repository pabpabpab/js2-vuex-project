export default {
  /* eslint object-curly-newline: ["error", {
   "ObjectExpression": "always",
   "ObjectPattern": "never"
   }]
*/
  // ==============================загрузка товаров с сервера=====================================
  initCart({ dispatch, commit, state }) {
    dispatch('getJson', state.getCartUrl)
      .then((data) => {
        commit('setCartItems', data.contents);
      });
  },
  // ======================================add to cart============================================
  addProduct({ dispatch, getters, commit, state }, product) {
    const quantityObj = {
      quantity: 1,
    };
    //
    const find = getters.cartItems.find((el) => el.id_product === product.id_product);
    if (find) {
      // =======<товар уже есть, тогда увеличить кол-во>===========
      const productUrl = `${state.getCartUrl}/${find.id_product}`;
      dispatch('putJson', {
        url: productUrl,
        data: quantityObj,
      })
        .then((data) => {
          if (data.result === 1) {
            commit('setProductQuantity', {
              product: find,
              newQuantity: data.newQuantity, // реальное кол-во товара с сервера
            });
          }
        });
      // =======</товар уже есть, тогда увеличить кол-во>===========
    } else {
      // ==========<товара нет, тогда добавить товар>===============
      const productObj = {
        ...product,
        ...quantityObj,
      };
      //
      dispatch('postJson', {
        url: state.getCartUrl,
        data: productObj,
      })
        .then((data) => {
          if (data.result === 1) {
            commit('pushItemIntoCartItems', productObj);
          }
        });
      // ==========</товара нет, тогда добавить товар>===============
    }
  },
  // ======================================remove from cart=======================================
  remove({ dispatch, commit, getters, state }, item) {
    const quantityObj = {
      quantity: -1,
    };
    //
    const find = getters.cartItems.find((el) => el.id_product === item.id_product);
    if (!find) return;
    //
    const productUrl = `${state.getCartUrl}/${find.id_product}`;
    //
    if (find.quantity > 1) {
      // =============<кол-во товара пока больше 1>==============
      dispatch('putJson', {
        url: productUrl,
        data: quantityObj,
      })
        .then((data) => {
          if (data.result === 1) {
            commit('setProductQuantity', {
              product: find,
              newQuantity: data.newQuantity, // реальное кол-во товара с сервера
            });
          }
        });
      // =============</кол-во товара пока больше 1>==============
    } else {
      // ================<кол-во товара меньше 1>=================
      dispatch('deleteJson', productUrl)
        .then((data) => {
          if (data.result === 1) {
            // на всякий случай еще раз проверка на реальное кол-во товара с сервера
            if (data.newQuantity < 1) {
              commit('removeFromCartItems', find);
            } else {
              commit('setProductQuantity', {
                product: find,
                newQuantity: data.newQuantity, // реальное кол-во товара с сервера
              });
            }
          }
        });
      // ================</кол-во товара меньше 1>=================
    }
  },
  // =======================ввод кол-ва в input на странице корзины===============================
  inputProductQuantity({ dispatch, commit, getters, state }, { item, quantity }) {
    if (String(quantity).length === 0) return;
    //
    const find = getters.cartItems.find((el) => el.id_product === item.id_product);
    if (!find) return;
    //
    const productUrl = `${state.getCartUrl}/${find.id_product}`;
    //
    if (quantity > 0) {
      // =========<введенное кол-во товара больше нуля>==========
      const quantityObj = {
        newQuantityValue: quantity,
      };
      //
      dispatch('putJson', {
        url: productUrl,
        data: quantityObj,
      })
        .then((data) => {
          if (data.result === 1) {
            commit('setProductQuantity', {
              product: find,
              newQuantity: data.newQuantity, // реальное кол-во товара с сервера
            });
          }
        });
      // =========</введенное кол-во товара больше нуля>==========
    } else {
      // ==========<введенное кол-во товара равно нулю>===========
      dispatch('deleteJson', productUrl)
        .then((data) => {
          if (data.result === 1) {
            // на всякий случай еще раз проверка на реальное кол-во товара с сервера
            if (data.newQuantity < 1) {
              commit('removeFromCartItems', find);
            } else {
              commit('setProductQuantity', {
                product: find,
                newQuantity: data.newQuantity, // реальное кол-во товара с сервера
              });
            }
          }
        });
      // ==========</введенное кол-во товара равно нулю>===========
    }
  },
  // =====================очистить корзину полностью на странице корзины=========================
  clearCart({ dispatch, commit, state }) {
    dispatch('deleteJson', state.clearCartUrl)
      .then((data) => {
        if (data.result === 1) {
          commit('clearCart');
        }
      });
    window.scrollBy(0, -100000);
  },
};
