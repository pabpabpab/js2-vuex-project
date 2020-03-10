export default {
  mode: (state) => state.mode,
  currentPage: (state) => state.currentPage,
  wing: (state) => state.half_length_of_pagination_shot,
  //
  priceLimit: (state) => state.priceLimit,
  sizeArr: (state) => state.sizeArr,
  searchString: (state) => state.searchString,
  //
  filteredLength: (state) => state.filtered.length,
  customized: (state) => state.customized,
  customizedLength: (state) => state.customized.length,
  //
  productQuantityPerPage: (state) => state.productQuantityPerPage,
  paginationLinksShot: (state) => state.paginationLinksShot,
  paginationLinkCssArr: (state) => state.paginationLinkCssArr,
  paginationLinkCssArrLength: (state) => state.paginationLinkCssArr.length,
  //
  // получить url в зависимости от страницы показа списка товаров
  productsUrl: (state) => (mode) => {
    switch (mode) {
      case 'featured-products':
        return state.featuredProductsUrl;
      case 'you-may-like-also':
        return state.youMayLikeAlsoUrl;
      default:
        return state.catalogUrl;
    }
  },
};
