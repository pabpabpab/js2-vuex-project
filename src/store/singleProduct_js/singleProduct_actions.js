import checkUserInputs from './functions/checkUserInputs';

export default {
  /* eslint object-curly-newline: ["error", {
   "ObjectExpression": "always",
   "ObjectPattern": "never"
   }]
*/
  // ==============================загрузка товара с сервера======================================
  // eslint-disable-next-line no-unused-vars
  initSingleProduct({ dispatch, commit, state }, productId) {
    const singleProductUrl = state.beginOfSingleProductUrl + productId;
    dispatch('getJson', singleProductUrl)
      .then((data) => {
        commit('setSingleProduct', data.product);
        commit('setCurrentPhotoIndex', 0);
        commit('setMaxProductsId', data.max_products_id);
        dispatch('makeProductImg');
      });
  },
  // ============================сформировать html фото товара====================================
  makeProductImg({ commit, getters }) {
    // класс css (плавное появление) отрабатывает только при полной замене html-разметки фото
    // если просто менять src у фото или делать фото отдельным компонентом
    // передавая ему src - то класс css не отрабатывает
    // поэтому меняю целиком html
    /* eslint max-len: ["error", { "code": 170 }] */
    const imgHtml = `<img src="${getters.imgPath}${getters.singleProduct.img[getters.currentPhotoIndex]}" alt="product" class="product_img appearance">`;
    commit('setProductImg', imgHtml);
  },
  // ====================================листаю фото товара=======================================
  nextPhoto({ dispatch, commit, getters }) {
    let photoIndex = getters.currentPhotoIndex + 1;
    if (photoIndex >= getters.singleProductImagesLength) photoIndex = 0;
    commit('setCurrentPhotoIndex', photoIndex);
    dispatch('makeProductImg');
  },
  prevPhoto({ dispatch, commit, getters }) {
    let photoIndex = getters.currentPhotoIndex - 1;
    if (photoIndex < 0) photoIndex = getters.singleProductImagesLength - 1;
    commit('setCurrentPhotoIndex', photoIndex);
    dispatch('makeProductImg');
  },
  // ==========================при нажатии на кнопку "Add to cart"================================
  addSingleProduct({ dispatch, commit, getters, state }, userInputs) {
    let message = checkUserInputs(userInputs);
    if (message) {
      commit('setMessage', message);
      return;
    }
    /**
     здесь смотрю на Название товара,
     так как на этой странице данный товар может быть размножен под разными сгенерированными id
     (при выборе пользователем разных его параметров (цвет и размер) и добавлении в корзину)
     */
    // =======================================================================================
    const { inputColor, inputSize, inputQuantity } = userInputs;
    /* eslint max-len: ["error", { "code": 190 }] */
    // найти товар в корзине с таким именем
    const find = getters.cartItems.find((el) => el.product_name === state.singleProduct.product_name);
    // найти товар в корзине с таким именем и параметрами
    const find2 = getters.cartItems.find((el) => ((el.product_name === state.singleProduct.product_name) && (el.color === inputColor) && (el.size === inputSize.split(',')[0])));
    //
    switch (true) {
      // ===========добавляю как абсолютно новый товар если:===========
      // ========нет такого товара с таким названием в корзине=========
      case (!find):
        dispatch('addNewSingleProduct', {
          newId: state.singleProduct.id_product,
          userInputs,
        });
        commit('setMessage', 'Товар добавлен.');
        break;
      // ===========если есть, но цвет или размер другой,==============
      // =====то тоже добавляю как абсолютно новый товар с новым id====
      case (!find2):
        dispatch('addNewSingleProduct', {
          newId: getters.newProductId,
          userInputs,
        });
        message = 'Товар добавлен,<br>'
          + 'но добавлен как новый с новым id, '
          + 'потому что цвет или размер не совпадает с таким же товаром в корзине.';
        commit('setMessage', message);
        break;
      // ======если все параметры с найденным в корзине совпадают,======
      // ==============то просто увеличить кол-во товара================
      default:
        dispatch('putJson', {
          url: `${getters.getCartUrl}/${find2.id_product}`,
          data: {
            quantity: +inputQuantity,
          },
        })
          .then((data) => {
            if (data.result === 1) {
              commit('setProductQuantity', {
                product: find2,
                newQuantity: data.newQuantity, // реальное кол-во товара с сервера
              });
            }
          });
        commit('setMessage', 'Количество товара увеличено.');
    }
  },
  // ===============================add product to cart with new id===============================
  // формирую и добавляю новый товар с введенными пользователем параметрами и с новым id
  addNewSingleProduct({ dispatch, commit, getters, state }, { newId, userInputs }) {
    const { inputColor, inputSize, inputQuantity } = userInputs;
    const [size, sizeNumber] = inputSize.split(',');
    const newProduct = {
      ...state.singleProduct,
      ...{
        id_product: newId,
        color: inputColor,
        size,
        size_number: +sizeNumber,
      },
      ...{
        quantity: +inputQuantity,
      },
    };
    dispatch('postJson', {
      url: getters.getCartUrl,
      data: newProduct,
    })
      .then((data) => {
        if (data.result === 1) {
          commit('pushItemIntoCartItems', newProduct);
        }
      });
  },
};
