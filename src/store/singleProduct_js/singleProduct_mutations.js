export default {
  // ==============================принятый с сервера один товар==================================
  setSingleProduct: (state, product) => {
    state.singleProduct = { ...product };
  },
  // =============================принятый с сервера max id товаров===============================
  // необходим для генерации нового id товара при add to cart с отличающимися праметрами
  setMaxProductsId: (state, maxProductsId) => {
    state.maxProductsId = maxProductsId;
  },
  // ============================================================================================
  setCurrentPhotoIndex: (state, photoIndex) => {
    state.currentPhotoIndex = photoIndex;
  },
  // =============================================================================================
  setProductImg: (state, imgHtml) => {
    state.productImg = imgHtml;
  },
};
