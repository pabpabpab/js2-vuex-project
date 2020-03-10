export default {
  setCurrentPage: (state, page) => {
    state.currentPage = page;
  },
  setMode: (state, mode) => {
    state.mode = mode;
  },
  // ==================paginationLinksShot=======================
  clearPaginationLinksShot: (state) => {
    state.paginationLinksShot.splice(0, state.paginationLinksShot.length);
  },
  pushIntoPaginationLinkShot: (state, item) => {
    state.paginationLinksShot.push(item);
  },
  // =================PaginationLinkCssArr======================
  clearPaginationLinkCssArr: (state) => {
    state.paginationLinkCssArr.splice(0, state.paginationLinkCssArr.length);
  },
  pushIntoPaginationLinkCssArr: (state, cssClass) => {
    state.paginationLinkCssArr.push(cssClass);
  },
  setPaginationLinkCssArrByIndex: (state, payload) => {
    const { index, cssClass } = payload;
    state.paginationLinkCssArr.splice(index, 1, cssClass);
  },
  // =================productQuantityPerPage===================
  setProductQuantityPerPage: (state, userProductQuantityPerPage) => {
    state.productQuantityPerPage = userProductQuantityPerPage;
  },
  // ======================customized=========================
  clearCustomized: (state) => {
    state.customized.splice(0, state.customized.length);
  },
  pushProductIntoCustomized: (state, payload) => {
    const { pageCounter, product } = payload;
    state.customized[pageCounter].push(product);
  },
  // ===========================products======================
  setProducts: (state, data) => {
    state.products.splice(0, state.products.length);
    for (let i = 0; i < data.length; i += 1) {
      state.products.push(data[i]);
    }
  },
  // ==========================filtered=======================
  setFiltered: (state, data) => {
    state.filtered.splice(0, state.filtered.length);
    for (let i = 0; i < data.length; i += 1) {
      state.filtered.push(data[i]);
    }
  },
  clearFiltered: (state) => {
    state.filtered.splice(0, state.filtered.length);
  },
  // ====================установки фильтров==================
  clearSearchString: (state) => {
    state.searchString = '';
  },
  clearSizeArr: (state) => {
    state.sizeArr.splice(0, state.sizeArr.length);
  },
  clearPriceLimit: (state) => {
    state.priceLimit = 80;
  },
};
