export default {
  // ====================================объект товара===========================================
  singleProduct: (state) => state.singleProduct,
  // ===============================указатель текущего фото======================================
  currentPhotoIndex: (state) => state.currentPhotoIndex,
  // =======================================html фото============================================
  productImg: (state) => state.productImg,
  // ==============================длина массива фоток товара====================================
  singleProductImagesLength: (state) => state.singleProduct.img.length,
  // ===================новый id для нового товара при добавлении в корзину=======================
  newProductId: (state, getters) => {
    let maxId = state.maxProductsId;
    getters.cartItems.forEach((item) => {
      if (item.id_product > maxId) maxId = item.id_product;
    });
    return maxId + 1;
  },
};
